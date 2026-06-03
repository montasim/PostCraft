/**
 * core/ai/prompts/generate.ts
 *
 * OPTIMIZED: Token-efficient, anti-AI-pattern, platform-psychology-aware generation prompt.
 * Two-prompt architecture (system + user). Platform psychology loaded as dense structured blocks.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GenerationPromptData {
  topic: string;
  postCount: number;
  platforms: string[];          // "linkedin" | "twitter" | "facebook"
  audiences: string[];
  tones: string[];
  languages: string[];
  includeEmoji: boolean;
  hashtagCount: number;
  toneRules: string[];          // max 5
  formatRules: string[];        // max 5
  bannedWords: string[];        // max 10
  customRules: string[];        // max 5
}

// ─── Platform psychology context (loaded once, not repeated per-call) ─────────

/**
 * RESEARCH BASIS:
 * LinkedIn: Professional intent, bilateral relationships, authority-driven. Comments
 *   weighted 15x over likes by algorithm. Contrarian + personal story hooks = 4x avg
 *   engagement. Posts truncate at ~210 chars — hook must work in that window.
 * Twitter/X: Unilateral, public, real-time. Audience 18-29, trend-seeking, reward
 *   brevity and wit. Retweet/reply culture. Hot takes > polished essays.
 * Facebook: Community-first, bilateral like LinkedIn but emotionally driven. Algorithm
 *   rewards content that sustains engagement over time. Storytelling + nostalgia +
 *   personal connection drive shares. Older demographic (25-55).
 */
const PLATFORM_PSYCHOLOGY: Record<string, string> = {
  linkedin: `PSYCHOLOGY: Professional identity platform. Reader mindset = "does this make me look smart/successful if I engage?" Mutual-connection network means credibility transfer is real — they share what reflects well on them. Algorithm weights comments (15x) over likes. Hook must appear before 210-char truncation. What works: contrarian truth + personal failure → lesson → outcome. What kills reach: generic advice, vague inspiration, corporate tone, emoji-as-filler.
VOICE: First-person, specific, opinionated. Write as a practitioner, not a pundit. Use exact numbers. Name the pain before the solution. End with a question that invites disagreement or experience-sharing.
FORMAT: Short punchy hook (≤150 chars). Body in short paragraphs (1-3 sentences). White space is oxygen. Hashtags at end, 3-5 max.`,

  twitter: `PSYCHOLOGY: Public broadcast platform. Audience scrolls at speed; dopamine comes from wit, surprise, or validation of a belief they already hold. Unilateral relationship = they follow content, not people. Hot takes and contrarian data perform. "Not just X but Y" framing is overused — avoid. Retweets = social currency; they share what makes them look sharp.
VOICE: Casual, confident, slightly irreverent. One idea per post. Sentence fragments are fine. Use "I" or "you" — never "we" or "one." Dry humor works. Earnest sincerity also works. Corporate optimism does not.
FORMAT: Hook doubles as the whole point (≤120 chars). Body expands briefly (≤220 chars total). CTA invites reply or RT. Hashtags 1-2 max, woven naturally or at end.`,

  facebook: `PSYCHOLOGY: Community and belonging platform. Reader mindset = "does this remind me of something real in my life?" Bilateral network = posts feel personal, not broadcast. Algorithm rewards sustained engagement — comments that spark threads, shares to groups. Emotional resonance (nostalgia, pride, humor, empathy) drives shares more than information. Audience skews 25-55 — references should match.
VOICE: Warm, personal, slightly vulnerable. Storytelling over bullet points. "This happened to me" beats "here's advice." End with an open question that invites personal experience, not just opinions.
FORMAT: Hook is a scene or moment, not a claim. Body unfolds like a story. CTA asks about their experience. Hashtags 2-3, conversational not corporate.`,
};

// ─── Anti-AI pattern rules (compiled from research) ──────────────────────────

