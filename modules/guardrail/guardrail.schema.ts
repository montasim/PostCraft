import { z } from "zod"
import { GUARDRAIL_CATEGORIES, GUARDRAIL_MAX_LENGTH } from "@/lib/constants"

export const guardrailCategorySchema = z.enum(GUARDRAIL_CATEGORIES)

export type GuardrailCategory = z.infer<typeof guardrailCategorySchema>

export const createGuardrailSchema = z.object({
  category: guardrailCategorySchema,
  rule: z.string().min(1).max(GUARDRAIL_MAX_LENGTH),
  isActive: z.boolean().default(true),
})

export type CreateGuardrailInput = z.infer<typeof createGuardrailSchema>
