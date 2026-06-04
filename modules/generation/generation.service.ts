import { buildPromptPayload } from "./prompt-builder"
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
import {
  MARKDOWN_FENCE_OPEN,
  MARKDOWN_FENCE_CLOSE,
  PROMPT_INJECTION_PATTERNS,
  PROFANITY_PATTERNS,
  HATE_SPEECH_PATTERNS,
  PARAGRAPH_SPLIT,
} from "@/lib/constants"

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
  customRules: string[]
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

// ─── Variant Repair ──────────────────────────────────────────

/**
 * Attempt to fill empty hook/body/cta by splitting content from
 * neighboring fields. LinkedIn posts are paragraph-structured, so
 * PARAGRAPH_SPLIT (\n\n) is the natural boundary.
 */
function repairVariant(v: RawVariant): RawVariant {
  const hook = v.hook?.trim() ?? ""
  const body = v.body?.trim() ?? ""
  const cta = v.cta?.trim() ?? ""

  // All present — nothing to repair
  if (hook && body && cta) return v

  const repaired = { ...v, hook, body, cta }

  // hook empty → split first paragraph from body
  if (!repaired.hook && repaired.body) {
    const parts = repaired.body.split(PARAGRAPH_SPLIT)
    if (parts.length > 1) {
      repaired.hook = parts[0]
      repaired.body = parts.slice(1).join("\n\n")
    } else {
      // Single paragraph — split by first sentence end
      const idx = repaired.body.search(/[.!?]\s/)
      if (idx > 0) {
        repaired.hook = repaired.body.slice(0, idx + 1)
        repaired.body = repaired.body.slice(idx + 1).trim()
      }
    }
  }

  // cta empty → split last paragraph from body
  if (!repaired.cta && repaired.body) {
    const parts = repaired.body.split(PARAGRAPH_SPLIT)
    if (parts.length > 1) {
      repaired.cta = parts[parts.length - 1]
      repaired.body = parts.slice(0, -1).join("\n\n")
    } else {
      // Single paragraph — split by last sentence end
      const idx = repaired.body.lastIndexOf(".")
      if (idx > 0 && idx < repaired.body.length - 1) {
        repaired.cta = repaired.body.slice(idx + 1).trim()
        repaired.body = repaired.body.slice(0, idx + 1)
      }
    }
  }

  // body empty but hook + cta exist → combine as body
  if (!repaired.body && repaired.hook && repaired.cta) {
    repaired.body = `${repaired.hook}\n\n${repaired.cta}`
  }

  return repaired
}

export const generationService = {
  // ─── CRUD ─────────────────────────────────────────────────────

  async createGeneration(
    data: CreateGenerationInput,
    workspaceId: string,
    userId: string
  ) {
    if (PROMPT_INJECTION_PATTERNS.test(data.topic)) {
      throw new ValidationError("Topic contains prohibited patterns")
    }

    const dailyUsage = await insightsRepository.getDailyUsage(workspaceId)
    const totalGenerated = dailyUsage.totalPostsGenerated
    const requestedPosts = data.postCount ?? POST_COUNT_DEFAULT
    if (totalGenerated + requestedPosts > PLAN_LIMIT) {
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
    const prompt = buildPromptPayload(generation, guardrails)

    try {
      logger.info(
        { topic: generation.topic },
        "Calling AI for variant generation"
      )

      const { text: raw, provider } = await callWithTaskFallback(
        "generate",
        {
          system: prompt.system,
          user: prompt.user,
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

      const repaired = variants.map((v) => {
        const before = {
          hook: v.hook?.trim(),
          body: v.body?.trim(),
          cta: v.cta?.trim(),
        }
        const r = repairVariant(v)
        const after = {
          hook: r.hook?.trim(),
          body: r.body?.trim(),
          cta: r.cta?.trim(),
        }
        if (!before.hook || !before.body || !before.cta) {
          logger.info({ style: v.styleType, before, after }, "Variant repaired")
        }
        return r
      })

      const filtered = repaired.filter((v) => {
        if (!v.hook?.trim() || !v.body?.trim() || !v.cta?.trim()) {
          logger.warn(
            { style: v.styleType },
            "Variant discarded: missing required field"
          )
          return false
        }
        const fullPost = `${v.hook} ${v.body} ${v.cta} ${v.hashtags?.join(" ") ?? ""}`
        if (PROFANITY_PATTERNS.test(fullPost)) {
          logger.warn({ style: v.styleType }, "Variant discarded: profanity")
          return false
        }
        if (HATE_SPEECH_PATTERNS.test(fullPost)) {
          logger.warn({ style: v.styleType }, "Variant discarded: hate speech")
          return false
        }
        return true
      })

      if (filtered.length === 0) {
        throw new AIServiceError("All variants failed content safety checks")
      }

      logger.info(
        { total: variants.length, kept: filtered.length, provider },
        "Variants filtered"
      )
      return filtered
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
