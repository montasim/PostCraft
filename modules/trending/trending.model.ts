import mongoose, { Schema, type Document, type Model } from "mongoose"
import { RUN_STATUSES } from "@/lib/constants"

export interface ISourceItemDoc {
  source: string
  title: string
  url: string
  score: number
  rank: number
}

export interface ITrendingRunDoc extends Document {
  workspaceId: string
  configSnapshot: {
    platforms: string[]
    topics: string[]
    industry: string[]
    targetAudience: string[]
    language: string[]
    postsPerPlatform: number
    topPostsForAI: number
    postsToGenerate: number
    scheduleType: string
    scheduledTime: string
    scheduledDay: string | null
  }
  status: "running" | "completed" | "failed"
  ranAt: Date
  sourceItems: ISourceItemDoc[]
  generationIds: string[]
  dismissed: boolean
  error: string | null
  createdAt: Date
  updatedAt: Date
}

export const SourceItemSchema = new Schema<ISourceItemDoc>(
  { source: String, title: String, url: String, score: Number, rank: Number },
  { _id: false }
)

const ConfigSnapshotSchema = new Schema(
  {
    platforms: [String],
    topics: [String],
    industry: [String],
    targetAudience: [String],
    language: [String],
    postsPerPlatform: Number,
    topPostsForAI: Number,
    postsToGenerate: Number,
    scheduleType: String,
    scheduledTime: String,
    scheduledDay: { type: String, default: null },
  },
  { _id: false }
)

const TrendingRunSchema = new Schema<ITrendingRunDoc>(
  {
    workspaceId: { type: String, required: true },
    configSnapshot: { type: ConfigSnapshotSchema, required: true },
    status: { type: String, enum: RUN_STATUSES, default: "running" },
    ranAt: { type: Date, default: Date.now },
    sourceItems: { type: [SourceItemSchema], default: [] },
    generationIds: { type: [String], default: [] },
    dismissed: { type: Boolean, default: false },
    error: { type: String, default: null },
  },
  { timestamps: true }
)

TrendingRunSchema.index({ workspaceId: 1, ranAt: -1 })
TrendingRunSchema.index({ workspaceId: 1, dismissed: 1 })

export const TrendingRun: Model<ITrendingRunDoc> =
  (mongoose.models.TrendingRun as Model<ITrendingRunDoc>) ||
  mongoose.model<ITrendingRunDoc>("TrendingRun", TrendingRunSchema)
