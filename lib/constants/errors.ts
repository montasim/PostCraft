export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  AI_SERVICE_ERROR: "AI_SERVICE_ERROR",
  QUEUE_ERROR: "QUEUE_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const

export const ERROR_MESSAGES = {
  FETCH_WORKSPACE: "Could not load your workspace",
  FETCH_PROFILE: "Could not load your profile",
  FETCH_TRENDING_PREFS: "Could not load trending settings",
  AUTH_REQUIRED: "Sign in to continue",
  INTERNAL_SERVER: "Something went wrong on our end.",
  QUOTA_EXCEEDED: "Free plan quota exceeded. Upgrade to generate more posts.",
  AI_VALIDATION_FAILED: "AI output validation failed: %s",
  GENERATION_FAILED: "Generation failed",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_AUTHENTICATED: "Session expired. Sign in again.",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
  FETCH_PREVIEW: "Could not load platform preview settings",
  UPDATE_PREVIEW: "Could not update platform preview settings",
} as const

export const RETRYABLE_ERROR_PATTERNS = [
  "503",
  "429",
  "Unexpected end of JSON",
  "Overloaded",
  "load",
] as const
