import mongoose, { Schema, Document } from "mongoose"

export interface ILinkedinPost extends Document {
  userId: string
  text: string
  hashtags: string[]
  status: "published" | "scheduled" | "failed"
  scheduledTime?: Date
  urn?: string
  error?: string
  createdAt: Date
  updatedAt: Date
}

const LinkedinPostSchema = new Schema<ILinkedinPost>(
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
    urn: { type: String },
    error: { type: String },
  },
  { timestamps: true }
)

export const LinkedinPost =
  mongoose.models.LinkedinPost ||
  mongoose.model<ILinkedinPost>("LinkedinPost", LinkedinPostSchema)
