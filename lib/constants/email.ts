import { THEME_COLORS } from "./colors"

export const EMAIL_BRAND = {
  NAME: "PostCraftt",
  LIGHT: THEME_COLORS.light,
  DARK: THEME_COLORS.dark,
  FONT: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  MAX_WIDTH: "600px",
} as const

export const EMAIL_SUBJECT = {
  VERIFY: "Verify your PostCraftt email",
  RESET_PASSWORD: "Reset your PostCraftt password",
  OTP: "Your PostCraftt verification code",
  PASSWORD_CHANGED: "Your PostCraftt password has been changed",
  TRENDING_COMPLETE: (count: number) =>
    `${count} trending posts ready — PostCraftt`,
} as const

export const EMAIL_BUTTON = {
  RESET_PASSWORD: "Reset Password",
  VERIFY_EMAIL: "Verify Email",
  VIEW_TRENDING: "View all trending posts",
} as const
