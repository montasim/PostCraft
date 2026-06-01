import { inngest } from "./client"
import { runGenerationPipeline } from "./pipeline"
import { fetchTrendingSources, buildSourceKeywords } from "@/modules/trending/source-fetcher"
import { rankSourceItems } from "@/modules/trending/trending-ranker"
import { updateRunSourceItems, updateRunGenerationIds, updateRunStatus } from "@/modules/trending/trending.repository"
import { generatePostsFromTrends, shortlistWithAI } from "@/modules/trending/trending.service"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"
import { logger } from "@/core/logger"

export const generatePosts = inngest.createFunction(
  {
    id: "generate-posts",
    name: "Generate Posts",
    retries: 3,
    triggers: [{ event: "generation/created" }],
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
      const rawItems = await fetchTrendingSources(config)
      const rankedItems = rankSourceItems(rawItems)
      await updateRunSourceItems(runId, rankedItems)

      const shortlisted = await shortlistWithAI(rankedItems, config, config.topPostsForAI ?? 5)
      const generationIds = await generatePostsFromTrends(shortlisted, config, workspaceId, userId)

      await updateRunGenerationIds(runId, generationIds)
      await updateRunStatus(runId, "completed")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      logger.error({ workspaceId, runId, err: message }, "Trending pipeline failed")
      await updateRunStatus(runId, "failed", message)
      throw err
    }
  }
)
