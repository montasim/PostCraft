import mongoose, { type Document, type Model } from "mongoose"

export interface IVariant extends Document {
  trendId: mongoose.Types.ObjectId
  workspaceId: string
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
  overallRank: number
  judgeReasoning: string
  aiModel: string
  createdAt: Date
}

const variantSchema = new mongoose.Schema<IVariant>(
  {
    trendId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    workspaceId: { type: String, required: true },
    language: { type: String, required: true },
    styleType: { type: String, required: true },
    hook: { type: String, required: true },
    body: { type: String, required: true },
    cta: { type: String, required: true },
    hashtags: { type: [String], required: true },
    fullPost: { type: String, required: true },
    engagementScore: { type: Number, required: true, min: 0, max: 100 },
    clarityScore: { type: Number, required: true, min: 0, max: 100 },
    formattingScore: { type: Number, required: true, min: 0, max: 100 },
    overallScore: { type: Number, required: true, min: 0, max: 100 },
    overallRank: { type: Number, required: true },
    judgeReasoning: { type: String, required: true },
    aiModel: { type: String, required: true },
  },
  { timestamps: true }
)

variantSchema.index({ workspaceId: 1, overallRank: 1 })

const VariantModel: Model<IVariant> =
  (mongoose.models.Variant as Model<IVariant>) ||
  mongoose.model<IVariant>("Variant", variantSchema)

export { VariantModel }
