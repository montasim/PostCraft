import mongoose, { type Document, type Model } from "mongoose"
import type { GenerationPrefs } from "./prefs.schema"

export interface IGenerationPrefsDoc {
  audiences: string[]
  tones: string[]
  languages: string[]
  emoji: boolean
}

export interface IPrefs extends Document {
  userId: string
  generation: IGenerationPrefsDoc
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

const prefsSchema = new mongoose.Schema<IPrefs>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    generation: { type: generationPrefsSubSchema, default: () => ({}) },
  },
  { timestamps: true }
)

const PrefsModel: Model<IPrefs> =
  (mongoose.models.Prefs as Model<IPrefs>) ||
  mongoose.model<IPrefs>("Prefs", prefsSchema)

export { PrefsModel }
