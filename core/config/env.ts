import { z } from "zod"
import { EXTERNAL_API } from "@/lib/constants"

const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  GEMINI_API_KEY: z.string().min(1),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  ZAI_API_KEY: z.string().optional(),
  ZAI_BASE_URL: z.string().default(EXTERNAL_API.ZHIPU),
  ZAI_MODEL: z.string().default("glm-4.5-air"),

  // Groq
  GROQ_API_KEY: z.string().optional(),
  GROQ_MODEL: z.string().default("llama-3.3-70b-versatile"),

  // OpenRouter
  OPENROUTER_API_KEY: z.string().optional(),
  OPENROUTER_MODEL: z.string().default("deepseek/deepseek-v3:free"),
  OPENROUTER_SITE_URL: z.string().default(EXTERNAL_API.OPENROUTER_SITE),
  OPENROUTER_SITE_NAME: z.string().default("linkedIQ"),
  INNGEST_EVENT_KEY: z.string().optional(),
  INNGEST_SIGNING_KEY: z.string().optional(),
  APP_URL: z.string().optional().default(EXTERNAL_API.LOCALHOST),

  // Auth
  BETTER_AUTH_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default("noreply@linkedIQ.dev"),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
})

export type Env = z.infer<typeof envSchema>

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env)
  if (!result.success) {
    const errors = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join(", ")
    throw new Error(`Invalid environment variables: ${errors}`)
  }
  return result.data
}

let _env: Env | null = null

export function getEnv(): Env {
  if (!_env) _env = loadEnv()
  return _env
}

export function isDev(): boolean {
  return getEnv().NODE_ENV === "development"
}
