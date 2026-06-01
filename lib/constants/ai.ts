export const AI_TASKS = {
  GENERATE: "generate",
  SCORE: "score",
  SHORTLIST: "shortlist",
} as const

export type AITask = (typeof AI_TASKS)[keyof typeof AI_TASKS]

export const TASK_PROVIDER_ORDER: Record<string, string[]> = {
  [AI_TASKS.GENERATE]: ["groq", "openrouter", "gemini", "zhipu"],
  [AI_TASKS.SCORE]: ["groq", "gemini", "openrouter", "zhipu"],
  [AI_TASKS.SHORTLIST]: ["groq", "openrouter", "gemini", "zhipu"],
}

export const AI_TEMPERATURE = {
  GENERATE: 0.9,
  JUDGE: 0.3,
  SHORTLIST: 0.3,
  TRENDING: 0.8,
} as const

export const AI_MAX_TOKENS = {
  GENERATE: 8192,
  JUDGE: 1024,
  SHORTLIST: 1024,
  TRENDING: 256,
} as const

export const AI_CONFIG = {
  GEMINI_FALLBACK_MODEL: "gemini-2.0-flash",
  HN_QUERY_MIN_POINTS: 50,
  DEVTO_TOP_PERIOD: 7,
  GITHUB_USER_AGENT: "linkedIQ/1.0",
  REDDIT_USER_AGENT: "linkedIQ/1.0 (by /u/linkediq)",
  REDDIT_BASE_URL: "https://reddit.com",
} as const

export const LANGUAGE_TO_CODE: Record<string, string> = {
  english: "en",
  bangla: "bn",
  bengali: "bn",
  banglish: "en",
}

export const LANGUAGE_MAP: Record<string, string> = {
  en: "English",
  bn: "Bengali",
  banglish: "Banglish",
}
