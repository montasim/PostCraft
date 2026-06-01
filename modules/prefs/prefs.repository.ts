import { PrefsModel } from "./prefs.model"
import type { GenerationPrefs, TrendingPrefs } from "./prefs.schema"

export const prefsRepository = {
  async findByUserId(userId: string) {
    return PrefsModel.findOne({ userId }).lean()
  },

  async findEnabledTrending() {
    return PrefsModel.find({ "trending.enabled": true }).lean()
  },

  async upsertGeneration(userId: string, data: GenerationPrefs) {
    return PrefsModel.findOneAndUpdate(
      { userId },
      { $set: { generation: data } },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    ).lean()
  },

  async upsertTrending(userId: string, data: TrendingPrefs) {
    return PrefsModel.findOneAndUpdate(
      { userId },
      { $set: { trending: data } },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    ).lean()
  },
}
