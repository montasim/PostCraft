import mongoose, { type Document, type Model } from "mongoose"

export interface IPersonaOption {
  value: string
  label: string
  description?: string
}

export interface IBrandPersona {
  targetAudiences: IPersonaOption[]
  preferredTones: IPersonaOption[]
  language: IPersonaOption[]
  topics: IPersonaOption[]
  industry: IPersonaOption[]
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

const brandPersonaSchema = new mongoose.Schema<IBrandPersona>(
  {
    targetAudiences: { type: [personaOptionSchema], default: [] },
    preferredTones: { type: [personaOptionSchema], default: [] },
    language: { type: [personaOptionSchema], default: [{ value: "EN", label: "English" }] },
    topics: { type: [personaOptionSchema], default: [] },
    industry: { type: [personaOptionSchema], default: [] },
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
