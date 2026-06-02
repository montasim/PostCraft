import { connectDB } from "@/core/config/database"

import { generationService, generationRepository } from "@/modules/generation"
import { scoringService } from "@/modules/scoring"
import { rankingService } from "@/modules/ranking"
import { variantService } from "@/modules/variant"
import { guardrailRepository } from "@/modules/guardrail"
import { logger } from "@/core/logger"

export async function runGenerationPipeline(
  generationId: string,
  workspaceId: string
): Promise<void> {
  await connectDB()

  try {
    logger.info({ generationId }, "Pipeline: starting")

    // 1. Fetch generation
    const generation = await generationService.getGenerationStatus(
      generationId,
      workspaceId
    )
    await generationService.updateStatus(
      generationId,
      workspaceId,
      "generating"
    )

    // 2. Fetch guardrails
    const allGuardrails = await guardrailRepository.findByWorkspace(workspaceId)
    const toneRules = allGuardrails
      .filter((g) => g.category === "tone")
      .map((g) => g.rule)
    const formatRules = allGuardrails
      .filter((g) => g.category === "format")
      .map((g) => g.rule)
    const bannedWords = allGuardrails
      .filter((g) => g.category === "banned")
      .map((g) => g.rule)
    const customRules = allGuardrails
      .filter((g) => g.category === "custom")
      .map((g) => g.rule)

    // 2b. Save guardrail IDs used for this generation
    const guardrailIds = allGuardrails.map((g) => g._id.toString())
    if (guardrailIds.length > 0) {
      await generationRepository.updateGuardrailIds(
        generationId,
        workspaceId,
        guardrailIds
      )
    }

    // 3. Generate variants via AI
    const rawVariants = await generationService.generateVariants(
      {
        topic: generation.topic,
        audiences: generation.audiences,
        tones: generation.tones,
        languages: generation.languages,
        includeEmoji: generation.includeEmoji,
        postCount: generation.postCount,
        platforms: generation.platforms,
        hashtagCount: generation.hashtagCount,
      },
      { toneRules, formatRules, bannedWords, customRules }
    )

    // 4. Score
    await generationService.updateStatus(generationId, workspaceId, "scoring")

    const scoredVariants = await scoringService.scoreAllVariants(
      rawVariants,
      bannedWords,
      generation.audiences,
      generation.topic
    )

    // 5. Rank
    await generationService.updateStatus(generationId, workspaceId, "ranking")

    const rankedVariants = rankingService.rankVariants(scoredVariants)

    // 6. Persist
    await variantService.persistVariants(
      generationId,
      workspaceId,
      rankedVariants
    )

    // 7. Done
    await generationService.updateStatus(generationId, workspaceId, "completed")

    logger.info({ generationId }, "Pipeline: completed")
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    await generationService
      .updateStatus(generationId, workspaceId, "failed", message)
      .catch((statusErr) => {
        logger.error(
          { err: statusErr, generationId },
          "Pipeline: failed to update status"
        )
      })
    logger.error({ err: error, generationId }, "Pipeline: failed")
    throw error
  }
}
