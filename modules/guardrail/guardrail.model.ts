import mongoose, { type Document, type Model } from "mongoose"
import type { GuardrailCategory } from "./guardrail.schema"
import { GUARDRAIL_CATEGORIES, GUARDRAIL_MAX_LENGTH } from "@/lib/constants"

export interface IGuardrail extends Document {
  workspaceId: string
  category: GuardrailCategory
  rule: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const guardrailSchema = new mongoose.Schema<IGuardrail>(
  {
    workspaceId: { type: String, required: true, index: true },
    category: {
      type: String,
      enum: GUARDRAIL_CATEGORIES,
      required: true,
    },
    rule: { type: String, required: true, maxlength: GUARDRAIL_MAX_LENGTH },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

guardrailSchema.index({ workspaceId: 1, category: 1 })

const GuardrailModel: Model<IGuardrail> =
  (mongoose.models.Guardrail as Model<IGuardrail>) ||
  mongoose.model<IGuardrail>("Guardrail", guardrailSchema)

export { GuardrailModel }
