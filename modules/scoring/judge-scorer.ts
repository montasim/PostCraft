import { getGeminiClient, DEFAULT_MODEL } from "@/core/ai/gemini"
import { buildJudgeSystemPrompt, buildJudgePrompt, type JudgePromptData } from "@/core/ai/prompts/judge"
import { AIServiceError } from "@/core/errors/app-error"
import { logger } from "@/core/logger"
import { z } from "zod"

const judgeOutputSchema = z.object({
  score: z.number().min(0).max(100),
  reasoning: z.string(),
})

interface JudgeResult {
  score: number
  reasoning: string
}

export async function scoreWithJudge(
  variant: { hook: string; body: string; cta: string; hashtags: string[] },
  audiences: string[],
  topic: string
): Promise<JudgeResult> {
  try {
    const client = getGeminiClient()
    const model = client.getGenerativeModel({
      model: DEFAULT_MODEL,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 512,
        responseMimeType: "application/json",
      },
    })

    const data: JudgePromptData = {
      hook: variant.hook,
      body: variant.body,
      cta: variant.cta,
      hashtags: variant.hashtags,
      audiences,
      topic,
    }

    const prompt = `${buildJudgeSystemPrompt()}\n\n${buildJudgePrompt(data)}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    const parsed = judgeOutputSchema.safeParse(JSON.parse(text))
    if (!parsed.success) {
      logger.warn({ errors: parsed.error.issues }, "Judge output validation failed")
      return { score: 50, reasoning: "Judge evaluation parsing failed" }
    }

    return parsed.data
  } catch (error) {
    logger.error({ err: error }, "Judge scoring failed")
    return { score: 50, reasoning: "Judge evaluation unavailable" }
  }
}
