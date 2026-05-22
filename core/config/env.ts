import { z } from "zod"

const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  GEMINI_API_KEY: z.string().min(1),
  QSTASH_TOKEN: z.string().min(1),
  QSTASH_CURRENT_SIGNING_KEY: z.string().min(1),
  QSTASH_NEXT_SIGNING_KEY: z.string().min(1),
  APP_URL: z.string().url(),
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
