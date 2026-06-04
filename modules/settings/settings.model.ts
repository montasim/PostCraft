import mongoose, { type Document, type Model } from "mongoose"

export interface INotificationSettings {
  emailGenerationComplete: boolean
  emailTrendingComplete: boolean
  emailWeeklyDigest: boolean
  emailProductUpdates: boolean
  pushPostReminder: boolean
}

export interface IAppearanceSettings {
  theme: "system" | "dark" | "light"
}

export interface IAccountSettings {
  twoFactorEnabled: boolean
  sessionTimeout: number
  dataExportFormat: "json" | "csv"
}

export interface ISettings extends Document {
  userId: string
  notifications: INotificationSettings
  appearance: IAppearanceSettings
  account: IAccountSettings
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new mongoose.Schema<INotificationSettings>(
  {
    emailGenerationComplete: { type: Boolean, default: true },
    emailTrendingComplete: { type: Boolean, default: false },
    emailWeeklyDigest: { type: Boolean, default: true },
    emailProductUpdates: { type: Boolean, default: false },
    pushPostReminder: { type: Boolean, default: true },
  },
  { _id: false }
)

const appearanceSchema = new mongoose.Schema<IAppearanceSettings>(
  {
    theme: {
      type: String,
      enum: ["system", "dark", "light"],
      default: "system",
    },
  },
  { _id: false }
)

const accountSchema = new mongoose.Schema<IAccountSettings>(
  {
    twoFactorEnabled: { type: Boolean, default: false },
    sessionTimeout: { type: Number, default: 30 },
    dataExportFormat: { type: String, enum: ["json", "csv"], default: "json" },
  },
  { _id: false }
)

const settingsSchema = new mongoose.Schema<ISettings>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    notifications: { type: notificationSchema, default: () => ({}) },
    appearance: { type: appearanceSchema, default: () => ({}) },
    account: { type: accountSchema, default: () => ({}) },
  },
  { timestamps: true }
)

const SettingsModel: Model<ISettings> =
  (mongoose.models.Settings as Model<ISettings>) ||
  mongoose.model<ISettings>("Settings", settingsSchema)

export { SettingsModel }
