import { WorkspaceModel } from "./workspace.model"
import type { UpdateWorkspaceInput } from "./workspace.schema"

export const workspaceRepository = {
  async findByWorkspaceId(workspaceId: string) {
    return WorkspaceModel.findOne({ workspaceId }).lean()
  },

  async upsert(workspaceId: string, data: UpdateWorkspaceInput) {
    const update: Record<string, unknown> = {}
    if (data.profile) update.profile = data.profile
    if (data.persona) update.persona = data.persona

    return WorkspaceModel.findOneAndUpdate(
      { workspaceId },
      { $set: update },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    ).lean()
  },
}
