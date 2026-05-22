import { z } from "zod"

export const variantOutputSchema = z.object({
  variants: z.array(
    z.object({
      language: z.string(),
      styleType: z.string(),
      hook: z.string(),
      body: z.string(),
      cta: z.string(),
      hashtags: z.array(z.string()),
    })
  ),
})

export type VariantOutput = z.infer<typeof variantOutputSchema>

export const scoredVariantSchema = z.object({
  language: z.string(),
  styleType: z.string(),
  hook: z.string(),
  body: z.string(),
  cta: z.string(),
  hashtags: z.array(z.string()),
  fullPost: z.string(),
  engagementScore: z.number().min(0).max(100),
  clarityScore: z.number().min(0).max(100),
  formattingScore: z.number().min(0).max(100),
  overallScore: z.number().min(0).max(100),
  overallRank: z.number().optional(),
  judgeReasoning: z.string(),
  model: z.string(),
})

export type ScoredVariant = z.infer<typeof scoredVariantSchema>
