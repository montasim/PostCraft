import { generationService } from "@/modules/generation"
import { callWithTaskFallback } from "@/core/ai/provider"
import { buildShortlistSystemPrompt, buildShortlistPrompt } from "@/core/ai/prompts/shortlist"
import { logger } from "@/core/logger"
import { inngest } from "@/core/queue/client"
import { QuotaExceededError, ValidationError } from "@/core/errors/app-error"
import { generationRepository } from "@/modules/generation/generation.repository"
import { variantRepository } from "@/modules/variant/variant.repository"
import { analyticsRepository } from "@/modules/analytics/analytics.repository"
import { prefsService } from "@/modules/prefs"
import { PLAN_LIMIT } from "@/lib/constants"
import {
  findRunsByWorkspace,
  countUndismissedRuns,
  dismissRun as repoDismissRun,
  dismissAllRuns as repoDismissAllRuns,
  createRun,
} from "./trending.repository"
import { getLatestGlobalTopics } from "./global-topics.repository"
import type { SourceItem } from "./trending.types"
import type { TrendingPrefs } from "../prefs/prefs.schema"
import type { ITrendingRunDoc } from "./trending.model"
import type {
  VariantPreview,
  TrendingGenerationPreview,
  TrendingPlatform,
} from "./trending.types"
import type { IVariant } from "@/modules/variant/variant.model"

const LANGUAGE_TO_CODE: Record<string, string> = {
  english: "en",
  bangla: "bn",
  bengali: "bn",
  banglish: "en",
}

const STATIC_FALLBACK_TOPICS = [
  "Why most startups fail at hiring in 2025",
  "AI replacing resume screening — what actually works",
  "The 4-day work week experiment: honest results",
  "Remote work productivity hacks that stick",
  "Building diverse engineering teams",
  "Scaling from 5 to 50 people: hiring lessons",
]

function mapVariantToPreview(
  v: Omit<IVariant, "save" | "validate" | "remove"> & { _id: { toString(): string } }
): VariantPreview {
  return {
    _id: v._id.toString(),
    styleType: v.styleType ?? "",
    language: v.language ?? "en",
    hook: v.hook ?? "",
    body: v.body ?? "",
    cta: v.cta ?? "",
    hashtags: v.hashtags ?? [],
    score: v.overallScore ?? 0,
    engagement: v.engagementScore ?? 0,
    clarity: v.clarityScore ?? 0,
    formatting: v.formattingScore ?? 0,
    overallScore: v.overallScore ?? 0,
    overallRank: v.overallRank ?? 1,
    judgeReasoning: v.judgeReasoning ?? "",
  }
}

export async function getTrendingDashboard(workspaceId: string) {
  const runs = await findRunsByWorkspace(workspaceId, 50)

  const generationMeta = new Map<string, { run: ITrendingRunDoc; index: number }>()
  for (const run of runs) {
    run.generationIds.forEach((genId, i) => {
      generationMeta.set(genId, { run, index: i })
    })
  }

  const allGenIds = [...generationMeta.keys()]
  const generationDocs = allGenIds.length > 0
    ? await generationRepository.findByIds(allGenIds)
    : []
  const variantDocs = allGenIds.length > 0
    ? await variantRepository.findTopRankedByTrendIds(allGenIds)
    : []

  const variantByGenId = new Map(variantDocs.map((v) => [v.trendId.toString(), v]))

  const generations: TrendingGenerationPreview[] = generationDocs.map((gen) => {
    const meta = generationMeta.get(gen._id.toString())!
    const rawSourceItem = meta.run.sourceItems[meta.index] ?? {
      source: "hackernews",
      title: gen.topic,
      url: "",
      score: 0,
      rank: 0,
    }
    const variant = variantByGenId.get(gen._id.toString()) ?? null

    return {
      generationId: gen._id.toString(),
      runId: meta.run._id.toString(),
      sourceItem: {
        source: rawSourceItem.source as TrendingPlatform,
        title: rawSourceItem.title,
        url: rawSourceItem.url,
        score: rawSourceItem.score,
        rank: rawSourceItem.rank,
      },
      topic: gen.topic,
      status: gen.status,
      topVariant: variant ? mapVariantToPreview(variant) : null,
    }
  })

  const unreadCount = await countUndismissedRuns(workspaceId)

  return { runs, generations, unreadCount }
}

export async function dismissRun(runId: string, workspaceId: string): Promise<void> {
  await repoDismissRun(runId, workspaceId)
}

export async function dismissAllRuns(workspaceId: string): Promise<void> {
  await repoDismissAllRuns(workspaceId)
}

