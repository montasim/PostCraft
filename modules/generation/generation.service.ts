import { getGeminiClient, DEFAULT_MODEL } from "@/core/ai/gemini"
import { buildGenerationPrompt } from "./prompt-builder"
import { aiGenerationOutputSchema, resolveLanguage, type RawVariant } from "./generation.schema"
import { AIServiceError } from "@/core/errors/app-error"
import { logger } from "@/core/logger"

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

export const generationService = {
  async generateVariants(
    trend: TrendData,
    guardrails: GuardrailData
  ): Promise<RawVariant[]> {
    const prompt = buildGenerationPrompt(trend, guardrails)

    try {
      const client = getGeminiClient()
      const model = client.getGenerativeModel({
        model: DEFAULT_MODEL,
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
        },
      })

      const fullPrompt = `${prompt.system}\n\n${prompt.developer}\n\n${prompt.user}`

      logger.info({ topic: trend.topic }, "Calling Gemini for variant generation")

      const result = await model.generateContent(fullPrompt)
      const text = result.response.text()

      const parsed = aiGenerationOutputSchema.safeParse(JSON.parse(text))
      if (!parsed.success) {
        const errors = parsed.error.issues.map((i) => i.message).join(", ")
        throw new AIServiceError(`AI output validation failed: ${errors}`)
      }

      const variants = parsed.data.variants.map((v) => ({
        ...v,
        language: resolveLanguage(v.language),
      }))

      logger.info({ count: variants.length }, "Variants generated successfully")
      return variants
    } catch (error) {
      if (error instanceof AIServiceError) throw error
      logger.error({ err: error }, "Gemini generation failed")
      throw new AIServiceError(
        error instanceof Error ? error.message : "Generation failed"
      )
    }
  },
}
