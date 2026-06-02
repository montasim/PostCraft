import {
  HOOK_MAX_LENGTH,
  BODY_MAX_LENGTH,
  TWITTER_BODY_MAX_LENGTH,
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
  postCount: number
  platforms: string[]
  hashtagCount: number
}

const PLATFORM_STYLES: Record<string, string> = {
  linkedin:
    "Professional, authority-driven, long-form industry insight. Hook with a bold claim or question. Body should demonstrate expertise with real examples. CTA invites discussion. Hashtags: 3-5 industry tags.",
  twitter:
    "Concise, punchy, quick update or hot take. Hook must grab instantly. Body should be under 280 characters. CTA invites retweet/reply. Hashtags: 1-2 trending tags.",
  facebook:
    "Conversational, community-oriented, storytelling. Hook feels like talking to a friend. Body is relatable and engaging. CTA invites comments and sharing. Hashtags: 2-3 broad tags.",
}

function buildDistribution(postCount: number, platforms: string[]): string {
  const perPlatform = Math.floor(postCount / platforms.length)
  const remainder = postCount % platforms.length
  return platforms
    .map((p, i) => {
      const count = perPlatform + (i < remainder ? 1 : 0)
      const style = PLATFORM_STYLES[p] ?? ""
      return `- ${count} for ${p}: ${style}`
    })
    .join("\n")
}

export function buildSystemPrompt(platforms: string[]): string {
  if (platforms.length === 1) {
    const label =
      platforms[0] === "linkedin"
        ? "LinkedIn"
        : platforms[0] === "twitter"
          ? "Twitter/X"
          : "Facebook"
    return `You are an expert ${label} content strategist. You write viral ${label} posts that drive engagement, build authority, and attract the target audience.`
  }
  return `You are an expert multi-platform content strategist. You write viral posts for LinkedIn, Twitter/X, and Facebook that drive engagement, build authority, and attract the target audience on each platform's unique terms.`
}

export function buildDeveloperPrompt(data: GenerationPromptData): string {
  const distribution = buildDistribution(data.postCount, data.platforms)
  const hasMultiplePlatforms = data.platforms.length > 1

  const constraints = [
    `Generate exactly ${data.postCount} posts total, distributed as:\n${distribution}`,
    hasMultiplePlatforms
      ? "Each post MUST include a 'platform' field matching its target platform."
      : "",
    "Each variant MUST use a different style from the requested tones when possible.",
    `Hooks MUST be under ${HOOK_MAX_LENGTH} characters.`,
    data.platforms.includes("twitter")
      ? `Body text for Twitter posts MUST be under ${TWITTER_BODY_MAX_LENGTH} characters. Body for other platforms MUST be under ${BODY_MAX_LENGTH} characters.`
      : `Body text MUST be under ${BODY_MAX_LENGTH} characters total.`,
    `Each variant MUST have exactly ${data.hashtagCount} relevant hashtags.`,
    "CTAs must encourage comments or shares.",
    data.includeEmoji
      ? "Use emojis sparingly and contextually."
      : "Do NOT use any emojis.",
    `Target audiences: ${data.audiences.join(", ")}.`,
    `Write in these languages: ${data.languages.join(", ")}.`,
    `Use these tones/styles: ${data.tones.join(", ")}.`,
  ].filter(Boolean)

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
      "platform": "linkedin",
      "hook": "string",
      "body": "string",
      "cta": "string",
      "hashtags": ["#tag1", "#tag2"]
    }
  ]
}`
}

export function buildUserPrompt(topic: string, postCount: number): string {
  return `TOPIC: ${topic}

Generate ${postCount} posts following the constraints above. Return valid JSON only.`
}
