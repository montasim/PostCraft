import { TrendModel } from "./trend.model"
import type { TrendStatus } from "./trend.schema"
import { NotFoundError } from "@/core/errors/app-error"

export const trendRepository = {
  async create(data: Record<string, unknown>) {
    return TrendModel.create(data)
  },

  async findById(id: string, workspaceId: string) {
    const trend = await TrendModel.findOne({ _id: id, workspaceId }).lean()
    if (!trend) throw new NotFoundError("Trend")
    return trend
  },

  async updateStatus(
    id: string,
    workspaceId: string,
    status: TrendStatus,
    errorMessage?: string
  ) {
    const update: Record<string, unknown> = { status }
    if (errorMessage) update.errorMessage = errorMessage

    const trend = await TrendModel.findOneAndUpdate(
      { _id: id, workspaceId },
      update,
      { new: true }
    ).lean()
    if (!trend) throw new NotFoundError("Trend")
    return trend
  },

  async listByWorkspace(
    workspaceId: string,
    { page = 1, limit = 10 }: { page?: number; limit?: number } = {}
  ) {
    const skip = (page - 1) * limit
    const [items, total] = await Promise.all([
      TrendModel.find({ workspaceId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      TrendModel.countDocuments({ workspaceId }),
    ])
    return { items, total, page, limit }
  },
}
