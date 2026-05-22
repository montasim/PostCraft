import type { ScoredVariant } from "@/modules/variant"

export const rankingService = {
  rankVariants(variants: ScoredVariant[]): ScoredVariant[] {
    const sorted = [...variants].sort((a, b) => b.overallScore - a.overallScore)

    return sorted.map((variant, index) => ({
      ...variant,
      overallRank: index + 1,
    }))
  },
}
