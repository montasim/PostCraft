import { GoogleGenerativeAI } from "@google/generative-ai"
import { getEnv } from "@/core/config/env"

let client: GoogleGenerativeAI | null = null

export function getGeminiClient(): GoogleGenerativeAI {
  if (!client) {
    const { GEMINI_API_KEY } = getEnv()
    client = new GoogleGenerativeAI(GEMINI_API_KEY)
  }
  return client
}

export function getDefaultModel(): string {
  return getEnv().GEMINI_MODEL
}
