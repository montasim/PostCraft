import { generationService } from "@/modules/generation"
import { callWithTaskFallback } from "@/core/ai/provider"
import { buildShortlistSystemPrompt, buildShortlistPrompt } from "@/core/ai/prompts/shortlist"
import { logger } from "@/core/logger"
import type { SourceItem } from "./trending.types"
import type { TrendingPrefs } from "../prefs/prefs.schema"

const LANGUAGE_TO_CODE: Record<string, string> = {
  english: "en",
  bangla: "bn",
  bengali: "bn",
  banglish: "en",
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
