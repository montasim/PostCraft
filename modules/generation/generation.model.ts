import mongoose, { type Document, type Model, Schema } from "mongoose"
import type { GenerationStatus } from "./generation.schema"

export interface IGeneration extends Document {
  workspaceId: string
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
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

generationSchema.index({ workspaceId: 1, status: 1 })
generationSchema.index({ createdAt: -1 })

const GenerationModel: Model<IGeneration> =
  (mongoose.models.Trend as Model<IGeneration>) ||
  mongoose.model<IGeneration>("Trend", generationSchema)

export { GenerationModel }
