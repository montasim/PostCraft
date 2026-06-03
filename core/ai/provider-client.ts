// ─────────────────────────────────────────────────────────────
// FILE: core/ai/provider-client.ts  (v2 — key-aware)
//
// REST-based provider callers. No SDKs — raw fetch only.
// Each caller accepts an explicit apiKey from the switcher.
// ChatResponse includes keyIndex for traceability.
// ─────────────────────────────────────────────────────────────

import type { ProviderName } from "./models";
import { AiProviderError, AiErrorType, classifyError } from "./errors";
import { getEnv } from "@/core/config/env";

// ── Types ─────────────────────────────────────────────────────

export interface ChatRequest {
  system: string;
  user: string;
  /** 0.0–1.0. Default 0.7 */
  temperature?: number;
  /** Max output tokens. Default 2048 */
  maxTokens?: number;
}

export interface ChatResponse {
  text: string;
  provider: ProviderName;
  modelId: string;
  /** Which key index (account) was used — for tracing */
  keyIndex: number;
  /** Token usage if reported */
  usage?: { inputTokens: number; outputTokens: number };
}

// ── Shared OpenAI-compatible caller ───────────────────────────

async function callOpenAICompatible(
  baseUrl: string,
  apiKey: string,
  provider: ProviderName,
  modelId: string,
  keyIndex: number,
  req: ChatRequest,
  extraHeaders?: Record<string, string>,
): Promise<ChatResponse> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model: modelId,
      temperature: req.temperature ?? 0.7,
      max_tokens: req.maxTokens ?? 2048,
      messages: [
        { role: "system", content: req.system },
        { role: "user", content: req.user },
      ],
      response_format: { type: "json_object" },
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const errorType = classifyError(provider, res.status, body);
    const retryAfterHeader = res.headers.get("retry-after");
    throw new AiProviderError(
      errorType,
      provider,
      modelId,
      keyIndex,
      res.status,
      retryAfterHeader ? parseInt(retryAfterHeader, 10) * 1000 : undefined,
      JSON.stringify(body),
    );
  }

  const data = await res.json();
  const text: string = data.choices?.[0]?.message?.content ?? "";

  return {
    text,
    provider,
    modelId,
    keyIndex,
    usage: data.usage
      ? {
          inputTokens: data.usage.prompt_tokens ?? 0,
          outputTokens: data.usage.completion_tokens ?? 0,
        }
      : undefined,
  };
}

// ── Gemini REST caller ─────────────────────────────────────────

async function callGemini(
  apiKey: string,
  modelId: string,
  keyIndex: number,
  req: ChatRequest,
): Promise<ChatResponse> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: req.system }] },
      contents: [{ role: "user", parts: [{ text: req.user }] }],
      generationConfig: {
        temperature: req.temperature ?? 0.7,
        maxOutputTokens: req.maxTokens ?? 2048,
        responseMimeType: "application/json",
      },
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const errorType = classifyError("gemini", res.status, body);
    throw new AiProviderError(
      errorType,
      "gemini",
      modelId,
      keyIndex,
      res.status,
      undefined,
      JSON.stringify(body),
    );
  }

  const data = await res.json();
  const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  return {
    text,
    provider: "gemini",
    modelId,
    keyIndex,
    usage: data.usageMetadata
      ? {
          inputTokens: data.usageMetadata.promptTokenCount ?? 0,
          outputTokens: data.usageMetadata.candidatesTokenCount ?? 0,
        }
      : undefined,
  };
}

// ── Provider caller map ───────────────────────────────────────
//
// Each entry is a function: (apiKey, modelId, keyIndex, req) → ChatResponse
// The switcher picks the right key and passes it here.
//

type ProviderCallerFn = (
  apiKey: string,
  modelId: string,
  keyIndex: number,
  req: ChatRequest,
) => Promise<ChatResponse>;

export const PROVIDER_CALLERS: Record<ProviderName, ProviderCallerFn> = {
  groq: (apiKey, modelId, keyIndex, req) =>
    callOpenAICompatible(
      "https://api.groq.com/openai/v1",
      apiKey,
      "groq",
      modelId,
      keyIndex,
      req,
    ),

  gemini: (apiKey, modelId, keyIndex, req) =>
    callGemini(apiKey, modelId, keyIndex, req),

  openrouter: (apiKey, modelId, keyIndex, req) => {
    const env = getEnv();
    return callOpenAICompatible(
      "https://openrouter.ai/api/v1",
      apiKey,
      "openrouter",
      modelId,
      keyIndex,
      req,
      {
        // OpenRouter requires these for usage tracking
        "HTTP-Referer": env.APP_URL,
        "X-Title": env.OPENROUTER_SITE_NAME,
      },
    );
  },

  zhipu: (apiKey, modelId, keyIndex, req) =>
    callOpenAICompatible(
      "https://open.bigmodel.cn/api/paas/v4",
      apiKey,
      "zhipu",
      modelId,
      keyIndex,
      req,
    ),
};
