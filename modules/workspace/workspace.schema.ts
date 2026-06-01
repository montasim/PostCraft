import { z } from "zod"

const personaOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  description: z.string().optional(),
})

export const workspaceProfileSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(500),
  industry: z.string().max(100),
})

export const brandPersonaSchema = z.object({
  targetAudiences: z.array(personaOptionSchema),
  preferredTones: z.array(personaOptionSchema),
  language: z.array(personaOptionSchema),
  topics: z.array(personaOptionSchema),
  industry: z.array(personaOptionSchema),
})

export const updateWorkspaceSchema = z.object({
  profile: workspaceProfileSchema.optional(),
  persona: brandPersonaSchema.optional(),
})

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>