export async function triggerRun(workspaceId: string, userId: string) {
  const overview = await analyticsRepository.getOverview(workspaceId)
  if (overview.completedGenerations >= PLAN_LIMIT) {
    throw new QuotaExceededError()
  }

  const prefs = await prefsService.getTrendingPrefs(userId)
  if (!prefs.platforms || prefs.platforms.length === 0) {
    throw new ValidationError("Configure at least one platform before running")
  }

  const run = await createRun({
    workspaceId,
    configSnapshot: {
      platforms: prefs.platforms,
      topics: prefs.topics,
      industry: prefs.industry,
      targetAudience: prefs.targetAudience,
      language: prefs.language,
      postsPerPlatform: prefs.postsPerPlatform,
      topPostsForAI: prefs.topPostsForAI,
      postsToGenerate: prefs.postsToGenerate,
      scheduleType: prefs.scheduleType,
      scheduledTime: prefs.scheduledTime,
      scheduledDay: prefs.scheduledDay,
    },
    status: "running",
    ranAt: new Date(),
    sourceItems: [],
    generationIds: [],
    dismissed: false,
    error: null,
  })

  await inngest.send({
    name: "trending/run-triggered",
    data: {
      workspaceId,
      userId,
      config: prefs,
      runId: run._id.toString(),
    },
  })

  return { runId: run._id.toString() }
}

export async function getGlobalTopics(): Promise<{
  topics: string[]
  source: "trending" | "ai" | "static"
  fetchedAt: Date | null
}> {
  // Tier 1: Real trending data from DB
  const latest = await getLatestGlobalTopics()
  if (latest && latest.topics.length > 0) {
    return {
      topics: latest.topics.map((item) => item.title),
      source: "trending",
      fetchedAt: latest.fetchedAt,
    }
  }

  // Tier 2: AI-generated suggestions
  try {
    const { text: raw } = await callWithTaskFallback("generate", {
      system: `You are a LinkedIn content strategist.
Return a JSON object with a "topics" array of exactly 6 trending professional topics
suitable as LinkedIn post ideas for developers, founders, and tech professionals.
Topics should be timely, specific, and conversation-starting.
No markdown. No explanation. JSON only.`,
      user: `Generate 6 trending LinkedIn topic suggestions for tech professionals.
Return exactly: { "topics": ["topic1", "topic2", "topic3", "topic4", "topic5", "topic6"] }`,
      temperature: 0.8,
      maxTokens: 256,
    })

    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim()
    const parsed = JSON.parse(cleaned) as { topics: string[] }

    if (Array.isArray(parsed.topics) && parsed.topics.length > 0) {
      return { topics: parsed.topics.slice(0, 6), source: "ai", fetchedAt: null }
    }
  } catch (aiErr) {
    logger.warn(
      { err: aiErr instanceof Error ? aiErr.message : String(aiErr) },
      "AI topic generation failed — falling back to static"
    )
  }

  // Tier 3: Static hardcoded fallback
  return { topics: STATIC_FALLBACK_TOPICS, source: "static", fetchedAt: null }
}

export async function generatePostsFromTrends(
  topItems: SourceItem[],
  config: TrendingPrefs,
  workspaceId: string,
  userId: string
): Promise<string[]> {
  const generationIds: string[] = []

  for (const item of topItems.slice(0, config.postsToGenerate)) {
    const topic = `${item.title}\n\nSource: ${item.url}`

    const result = await generationService.createGeneration(
      {
        topic,
        audiences: config.targetAudience.length > 0 ? config.targetAudience : ["developers"],
        tones: ["Thought leader"],
        languages: (config.language.length > 0 ? config.language : ["english"]).map(
          (l) => LANGUAGE_TO_CODE[l.toLowerCase()] ?? "en"
        ),
        includeEmoji: true,
      },
      workspaceId,
      userId
    )

    generationIds.push(result.generationId)
  }

  return generationIds
}

export interface ShortlistOutput extends SourceItem {
  selectionReason: string
}

export async function shortlistWithAI(
  rankedItems: SourceItem[],
  config: TrendingPrefs,
  topN: number
): Promise<ShortlistOutput[]> {
  if (rankedItems.length <= topN) {
    return rankedItems.map((item) => ({
      ...item,
      selectionReason: "Selected (within available count)",
    }))
  }

  const persona = {
    targetAudience: config.targetAudience ?? [],
    topics: config.topics ?? [],
    industry: config.industry ?? [],
    language: config.language ?? ["english"],
  }

  const systemPrompt = buildShortlistSystemPrompt()
  const userPrompt = buildShortlistPrompt(rankedItems, persona, topN)

  try {
    const { text: raw } = await callWithTaskFallback("shortlist", {
      system: systemPrompt,
      user: userPrompt,
      temperature: 0.3,
      maxTokens: 1024,
    })

    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim()

    const parsed = JSON.parse(cleaned) as { selected: ShortlistOutput[] }

    if (!Array.isArray(parsed.selected) || parsed.selected.length === 0) {
      throw new Error("AI returned empty selection")
    }

    const inputUrls = new Set(rankedItems.map((i) => i.url))
    const validated = parsed.selected.filter((item) => inputUrls.has(item.url))

    if (validated.length === 0) {
      throw new Error("AI returned items with no matching URLs in input")
    }

    logger.info(
      { selected: validated.length, from: rankedItems.length },
      "AI shortlisting complete"
    )

    return validated.slice(0, topN)
  } catch (err) {
    logger.warn(
      { err: err instanceof Error ? err.message : String(err) },
      "AI shortlisting failed — falling back to score-based top-N"
    )
    return rankedItems.slice(0, topN).map((item) => ({
      ...item,
      selectionReason: "Selected by score (AI fallback)",
    }))
  }
}
