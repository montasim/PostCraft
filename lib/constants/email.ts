import { THEME_COLORS } from "./colors"

export const EMAIL_BRAND = {
  NAME: "PostCraft",
  LIGHT: THEME_COLORS.light,
  DARK: THEME_COLORS.dark,
  FONT: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  MAX_WIDTH: "600px",
} as const

export const EMAIL_SUBJECT = {
  VERIFY: "Verify your PostCraft email",
  RESET_PASSWORD: "Reset your PostCraft password",
  OTP: "Your PostCraft verification code",
  PASSWORD_CHANGED: "Your PostCraft password has been changed",
  TRENDING_COMPLETE: (count: number) =>
    `${count} trending posts ready — PostCraft`,
} as const

export const EMAIL_BUTTON = {
  RESET_PASSWORD: "Reset Password",
  VERIFY_EMAIL: "Verify Email",
  VIEW_TRENDING: "View all trending posts",
} as const
