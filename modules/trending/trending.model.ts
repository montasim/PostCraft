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
    timezone: string
  }
  status: "running" | "completed" | "failed"
  stage: string
  triggerMode: "manual" | "scheduled"
  metadata: {
    platformsScanned: string[]
    totalItemsFetched: number
    itemsShortlisted: number
    stepLatencies: {
      fetch?: number
      shortlist?: number
      generate?: number
    }
  }
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
    timezone: { type: String, default: "UTC" },
  },
  { _id: false }
)

const MetadataSchema = new Schema(
  {
    platformsScanned: [String],
    totalItemsFetched: { type: Number, default: 0 },
    itemsShortlisted: { type: Number, default: 0 },
    stepLatencies: {
      fetch: { type: Number },
      shortlist: { type: Number },
      generate: { type: Number },
    },
  },
  { _id: false }
)

const TrendingRunSchema = new Schema<ITrendingRunDoc>(
  {
    workspaceId: { type: String, required: true },
    configSnapshot: { type: ConfigSnapshotSchema, required: true },
    status: { type: String, enum: RUN_STATUSES, default: "running" },
    stage: { type: String, default: "initializing" },
    triggerMode: { type: String, enum: ["manual", "scheduled"], default: "manual" },
    metadata: { type: MetadataSchema, default: () => ({}) },
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

export interface ITrendingRawItemDoc extends Document {
  runId: string
  workspaceId: string
  platform: string
  author: string
  title: string
  url: string
  engagementScore: number
  status: "shortlisted" | "discarded"
  selectionReasoning?: string
  fetchedAt: Date
}

const TrendingRawItemSchema = new Schema<ITrendingRawItemDoc>(
  {
    runId: { type: String, required: true },
    workspaceId: { type: String, required: true },
    platform: { type: String, required: true },
    author: { type: String, default: "" },
    title: { type: String, required: true },
    url: { type: String, required: true },
    engagementScore: { type: Number, default: 0 },
    status: { type: String, enum: ["shortlisted", "discarded"], required: true },
    selectionReasoning: { type: String },
    fetchedAt: { type: Date, default: Date.now, expires: "14d" }, // 14 days TTL
  },
  { timestamps: true }
)

TrendingRawItemSchema.index({ runId: 1 })

export const TrendingRun: Model<ITrendingRunDoc> =
  (mongoose.models.TrendingRun as Model<ITrendingRunDoc>) ||
  mongoose.model<ITrendingRunDoc>("TrendingRun", TrendingRunSchema)

export const TrendingRawItem: Model<ITrendingRawItemDoc> =
  (mongoose.models.TrendingRawItem as Model<ITrendingRawItemDoc>) ||
  mongoose.model<ITrendingRawItemDoc>("TrendingRawItem", TrendingRawItemSchema)
