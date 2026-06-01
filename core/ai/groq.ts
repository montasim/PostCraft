import OpenAI from "openai"
import { getEnv } from "@/core/config/env"
import { EXTERNAL_API } from "@/lib/constants"

let client: OpenAI | null = null

export function getGroqClient(): OpenAI | null {
  const { GROQ_API_KEY } = getEnv()
  if (!GROQ_API_KEY) return null

  if (!client) {
    client = new OpenAI({
      apiKey: GROQ_API_KEY,
      baseURL: EXTERNAL_API.GROQ,
    })
  }
  return client
}

export function getGroqModel(): string {
  return getEnv().GROQ_MODEL
}

export function hasGroq(): boolean {
  return !!getEnv().GROQ_API_KEY
}
