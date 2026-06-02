import { workspaceRepository } from "./workspace.repository"
import { insightsRepository } from "@/modules/insights/insights.repository"
import { guardrailRepository } from "@/modules/guardrail/guardrail.repository"
import { generationRepository } from "@/modules/generation/generation.repository"
import { variantRepository } from "@/modules/variant/variant.repository"
import { settingsRepository } from "@/modules/settings/settings.repository"
import {
  updateWorkspaceSchema,
  type UpdateWorkspaceInput,
} from "./workspace.schema"
import { ValidationError } from "@/core/errors/app-error"
import { PLAN_LIMIT, WORKSPACE_ID_PREFIX } from "@/lib/constants"
import type { BrandPersona } from "@/types"

const DEFAULT_PERSONA: BrandPersona = {
  targetAudiences: [],
  preferredTones: [],
  language: [{ value: "EN", label: "English" }],
  topics: [],
  industry: [],
  platforms: [],
}

export const workspaceService = {
  async getWorkspace(workspaceId: string) {
    const doc = await workspaceRepository.findByWorkspaceId(workspaceId)

    const rawPersona = doc?.persona ?? DEFAULT_PERSONA
    const persona: BrandPersona = {
      ...rawPersona,
      language: Array.isArray(rawPersona.language)
        ? rawPersona.language
        : DEFAULT_PERSONA.language,
      topics: Array.isArray(rawPersona.topics) ? rawPersona.topics : [],
      industry: Array.isArray(rawPersona.industry) ? rawPersona.industry : [],
      platforms: Array.isArray(rawPersona.platforms)
        ? rawPersona.platforms
        : [],
    }

    const overview = await insightsRepository.getOverview(workspaceId)

    return {
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
      persona: {
        ...rawPersona,
        language: Array.isArray(rawPersona.language)
          ? rawPersona.language
          : DEFAULT_PERSONA.language,
        topics: Array.isArray(rawPersona.topics) ? rawPersona.topics : [],
        industry: Array.isArray(rawPersona.industry) ? rawPersona.industry : [],
        platforms: Array.isArray(rawPersona.platforms)
          ? rawPersona.platforms
          : [],
      },
    }
  },

  async deleteWorkspaceCascade(workspaceId: string): Promise<void> {
    const generationDocs =
      await generationRepository.findGenerationIdsByWorkspace(workspaceId)
    const generationIds = generationDocs.map((d) => d._id)

    await Promise.all([
      workspaceRepository.deleteByWorkspaceId(workspaceId),
      guardrailRepository.deleteByWorkspace(workspaceId),
      generationRepository.deleteByWorkspace(workspaceId),
      variantRepository.deleteByTrendIds(generationIds),
      settingsRepository.deleteByUserId(
        workspaceId.replace(WORKSPACE_ID_PREFIX, "")
      ),
    ])
  },
}
