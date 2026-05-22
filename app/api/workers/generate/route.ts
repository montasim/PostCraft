import { NextRequest, NextResponse } from "next/server"
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs"
import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"
import { trendService } from "@/modules/trend"
import { generationService } from "@/modules/generation"
import { scoringService } from "@/modules/scoring"
import { rankingService } from "@/modules/ranking"
import { variantService } from "@/modules/variant"
import { guardrailRepository } from "@/modules/guardrail"
import { logger } from "@/core/logger"

async function handler(request: NextRequest) {
  try {
    await connectDB()
    const { DEFAULT_WORKSPACE_ID } = getEnv()

    const body = await request.json()
    const { trendId } = body as { trendId: string }

    if (!trendId) {
      return NextResponse.json(
        { success: false, error: "Missing trendId" },
        { status: 400 }
      )
    }

    logger.info({ trendId }, "Worker: starting generation pipeline")

    // 1. Update status → generating
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

    // 4. Update status → scoring
    await trendService.updateStatus(trendId, DEFAULT_WORKSPACE_ID, "scoring")

    // 5. Score all variants
    const scoredVariants = await scoringService.scoreAllVariants(
      rawVariants,
      bannedWords,
      trend.audiences,
      trend.topic
    )

    // 6. Update status → ranking
    await trendService.updateStatus(trendId, DEFAULT_WORKSPACE_ID, "ranking")

    // 7. Rank variants
    const rankedVariants = rankingService.rankVariants(scoredVariants)

    // 8. Persist variants
    await variantService.persistVariants(trendId, DEFAULT_WORKSPACE_ID, rankedVariants)

    // 9. Update status → completed
    await trendService.updateStatus(trendId, DEFAULT_WORKSPACE_ID, "completed")

    logger.info({ trendId }, "Worker: generation pipeline completed")
    return NextResponse.json({ success: true })
  } catch (error) {
    const { DEFAULT_WORKSPACE_ID } = getEnv()
    const body = await request.json().catch(() => ({}))
    const trendId = (body as { trendId?: string }).trendId

    if (trendId) {
      const message = error instanceof Error ? error.message : "Unknown error"
      await trendService.updateStatus(trendId, DEFAULT_WORKSPACE_ID, "failed", message).catch(() => {})
    }

    logger.error({ err: error, trendId }, "Worker: generation pipeline failed")
    throw error // re-throw for QStash retry
  }
}

export const POST = verifySignatureAppRouter(handler)
