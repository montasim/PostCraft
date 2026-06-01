import mongoose, { type Document, type Model } from "mongoose"
import type { GenerationPrefs, TrendingPrefs } from "./prefs.schema"

export interface IGenerationPrefsDoc {
  audiences: string[]
  tones: string[]
  languages: string[]
  emoji: boolean
}

export interface ITrendingPrefsDoc {
  enabled: boolean
  platforms: string[]
  topics: string[]
  industry: string[]
  targetAudience: string[]
  language: string[]
  postsPerPlatform: number
  topPostsForAI: number
  postsToGenerate: number
  scheduleType: "hourly" | "daily" | "weekly"
  scheduledTime: string
  scheduledDay: string | null
}

export interface IPrefs extends Document {
  userId: string
  generation: IGenerationPrefsDoc
  trending: ITrendingPrefsDoc
  createdAt: Date
  updatedAt: Date
}

const generationPrefsSubSchema = new mongoose.Schema<IGenerationPrefsDoc>(
  {
    audiences: { type: [String], default: () => ["Founders"] },
    tones: { type: [String], default: () => ["Thought leader", "Story"] },
    languages: { type: [String], default: () => ["EN"] },
    emoji: { type: Boolean, default: true },
  },
  { _id: false }
)

const trendingPrefsSubSchema = new mongoose.Schema<ITrendingPrefsDoc>(
  {
    enabled: { type: Boolean, default: false },
    platforms: { type: [String], default: [] },
    topics: { type: [String], default: [] },
    industry: { type: [String], default: [] },
    targetAudience: { type: [String], default: [] },
    language: { type: [String], default: [] },
    postsPerPlatform: { type: Number, default: 5 },
    topPostsForAI: { type: Number, default: 5 },
    postsToGenerate: { type: Number, default: 3 },
    scheduleType: { type: String, enum: ["hourly", "daily", "weekly"], default: "daily" },
    scheduledTime: { type: String, default: "09:00" },
    scheduledDay: { type: String, default: null },
  },
  { _id: false }
)

const prefsSchema = new mongoose.Schema<IPrefs>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    generation: { type: generationPrefsSubSchema, default: () => ({}) },
    trending: { type: trendingPrefsSubSchema, default: () => ({}) },
  },
  { timestamps: true }
)

const PrefsModel: Model<IPrefs> =
  (mongoose.models.Prefs as Model<IPrefs>) ||
  mongoose.model<IPrefs>("Prefs", prefsSchema)

export { PrefsModel }
