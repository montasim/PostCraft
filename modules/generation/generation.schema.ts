import { z } from "zod"

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

export const LANGUAGE_MAP: Record<string, string> = {
  en: "English",
  bn: "Bengali",
  banglish: "Banglish",
}

export function resolveLanguage(code: string): string {
  return LANGUAGE_MAP[code.toLowerCase()] ?? code
}
