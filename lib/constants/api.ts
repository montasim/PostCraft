export const API = {
  WORKSPACE: "/api/workspace",
  PROFILE: "/api/profile",
  STATS: "/api/stats",
  TRENDING: "/api/trending",
  TRENDING_PREFS: "/api/prefs/trending",
  TRENDING_RUN_NOW: "/api/trending/run-now",
  TRENDING_DISMISS_ALL: "/api/trending/dismiss-all",
  TRENDING_GLOBAL_TOPICS: "/api/trending/global-topics",
  LIBRARY: "/api/library",
  SETTINGS: "/api/settings",
  GENERATIONS: "/api/generations",
  BRAND_GUARD: "/api/brand-guard",
  INSIGHTS: "/api/insights",
  PREFS_GENERATION: "/api/prefs/generation",
  PREVIEW_PREFS: "/api/prefs/preview",
  AUTH_SEND_OTP: "/api/auth/send-otp",
  AUTH_VERIFY_OTP: "/api/auth/verify-otp-and-change",
  AUTH_RESET_PASSWORD: "/api/auth/request-password-reset",
  AUTH_VERIFY_EMAIL: "/api/auth/verify-email",
  AUTH_PREFIX: "/api/auth",
  INNGEST_PREFIX: "/api/inngest",
} as const

export const WORKSPACE_ID_PREFIX = "ws_"
export const APP_ID = "postcraft"

export const EXTERNAL_API = {
  GROQ: "https://api.groq.com/openai/v1",
  HN_SEARCH: "https://hn.algolia.com/api/v1/search",
  DEVTO_ARTICLES: "https://dev.to/api/articles",
  GITHUB_SEARCH: "https://api.github.com/search/repositories",
  REDDIT_HOT: "https://www.reddit.com/r",
  ZHIPU: "https://open.bigmodel.cn/api/paas/v4",
  OPENROUTER_SITE: "https://linkediq.onrender.com",
  LOCALHOST: "http://localhost:3000",
} as const

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const

export const CACHE_CONTROL = {
  SHORT: "public, s-maxage=3600, stale-while-revalidate=7200",
  MEDIUM: "public, s-maxage=7200, stale-while-revalidate=14400",
  LONG: "public, s-maxage=86400, stale-while-revalidate=43200",
} as const
