import mongoose, { type Document, type Model, Schema } from "mongoose"
import type { TrendStatus } from "./trend.schema"

export interface ITrend extends Document {
  workspaceId: string
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
  status: TrendStatus
  errorMessage?: string
  guardrailIds?: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const trendSchema = new Schema<ITrend>(
  {
    workspaceId: { type: String, required: true, index: true },
    topic: { type: String, required: true, maxlength: 500 },
    audiences: { type: [String], required: true },
    tones: { type: [String], required: true },
    languages: { type: [String], required: true },
    includeEmoji: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["queued", "generating", "scoring", "ranking", "completed", "failed"],
      default: "queued",
    },
    errorMessage: { type: String },
    guardrailIds: { type: [String], default: [] },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
)

trendSchema.index({ workspaceId: 1, status: 1 })
trendSchema.index({ createdAt: -1 })

const TrendModel: Model<ITrend> =
  (mongoose.models.Trend as Model<ITrend>) ||
  mongoose.model<ITrend>("Trend", trendSchema)

export { TrendModel }
