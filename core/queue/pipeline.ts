import { connectDB } from "@/core/config/database"

import { trendService, trendRepository } from "@/modules/trend"
import { generationService } from "@/modules/generation"
import { scoringService } from "@/modules/scoring"
import { rankingService } from "@/modules/ranking"
import { variantService } from "@/modules/variant"
import { guardrailRepository } from "@/modules/guardrail"
import { logger } from "@/core/logger"

export async function runGenerationPipeline(trendId: string, workspaceId: string): Promise<void> {
  await connectDB()

  try {
    logger.info({ trendId }, "Pipeline: starting")

    // 1. Fetch trend
    const trend = await trendService.getTrendStatus(trendId, workspaceId)
    await trendService.updateStatus(trendId, workspaceId, "generating")

    // 2. Fetch guardrails
    const allGuardrails = await guardrailRepository.findByWorkspace(workspaceId)
    const toneRules = allGuardrails.filter((g) => g.category === "tone").map((g) => g.rule)
    const formatRules = allGuardrails.filter((g) => g.category === "format").map((g) => g.rule)
    const bannedWords = allGuardrails.filter((g) => g.category === "banned").map((g) => g.rule)

    // 2b. Save guardrail IDs used for this trend
    const guardrailIds = allGuardrails.map((g) => g._id.toString())
    if (guardrailIds.length > 0) {
      await trendRepository.updateGuardrailIds(trendId, workspaceId, guardrailIds)
    }

    // 3. Generate variants via AI
    const rawVariants = await generationService.generateVariants(
      {
        topic: trend.topic,
        audiences: trend.audiences,
        tones: trend.tones,
        languages: trend.languages,
        includeEmoji: trend.includeEmoji,
      },
      { toneRules, formatRules, bannedWords }
    )

    // 4. Score
    await trendService.updateStatus(trendId, workspaceId, "scoring")

    const scoredVariants = await scoringService.scoreAllVariants(
      rawVariants,
      bannedWords,
      trend.audiences,
      trend.topic
    )

    // 5. Rank
    await trendService.updateStatus(trendId, workspaceId, "ranking")

    const rankedVariants = rankingService.rankVariants(scoredVariants)

    // 6. Persist
    await variantService.persistVariants(trendId, workspaceId, rankedVariants)

    // 7. Done
    await trendService.updateStatus(trendId, workspaceId, "completed")

    logger.info({ trendId }, "Pipeline: completed")
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    await trendService.updateStatus(trendId, workspaceId, "failed", message).catch(() => {})
    logger.error({ err: error, trendId }, "Pipeline: failed")
    throw error
  }
}
