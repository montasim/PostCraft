import mongoose, { type Document, type Model, Schema } from "mongoose"
import type { GenerationStatus } from "./generation.schema"
import {
  TOPIC_MAX_LENGTH,
  GENERATION_STATUSES,
  GENERATION_STATUS,
} from "@/lib/constants"

export interface IGeneration extends Document {
  workspaceId: string
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
  postCount: number
  platforms: string[]
  hashtagCount: number
  status: GenerationStatus
  errorMessage?: string
  guardrailIds?: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const generationSchema = new Schema<IGeneration>(
  {
    workspaceId: { type: String, required: true, index: true },
    topic: { type: String, required: true, maxlength: TOPIC_MAX_LENGTH },
    audiences: { type: [String], required: true },
    tones: { type: [String], required: true },
    languages: { type: [String], required: true },
    includeEmoji: { type: Boolean, default: true },
    postCount: { type: Number, default: 3 },
    platforms: { type: [String], default: ["linkedin"] },
    hashtagCount: { type: Number, default: 3 },
    status: {
      type: String,
      enum: GENERATION_STATUSES,
      default: GENERATION_STATUS.QUEUED,
    },
    errorMessage: { type: String },
    guardrailIds: { type: [String], default: [] },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
)

generationSchema.index({ workspaceId: 1, status: 1 })
generationSchema.index({ createdAt: -1 })

const GenerationModel: Model<IGeneration> =
  (mongoose.models.Trend as Model<IGeneration>) ||
  mongoose.model<IGeneration>("Trend", generationSchema)

export { GenerationModel }
