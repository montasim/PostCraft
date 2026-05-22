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
  if (hook.length > 0 && hook.length <= 150) score += 20
  if (hook.includes("?")) score += 15
  if (/\d+/.test(hook)) score += 10
  if (/^(unpopular opinion|i (just|haven't|recently)|last week|here's why)/i.test(hook)) score += 10
  return clamp(score)
}

function scoreCTAClarity(cta: string): number {
  let score = 0
  if (cta.includes("?")) score += 20
  if (/(share|comment|drop|tell me|what's your|how do you)/i.test(cta)) score += 20
  if (cta.length > 10 && cta.length <= 200) score += 10
  return clamp(score)
}

function scoreReadability(body: string): number {
  let score = 0
  const sentences = body.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const avgLength =
    sentences.length > 0
      ? sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).length, 0) /
        sentences.length
      : 0

  if (avgLength > 0 && avgLength <= 20) score += 25
  else if (avgLength <= 30) score += 15

  const hasRunOn = sentences.some((s) => s.trim().split(/\s+/).length > 40)
  if (!hasRunOn) score += 25

  const paragraphs = body.split(/\n\n+/).filter((p) => p.trim().length > 0)
  if (paragraphs.length >= 2 && paragraphs.length <= 5) score += 25

  if (/\d+%|\$|\d+x/.test(body)) score += 25

  return clamp(score)
}

function scoreFormatting(body: string, hook: string, hashtags: string[]): number {
  let score = 0

  if (body.includes("\n")) score += 20

  if (hashtags.length >= 2 && hashtags.length <= 5) score += 20

  const walls = body.split(/\n/).some((line) => line.length > 200)
  if (!walls) score += 20

  if (/^\d+[\.\)]|^- |^• /m.test(body)) score += 20

  if (hashtags.length > 0) score += 20

  return clamp(score)
}

function scoreBannedWords(
  fullPost: string,
  bannedWords: string[]
): number {
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

  const engagement = clamp(scoreHookStrength(variant.hook) + scoreCTAClarity(variant.cta) + bannedPenalty)
  const clarity = clamp(scoreReadability(variant.body) + bannedPenalty)
  const formatting = clamp(scoreFormatting(variant.body, variant.hook, variant.hashtags) + bannedPenalty)

  return { engagement, clarity, formatting }
}
