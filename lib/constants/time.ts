export const MILLISECONDS = {
  SECOND: 1000,
  MINUTE: 60_000,
  HOUR: 3_600_000,
  DAY: 86_400_000,
  WEEK: 604_800_000,
} as const

export const SECONDS = {
  MINUTE: 60,
  HOUR: 3_600,
  DAY: 86_400,
  WEEK: 604_800,
} as const

export const SESSION = {
  EXPIRY_SECONDS: 604_800,
  UPDATE_AGE_SECONDS: 86_400,
  COOKIE_CACHE_MAX_AGE: 300,
} as const

export const AUTH_TOKEN = {
  RESET_PASSWORD_EXPIRY_SECONDS: 3_600,
  VERIFICATION_EXPIRY_SECONDS: 3_600,
} as const

export const OTP = {
  EXPIRY_MINUTES: 5,
  EXPIRY_SECONDS: 300,
  MIN_VALUE: 100_000,
  MAX_VALUE: 900_000,
  LENGTH: 6,
} as const

export const POLL_INTERVAL_MS = 2000
export const CLIPBOARD_RESET_DELAY_MS = 1500

export const CRON = {
  DAILY_6AM: "0 6 * * *",
} as const

export const SCHEDULE_DEFAULTS = {
  TIME: "09:00",
  TYPE: "daily" as const,
}

export const GITHUB_FRESH_DAYS = 7
