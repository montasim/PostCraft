import { z } from "zod"

export const generationPrefsSchema = z.object({
  audiences: z.array(z.string().min(1)).min(1),
  tones: z.array(z.string().min(1)).min(1),
  languages: z.array(z.string().min(1)).min(1),
  emoji: z.boolean(),
})

export type GenerationPrefs = z.infer<typeof generationPrefsSchema>

export const GENERATION_PREFS_DEFAULTS: GenerationPrefs = {
  audiences: ["Founders"],
  tones: ["Thought leader", "Story"],
  languages: ["EN"],
  emoji: true,
}
