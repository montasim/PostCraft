import { variantRepository } from "./variant.repository"
import type { ScoredVariant } from "./variant.schema"

export const variantService = {
  async persistVariants(
    trendId: string,
    workspaceId: string,
    variants: ScoredVariant[]
  ) {
    const saved = await variantRepository.createMany(
      variants,
      trendId,
      workspaceId
    )
    return saved.map((v) => ({
      id: v._id.toString(),
      trendId: v.trendId.toString(),
      language: v.language,
      styleType: v.styleType,
      platform: v.platform,
      hook: v.hook,
      body: v.body,
      cta: v.cta,
      hashtags: v.hashtags,
      fullPost: v.fullPost,
      engagementScore: v.engagementScore,
      clarityScore: v.clarityScore,
      formattingScore: v.formattingScore,
      overallScore: v.overallScore,
      overallRank: v.overallRank,
      judgeReasoning: v.judgeReasoning,
      model: v.aiModel,
    }))
  },

  async getVariantsByTrend(trendId: string, workspaceId: string) {
    const variants = await variantRepository.findByTrendId(trendId, workspaceId)
    return variants.map((v) => ({
      id: v._id.toString(),
      rank: v.overallRank,
      style: v.styleType,
      language: v.language,
      platform: v.platform,
      score: v.overallScore,
      engagement: v.engagementScore,
      clarity: v.clarityScore,
      formatting: v.formattingScore,
      hook: v.hook,
      body: v.body,
      cta: v.cta,
      hashtags: v.hashtags,
      reasoning: v.judgeReasoning,
    }))
  },
}
