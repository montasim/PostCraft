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
  FETCH_WORKSPACE: "Failed to fetch workspace",
  FETCH_PROFILE: "Failed to fetch profile",
  FETCH_TRENDING_PREFS: "Failed to fetch trending prefs",
  AUTH_REQUIRED: "Authentication required",
  INTERNAL_SERVER: "Internal server error",
  QUOTA_EXCEEDED: "Free plan quota exceeded. Upgrade to generate more posts.",
  AI_VALIDATION_FAILED: "AI output validation failed: %s",
  GENERATION_FAILED: "Generation failed",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_AUTHENTICATED: "Not authenticated",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
} as const

export const RETRYABLE_ERROR_PATTERNS = [
  "503",
  "429",
  "Unexpected end of JSON",
  "Overloaded",
  "load",
] as const
