import { guardrailRepository } from "./guardrail.repository"
import { createGuardrailSchema, type CreateGuardrailInput } from "./guardrail.schema"
import { DEFAULT_GUARDRAILS } from "./guardrail.defaults"
import { ValidationError } from "@/core/errors/app-error"

function toGuardrailDTO(r: { _id: { toString(): string }; category: string; rule: string; isActive: boolean }) {
  return { id: r._id.toString(), category: r.category, rule: r.rule, isActive: r.isActive }
}

/** Auto-seed default guardrails on first access */
async function ensureDefaults(workspaceId: string) {
  const hasData = await guardrailRepository.exists(workspaceId)
  if (!hasData) {
    const docs = DEFAULT_GUARDRAILS.map((g) => ({ ...g, workspaceId, isActive: true }))
    await guardrailRepository.createMany(docs)
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

  async getGuardrailsByCategory(workspaceId: string, category: "tone" | "format" | "banned" | "custom") {
    return guardrailRepository.findByCategory(workspaceId, category)
  },

  async addGuardrule(data: CreateGuardrailInput, workspaceId: string) {
    const parsed = createGuardrailSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }
    const doc = await guardrailRepository.create({
      ...parsed.data,
      workspaceId,
    })
    return { id: doc._id.toString(), category: parsed.data.category, rule: parsed.data.rule, isActive: parsed.data.isActive }
  },

  async toggleGuardrail(id: string, workspaceId: string, isActive: boolean) {
    const doc = await guardrailRepository.update(id, workspaceId, { isActive })
    return { id: doc._id.toString(), isActive: doc.isActive }
  },

  async removeGuardrail(id: string, workspaceId: string) {
    await guardrailRepository.delete(id, workspaceId)
  },
}
