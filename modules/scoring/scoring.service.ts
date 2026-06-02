import { calculateHeuristicScore } from "./heuristic-scorer"
import { scoreWithJudge } from "./judge-scorer"
import type { RawVariant } from "@/modules/generation"
import { getProviders } from "@/core/ai/provider"
import { logger } from "@/core/logger"
import {
  SCORE_WEIGHTS,
  BODY_MIN_LENGTH,
  BODY_MAX_LENGTH,
  HASHTAG_MIN,
  HASHTAG_MAX,
  MAX_SCORE,
} from "@/lib/constants"

interface ScoringInput extends RawVariant {
  audiences?: string[]
  topic?: string
}

interface ScoredVariantOutput {
  language: string
  styleType: string
  platform: string
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

  if (fullPost.length >= BODY_MIN_LENGTH && fullPost.length <= BODY_MAX_LENGTH)
    score += 33
  else if (fullPost.length >= 400) score += 16

  const sections = [variant.hook, variant.body, variant.cta, variant.hashtags]
  const present = sections.filter((s) =>
    Array.isArray(s) ? s.length > 0 : s.trim().length > 0
  ).length
  if (present === 4) score += 33
  else if (present === 3) score += 16

  if (
    variant.hashtags.length >= HASHTAG_MIN &&
    variant.hashtags.length <= HASHTAG_MAX
  )
    score += 34
  else if (variant.hashtags.length > 0) score += 17

  return Math.min(MAX_SCORE, score)
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
      const heuristicAvg =
        (heuristic.engagement + heuristic.clarity + heuristic.formatting) / 3

      const judge = await scoreWithJudge(variant, audiences, topic)

      const structure = scoreStructure(variant)

      const overallScore = Math.round(
        SCORE_WEIGHTS.heuristic * heuristicAvg +
          SCORE_WEIGHTS.judge * judge.score +
          SCORE_WEIGHTS.structure * structure
      )

      const fullPost = `${variant.hook}\n\n${variant.body}\n\n${variant.cta}\n\n${variant.hashtags.join(" ")}`

      results.push({
        language: variant.language,
        styleType: variant.styleType,
        platform: variant.platform,
        hook: variant.hook,
        body: variant.body,
        cta: variant.cta,
        hashtags: variant.hashtags,
        fullPost,
        engagementScore: heuristic.engagement,
        clarityScore: heuristic.clarity,
        formattingScore: heuristic.formatting,
        overallScore: Math.max(0, Math.min(MAX_SCORE, overallScore)),
        judgeReasoning: judge.reasoning,
        model: getProviders()[0]?.name ?? "unknown",
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
