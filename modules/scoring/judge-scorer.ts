import { buildJudgePrompt, type JudgePromptData } from "@/core/ai/prompts/judge"
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

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    // Try to extract JSON object from text
    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      try {
        return JSON.parse(match[0])
      } catch {
        // Try fixing unquoted property names
        const fixed = match[0].replace(/(\w+)\s*:/g, '"$1":')
        try {
          return JSON.parse(fixed)
        } catch {
          /* give up */
        }
      }
    }
    throw new SyntaxError("Failed to parse judge output")
  }
}

export async function scoreWithJudge(
  variant: {
    hook: string
    body: string
    cta: string
    hashtags: string[]
    platform?: string
  },
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
    platform: variant.platform ?? "linkedin",
  }
  const { system, user } = buildJudgePrompt(data)

  try {
    const { text: raw, provider } = await callWithTaskFallback(
      "score",
      {
        system,
        user,
        temperature: AI_TEMPERATURE.JUDGE,
        maxTokens: AI_MAX_TOKENS.JUDGE,
      },
      MAX_RETRIES_JUDGE
    )

    const text = stripMarkdownFences(raw)
    const parsed = judgeOutputSchema.safeParse(safeJsonParse(text))
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
