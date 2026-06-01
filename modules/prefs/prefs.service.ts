import { prefsRepository } from "./prefs.repository"
import { generationPrefsSchema, trendingPrefsSchema, GENERATION_PREFS_DEFAULTS, TRENDING_PREFS_DEFAULTS, type GenerationPrefs, type TrendingPrefs } from "./prefs.schema"
import { ValidationError } from "@/core/errors/app-error"
import { inngest } from "@/core/queue/client"
import { WORKSPACE_ID_PREFIX } from "@/lib/constants"

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

  async getTrendingPrefs(userId: string): Promise<TrendingPrefs> {
    const doc = await prefsRepository.findByUserId(userId)
    return doc?.trending ?? { ...TRENDING_PREFS_DEFAULTS }
  },

  async saveTrendingPrefs(userId: string, data: unknown): Promise<TrendingPrefs> {
    const parsed = trendingPrefsSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }

    const updated = await prefsRepository.upsertTrending(userId, parsed.data)

    const eventName = parsed.data.enabled
      ? "trending/schedule-set"
      : "trending/schedule-cancel"

    await inngest.send({
      name: eventName,
      data: { userId, workspaceId: `${WORKSPACE_ID_PREFIX}${userId}` },
    })

    return updated.trending
  },
}
