import { z } from "zod"

const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  GEMINI_API_KEY: z.string().min(1),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  QSTASH_TOKEN: z.string().optional(),
  QSTASH_CURRENT_SIGNING_KEY: z.string().optional(),
  QSTASH_NEXT_SIGNING_KEY: z.string().optional(),
  APP_URL: z.string().url().optional().default("http://localhost:3000"),
  DEFAULT_WORKSPACE_ID: z.string().default("ws_default"),
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

export function hasQStash(): boolean {
  const env = getEnv()
  return !!(env.QSTASH_TOKEN && env.QSTASH_CURRENT_SIGNING_KEY && env.QSTASH_NEXT_SIGNING_KEY)
}
