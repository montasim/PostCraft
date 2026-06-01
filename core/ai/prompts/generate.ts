import {
  GENERATION_VARIANT_COUNT,
  HOOK_MAX_LENGTH,
  BODY_MAX_LENGTH,
  HASHTAG_MIN,
  HASHTAG_MAX,
} from "@/lib/constants"

export interface GenerationPromptData {
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
  includeEmoji: boolean
  toneRules: string[]
  formatRules: string[]
  bannedWords: string[]
}

export function buildSystemPrompt(): string {
  return `You are an expert LinkedIn content strategist. You write viral LinkedIn posts that drive engagement, build authority, and attract the target audience.`
}

export function buildDeveloperPrompt(data: GenerationPromptData): string {
  const constraints = [
    `Generate exactly ${GENERATION_VARIANT_COUNT} distinct variants.`,
    "Each variant MUST use a different style from the requested tones.",
    `Hooks MUST be under ${HOOK_MAX_LENGTH} characters.`,
    `Body text MUST be under ${BODY_MAX_LENGTH} characters total.`,
    `Each variant MUST have ${HASHTAG_MIN}-${HASHTAG_MAX} relevant hashtags.`,
    "CTAs must encourage comments or shares.",
    data.includeEmoji
      ? "Use emojis sparingly and contextually."
      : "Do NOT use any emojis.",
    `Target audiences: ${data.audiences.join(", ")}.`,
    `Write in these languages: ${data.languages.join(", ")}.`,
    `Use these tones/styles: ${data.tones.join(", ")}.`,
  ]

  if (data.toneRules.length > 0) {
    constraints.push(`TONE RULES (mandatory): ${data.toneRules.join("; ")}.`)
  }
  if (data.formatRules.length > 0) {
    constraints.push(
      `FORMAT RULES (mandatory): ${data.formatRules.join("; ")}.`
    )
  }
  if (data.bannedWords.length > 0) {
    constraints.push(
      `BANNED WORDS (never use): ${data.bannedWords.join(", ")}.`
    )
  }

  return `CONSTRAINTS:
${constraints.map((c, i) => `${i + 1}. ${c}`).join("\n")}

OUTPUT FORMAT — respond with valid JSON only, no markdown:
{
  "variants": [
    {
      "language": "English",
      "styleType": "Thought leader",
      "hook": "string",
      "body": "string",
      "cta": "string",
      "hashtags": ["#tag1", "#tag2"]
    }
  ]
}`
}

export function buildUserPrompt(topic: string): string {
  return `TOPIC: ${topic}

Generate ${GENERATION_VARIANT_COUNT} LinkedIn post variants following the constraints above. Return valid JSON only.`
}
