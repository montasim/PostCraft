import mongoose, { type Document, type Model } from "mongoose"

export interface IPersonaOption {
  value: string
  label: string
  description?: string
}

export interface ICustomHashtag {
  value: string
  label: string
  enabled: boolean
}

export interface IBrandPersona {
  targetAudiences: IPersonaOption[]
  preferredTones: IPersonaOption[]
  language: IPersonaOption[]
  topics: IPersonaOption[]
  industry: IPersonaOption[]
  platforms: IPersonaOption[]
  customHashtags: ICustomHashtag[]
}

export interface IWorkspace extends Document {
  workspaceId: string
  persona: IBrandPersona
  createdAt: Date
  updatedAt: Date
}

const personaOptionSchema = new mongoose.Schema<IPersonaOption>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String },
  },
  { _id: false }
)

const customHashtagSchema = new mongoose.Schema<ICustomHashtag>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    enabled: { type: Boolean, default: true },
  },
  { _id: false }
)

const brandPersonaSchema = new mongoose.Schema<IBrandPersona>(
  {
    targetAudiences: { type: [personaOptionSchema], default: [] },
    preferredTones: { type: [personaOptionSchema], default: [] },
    language: {
      type: [personaOptionSchema],
      default: [{ value: "EN", label: "English" }],
    },
    topics: { type: [personaOptionSchema], default: [] },
    industry: { type: [personaOptionSchema], default: [] },
    platforms: { type: [personaOptionSchema], default: [] },
    customHashtags: { type: [customHashtagSchema], default: [] },
  },
  { _id: false }
)

const workspaceSchema = new mongoose.Schema<IWorkspace>(
  {
    workspaceId: { type: String, required: true, unique: true, index: true },
    persona: { type: brandPersonaSchema, default: () => ({}) },
  },
  { timestamps: true }
)

// Delete stale model in dev to pick up schema changes without restart
if (process.env.NODE_ENV === "development" && mongoose.models.Workspace) {
  delete mongoose.models.Workspace
}

const WorkspaceModel: Model<IWorkspace> =
  (mongoose.models.Workspace as Model<IWorkspace>) ||
  mongoose.model<IWorkspace>("Workspace", workspaceSchema)

export { WorkspaceModel }
