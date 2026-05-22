import { getGeminiClient, getDefaultModel } from "@/core/ai/gemini"
import { SchemaType, type Schema } from "@google/generative-ai"
import { buildJudgeSystemPrompt, buildJudgePrompt, type JudgePromptData } from "@/core/ai/prompts/judge"
import { logger } from "@/core/logger"
import { z } from "zod"

const FALLBACK_MODELS = ["gemini-2.0-flash"]
const MAX_RETRIES = 2

const judgeResponseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    score: { type: SchemaType.NUMBER, description: "Engagement score 0-100" },
    reasoning: { type: SchemaType.STRING, description: "Brief reasoning for the score" },
  },
  required: ["score", "reasoning"],
}

const judgeOutputSchema = z.object({
  score: z.number().min(0).max(100),
  reasoning: z.string(),
})

interface JudgeResult {
  score: number
  reasoning: string
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

export async function scoreWithJudge(
  variant: { hook: string; body: string; cta: string; hashtags: string[] },
  audiences: string[],
  topic: string
): Promise<JudgeResult> {
  const data: JudgePromptData = {
    hook: variant.hook,
    body: variant.body,
    cta: variant.cta,
    hashtags: variant.hashtags,
    audiences,
    topic,
  }
  const userPrompt = buildJudgePrompt(data)
  const models = [getDefaultModel(), ...FALLBACK_MODELS.filter((m) => m !== getDefaultModel())]

  for (const modelName of models) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const client = getGeminiClient()
        const model = client.getGenerativeModel({
          model: modelName,
          systemInstruction: buildJudgeSystemPrompt(),
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
            responseMimeType: "application/json",
            responseSchema: judgeResponseSchema,
          },
        })

        const result = await model.generateContent(userPrompt)
        const raw = result.response.text()
        const text = stripMarkdownFences(raw)

        const parsed = judgeOutputSchema.safeParse(JSON.parse(text))
        if (!parsed.success) {
          logger.warn({ errors: parsed.error.issues }, "Judge output validation failed")
          return { score: 50, reasoning: "Judge evaluation parsing failed" }
        }

        return parsed.data
      } catch (error) {
        const is503 = error instanceof Error && error.message.includes("503")
        const isRetriable = is503 || error instanceof SyntaxError

        if (isRetriable && attempt < MAX_RETRIES) {
          const backoff = 1000 * Math.pow(2, attempt - 1)
          logger.warn({ model: modelName, attempt, retryIn: backoff, err: error instanceof Error ? error.message : error }, "Judge call failed, retrying")
          await delay(backoff)
          continue
        }

        if (isRetriable && attempt === MAX_RETRIES) {
          logger.warn({ model: modelName }, "Judge max retries, trying next model")
          break
        }

        logger.error({ err: error }, "Judge scoring failed")
        return { score: 50, reasoning: "Judge evaluation unavailable" }
      }
    }
  }

  logger.warn("All judge models unavailable, using fallback score")
  return { score: 50, reasoning: "Judge evaluation unavailable (all models 503)" }
}
