import mongoose, { Schema, Document } from "mongoose"

export interface IFacebookPost extends Document {
  userId: string
  text: string
  hashtags: string[]
  status: "published" | "scheduled" | "failed"
  scheduledTime?: Date
  postId?: string
  error?: string
  createdAt: Date
  updatedAt: Date
}

const FacebookPostSchema = new Schema<IFacebookPost>(
  {
    userId: { type: String, required: true, index: true },
    text: { type: String, required: true },
    hashtags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["published", "scheduled", "failed"],
      required: true,
    },
    scheduledTime: { type: Date },
    postId: { type: String },
    error: { type: String },
  },
  { timestamps: true }
)

export const FacebookPost =
  mongoose.models.FacebookPost ||
  mongoose.model<IFacebookPost>("FacebookPost", FacebookPostSchema)
