import {
  buildSystemPrompt,
  buildDeveloperPrompt,
  buildUserPrompt,
  type GenerationPromptData,
} from "@/core/ai/prompts/generate"

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
}

export function buildGenerationPrompt(
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
    toneRules: guardrails.toneRules,
    formatRules: guardrails.formatRules,
    bannedWords: guardrails.bannedWords,
  }

  return {
    system: buildSystemPrompt(generation.platforms),
    developer: buildDeveloperPrompt(data),
    user: buildUserPrompt(generation.topic, generation.postCount),
  }
}
