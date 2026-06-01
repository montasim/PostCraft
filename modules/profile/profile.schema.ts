import { z } from "zod"

export const updateProfileSchema = z.object({
  fullName: z.string().max(100).optional(),
  bio: z.string().max(2000).optional(),
  location: z.string().max(100).optional(),
  title: z.string().max(100).optional(),
  company: z.string().max(100).optional(),
  website: z.string().max(300).optional(),
  twitterHandle: z.string().max(50).optional(),
  linkedInSlug: z.string().max(100).optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
