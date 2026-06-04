// ─────────────────────────────────────────────────────────────
// FILE: core/ai/key-registry.ts
//
// Manages multiple API keys per provider.
// Keys are loaded from env vars at startup and stored in memory —
// they never touch MongoDB (secrets don't belong in DB).
//
// ENV convention:
//   Single key:    GROQ_API_KEY=key1
//   Multiple keys: GROQ_API_KEY_1=key1
//                  GROQ_API_KEY_2=key2
//                  GROQ_API_KEY_3=key3
//   (Numbered variants take priority over bare name if both present)
// ─────────────────────────────────────────────────────────────

import type { ProviderName } from "./models"
import { logger } from "@/core/logger"

// ── Types ─────────────────────────────────────────────────────

/** One registered API key for a provider */
export interface ApiKeyEntry {
  provider: ProviderName
  /** 0-based index within this provider's key list */
  keyIndex: number
  /** The actual secret — never logged, never persisted to DB */
  value: string
  /** Human label for logs/dashboard: "groq#0", "gemini#2" */
  label: string
}

// ── Env var name conventions per provider ─────────────────────

const PROVIDER_ENV_PREFIXES: Record<ProviderName, string> = {
  groq: "GROQ_API_KEY",
  gemini: "GEMINI_API_KEY",
  openrouter: "OPENROUTER_API_KEY",
  zhipu: "ZAI_API_KEY",
}

// ── Loader ────────────────────────────────────────────────────

/**
 * Loads all API keys for all providers from environment variables.
 * Called once at module init. Result is memoized.
 *
 * Discovery order:
 *   1. PREFIX_1, PREFIX_2, ... PREFIX_10  (numbered, up to 10 per provider)
 *   2. PREFIX (bare name fallback if no numbered ones found)
 */
function loadKeysFromEnv(): Map<ProviderName, ApiKeyEntry[]> {
  const result = new Map<ProviderName, ApiKeyEntry[]>()

  for (const [provider, prefix] of Object.entries(PROVIDER_ENV_PREFIXES) as [
    ProviderName,
    string,
  ][]) {
    const keys: ApiKeyEntry[] = []

    // Try numbered: PREFIX_1 through PREFIX_10
    for (let i = 1; i <= 10; i++) {
      const val = process.env[`${prefix}_${i}`]?.trim()
      if (val) {
        keys.push({
          provider,
          keyIndex: keys.length,
          value: val,
          label: `${provider}#${keys.length}`,
        })
      }
    }

    // Fallback: bare PREFIX (single-key backwards compat)
    if (keys.length === 0) {
      const val = process.env[prefix]?.trim()
      if (val) {
        keys.push({
          provider,
          keyIndex: 0,
          value: val,
          label: `${provider}#0`,
        })
      }
    }

    if (keys.length > 0) {
      result.set(provider, keys)
    }
  }

  return result
}

// ── Module-level singleton ─────────────────────────────────────

let _registry: Map<ProviderName, ApiKeyEntry[]> | null = null

function getRegistry(): Map<ProviderName, ApiKeyEntry[]> {
  if (!_registry) {
    _registry = loadKeysFromEnv()
    // Log key counts at startup — never log key values
    for (const [provider, keys] of _registry.entries()) {
      logger.info({ provider, keyCount: keys.length }, "API keys loaded")
    }
  }
  return _registry
}

// ── Public API ─────────────────────────────────────────────────

/** All registered keys for a provider, in index order */
export function getKeysForProvider(provider: ProviderName): ApiKeyEntry[] {
  return getRegistry().get(provider) ?? []
}

/** Single key by provider + index. Throws if not found. */
export function getKey(provider: ProviderName, keyIndex: number): ApiKeyEntry {
  const keys = getKeysForProvider(provider)
  const key = keys[keyIndex]
  if (!key) {
    throw new Error(
      `No API key at index ${keyIndex} for provider "${provider}". ` +
        `Available: ${keys.length} key(s).`
    )
  }
  return key
}

/** Number of keys registered for a provider */
export function keyCount(provider: ProviderName): number {
  return getKeysForProvider(provider).length
}

/** True if at least one key exists for a provider */
export function hasKeys(provider: ProviderName): boolean {
  return keyCount(provider) > 0
}

/**
 * Key counts per provider — safe to expose in debug endpoints.
 * Contains counts only, never key values.
 */
export function getKeyCountSummary(): Record<ProviderName, number> {
  const reg = getRegistry()
  return {
    groq: reg.get("groq")?.length ?? 0,
    gemini: reg.get("gemini")?.length ?? 0,
    openrouter: reg.get("openrouter")?.length ?? 0,
    zhipu: reg.get("zhipu")?.length ?? 0,
  }
}
