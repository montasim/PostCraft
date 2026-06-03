// ─────────────────────────────────────────────────────────────
// FILE: core/ai/models.ts
//
// Central model registry. Each entry defines a model, its
// provider, rate limits, and quality tier. The switcher walks
// this array in order when looking for available models.
//
// rpd = -1 means no daily cap (unlimited requests per day).
// ─────────────────────────────────────────────────────────────

export type ProviderName = "groq" | "gemini" | "openrouter" | "zhipu";

export type QualityTier = "flagship" | "high" | "mid" | "low";

export interface ModelConfig {
  providerId: ProviderName;
  modelId: string;
  displayName: string;
  /** Requests per minute */
  rpm: number;
  /** Requests per day. -1 = unlimited */
  rpd: number;
  /** Context window in tokens */
  contextWindow: number;
  qualityTier: QualityTier;
}

/**
 * Model registry ordered by preference for general use.
 * The switcher tries models top-to-bottom, keys within each model.
 */
export const MODEL_REGISTRY: ModelConfig[] = [
  // ── Groq ────────────────────────────────────────────────
  {
    providerId: "groq",
    modelId: "llama-3.3-70b-versatile",
    displayName: "Llama 3.3 70B",
    rpm: 30,
    rpd: 1000,
    contextWindow: 128_000,
    qualityTier: "high",
  },
  {
    providerId: "groq",
    modelId: "llama-3.1-8b-instant",
    displayName: "Llama 3.1 8B",
    rpm: 30,
    rpd: 1000,
    contextWindow: 128_000,
    qualityTier: "mid",
  },
  {
    providerId: "groq",
    modelId: "gemma2-9b-it",
    displayName: "Gemma 2 9B",
    rpm: 30,
    rpd: 1000,
    contextWindow: 8_000,
    qualityTier: "mid",
  },
  {
    providerId: "groq",
    modelId: "mixtral-8x7b-32768",
    displayName: "Mixtral 8x7B",
    rpm: 30,
    rpd: 1000,
    contextWindow: 32_000,
    qualityTier: "mid",
  },

  // ── Gemini ──────────────────────────────────────────────
  {
    providerId: "gemini",
    modelId: "gemini-2.5-flash",
    displayName: "Gemini 2.5 Flash",
    rpm: 15,
    rpd: 1000,
    contextWindow: 1_000_000,
    qualityTier: "high",
  },
  {
    providerId: "gemini",
    modelId: "gemini-2.5-flash-lite",
    displayName: "Gemini 2.5 Flash Lite",
    rpm: 15,
    rpd: 1000,
    contextWindow: 1_000_000,
    qualityTier: "mid",
  },
  {
    providerId: "gemini",
    modelId: "gemini-2.5-pro",
    displayName: "Gemini 2.5 Pro",
    rpm: 5,
    rpd: 50,
    contextWindow: 1_000_000,
    qualityTier: "flagship",
  },

  // ── OpenRouter ──────────────────────────────────────────
  {
    providerId: "openrouter",
    modelId: "deepseek/deepseek-r1-0528:free",
    displayName: "DeepSeek R1",
    rpm: 20,
    rpd: 200,
    contextWindow: 128_000,
    qualityTier: "high",
  },
  {
    providerId: "openrouter",
    modelId: "google/gemma-4-31b-it:free",
    displayName: "Gemma 4 31B",
    rpm: 20,
    rpd: 200,
    contextWindow: 128_000,
    qualityTier: "mid",
  },
  {
    providerId: "openrouter",
    modelId: "meta-llama/llama-3.3-70b-instruct:free",
    displayName: "Llama 3.3 70B (OR)",
    rpm: 20,
    rpd: 200,
    contextWindow: 128_000,
    qualityTier: "mid",
  },
  {
    providerId: "openrouter",
    modelId: "nvidia/nemotron-3-super-120b-a12b:free",
    displayName: "Nemotron 3 Super 120B",
    rpm: 20,
    rpd: 200,
    contextWindow: 4_000,
    qualityTier: "mid",
  },

  // ── Zhipu ───────────────────────────────────────────────
  {
    providerId: "zhipu",
    modelId: "glm-4-flash",
    displayName: "GLM-4 Flash",
    rpm: 5,
    rpd: -1,
    contextWindow: 128_000,
    qualityTier: "mid",
  },
  {
    providerId: "zhipu",
    modelId: "glm-4.5-air",
    displayName: "GLM-4.5 Air",
    rpm: 5,
    rpd: -1,
    contextWindow: 128_000,
    qualityTier: "high",
  },
];
