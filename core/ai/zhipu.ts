import OpenAI from "openai"
import { getEnv } from "@/core/config/env"

let client: OpenAI | null = null

export function getZhipuClient(): OpenAI | null {
  const { ZAI_API_KEY } = getEnv()
  if (!ZAI_API_KEY) return null

  if (!client) {
    const { ZAI_BASE_URL } = getEnv()
    client = new OpenAI({ apiKey: ZAI_API_KEY, baseURL: ZAI_BASE_URL })
  }
  return client
}

export function getZhipuModel(): string {
  return getEnv().ZAI_MODEL
}

export function hasZhipuAI(): boolean {
  return !!getEnv().ZAI_API_KEY
}
