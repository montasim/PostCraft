import { buildJudgeSystemPrompt, buildJudgePrompt, type JudgePromptData } from "@/core/ai/prompts/judge"
import { callWithTaskFallback } from "@/core/ai/provider"
import { logger } from "@/core/logger"
import { z } from "zod"

const MAX_RETRIES = 2

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

  try {
    const { text: raw, provider } = await callWithTaskFallback(
      "score",
      {
        system: buildJudgeSystemPrompt(),
        user: userPrompt,
        temperature: 0.3,
        maxTokens: 1024,
      },
      MAX_RETRIES
    )

    const text = stripMarkdownFences(raw)
    const parsed = judgeOutputSchema.safeParse(JSON.parse(text))
    if (!parsed.success) {
      logger.warn({ errors: parsed.error.issues }, "Judge output validation failed")
      return { score: 50, reasoning: "Judge evaluation parsing failed" }
    }

    logger.info({ score: parsed.data.score, provider }, "Judge scored variant")
    return parsed.data
  } catch (error) {
    logger.error({ err: error }, "Judge scoring failed")
    return { score: 50, reasoning: "Judge evaluation unavailable" }
  }
}
