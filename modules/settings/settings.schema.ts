import { z } from "zod"

export const notificationSettingsSchema = z.object({
  emailGenerationComplete: z.boolean(),
  emailTrendingComplete: z.boolean(),
  emailWeeklyDigest: z.boolean(),
  emailProductUpdates: z.boolean(),
  pushPostReminder: z.boolean(),
})

export const appearanceSettingsSchema = z.object({
  theme: z.enum(["system", "dark", "light"]),
})

export const accountSettingsSchema = z.object({
  twoFactorEnabled: z.boolean(),
  sessionTimeout: z.number(),
  dataExportFormat: z.enum(["json", "csv"]),
})

export const updateSettingsSchema = z.object({
  notifications: notificationSettingsSchema.optional(),
  appearance: appearanceSettingsSchema.optional(),
  account: accountSettingsSchema.optional(),
})

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>
