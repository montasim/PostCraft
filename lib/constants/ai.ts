export const AI_TASKS = {
  GENERATE: "generate",
  SCORE: "score",
  SHORTLIST: "shortlist",
} as const

export type AITask = (typeof AI_TASKS)[keyof typeof AI_TASKS]

export const TASK_PROVIDER_ORDER: Record<string, string[]> = {
  [AI_TASKS.GENERATE]: ["openrouter", "groq", "gemini", "zhipu"],
  [AI_TASKS.SCORE]: ["openrouter", "groq", "gemini", "zhipu"],
  [AI_TASKS.SHORTLIST]: ["openrouter", "groq", "gemini", "zhipu"],
}

export const AI_TEMPERATURE = {
  GENERATE: 0.9,
  JUDGE: 0.3,
  SHORTLIST: 0.3,
  TRENDING: 0.8,
} as const

export const AI_MAX_TOKENS = {
  GENERATE: 8192,
  JUDGE: 512,
  SHORTLIST: 1024,
  TRENDING: 256,
} as const

export const AI_CONFIG = {
  GEMINI_FALLBACK_MODEL: "gemini-2.0-flash",
  OPENROUTER_FREE_MODELS: [
    "google/gemma-4-31b-it:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "openai/gpt-oss-120b:free",
    "meta-llama/llama-3.3-70b-instruct:free",
  ] as const,
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
