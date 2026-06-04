// ─────────────────────────────────────────────────────────────
// FILE: core/ai/errors.ts  (v2 — keyIndex added to error)
// ─────────────────────────────────────────────────────────────

import type { ProviderName } from "./models"

export enum AiErrorType {
  /** 429 RPM — cooldown and retry same key */
  RATE_LIMITED = "RATE_LIMITED",
  /** 429 RPD / daily quota exhausted — skip this key for the day */
  QUOTA_EXHAUSTED = "QUOTA_EXHAUSTED",
  /** 5xx — try next key or model immediately */
  PROVIDER_ERROR = "PROVIDER_ERROR",
  /** 401/403 — invalid key, skip this key permanently */
  AUTH_ERROR = "AUTH_ERROR",
  /** Malformed / unparseable response */
  PARSE_ERROR = "PARSE_ERROR",
  /** Network timeout or fetch failure */
  NETWORK_ERROR = "NETWORK_ERROR",
  /** Every provider + model + key combination tried and failed */
  ALL_EXHAUSTED = "ALL_EXHAUSTED",
}

export class AiProviderError extends Error {
  constructor(
    public readonly type: AiErrorType,
    public readonly provider: ProviderName,
    public readonly modelId: string,
    /** Which API key index was in use when the error occurred */
    public readonly keyIndex: number,
    public readonly httpStatus?: number,
    public readonly retryAfterMs?: number,
    message?: string
  ) {
    super(message ?? `${type} on ${provider}/${modelId} [key#${keyIndex}]`)
    this.name = "AiProviderError"
  }
}

/**
 * Classify a raw HTTP status + body into our typed error enum.
 * Handles provider-specific quirks in error message format.
 */
export function classifyError(
  provider: ProviderName,
  status: number,
  body: unknown
): AiErrorType {
  if (status === 401 || status === 403) return AiErrorType.AUTH_ERROR

  if (status === 429) {
    const text = JSON.stringify(body ?? "").toLowerCase()

    // Gemini: "RESOURCE_EXHAUSTED", "quota exceeded", "daily limit"
    if (
      text.includes("resource_exhausted") ||
      text.includes("daily") ||
      text.includes("quota") ||
      text.includes("exhausted")
    ) {
      return AiErrorType.QUOTA_EXHAUSTED
    }

    // Groq: { error: { code: "rate_limit_exceeded", message: "... per day ..." } }
    if (text.includes("rate_limit_exceeded") && text.includes("day")) {
      return AiErrorType.QUOTA_EXHAUSTED
    }

    // OpenRouter: { error: { message: "Daily limit reached" } }
    if (text.includes("daily limit") || text.includes("daily_limit")) {
      return AiErrorType.QUOTA_EXHAUSTED
    }

    // Everything else is a per-minute rate limit
    return AiErrorType.RATE_LIMITED
  }

  if (status >= 500) return AiErrorType.PROVIDER_ERROR

  return AiErrorType.PROVIDER_ERROR
}
