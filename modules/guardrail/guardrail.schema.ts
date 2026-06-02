import { z } from "zod"
import { GUARDRAIL_CATEGORIES, GUARDRAIL_MAX_LENGTH } from "@/lib/constants"
import { PROMPT_INJECTION_PATTERNS } from "@/lib/constants"

export const guardrailCategorySchema = z.enum(GUARDRAIL_CATEGORIES)

export type GuardrailCategory = z.infer<typeof guardrailCategorySchema>

export const createGuardrailSchema = z
  .object({
    category: guardrailCategorySchema,
    rule: z.string().min(1).max(GUARDRAIL_MAX_LENGTH),
    isActive: z.boolean().default(true),
  })
  .superRefine((val, ctx) => {
    if (PROMPT_INJECTION_PATTERNS.test(val.rule)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Rule contains prohibited patterns",
        path: ["rule"],
      })
    }
  })

export type CreateGuardrailInput = z.infer<typeof createGuardrailSchema>
