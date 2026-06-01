import {
  HAS_DIGITS,
  HOOK_PATTERNS,
  CTA_PATTERNS,
  SENTENCE_SPLIT,
  WORD_SPLIT,
  PARAGRAPH_SPLIT,
  DATA_PATTERNS,
  LIST_PATTERNS,
  LINE_SPLIT,
} from "@/lib/constants"
import {
  HOOK_MAX_LENGTH,
  CTA_MAX_LENGTH,
  SENTENCE_LENGTH_IDEAL,
  SENTENCE_LENGTH_ACCEPTABLE,
  RUN_ON_THRESHOLD,
  PARAGRAPH_MIN,
  PARAGRAPH_MAX,
  WALL_OF_TEXT_THRESHOLD,
  HASHTAG_MIN,
  HASHTAG_MAX,
} from "@/lib/constants"

interface HeuristicInput {
  hook: string
  body: string
  cta: string
  hashtags: string[]
}

interface HeuristicResult {
  engagement: number
  clarity: number
  formatting: number
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

function scoreHookStrength(hook: string): number {
  let score = 0
  if (hook.length > 0 && hook.length <= HOOK_MAX_LENGTH) score += 20
  if (hook.includes("?")) score += 15
  if (HAS_DIGITS.test(hook)) score += 10
  if (HOOK_PATTERNS.test(hook)) score += 10
  return clamp(score)
}

function scoreCTAClarity(cta: string): number {
  let score = 0
  if (cta.includes("?")) score += 20
  if (/(share|comment|drop|tell me|what's your|how do you)/i.test(cta))
    score += 20
  if (cta.length > 10 && cta.length <= 200) score += 10
  return clamp(score)
}

function scoreReadability(body: string): number {
  let score = 0
  const sentences = body
    .split(SENTENCE_SPLIT)
    .filter((s) => s.trim().length > 0)
  const avgLength =
    sentences.length > 0
      ? sentences.reduce(
          (sum, s) => sum + s.trim().split(WORD_SPLIT).length,
          0
        ) / sentences.length
      : 0

  if (avgLength > 0 && avgLength <= SENTENCE_LENGTH_IDEAL) score += 25
  else if (avgLength <= SENTENCE_LENGTH_ACCEPTABLE) score += 15

  const hasRunOn = sentences.some(
    (s) => s.trim().split(WORD_SPLIT).length > RUN_ON_THRESHOLD
  )
  if (!hasRunOn) score += 25

  const paragraphs = body
    .split(PARAGRAPH_SPLIT)
    .filter((p) => p.trim().length > 0)
  if (paragraphs.length >= PARAGRAPH_MIN && paragraphs.length <= PARAGRAPH_MAX)
    score += 25

  if (DATA_PATTERNS.test(body)) score += 25

  return clamp(score)
}

function scoreFormatting(
  body: string,
  hook: string,
  hashtags: string[]
): number {
  let score = 0

  if (body.includes("\n")) score += 20

  if (hashtags.length >= HASHTAG_MIN && hashtags.length <= HASHTAG_MAX)
    score += 20

  const walls = body
    .split(LINE_SPLIT)
    .some((line) => line.length > WALL_OF_TEXT_THRESHOLD)
  if (!walls) score += 20

  if (LIST_PATTERNS.test(body)) score += 20

  if (hashtags.length > 0) score += 20

  return clamp(score)
}

function scoreBannedWords(fullPost: string, bannedWords: string[]): number {
  const lower = fullPost.toLowerCase()
  const violations = bannedWords.filter((w) => lower.includes(w.toLowerCase()))
  return violations.length * -15
}

export function calculateHeuristicScore(
  variant: HeuristicInput,
  bannedWords: string[] = []
): HeuristicResult {
  const fullPost = `${variant.hook}\n${variant.body}\n${variant.cta}`
  const bannedPenalty = scoreBannedWords(fullPost, bannedWords)

  const engagement = clamp(
    scoreHookStrength(variant.hook) +
      scoreCTAClarity(variant.cta) +
      bannedPenalty
  )
  const clarity = clamp(scoreReadability(variant.body) + bannedPenalty)
  const formatting = clamp(
    scoreFormatting(variant.body, variant.hook, variant.hashtags) +
      bannedPenalty
  )

  return { engagement, clarity, formatting }
}
