import { PrefsModel } from "./prefs.model"
import type { GenerationPrefs } from "./prefs.schema"

export const prefsRepository = {
  async findByUserId(userId: string) {
    return PrefsModel.findOne({ userId }).lean()
  },

  async upsertGeneration(userId: string, data: GenerationPrefs) {
    return PrefsModel.findOneAndUpdate(
      { userId },
      { $set: { generation: data } },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    ).lean()
  },
}
