import { z } from "zod"

export const createTrendSchema = z.object({
  topic: z.string().min(1).max(500),
  audiences: z.array(z.string()).min(1),
  tones: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
  includeEmoji: z.boolean().default(true),
})

export type CreateTrendInput = z.infer<typeof createTrendSchema>

export const trendStatusSchema = z.enum([
  "queued",
  "generating",
  "scoring",
  "ranking",
  "completed",
  "failed",
])

export type TrendStatus = z.infer<typeof trendStatusSchema>
