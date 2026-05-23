import { workspaceRepository } from "./workspace.repository"
import { analyticsRepository } from "@/modules/analytics/analytics.repository"
import { updateWorkspaceSchema, type UpdateWorkspaceInput } from "./workspace.schema"
import { ValidationError } from "@/core/errors/app-error"
import { PLAN_LIMIT } from "@/lib/constants"
import type { WorkspaceProfile, BrandPersona } from "@/types"

const DEFAULT_PROFILE: WorkspaceProfile = {
  name: "",
  description: "",
  industry: "",
}

const DEFAULT_PERSONA: BrandPersona = {
  targetAudiences: [],
  preferredTones: [],
  language: ["EN"],
}

export const workspaceService = {
  async getWorkspace(workspaceId: string) {
    const doc = await workspaceRepository.findByWorkspaceId(workspaceId)

    const profile: WorkspaceProfile = doc?.profile ?? DEFAULT_PROFILE
    const rawPersona = doc?.persona ?? DEFAULT_PERSONA
    const persona: BrandPersona = {
      ...rawPersona,
      language: Array.isArray(rawPersona.language) ? rawPersona.language : [rawPersona.language],
    }

    const overview = await analyticsRepository.getOverview(workspaceId)

    return {
      profile,
      persona,
      usage: {
        used: overview.totalPosts,
        limit: PLAN_LIMIT,
        totalGenerated: overview.totalPosts,
      },
    }
  },

  async updateWorkspace(workspaceId: string, data: UpdateWorkspaceInput) {
    const parsed = updateWorkspaceSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }

    const updated = await workspaceRepository.upsert(workspaceId, parsed.data)

    const rawPersona = updated.persona
    return {
      profile: updated.profile,
      persona: {
        ...rawPersona,
        language: Array.isArray(rawPersona.language) ? rawPersona.language : [rawPersona.language],
      },
    }
  },
}
