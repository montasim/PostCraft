export const EMAIL_BRAND = {
  NAME: "LinkedIQ",
  PRIMARY_HEX: "#7C3AED",
  PRIMARY_LIGHT_HEX: "#EDE9FE",
  TEXT_HEX: "#111827",
  MUTED_HEX: "#6B7280",
  BORDER_HEX: "#E5E7EB",
  BG_HEX: "#FFFFFF",
  SURFACE_HEX: "#F9FAFB",
  SUCCESS_HEX: "#10B981",
  FONT: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  MAX_WIDTH: "600px",
} as const

export const EMAIL_SUBJECT = {
  VERIFY: "Verify your LinkedIQ email",
  RESET_PASSWORD: "Reset your LinkedIQ password",
  OTP: "Your LinkedIQ verification code",
  TRENDING_COMPLETE: (count: number) =>
    `${count} trending posts ready — LinkedIQ`,
} as const

export const EMAIL_BUTTON = {
  RESET_PASSWORD: "Reset Password",
  VERIFY_EMAIL: "Verify Email",
  VIEW_TRENDING: "View all trending posts",
} as const
