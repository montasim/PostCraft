import { buildGenerationPrompt } from "./prompt-builder"
import {
  aiGenerationOutputSchema,
  resolveLanguage,
  type RawVariant,
} from "./generation.schema"
import {
  createGenerationSchema,
  type CreateGenerationInput,
  type GenerationStatus,
} from "./generation.schema"
import { generationRepository } from "./generation.repository"
import { insightsRepository } from "@/modules/insights/insights.repository"
import { inngest } from "@/core/queue/client"
import {
  AIServiceError,
  QuotaExceededError,
  ValidationError,
} from "@/core/errors/app-error"
import { logger } from "@/core/logger"
import { callWithTaskFallback } from "@/core/ai/provider"
import {
  PLAN_LIMIT,
  GENERATION_STATUS,
  GENERATION_EVENT,
  MAX_RETRIES_DEFAULT,
  AI_TEMPERATURE,
  AI_MAX_TOKENS,
  ERROR_MESSAGES,
  POST_COUNT_DEFAULT,
} from "@/lib/constants"
import { MARKDOWN_FENCE_OPEN, MARKDOWN_FENCE_CLOSE } from "@/lib/constants"

interface GenerationData {
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
  postCount: number
  platforms: string[]
  hashtagCount: number
}

interface GuardrailData {
  toneRules: string[]
  formatRules: string[]
  bannedWords: string[]
}

function stripMarkdownFences(text: string): string {
  return text
    .replace(MARKDOWN_FENCE_OPEN, "")
    .replace(MARKDOWN_FENCE_CLOSE, "")
    .trim()
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    // Gemini sometimes truncates JSON when hitting token limit
    // Try to recover by closing open structures
    let repaired = text.trimEnd()
    if (!repaired.endsWith("}") && !repaired.endsWith("]")) {
      // Count open braces/brackets
      const opens = (repaired.match(/[[{]/g) || []).length
      const closes = (repaired.match(/[\]}]/g) || []).length
      const diff = opens - closes
      // Try to close the last variant object and the array
      if (repaired.endsWith(",")) repaired = repaired.slice(0, -1)
      for (let i = 0; i < diff; i++) repaired += i === diff - 1 ? "]" : "}"
      try {
        return JSON.parse(repaired)
      } catch {
        // Last resort: extract partial variants array
        const match = repaired.match(/\[\s*\{[\s\S]*\}\s*\]/)
        if (match) return JSON.parse(match[0])
        throw new SyntaxError("Unexpected end of JSON input")
      }
    }
    throw new SyntaxError("Unexpected end of JSON input")
  }
}

export const generationService = {
  // ─── CRUD ─────────────────────────────────────────────────────

  async createGeneration(
    data: CreateGenerationInput,
    workspaceId: string,
    userId: string
  ) {
    const overview = await insightsRepository.getOverview(workspaceId)
    if (overview.completedGenerations >= PLAN_LIMIT) {
      throw new QuotaExceededError()
    }

    const parsed = createGenerationSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }

    const doc = await generationRepository.create({
      ...parsed.data,
      languages: parsed.data.languages.map((l) => l.toLowerCase()),
      postCount: parsed.data.postCount ?? POST_COUNT_DEFAULT,
      platforms: parsed.data.platforms ?? ["linkedin"],
      hashtagCount: parsed.data.hashtagCount ?? 3,
      workspaceId,
      createdBy: userId,
      status: GENERATION_STATUS.QUEUED,
    })

    const generationId = doc._id.toString()
    logger.info({ generationId }, "Generation created")

    // Enqueue to Inngest
    await inngest.send({
      name: GENERATION_EVENT,
      data: { generationId, workspaceId },
    })
    logger.info({ generationId }, "Generation enqueued to Inngest")

    return {
      generationId,
      status: doc.status,
    }
  },

  async getGenerationStatus(generationId: string, workspaceId: string) {
    const doc = await generationRepository.findById(generationId, workspaceId)
    return {
      id: doc._id.toString(),
      topic: doc.topic,
      audiences: doc.audiences,
      tones: doc.tones,
      languages: doc.languages,
      includeEmoji: doc.includeEmoji,
      postCount: doc.postCount ?? POST_COUNT_DEFAULT,
      platforms: doc.platforms ?? ["linkedin"],
      hashtagCount: doc.hashtagCount ?? 3,
      status: doc.status,
      errorMessage: doc.errorMessage,
      guardrailIds: doc.guardrailIds ?? [],
      createdAt: doc.createdAt,
    }
  },

  async updateStatus(
    generationId: string,
    workspaceId: string,
    status: GenerationStatus,
    errorMessage?: string
  ) {
    return generationRepository.updateStatus(
      generationId,
      workspaceId,
      status,
      errorMessage
    )
  },

  // ─── AI Variant Generation ───────────────────────────────────

  async generateVariants(
    generation: GenerationData,
    guardrails: GuardrailData
  ): Promise<RawVariant[]> {
    const prompt = buildGenerationPrompt(generation, guardrails)
    const userPrompt = `${prompt.developer}\n\n${prompt.user}`

    try {
      logger.info(
        { topic: generation.topic },
        "Calling AI for variant generation"
      )

      const { text: raw, provider } = await callWithTaskFallback(
        "generate",
        {
          system: prompt.system,
          user: userPrompt,
          temperature: AI_TEMPERATURE.GENERATE,
          maxTokens: AI_MAX_TOKENS.GENERATE,
        },
        MAX_RETRIES_DEFAULT
      )

      const text = stripMarkdownFences(raw)

      const parsed = aiGenerationOutputSchema.safeParse(safeJsonParse(text))
      if (!parsed.success) {
        const errors = parsed.error.issues.map((i) => i.message).join(", ")
        throw new AIServiceError(
          ERROR_MESSAGES.AI_VALIDATION_FAILED.replace("%s", errors)
        )
      }

      const variants = parsed.data.variants.map((v) => ({
        ...v,
        language: resolveLanguage(v.language),
      }))

      logger.info(
        { count: variants.length, provider },
        "Variants generated successfully"
      )
      return variants
    } catch (error) {
      if (error instanceof AIServiceError) throw error
      logger.error({ err: error }, "AI generation failed")
      throw new AIServiceError(
        error instanceof Error
          ? error.message
          : ERROR_MESSAGES.GENERATION_FAILED
      )
    }
  },

  async getTotalPostCount(): Promise<number> {
    return generationRepository.countAll()
  },
}
