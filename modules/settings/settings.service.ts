import { settingsRepository } from "./settings.repository"
import {
  updateSettingsSchema,
  type UpdateSettingsInput,
} from "./settings.schema"
import { ValidationError } from "@/core/errors/app-error"
import type {
  NotificationSettings,
  AppearanceSettings,
  AccountSettings,
} from "@/types"
import { SESSION_TIMEOUT_DEFAULT } from "@/lib/constants"

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  emailGenerationComplete: true,
  emailTrendingComplete: false,
  emailWeeklyDigest: true,
  emailProductUpdates: false,
  pushPostReminder: true,
}

const DEFAULT_APPEARANCE: AppearanceSettings = {
  theme: "system",
}

const DEFAULT_ACCOUNT: AccountSettings = {
  twoFactorEnabled: false,
  sessionTimeout: SESSION_TIMEOUT_DEFAULT,
  dataExportFormat: "json",
}

export const settingsService = {
  async getSettings(userId: string) {
    const doc = await settingsRepository.findByUserId(userId)

    return {
      notifications: doc?.notifications ?? DEFAULT_NOTIFICATIONS,
      appearance: doc?.appearance ?? DEFAULT_APPEARANCE,
      account: doc?.account ?? DEFAULT_ACCOUNT,
    }
  },

  async updateSettings(userId: string, data: UpdateSettingsInput) {
    const parsed = updateSettingsSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }

    const updated = await settingsRepository.upsert(userId, parsed.data)

    return {
      notifications: updated.notifications,
      appearance: updated.appearance,
      account: updated.account,
    }
  },
}
