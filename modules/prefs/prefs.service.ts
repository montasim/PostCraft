import { prefsRepository } from "./prefs.repository"
import { generationPrefsSchema, GENERATION_PREFS_DEFAULTS, type GenerationPrefs } from "./prefs.schema"
import { ValidationError } from "@/core/errors/app-error"

export const prefsService = {
  async getGenerationPrefs(userId: string): Promise<GenerationPrefs> {
    const doc = await prefsRepository.findByUserId(userId)
    return doc?.generation ?? { ...GENERATION_PREFS_DEFAULTS }
  },

  async saveGenerationPrefs(userId: string, data: unknown): Promise<GenerationPrefs> {
    const parsed = generationPrefsSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }

    const updated = await prefsRepository.upsertGeneration(userId, parsed.data)
    return updated.generation
  },
}
