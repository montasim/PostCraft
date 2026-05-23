import { z } from "zod"

export const workspaceProfileSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(500),
  industry: z.string().max(100),
})

export const brandPersonaSchema = z.object({
  targetAudiences: z.array(z.string()),
  preferredTones: z.array(z.string()),
  language: z.array(z.string()),
})

export const updateWorkspaceSchema = z.object({
  profile: workspaceProfileSchema.optional(),
  persona: brandPersonaSchema.optional(),
})

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>
