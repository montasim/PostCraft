import { z } from "zod"

export const scoreComponentsSchema = z.object({
  engagement: z.number().min(0).max(100),
  clarity: z.number().min(0).max(100),
  formatting: z.number().min(0).max(100),
})

export type ScoreComponents = z.infer<typeof scoreComponentsSchema>

export const WEIGHTS = {
  heuristic: 0.4,
  judge: 0.4,
  structure: 0.2,
} as const
