import { GuardrailModel } from "./guardrail.model"
import type { GuardrailCategory } from "./guardrail.schema"
import { NotFoundError } from "@/core/errors/app-error"

export const guardrailRepository = {
  async findByWorkspace(workspaceId: string) {
    return GuardrailModel.find({ workspaceId, isActive: true })
      .sort({ category: 1, createdAt: 1 })
      .lean()
  },

  async findAllByWorkspace(workspaceId: string) {
    return GuardrailModel.find({ workspaceId })
      .sort({ category: 1, createdAt: 1 })
      .lean()
  },

  async findByCategory(workspaceId: string, category: GuardrailCategory) {
    return GuardrailModel.find({ workspaceId, category, isActive: true }).lean()
  },

  async create(data: Record<string, unknown>) {
    return GuardrailModel.create(data)
  },

  async createMany(items: Record<string, unknown>[]) {
    return GuardrailModel.insertMany(items)
  },

  async update(id: string, workspaceId: string, data: Record<string, unknown>) {
    const doc = await GuardrailModel.findOneAndUpdate(
      { _id: id, workspaceId },
      data,
      { returnDocument: "after" }
    )
    if (!doc) throw new NotFoundError("Guardrail")
    return doc
  },

  async delete(id: string, workspaceId: string): Promise<void> {
    const result = await GuardrailModel.deleteOne({ _id: id, workspaceId })
    if (result.deletedCount === 0) throw new NotFoundError("Guardrail")
  },

  async deleteByWorkspace(workspaceId: string): Promise<void> {
    await GuardrailModel.deleteMany({ workspaceId })
  },

  async exists(workspaceId: string): Promise<boolean> {
    const count = await GuardrailModel.countDocuments({ workspaceId })
    return count > 0
  },
}
