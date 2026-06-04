import mongoose, { Schema, type Document, type Model } from "mongoose"
import { SourceItemSchema, type ISourceItemDoc } from "./trending.model"

export interface IGlobalTrendingTopicDoc extends Document {
  topics: ISourceItemDoc[]
  fetchedAt: Date
  status: "completed" | "failed"
  error: string | null
  createdAt: Date
  updatedAt: Date
}

const GlobalTrendingTopicSchema = new Schema<IGlobalTrendingTopicDoc>(
  {
    topics: { type: [SourceItemSchema], default: [] },
    fetchedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["completed", "failed"],
      default: "completed",
    },
    error: { type: String, default: null },
  },
  { timestamps: true }
)

// Auto-delete documents older than 7 days
GlobalTrendingTopicSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 7 * 24 * 60 * 60 }
)

export const GlobalTrendingTopic: Model<IGlobalTrendingTopicDoc> =
  (mongoose.models.GlobalTrendingTopic as Model<IGlobalTrendingTopicDoc>) ||
  mongoose.model<IGlobalTrendingTopicDoc>(
    "GlobalTrendingTopic",
    GlobalTrendingTopicSchema
  )
