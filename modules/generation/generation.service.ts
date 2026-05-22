import { getGeminiClient, getDefaultModel } from "@/core/ai/gemini"
import { buildGenerationPrompt } from "./prompt-builder"
import { aiGenerationOutputSchema, resolveLanguage, type RawVariant } from "./generation.schema"
import { AIServiceError } from "@/core/errors/app-error"
import { logger } from "@/core/logger"

const FALLBACK_MODELS = ["gemini-2.0-flash"]
const MAX_RETRIES = 3

interface TrendData {
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

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const generationService = {
  async generateVariants(
    trend: TrendData,
    guardrails: GuardrailData
  ): Promise<RawVariant[]> {
    const prompt = buildGenerationPrompt(trend, guardrails)
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
              maxOutputTokens: 4096,
              responseMimeType: "application/json",
            },
          })

          logger.info({ topic: trend.topic, model: modelName, attempt }, "Calling Gemini for variant generation")

          const result = await model.generateContent(userPrompt)
          const raw = result.response.text()
          const text = stripMarkdownFences(raw)

          const parsed = aiGenerationOutputSchema.safeParse(JSON.parse(text))
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
          const isRetryable = error instanceof Error && (error.message.includes("503") || error.message.includes("429"))

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
