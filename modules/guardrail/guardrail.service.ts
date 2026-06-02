import { guardrailRepository } from "./guardrail.repository"
import {
  createGuardrailSchema,
  type CreateGuardrailInput,
  type GuardrailCategory,
} from "./guardrail.schema"
import { DEFAULT_GUARDRAILS } from "./guardrail.defaults"
import {
  ValidationError,
  NotFoundError,
  GuardrailLimitExceededError,
} from "@/core/errors/app-error"
import {
  ACTIVE_TONE_RULES_MAX,
  ACTIVE_FORMAT_RULES_MAX,
  ACTIVE_CUSTOM_RULES_MAX,
  ACTIVE_BANNED_WORDS_MAX,
} from "@/lib/constants"

const CATEGORY_LIMITS: Record<GuardrailCategory, number> = {
  tone: ACTIVE_TONE_RULES_MAX,
  format: ACTIVE_FORMAT_RULES_MAX,
  banned: ACTIVE_BANNED_WORDS_MAX,
  custom: ACTIVE_CUSTOM_RULES_MAX,
}

function toGuardrailDTO(r: {
  _id: { toString(): string }
  category: string
  rule: string
  isActive: boolean
}) {
  return {
    id: r._id.toString(),
    category: r.category,
    rule: r.rule,
    isActive: r.isActive,
  }
}

/** Auto-seed default guardrails on first access — only first N per category active */
async function ensureDefaults(workspaceId: string) {
  const hasData = await guardrailRepository.exists(workspaceId)
  if (!hasData) {
    const activeCount: Record<string, number> = {}
    const docs = DEFAULT_GUARDRAILS.map((g) => {
      const count = activeCount[g.category] ?? 0
      const limit = CATEGORY_LIMITS[g.category as GuardrailCategory] ?? Infinity
      const isActive = count < limit
      activeCount[g.category] = count + 1
      return { ...g, workspaceId, isActive }
    })
    await guardrailRepository.createMany(docs)
  }
}

async function checkCategoryLimit(
  category: GuardrailCategory,
  workspaceId: string
) {
  const limit = CATEGORY_LIMITS[category]
  if (!limit) return
  const activeCount = await guardrailRepository.countActiveByCategory(
    workspaceId,
    category
  )
  if (activeCount >= limit) {
    throw new GuardrailLimitExceededError(category, limit)
  }
}

export const guardrailService = {
  async getActiveGuardrails(workspaceId: string) {
    await ensureDefaults(workspaceId)
    const rules = await guardrailRepository.findByWorkspace(workspaceId)
    return rules.map(toGuardrailDTO)
  },

  async getAllGuardrails(workspaceId: string) {
    await ensureDefaults(workspaceId)
    const rules = await guardrailRepository.findAllByWorkspace(workspaceId)
    return rules.map(toGuardrailDTO)
  },

  async getGuardrailsByCategory(
    workspaceId: string,
    category: GuardrailCategory
  ) {
    return guardrailRepository.findByCategory(workspaceId, category)
  },

  async addGuardrule(data: CreateGuardrailInput, workspaceId: string) {
    const parsed = createGuardrailSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }
    if (parsed.data.isActive) {
      await checkCategoryLimit(parsed.data.category, workspaceId)
    }
    const doc = await guardrailRepository.create({
      ...parsed.data,
      workspaceId,
    })
    return {
      id: doc._id.toString(),
      category: parsed.data.category,
      rule: parsed.data.rule,
      isActive: parsed.data.isActive,
    }
  },

  async toggleGuardrail(id: string, workspaceId: string, isActive: boolean) {
    const current = await guardrailRepository.findAllByWorkspace(workspaceId)
    const target = current.find((g) => g._id.toString() === id)
    if (!target) throw new NotFoundError("Guardrail")
    if (isActive && !target.isActive) {
      await checkCategoryLimit(
        target.category as GuardrailCategory,
        workspaceId
      )
    }
    const doc = await guardrailRepository.update(id, workspaceId, { isActive })
    return { id: doc._id.toString(), isActive: doc.isActive }
  },

  async removeGuardrail(id: string, workspaceId: string) {
    await guardrailRepository.delete(id, workspaceId)
  },
}
