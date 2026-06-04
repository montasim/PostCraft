import mongoose, { Document, Schema } from "mongoose"

export interface ITwitterPost extends Document {
  userId: string
  text: string
  hashtags?: string[]
  status: "draft" | "scheduled" | "published" | "failed"
  scheduledTime?: Date
  tweetId?: string
  error?: string
  createdAt: Date
  updatedAt: Date
}

const TwitterPostSchema = new Schema<ITwitterPost>(
  {
    userId: { type: String, required: true },
    text: { type: String, required: true },
    hashtags: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "scheduled", "published", "failed"],
      default: "draft",
    },
    scheduledTime: { type: Date },
    tweetId: { type: String },
    error: { type: String },
  },
  { timestamps: true }
)

export const TwitterPost =
  mongoose.models.TwitterPost ||
  mongoose.model<ITwitterPost>("TwitterPost", TwitterPostSchema)
