import { GenerationModel } from "./generation.model"
import type { GenerationStatus } from "./generation.schema"
import { NotFoundError } from "@/core/errors/app-error"

export const generationRepository = {
  async create(data: Record<string, unknown>) {
    return GenerationModel.create(data)
  },

  async findById(id: string, workspaceId: string) {
    const doc = await GenerationModel.findOne({ _id: id, workspaceId }).lean()
    if (!doc) throw new NotFoundError("Generation")
    return doc
  },

  async updateStatus(
    id: string,
    workspaceId: string,
    status: GenerationStatus,
    errorMessage?: string
  ) {
    const update: Record<string, unknown> = { status }
    if (errorMessage) update.errorMessage = errorMessage

    const doc = await GenerationModel.findOneAndUpdate(
      { _id: id, workspaceId },
      update,
      { returnDocument: "after" }
    ).lean()
    if (!doc) throw new NotFoundError("Generation")
    return doc
  },

  async updateGuardrailIds(
    id: string,
    workspaceId: string,
    guardrailIds: string[]
  ) {
    await GenerationModel.updateOne(
      { _id: id, workspaceId },
      { $set: { guardrailIds } }
    )
  },

  async findByIds(ids: string[]) {
    return GenerationModel.find({ _id: { $in: ids } }).lean()
  },

  async findGenerationIdsByWorkspace(workspaceId: string) {
    return GenerationModel.find({ workspaceId }).select("_id").lean()
  },

  async deleteByWorkspace(workspaceId: string): Promise<void> {
    await GenerationModel.deleteMany({ workspaceId })
  },

  async countAll(): Promise<number> {
    return GenerationModel.estimatedDocumentCount()
  },

  async listByWorkspace(
    workspaceId: string,
    { page = 1, limit = 10 }: { page?: number; limit?: number } = {}
  ) {
    const skip = (page - 1) * limit
    const [items, total] = await Promise.all([
      GenerationModel.find({ workspaceId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      GenerationModel.countDocuments({ workspaceId }),
    ])
    return { items, total, page, limit }
  },
}