const ANTI_AI_RULES = `WRITING RULES — NON-NEGOTIABLE:
- No opening with acknowledgment: never start body with "Great", "Absolutely", "Certainly", "Of course"
- No filler openers: ban "In today's world", "In the digital age", "It's important to note", "It goes without saying"
- No AI vocabulary: ban delve, tapestry, realm, robust, leverage, game-changer, cutting-edge, unlock, unleash, elevate, harness, navigate, landscape, testament, embark, vibrant, bustling, meticulous, foster, revolutionize, showcase, underscore, pivotal, crucial, intricate, comprehensive, seamless
- No symmetry traps: avoid "Not just X, but Y" and "Not only X, but also Y" constructions
- No conclusory neatness: no "In summary", "In conclusion", "Ultimately", "To summarize", "Remember that"
- No hedging chains: avoid "may", "might", "could potentially" stacked together
- No over-capitalization in bullets or headers
- No hollow affirmations: every sentence must carry information or move the story
- Vary sentence length deliberately: mix 3-word punches with 15-word observations. Monotone rhythm = AI tell
- Use contractions naturally: "don't", "it's", "I've", "you're" — formal = robotic
- Allow one deliberate imperfection per post: an unfinished thought, a parenthetical aside, a mid-sentence pivot. Humans do this.
- Specific > general always: "47 features shipped, 3 got used" beats "many features were built"`;

// ─── Output schema (kept minimal — no redundant field descriptions) ───────────

const OUTPUT_SCHEMA = `OUTPUT: Valid JSON only. No markdown. No explanation.
{"variants":[{"language":"string","styleType":"string","platform":"string","hook":"string","body":"string","cta":"string","hashtags":["string"]}]}`;

// ─── Main prompt builder ──────────────────────────────────────────────────────

export function buildGenerationPrompt(data: GenerationPromptData): {
  system: string;
  user: string;
} {
  const activePlatformPsych = data.platforms
    .map((p) => PLATFORM_PSYCHOLOGY[p])
    .filter(Boolean)
    .join("\n\n");

  // Distribution: posts per platform
  const perPlatform = Math.floor(data.postCount / data.platforms.length);
  const remainder = data.postCount % data.platforms.length;
  const distribution = data.platforms
    .map((p, i) => `${p}: ${perPlatform + (i < remainder ? 1 : 0)}`)
    .join(", ");

  // Guardrails — only include sections that have content
  const guardrailParts: string[] = [];
  if (data.bannedWords.length)
    guardrailParts.push(`BANNED WORDS: ${data.bannedWords.join(", ")}`);
  if (data.toneRules.length)
    guardrailParts.push(`TONE RULES:\n${data.toneRules.map((r) => `- ${r}`).join("\n")}`);
  if (data.formatRules.length)
    guardrailParts.push(`FORMAT RULES:\n${data.formatRules.map((r) => `- ${r}`).join("\n")}`);
  if (data.customRules.length)
    guardrailParts.push(`CUSTOM RULES:\n${data.customRules.map((r) => `- ${r}`).join("\n")}`);

  const guardrailBlock = guardrailParts.length
    ? `\nGUARDRAILS:\n${guardrailParts.join("\n")}`
    : "";

  const system = `You are a senior social media strategist writing posts that read as if a real person sat down and typed them — not optimized, not polished, not AI-shaped.

${activePlatformPsych}

${ANTI_AI_RULES}

STYLE TYPES to rotate across variants (pick appropriate per platform + audience):
LinkedIn: Thought Leadership, Contrarian Take, Personal Failure→Lesson, Data Story, Hot Take
Twitter: Hot Take, Unpopular Opinion, Thread Starter, Quick Insight, Humor
Facebook: Personal Story, Community Question, Nostalgia Trigger, Behind the Scenes, Emotional Truth

EMOJI: ${data.includeEmoji ? "Use sparingly — max 1-2 per post, only where they replace words naturally, never as decoration" : "No emoji"}
HASHTAG COUNT PER POST: ${data.hashtagCount}
LANGUAGES: ${data.languages.join(", ")}
AUDIENCES: ${data.audiences.join(", ")}
TONES: ${data.tones.join(", ")}${guardrailBlock}

${OUTPUT_SCHEMA}`;

  const user = `TOPIC: ${data.topic}

Generate ${data.postCount} posts. Distribution: ${distribution}.
Each post must feel written by a different person with a different voice. No two hooks can use the same structural pattern.`;

  return { system, user };
}
