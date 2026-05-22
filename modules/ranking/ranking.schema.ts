import { z } from "zod"

export const rankedVariantSchema = z.object({
  overallRank: z.number(),
  overallScore: z.number(),
})

export type RankedVariant = z.infer<typeof rankedVariantSchema>
