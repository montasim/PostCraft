import { getGeminiClient, getDefaultModel } from "./gemini"
import { getZhipuClient, getZhipuModel, hasZhipuAI } from "./zhipu"
import { getGroqClient, getGroqModel, hasGroq } from "./groq"
import {
  getOpenRouterClient,
  getOpenRouterModel,
  hasOpenRouter,
} from "./openrouter"
import {
  AI_CONFIG,
  AI_TASKS,
  TASK_PROVIDER_ORDER,
  MAX_RETRIES_DEFAULT,
  RETRYABLE_ERROR_PATTERNS,
  BACKOFF_BASE_MS,
  MILLISECONDS,
} from "@/lib/constants"
import { logger } from "@/core/logger"
import type { Schema } from "@google/generative-ai"

// ── Re-export new v2 system ────────────────────────────────────
// Callers can import from either the old or new API surface.
// The new system (callWithAutoSwitch) is preferred for all new code.

export { callWithAutoSwitch } from "./switcher"
export type { SwitcherOptions, SwitcherResult } from "./switcher"
export type { ChatRequest, ChatResponse } from "./provider-client"

// ── Legacy types (still used by existing callers) ──────────────

export interface AIModelCall {
  system: string
  user: string
  temperature: number
  maxTokens: number
  responseSchema?: Schema
}

export interface AIProvider {
  name: string
  call(params: AIModelCall): Promise<string>
}

const geminiProvider = (model: string): AIProvider => ({
  name: `gemini/${model}`,
  async call(params: AIModelCall): Promise<string> {
    const client = getGeminiClient()
    const config: Record<string, unknown> = {
      temperature: params.temperature,
      maxOutputTokens: params.maxTokens,
      responseMimeType: "application/json",
    }
    if (params.responseSchema) {
      config.responseSchema = params.responseSchema
    }
    const genModel = client.getGenerativeModel({
      model,
      systemInstruction: params.system,
      generationConfig: config,
    })
    const result = await genModel.generateContent(params.user)
    return result.response.text()
  },
})

const zhipuProvider = (model: string): AIProvider => ({
  name: `zhipu/${model}`,
  async call(params: AIModelCall): Promise<string> {
    const client = getZhipuClient()
    if (!client) throw new Error("ZhipuAI client not configured")

    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: params.system },
        { role: "user", content: params.user },
      ],
      temperature: params.temperature,
      max_tokens: params.maxTokens,
      response_format: { type: "json_object" },
    })
    return response.choices[0]?.message?.content ?? ""
  },
})

const groqProvider = (model: string): AIProvider => ({
  name: `groq/${model}`,
  async call(params: AIModelCall): Promise<string> {
    const client = getGroqClient()
    if (!client) throw new Error("Groq client not configured")

    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: params.system },
        { role: "user", content: params.user },
      ],
      temperature: params.temperature,
      max_tokens: params.maxTokens,
      response_format: { type: "json_object" },
    })
    return response.choices[0]?.message?.content ?? ""
  },
})

const openrouterProvider = (model: string): AIProvider => ({
  name: `openrouter/${model}`,
  async call(params: AIModelCall): Promise<string> {
    const client = getOpenRouterClient()
    if (!client) throw new Error("OpenRouter client not configured")

    const response = await client.chat.send({
      chatRequest: {
        model,
        messages: [
          { role: "system", content: params.system },
          { role: "user", content: params.user },
        ],
        temperature: params.temperature,
        maxTokens: params.maxTokens,
        responseFormat: { type: "json_object" },
      },
    })
    return response.choices[0]?.message?.content ?? ""
  },
})

export type AITask = "generate" | "score" | "shortlist"

export function getProviders(): AIProvider[] {
  const providers: AIProvider[] = [
    geminiProvider(getDefaultModel()),
    geminiProvider(AI_CONFIG.GEMINI_FALLBACK_MODEL),
  ]

  if (hasGroq()) {
    providers.unshift(groqProvider(getGroqModel()))
  }

  if (hasOpenRouter()) {
    // Primary model from env, then fallback chain of free models
    const primary = getOpenRouterModel()
    const seen = new Set<string>()
    if (primary) {
      providers.push(openrouterProvider(primary))
      seen.add(primary)
    }
    for (const model of AI_CONFIG.OPENROUTER_FREE_MODELS) {
      if (!seen.has(model)) {
        providers.push(openrouterProvider(model))
      }
    }
  }

  if (hasZhipuAI()) {
    providers.push(zhipuProvider(getZhipuModel()))
  }

  return providers
}

export function getProvidersForTask(task: AITask): AIProvider[] {
  const order = TASK_PROVIDER_ORDER[task]
  const available = getProviders()

  return order
    .map((prefix) => available.filter((p) => p.name.startsWith(prefix)))
    .flat()
}

export async function callWithFallback(
  params: AIModelCall,
  maxRetries = MAX_RETRIES_DEFAULT
): Promise<{ text: string; provider: string }> {
  const providers = getProviders()

  for (const provider of providers) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const text = await provider.call(params)
        return { text, provider: provider.name }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error"
        const isRetryable = RETRYABLE_ERROR_PATTERNS.some((pattern) =>
          msg.includes(pattern)
        )

        if (isRetryable && attempt < maxRetries) {
          const backoff = BACKOFF_BASE_MS * Math.pow(2, attempt - 1)
          logger.warn(
            { provider: provider.name, attempt, retryIn: backoff, err: msg },
            "AI call failed, retrying"
          )
          await new Promise((r) => setTimeout(r, backoff))
          continue
        }

        logger.warn(
          { provider: provider.name, err: msg },
          "AI provider failed, trying next"
        )
        break
      }
    }
  }

  throw new Error("All AI providers unavailable")
}

export async function callWithTaskFallback(
  task: AITask,
  params: AIModelCall,
  maxRetries = MAX_RETRIES_DEFAULT
): Promise<{ text: string; provider: string }> {
  const providers = getProvidersForTask(task)

  for (const provider of providers) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const text = await provider.call(params)
        return { text, provider: provider.name }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error"
        const isRetryable = RETRYABLE_ERROR_PATTERNS.some((pattern) =>
          msg.includes(pattern)
        )

        if (isRetryable && attempt < maxRetries) {
          const backoff = BACKOFF_BASE_MS * Math.pow(2, attempt - 1)
          logger.warn(
            {
              task,
              provider: provider.name,
              attempt,
              retryIn: backoff,
              err: msg,
            },
            "AI call failed, retrying"
          )
          await new Promise((r) => setTimeout(r, backoff))
          continue
        }

        logger.warn(
          { task, provider: provider.name, err: msg },
          "AI provider failed, trying next"
        )
        break
      }
    }
  }

  throw new Error(`All AI providers unavailable for task: ${task}`)
}
