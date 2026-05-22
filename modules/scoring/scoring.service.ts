import { calculateHeuristicScore } from "./heuristic-scorer"
import { scoreWithJudge } from "./judge-scorer"
import { WEIGHTS } from "./scoring.schema"
import type { RawVariant } from "@/modules/generation"
import { DEFAULT_MODEL } from "@/core/ai/gemini"
import { logger } from "@/core/logger"

interface ScoringInput extends RawVariant {
  audiences?: string[]
  topic?: string
}

interface ScoredVariantOutput {
  language: string
  styleType: string
  hook: string
  body: string
  cta: string
  hashtags: string[]
  fullPost: string
  engagementScore: number
  clarityScore: number
  formattingScore: number
  overallScore: number
  judgeReasoning: string
  model: string
}

function scoreStructure(variant: ScoringInput): number {
  const fullPost = `${variant.hook}\n${variant.body}\n${variant.cta}\n${variant.hashtags.join(" ")}`
  let score = 0

  if (fullPost.length >= 600 && fullPost.length <= 1300) score += 33
  else if (fullPost.length >= 400) score += 16

  const sections = [variant.hook, variant.body, variant.cta, variant.hashtags]
  const present = sections.filter(
    (s) => (Array.isArray(s) ? s.length > 0 : s.trim().length > 0)
  ).length
  if (present === 4) score += 33
  else if (present === 3) score += 16

  if (variant.hashtags.length >= 2 && variant.hashtags.length <= 5) score += 34
  else if (variant.hashtags.length > 0) score += 17

  return Math.min(100, score)
}

export const scoringService = {
  async scoreAllVariants(
    variants: ScoringInput[],
    bannedWords: string[] = [],
    audiences: string[] = [],
    topic: string = ""
  ): Promise<ScoredVariantOutput[]> {
    const results: ScoredVariantOutput[] = []

    for (const variant of variants) {
      const heuristic = calculateHeuristicScore(variant, bannedWords)
      const heuristicAvg = (heuristic.engagement + heuristic.clarity + heuristic.formatting) / 3

      const judge = await scoreWithJudge(variant, audiences, topic)

      const structure = scoreStructure(variant)

      const overallScore = Math.round(
        WEIGHTS.heuristic * heuristicAvg +
        WEIGHTS.judge * judge.score +
        WEIGHTS.structure * structure
      )

      const fullPost = `${variant.hook}\n\n${variant.body}\n\n${variant.cta}\n\n${variant.hashtags.join(" ")}`

      results.push({
        language: variant.language,
        styleType: variant.styleType,
        hook: variant.hook,
        body: variant.body,
        cta: variant.cta,
        hashtags: variant.hashtags,
        fullPost,
        engagementScore: heuristic.engagement,
        clarityScore: heuristic.clarity,
        formattingScore: heuristic.formatting,
        overallScore: Math.max(0, Math.min(100, overallScore)),
        judgeReasoning: judge.reasoning,
        model: DEFAULT_MODEL,
      })

      logger.info(
        {
          style: variant.styleType,
          heuristic: Math.round(heuristicAvg),
          judge: judge.score,
          structure,
          final: overallScore,
        },
        "Variant scored"
      )
    }

    return results
  },
}
