import {
  buildJudgeSystemPrompt,
  buildJudgePrompt,
  type JudgePromptData,
} from "@/core/ai/prompts/judge"
import { callWithTaskFallback } from "@/core/ai/provider"
import { logger } from "@/core/logger"
import { z } from "zod"
import { MARKDOWN_FENCE_OPEN, MARKDOWN_FENCE_CLOSE } from "@/lib/constants"
import {
  MAX_RETRIES_JUDGE,
  AI_TEMPERATURE,
  AI_MAX_TOKENS,
} from "@/lib/constants"

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
    .replace(MARKDOWN_FENCE_OPEN, "")
    .replace(MARKDOWN_FENCE_CLOSE, "")
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
        temperature: AI_TEMPERATURE.JUDGE,
        maxTokens: AI_MAX_TOKENS.JUDGE,
      },
      MAX_RETRIES_JUDGE
    )

    const text = stripMarkdownFences(raw)
    const parsed = judgeOutputSchema.safeParse(JSON.parse(text))
    if (!parsed.success) {
      logger.warn(
        { errors: parsed.error.issues },
        "Judge output validation failed"
      )
      return { score: 50, reasoning: "Judge evaluation parsing failed" }
    }

    logger.info({ score: parsed.data.score, provider }, "Judge scored variant")
    return parsed.data
  } catch (error) {
    logger.error({ err: error }, "Judge scoring failed")
    return { score: 50, reasoning: "Judge evaluation unavailable" }
  }
}
