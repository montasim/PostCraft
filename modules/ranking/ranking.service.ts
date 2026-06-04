import type { ScoredVariant } from "@/modules/variant"

/** Guarantee at least one variant per platform in the top N positions */
function applyDiversityPass(
  ranked: ScoredVariant[],
  topN: number
): ScoredVariant[] {
  const seen = new Set<string>()
  const result: ScoredVariant[] = []
  const remainder: ScoredVariant[] = []

  for (const v of ranked) {
    if (!seen.has(v.platform) && result.length < topN) {
      seen.add(v.platform)
      result.push(v)
    } else {
      remainder.push(v)
    }
  }

  return [...result, ...remainder].map((v, i) => ({ ...v, overallRank: i + 1 }))
}

export const rankingService = {
  rankVariants(variants: ScoredVariant[]): ScoredVariant[] {
    const sorted = [...variants].sort((a, b) => b.overallScore - a.overallScore)

    const ranked = sorted.map((variant, index) => ({
      ...variant,
      overallRank: index + 1,
    }))

    // If multiple platforms present, apply diversity to top 3
    const platforms = new Set(ranked.map((v) => v.platform))
    if (platforms.size > 1) {
      return applyDiversityPass(ranked, 3)
    }

    return ranked
  },
}
