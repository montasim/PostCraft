import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"
import { trendService } from "@/modules/trend"
import { generationService } from "@/modules/generation"
import { scoringService } from "@/modules/scoring"
import { rankingService } from "@/modules/ranking"
import { variantService } from "@/modules/variant"
import { guardrailRepository } from "@/modules/guardrail"
import { logger } from "@/core/logger"

export async function runGenerationPipeline(trendId: string): Promise<void> {
  await connectDB()
  const { DEFAULT_WORKSPACE_ID } = getEnv()

  try {
    logger.info({ trendId }, "Pipeline: starting")

    // 1. Fetch trend
    const trend = await trendService.getTrendStatus(trendId, DEFAULT_WORKSPACE_ID)
    await trendService.updateStatus(trendId, DEFAULT_WORKSPACE_ID, "generating")

    // 2. Fetch guardrails
    const allGuardrails = await guardrailRepository.findByWorkspace(DEFAULT_WORKSPACE_ID)
    const toneRules = allGuardrails.filter((g) => g.category === "tone").map((g) => g.rule)
    const formatRules = allGuardrails.filter((g) => g.category === "format").map((g) => g.rule)
    const bannedWords = allGuardrails.filter((g) => g.category === "banned").map((g) => g.rule)

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
    await trendService.updateStatus(trendId, DEFAULT_WORKSPACE_ID, "scoring")

    const scoredVariants = await scoringService.scoreAllVariants(
      rawVariants,
      bannedWords,
      trend.audiences,
      trend.topic
    )

    // 5. Rank
    await trendService.updateStatus(trendId, DEFAULT_WORKSPACE_ID, "ranking")

    const rankedVariants = rankingService.rankVariants(scoredVariants)

    // 6. Persist
    await variantService.persistVariants(trendId, DEFAULT_WORKSPACE_ID, rankedVariants)

    // 7. Done
    await trendService.updateStatus(trendId, DEFAULT_WORKSPACE_ID, "completed")

    logger.info({ trendId }, "Pipeline: completed")
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    await trendService.updateStatus(trendId, DEFAULT_WORKSPACE_ID, "failed", message).catch(() => {})
    logger.error({ err: error, trendId }, "Pipeline: failed")
    throw error
  }
}
