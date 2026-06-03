import { z } from "zod"

const personaOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  description: z.string().optional(),
})

const customHashtagSchema = z.object({
  value: z.string(),
  label: z.string(),
  enabled: z.boolean().default(true),
})

export const brandPersonaSchema = z.object({
  targetAudiences: z.array(personaOptionSchema),
  preferredTones: z.array(personaOptionSchema),
  language: z.array(personaOptionSchema),
  topics: z.array(personaOptionSchema),
  industry: z.array(personaOptionSchema),
  platforms: z.array(personaOptionSchema),
  customHashtags: z.array(customHashtagSchema).default([]),
})

export const updateWorkspaceSchema = z.object({
  persona: brandPersonaSchema.optional(),
})

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>
