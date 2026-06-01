import { z } from "zod"
import {
  TOPIC_MAX_LENGTH,
  GENERATION_STATUSES,
  LANGUAGE_MAP,
} from "@/lib/constants"

// ─── Generation Input ─────────────────────────────────────────────

export const createGenerationSchema = z.object({
  topic: z.string().min(1).max(TOPIC_MAX_LENGTH),
  audiences: z.array(z.string()).min(1),
  tones: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
  includeEmoji: z.boolean().default(true),
})

export type CreateGenerationInput = z.infer<typeof createGenerationSchema>

export const generationStatusSchema = z.enum(GENERATION_STATUSES)

export type GenerationStatus = z.infer<typeof generationStatusSchema>

// ─── AI Output ────────────────────────────────────────────────────

export const rawVariantSchema = z.object({
  language: z.string(),
  styleType: z.string(),
  hook: z.string(),
  body: z.string(),
  cta: z.string(),
  hashtags: z.array(z.string()),
})

export const aiGenerationOutputSchema = z.object({
  variants: z.array(rawVariantSchema),
})

export type RawVariant = z.infer<typeof rawVariantSchema>

export function resolveLanguage(code: string): string {
  return LANGUAGE_MAP[code.toLowerCase()] ?? code
}
