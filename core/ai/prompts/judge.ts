/**
 * core/ai/prompts/judge.ts
 *
 * OPTIMIZED: Platform-aware judge. Scores per-platform psychology.
 * Tighter token footprint. Reasoning capped at 20 words.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JudgePromptData {
  topic: string
  audiences: string[]
  platform: string
  hook: string
  body: string
  cta: string
  hashtags: string[]
}

// ─── Platform-specific scoring criteria ───────────────────────────────────────

/**
 * Each platform rewards different psychological triggers.
 * Scoring criteria are weighted accordingly.
 */
const PLATFORM_CRITERIA: Record<string, string> = {
  linkedin: `Score criteria (0-100):
- Hook (30pts): Does it stop a professional mid-scroll? Specific > vague. Tension > inspiration.
- Credibility signal (20pts): Numbers, named experience, or a named failure? No? Deduct.
- Body (20pts): Short paragraphs? White space? Does each sentence earn its place?
- CTA (20pts): Invites genuine disagreement or experience-sharing? Not just "thoughts?"
- Human voice (10pts): Sounds like a real practitioner? Penalize corporate tone, AI vocabulary, symmetry clichés.`,

  twitter: `Score criteria (0-100):
- Hook (35pts): Does the first line work as a standalone tweet? Is it wit, surprise, or a strong opinion?
- Concision (25pts): Does every word earn its place? Fluff = deduct.
- Memorability (20pts): Would someone screenshot or RT this? Generic = 0.
- CTA (10pts): Does it invite reply naturally, not feel bolted on?
- Human voice (10pts): Casual, direct, no corporate shimmer. AI vocabulary = deduct hard.`,

  facebook: `Score criteria (0-100):
- Hook (25pts): Does it open a scene or moment? Would a friend stop scrolling?
- Emotional resonance (30pts): Does it trigger a memory, feeling, or recognition? Intellectual content = lower score.
- Story arc (20pts): Setup → tension → outcome, even if minimal. Bullet points are a penalty.
- CTA (15pts): Does it invite personal experience sharing, not just opinions?
- Human voice (10pts): Warm, slightly vulnerable, personal. Polished = penalty.`,
}

// ─── Prompt builder ───────────────────────────────────────────────────────────

export function buildJudgePrompt(data: JudgePromptData): {
  system: string
  user: string
} {
  const criteria =
    PLATFORM_CRITERIA[data.platform] ?? PLATFORM_CRITERIA["linkedin"]

  const postText = [
    `Hook: ${data.hook}`,
    data.body,
    data.cta,
    data.hashtags.join(" "),
  ]
    .filter(Boolean)
    .join("\n")

  const system = `You are a ${data.platform} engagement analyst. Score posts on actual engagement potential, not writing quality.
A post that breaks grammar rules but sounds human outscores a grammatically perfect post that reads like a press release.

${criteria}

AI PENALTY: Deduct 15pts if the post uses any of: delve, tapestry, realm, game-changer, cutting-edge, robust, leverage, elevate, revolutionize, "in conclusion", "it's important to note", "In today's world", "not just X but Y" construction.

OUTPUT: JSON only. {"score":number,"reasoning":"max 20 words explaining the main strength or weakness"}`

  const user = `PLATFORM: ${data.platform}
TOPIC: ${data.topic}
AUDIENCES: ${data.audiences.join(", ")}

POST:
${postText}`

  return { system, user }
}
