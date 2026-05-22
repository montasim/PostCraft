import { trendRepository } from "./trend.repository"
import { createTrendSchema, type CreateTrendInput } from "./trend.schema"
import { getEnv, isDev } from "@/core/config/env"
import { publishGenerationJob } from "@/core/queue/qstash"
import { ValidationError } from "@/core/errors/app-error"
import { logger } from "@/core/logger"

export const trendService = {
  async createTrend(
    data: CreateTrendInput,
    workspaceId?: string,
    userId?: string
  ) {
    const parsed = createTrendSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }

    const { DEFAULT_WORKSPACE_ID } = getEnv()
    const wsId = workspaceId ?? DEFAULT_WORKSPACE_ID
    const uid = userId ?? "user_default"

    const trend = await trendRepository.create({
      ...parsed.data,
      languages: parsed.data.languages.map((l) => l.toLowerCase()),
      workspaceId: wsId,
      createdBy: uid,
      status: "queued",
    })

    const trendId = trend._id.toString()
    logger.info({ trendId }, "Trend created")

    // Enqueue to QStash if configured (prod). Dev sync handled by route handler.
    let messageId: string | null = null
    if (!isDev()) {
      messageId = await publishGenerationJob(trendId)
    } else {
      logger.info({ trendId }, "QStash not configured — use sync mode")
    }

    return {
      trendId,
      status: trend.status,
      messageId,
    }
  },

  async getTrendStatus(trendId: string, workspaceId: string) {
    const trend = await trendRepository.findById(trendId, workspaceId)
    return {
      id: trend._id.toString(),
      topic: trend.topic,
      audiences: trend.audiences,
      tones: trend.tones,
      languages: trend.languages,
      includeEmoji: trend.includeEmoji,
      status: trend.status,
      errorMessage: trend.errorMessage,
      createdAt: trend.createdAt,
    }
  },

  async updateStatus(
    trendId: string,
    workspaceId: string,
    status: "queued" | "generating" | "scoring" | "ranking" | "completed" | "failed",
    errorMessage?: string
  ) {
    return trendRepository.updateStatus(trendId, workspaceId, status, errorMessage)
  },
}
