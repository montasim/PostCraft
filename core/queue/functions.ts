import { inngest } from "./client"
import { runGenerationPipeline } from "./pipeline"
import {
  fetchTrendingSources,
  buildSourceKeywords,
} from "@/modules/trending/source-fetcher"
import { rankSourceItems } from "@/modules/trending/trending-ranker"
import {
  updateRunSourceItems,
  updateRunGenerationIds,
  updateRunStatus,
} from "@/modules/trending/trending.repository"
import {
  generatePostsFromTrends,
  shortlistWithAI,
} from "@/modules/trending/trending.service"
import { sendTrendingCompletionEmail } from "@/modules/trending/trending-email"
import {
  saveGlobalTopics,
  saveGlobalTopicsFailure,
} from "@/modules/trending/global-topics.repository"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"
import { connectDB } from "@/core/config/database"
import { analyticsRepository } from "@/modules/analytics/analytics.repository"
import {
  PLAN_LIMIT,
  GENERATION_EVENT,
  CRON,
  TRENDING_TOP_N,
} from "@/lib/constants"
import { RUN_STATUS } from "@/lib/constants"
import { logger } from "@/core/logger"

export const generatePosts = inngest.createFunction(
  {
    id: "generate-posts",
    name: "Generate Posts",
    retries: 3,
    triggers: [{ event: GENERATION_EVENT }],
  },
  async ({ event }) => {
    const { generationId, workspaceId } = event.data as {
      generationId: string
      workspaceId: string
    }
    await runGenerationPipeline(generationId, workspaceId)
  }
)

export const runTrendingPipeline = inngest.createFunction(
  {
    id: "run-trending-pipeline",
    name: "Run Trending Pipeline",
    retries: 2,
    triggers: [{ event: "trending/run-triggered" }],
  },
  async ({ event }) => {
    const { workspaceId, userId, config, runId } = event.data as {
      workspaceId: string
      userId: string
      config: TrendingPrefs
      runId: string
    }

    try {
      await connectDB()
      const overview = await analyticsRepository.getOverview(workspaceId)
      if (overview.completedGenerations >= PLAN_LIMIT) {
        await updateRunStatus(runId, RUN_STATUS.FAILED, "Quota exceeded")
        logger.info(
          { workspaceId, runId },
          "Trending pipeline skipped — quota exceeded"
        )
        return
      }

      const rawItems = await fetchTrendingSources(config)
      const rankedItems = rankSourceItems(rawItems)
      await updateRunSourceItems(runId, rankedItems)

      const shortlisted = await shortlistWithAI(
        rankedItems,
        config,
        config.topPostsForAI ?? 5
      )
      const generationIds = await generatePostsFromTrends(
        shortlisted,
        config,
        workspaceId,
        userId
      )

      await updateRunGenerationIds(runId, generationIds)
      await updateRunStatus(runId, RUN_STATUS.COMPLETED)

      await sendTrendingCompletionEmail(userId, runId).catch((err) => {
        logger.warn(
          { userId, runId, err: String(err) },
          "Failed to send trending completion email"
        )
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      logger.error(
        { workspaceId, runId, err: message },
        "Trending pipeline failed"
      )
      await updateRunStatus(runId, RUN_STATUS.FAILED, message)
      throw err
    }
  }
)

// ─── Global Trending Topics Cron ────────────────────────────────────────────

const GLOBAL_TRENDING_CONFIG = {
  enabled: true,
  platforms: ["hackernews", "devto", "reddit"],
  topics: [
    "AI",
    "startup",
    "engineering",
    "productivity",
    "hiring",
    "remote work",
  ],
  industry: ["software", "saas"],
  targetAudience: ["developers", "founders", "tech leads"],
  language: ["english"],
  postsPerPlatform: 5,
  topPostsForAI: 6,
  postsToGenerate: 6,
  scheduleType: "daily" as const,
  scheduledTime: "06:00",
  scheduledDay: null,
} satisfies TrendingPrefs

export const fetchGlobalTrendingTopics = inngest.createFunction(
  {
    id: "fetch-global-trending-topics",
    name: "Fetch Global Trending Topics",
    retries: 2,
    triggers: [{ cron: CRON.DAILY_6AM }],
  },
  async ({ step }) => {
    const rawItems = await step.run("fetch-sources", async () => {
      await connectDB()
      return fetchTrendingSources(GLOBAL_TRENDING_CONFIG)
    })

    const topTopics = await step.run("rank-and-select", async () => {
      const ranked = rankSourceItems(rawItems)
      return ranked.slice(0, TRENDING_TOP_N)
    })

    await step.run("save-topics", async () => {
      await connectDB()
      if (topTopics.length === 0) {
        await saveGlobalTopicsFailure("No items fetched from any source")
        return
      }
      await saveGlobalTopics(topTopics)
      logger.info({ count: topTopics.length }, "Global trending topics saved")
    })

    return { fetched: rawItems.length, saved: topTopics.length }
  }
)
