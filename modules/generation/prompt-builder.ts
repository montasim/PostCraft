import {
  buildSystemPrompt,
  buildDeveloperPrompt,
  buildUserPrompt,
  type GenerationPromptData,
} from "@/core/ai/prompts/generate"

interface TrendData {
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
}

interface GuardrailData {
  toneRules: string[]
  formatRules: string[]
  bannedWords: string[]
}

export function buildGenerationPrompt(
  trend: TrendData,
  guardrails: GuardrailData
) {
  const data: GenerationPromptData = {
    topic: trend.topic,
    audiences: trend.audiences,
    tones: trend.tones,
    languages: trend.languages,
    includeEmoji: trend.includeEmoji,
    toneRules: guardrails.toneRules,
    formatRules: guardrails.formatRules,
    bannedWords: guardrails.bannedWords,
  }

  return {
    system: buildSystemPrompt(),
    developer: buildDeveloperPrompt(data),
    user: buildUserPrompt(trend.topic),
  }
}
