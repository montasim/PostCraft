import mongoose from "mongoose"
import { VariantModel } from "./variant.model"
import type { ScoredVariant } from "./variant.schema"

export const variantRepository = {
  async createMany(variants: ScoredVariant[], trendId: string, workspaceId: string) {
    const docs = variants.map((v) => ({
      ...v,
      trendId: new mongoose.Types.ObjectId(trendId),
      workspaceId,
      aiModel: v.model,
    }))
    return VariantModel.insertMany(docs)
  },

  async findByTrendId(trendId: string, workspaceId: string) {
    return VariantModel.find({ trendId, workspaceId }).sort({ overallRank: 1 })
  },

  async findTopByWorkspace(workspaceId: string, limit = 10) {
    return VariantModel.find({ workspaceId })
      .sort({ overallScore: -1 })
      .limit(limit)
  },

  async deleteByTrendId(trendId: string): Promise<void> {
    await VariantModel.deleteMany({ trendId })
  },
}
