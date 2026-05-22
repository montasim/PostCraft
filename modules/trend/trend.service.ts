import { trendRepository } from "./trend.repository"
import { createTrendSchema, type CreateTrendInput } from "./trend.schema"
import { publishGenerationJob } from "@/core/queue/qstash"
import { getEnv } from "@/core/config/env"
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

    logger.info({ trendId: trend._id }, "Trend created, enqueuing job")

    const messageId = await publishGenerationJob(trend._id.toString())

    return {
      trendId: trend._id.toString(),
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
