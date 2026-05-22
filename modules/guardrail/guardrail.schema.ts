import { z } from "zod"

export const guardrailCategorySchema = z.enum(["tone", "format", "banned", "custom"])

export type GuardrailCategory = z.infer<typeof guardrailCategorySchema>

export const createGuardrailSchema = z.object({
  category: guardrailCategorySchema,
  rule: z.string().min(1).max(200),
  isActive: z.boolean().default(true),
})

export type CreateGuardrailInput = z.infer<typeof createGuardrailSchema>
