import { guardrailRepository } from "./guardrail.repository"
import { createGuardrailSchema, type CreateGuardrailInput } from "./guardrail.schema"
import { ValidationError } from "@/core/errors/app-error"

export const guardrailService = {
  async getActiveGuardrails(workspaceId: string) {
    const rules = await guardrailRepository.findByWorkspace(workspaceId)
    return rules.map((r) => ({
      id: r._id.toString(),
      category: r.category,
      rule: r.rule,
      isActive: r.isActive,
    }))
  },

  async getAllGuardrails(workspaceId: string) {
    const rules = await guardrailRepository.findAllByWorkspace(workspaceId)
    return rules.map((r) => ({
      id: r._id.toString(),
      category: r.category,
      rule: r.rule,
      isActive: r.isActive,
    }))
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
