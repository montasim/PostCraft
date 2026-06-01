import { OpenRouter } from "@openrouter/sdk"
import { getEnv } from "@/core/config/env"

let client: OpenRouter | null = null

export function getOpenRouterClient(): OpenRouter | null {
  const { OPENROUTER_API_KEY } = getEnv()
  if (!OPENROUTER_API_KEY) return null

  if (!client) {
    client = new OpenRouter({ apiKey: OPENROUTER_API_KEY })
  }
  return client
}

export function getOpenRouterModel(): string {
  return getEnv().OPENROUTER_MODEL
}

export function hasOpenRouter(): boolean {
  return !!getEnv().OPENROUTER_API_KEY
}
