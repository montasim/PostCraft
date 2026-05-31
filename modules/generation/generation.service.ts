import { getGeminiClient, getDefaultModel } from "@/core/ai/gemini"
import { buildGenerationPrompt } from "./prompt-builder"
import { aiGenerationOutputSchema, resolveLanguage, type RawVariant } from "./generation.schema"
import { createGenerationSchema, type CreateGenerationInput, type GenerationStatus } from "./generation.schema"
import { generationRepository } from "./generation.repository"
import { inngest } from "@/core/queue/client"
import { AIServiceError, ValidationError } from "@/core/errors/app-error"
import { logger } from "@/core/logger"

const FALLBACK_MODELS = ["gemini-2.0-flash"]
const MAX_RETRIES = 3

interface GenerationData {
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
}

interface GuardrailData {
  toneRules: string[]
  formatRules: string[]
  bannedWords: string[]
}

function stripMarkdownFences(text: string): string {
  return text
    .replace(/^```(?:json)?\s*\n?/i, "")
    .replace(/\n?```\s*$/i, "")
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

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const generationService = {
  // ─── CRUD ─────────────────────────────────────────────────────

  async createGeneration(
    data: CreateGenerationInput,
    workspaceId: string,
    userId: string
  ) {
    const parsed = createGenerationSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }

    const doc = await generationRepository.create({
      ...parsed.data,
      languages: parsed.data.languages.map((l) => l.toLowerCase()),
      workspaceId,
      createdBy: userId,
      status: "queued",
    })

    const generationId = doc._id.toString()
    logger.info({ generationId }, "Generation created")

    // Enqueue to Inngest
    await inngest.send({
      name: "generation/created",
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
    return generationRepository.updateStatus(generationId, workspaceId, status, errorMessage)
  },

  // ─── AI Variant Generation ───────────────────────────────────

  async generateVariants(
    generation: GenerationData,
    guardrails: GuardrailData
  ): Promise<RawVariant[]> {
    const prompt = buildGenerationPrompt(generation, guardrails)
    const userPrompt = `${prompt.developer}\n\n${prompt.user}`

    const models = [getDefaultModel(), ...FALLBACK_MODELS.filter((m) => m !== getDefaultModel())]

    for (const modelName of models) {
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const client = getGeminiClient()
          const model = client.getGenerativeModel({
            model: modelName,
            systemInstruction: prompt.system,
            generationConfig: {
              temperature: 0.9,
              topP: 0.95,
              maxOutputTokens: 8192,
              responseMimeType: "application/json",
            },
          })

          logger.info({ topic: generation.topic, model: modelName, attempt }, "Calling Gemini for variant generation")

          const result = await model.generateContent(userPrompt)
          const raw = result.response.text()
          const text = stripMarkdownFences(raw)

          const parsed = aiGenerationOutputSchema.safeParse(safeJsonParse(text))
          if (!parsed.success) {
            const errors = parsed.error.issues.map((i) => i.message).join(", ")
            throw new AIServiceError(`AI output validation failed: ${errors}`)
          }

          const variants = parsed.data.variants.map((v) => ({
            ...v,
            language: resolveLanguage(v.language),
          }))

          logger.info({ count: variants.length, model: modelName }, "Variants generated successfully")
          return variants
        } catch (error) {
          const isRetryable = error instanceof Error && (
            error.message.includes("503") ||
            error.message.includes("429") ||
            error.message.includes("Unexpected end of JSON")
          )

          if (isRetryable && attempt < MAX_RETRIES) {
            const backoff = 1000 * Math.pow(2, attempt - 1)
            logger.warn({ model: modelName, attempt, retryIn: backoff }, "Gemini retryable error, retrying")
            await delay(backoff)
            continue
          }

          if (isRetryable && attempt === MAX_RETRIES) {
            logger.warn({ model: modelName }, "Gemini max retries, trying next model")
            break
          }

          if (error instanceof AIServiceError) throw error
          logger.error({ err: error, model: modelName }, "Gemini generation failed")
          throw new AIServiceError(
            error instanceof Error ? error.message : "Generation failed"
          )
        }
      }
    }

    throw new AIServiceError("All Gemini models unavailable. Please try again later.")
  },
}
