// ─────────────────────────────────────────────────────────────
// FILE: core/ai/switcher.ts  (v2 — multi-key aware)
//
// TWO-LEVEL FALLBACK LOOP:
//
//   for each model in MODEL_REGISTRY:
//     for each api key registered for that provider:
//       1. Check quota state (provider, model, keyIndex)
//       2. Attempt the call with that key
//       3. Success        → record, return
//       4. RATE_LIMITED   → set cooldown on this key, try next key
//       5. QUOTA_EXHAUSTED→ mark this key exhausted, try next key
//       6. PROVIDER_ERROR → try next key
//       7. AUTH_ERROR     → mark this key dead (bad key), try next key
//     (all keys for model exhausted → move to next model)
//   (all models exhausted → throw ALL_EXHAUSTED)
// ─────────────────────────────────────────────────────────────

import { MODEL_REGISTRY, type ModelConfig, type ProviderName } from "./models"
import { AiErrorType, AiProviderError } from "./errors"
import { quotaTracker } from "./quota-tracker"
import { getKeysForProvider, hasKeys } from "./key-registry"
import {
  PROVIDER_CALLERS,
  type ChatRequest,
  type ChatResponse,
} from "./provider-client"
import { logger } from "@/core/logger"
import { getEnv } from "@/core/config/env"

// ── Types ─────────────────────────────────────────────────────

export interface SwitcherOptions {
  /** Override registry order for this call (e.g. prefer higher quality) */
  customRegistry?: ModelConfig[]
}

export interface SwitcherResult extends ChatResponse {
  /** Total (model, key) combinations tried before success */
  attemptCount: number
}

// ── Main switcher ─────────────────────────────────────────────

export async function callWithAutoSwitch(
  req: ChatRequest,
  opts: SwitcherOptions = {}
): Promise<SwitcherResult> {
  let registry = opts.customRegistry ?? MODEL_REGISTRY
  const { DEFAULT_AI_PROVIDER } = getEnv()

  if (DEFAULT_AI_PROVIDER) {
    registry = [
      ...registry.filter((m) => m.providerId === DEFAULT_AI_PROVIDER),
      ...registry.filter((m) => m.providerId !== DEFAULT_AI_PROVIDER),
    ]
  }

  // Track which keys have received permanent auth errors this session
  // key: "provider#keyIndex", value: true
  const deadKeys = new Set<string>()

  let attemptCount = 0

  for (const model of registry) {
    const { providerId, modelId } = model

    // Skip provider entirely if no keys configured
    if (!hasKeys(providerId)) {
      logger.debug(
        { provider: providerId, model: modelId },
        "No keys configured — skipping provider"
      )
      continue
    }

    const keys = getKeysForProvider(providerId)

    for (const keyEntry of keys) {
      const { keyIndex, label, value: apiKey } = keyEntry
      const deadKey = `${providerId}#${keyIndex}`

      // Skip permanently dead keys (bad auth)
      if (deadKeys.has(deadKey)) {
        logger.debug({ key: label }, "Key marked dead (auth error) — skipping")
        continue
      }

      // Check MongoDB quota state for this key
      const availability = await quotaTracker.isAvailable(
        providerId,
        modelId,
        keyIndex
      )
      if (!availability.available) {
        logger.debug(
          {
            key: label,
            model: modelId,
            reason: availability.reason,
            cooldownUntil: availability.cooldownUntil,
          },
          "Model unavailable for key"
        )
        continue
      }

      attemptCount++
      logger.info(
        { key: label, model: modelId, attempt: attemptCount },
        "Trying model"
      )

      try {
        const caller = PROVIDER_CALLERS[providerId]
        const response = await caller(apiKey, modelId, keyIndex, req)

        // Record successful request against this key's quota
        await quotaTracker.recordRequest(providerId, modelId, keyIndex)
        logger.info({ key: label, model: modelId }, "AI call success")

        return { ...response, attemptCount }
      } catch (err) {
        if (!(err instanceof AiProviderError)) {
          // Unknown / network error — log and try next key
          logger.warn(
            { key: label, model: modelId, err: String(err) },
            "Unknown error on model"
          )
          continue
        }

        switch (err.type) {
          case AiErrorType.RATE_LIMITED:
            logger.info(
              {
                key: label,
                model: modelId,
                retryAfterMs: err.retryAfterMs ?? 65_000,
              },
              "RPM hit — cooling down key"
            )
            await quotaTracker.setCooldown(
              providerId,
              modelId,
              keyIndex,
              err.retryAfterMs ?? 65_000
            )
            // Try next key for this model — it has its own RPM bucket
            continue

          case AiErrorType.QUOTA_EXHAUSTED:
            logger.info(
              { key: label, model: modelId },
              "Daily quota exhausted — marking key"
            )
            await quotaTracker.markExhausted(providerId, modelId, keyIndex)
            // Try next key — different account, fresh quota
            continue

          case AiErrorType.AUTH_ERROR:
            logger.warn(
              { key: label },
              "Auth error — key is invalid, marking dead"
            )
            deadKeys.add(deadKey)
            // Don't touch quota — it's a bad key, not a usage issue
            continue

          case AiErrorType.PROVIDER_ERROR:
          case AiErrorType.NETWORK_ERROR:
          case AiErrorType.PARSE_ERROR:
            logger.warn(
              { key: label, model: modelId, errType: err.type },
              "Provider/network error"
            )
            continue

          default:
            continue
        }
      }
    }
    // All keys for this model exhausted → outer loop moves to next model
  }

  throw new AiProviderError(
    AiErrorType.ALL_EXHAUSTED,
    "groq",
    "all",
    0,
    undefined,
    undefined,
    `All ${attemptCount} (model × key) combinations are exhausted or unavailable.`
  )
}
