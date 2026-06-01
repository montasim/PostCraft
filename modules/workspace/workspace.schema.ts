import { z } from "zod"

const personaOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  description: z.string().optional(),
})

export const brandPersonaSchema = z.object({
  targetAudiences: z.array(personaOptionSchema),
  preferredTones: z.array(personaOptionSchema),
  language: z.array(personaOptionSchema),
  topics: z.array(personaOptionSchema),
  industry: z.array(personaOptionSchema),
})

export const updateWorkspaceSchema = z.object({
  persona: brandPersonaSchema.optional(),
})

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>
