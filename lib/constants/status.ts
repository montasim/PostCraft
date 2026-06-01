export const GENERATION_STATUS = {
  QUEUED: "queued",
  GENERATING: "generating",
  SCORING: "scoring",
  RANKING: "ranking",
  COMPLETED: "completed",
  FAILED: "failed",
} as const

export const GENERATION_STATUSES = [
  "queued",
  "generating",
  "scoring",
  "ranking",
  "completed",
  "failed",
] as const

export const RUN_STATUS = {
  RUNNING: "running",
  COMPLETED: "completed",
  FAILED: "failed",
} as const

export const RUN_STATUSES = ["running", "completed", "failed"] as const

export const DRAFT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  DISMISSED: "dismissed",
} as const

export const DRAFT_STATUSES = ["draft", "published", "dismissed"] as const

export const GUARDRAIL_CATEGORY = {
  TONE: "tone",
  FORMAT: "format",
  BANNED: "banned",
  CUSTOM: "custom",
} as const

export const GUARDRAIL_CATEGORIES = [
  "tone",
  "format",
  "banned",
  "custom",
] as const

export const THEME_OPTIONS = ["system", "dark", "light"] as const
export const EXPORT_FORMATS = ["json", "csv"] as const

export const GENERATION_EVENT = "generation/created"
export const TRENDING_EVENT = "trending/run-triggered"
