import {
  buildGenerationPrompt,
  type GenerationPromptData,
} from "@/core/ai/prompts/generate"
import {
  ACTIVE_TONE_RULES_MAX,
  ACTIVE_FORMAT_RULES_MAX,
  ACTIVE_CUSTOM_RULES_MAX,
  ACTIVE_BANNED_WORDS_MAX,
} from "@/lib/constants"

interface GenerationData {
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
  postCount: number
  platforms: string[]
  hashtagCount: number
}

interface GuardrailData {
  toneRules: string[]
  formatRules: string[]
  bannedWords: string[]
  customRules: string[]
}

export function buildPromptPayload(
  generation: GenerationData,
  guardrails: GuardrailData
) {
  const data: GenerationPromptData = {
    topic: generation.topic,
    audiences: generation.audiences,
    tones: generation.tones,
    languages: generation.languages,
    includeEmoji: generation.includeEmoji,
    postCount: generation.postCount,
    platforms: generation.platforms,
    hashtagCount: generation.hashtagCount,
    toneRules: guardrails.toneRules.slice(0, ACTIVE_TONE_RULES_MAX),
    formatRules: guardrails.formatRules.slice(0, ACTIVE_FORMAT_RULES_MAX),
    bannedWords: guardrails.bannedWords.slice(0, ACTIVE_BANNED_WORDS_MAX),
    customRules: guardrails.customRules.slice(0, ACTIVE_CUSTOM_RULES_MAX),
  }

  return buildGenerationPrompt(data)
}
