import { SettingsModel } from "./settings.model"
import type { UpdateSettingsInput } from "./settings.schema"

export const settingsRepository = {
  async findByUserId(userId: string) {
    return SettingsModel.findOne({ userId }).lean()
  },

  async upsert(userId: string, data: UpdateSettingsInput) {
    const update: Record<string, unknown> = {}
    if (data.notifications) update.notifications = data.notifications
    if (data.appearance) update.appearance = data.appearance
    if (data.account) update.account = data.account

    return SettingsModel.findOneAndUpdate(
      { userId },
      { $set: update },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    ).lean()
  },
}
