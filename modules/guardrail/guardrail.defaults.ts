import type { GuardrailCategory } from "./guardrail.schema"

interface DefaultGuardrail {
  category: GuardrailCategory
  rule: string
}

export const DEFAULT_GUARDRAILS: DefaultGuardrail[] = [
  // ─── Tone: voice, authority, authenticity ──────────────────────
  { category: "tone", rule: "Write like you talk to a respected colleague — warm, direct, no jargon" },
  { category: "tone", rule: "Lead with specific experience or insight, not vague advice" },
  { category: "tone", rule: "Show vulnerability or a lesson learned — authenticity builds trust faster than perfection" },
  { category: "tone", rule: "Use contrarian takes only when backed by real evidence or personal experience" },
  { category: "tone", rule: "Address the reader directly with 'you' and 'your' to create personal connection" },
  { category: "tone", rule: "Share numbers, timelines, or concrete outcomes — specificity signals credibility" },
  { category: "tone", rule: "End with conviction, not hedging — replace 'maybe try' with 'do this'" },
  { category: "tone", rule: "Write for one person, not a crowd — imagine your ideal reader and speak to them" },
  { category: "tone", rule: "Avoid humble-bragging — if sharing an achievement, pair it with the struggle behind it" },
  { category: "tone", rule: "Use short declarative sentences for emphasis and longer ones for storytelling rhythm" },

  // ─── Format: structure, hooks, CTAs ────────────────────────────
  { category: "format", rule: "Hook must create a curiosity gap — reader should need to keep reading to resolve tension" },
  { category: "format", rule: "First line: bold claim, surprising stat, or counterintuitive statement under 150 chars" },
  { category: "format", rule: "Max 1,300 characters total — every sentence must earn its place" },
  { category: "format", rule: "Use single-line paragraphs with blank line breaks — white space increases dwell time" },
  { category: "format", rule: "Structure: Hook → Context → Insight/Story → Takeaway → CTA" },
  { category: "format", rule: "Place the key insight in the first 3 lines — LinkedIn truncates the rest in feed" },
  { category: "format", rule: "Use 3-5 bullet points max when listing — more kills readability" },
  { category: "format", rule: "End with a specific question or clear next step — open-ended CTA gets more replies than 'thoughts?'" },
  { category: "format", rule: "Avoid external links in the post — LinkedIn penalizes outbound clicks. Put links in comments instead" },
  { category: "format", rule: "Use 1-3 relevant hashtags only — more dilutes reach and looks spammy" },
  { category: "format", rule: "If telling a story, use 'I' statements and scene-setting details — who, what, when, what happened" },

  // ─── Banned: clichés, spam signals, algorithm penalties ────────
  { category: "banned", rule: "game changer" },
  { category: "banned", rule: "synergy" },
  { category: "banned", rule: "leverage" },
  { category: "banned", rule: "excited to announce" },
  { category: "banned", rule: "thrilled to share" },
  { category: "banned", rule: "in this together" },
  { category: "banned", rule: "new year new me" },
  { category: "banned", rule: "happy to share" },
  { category: "banned", rule: "let that sink in" },
  { category: "banned", rule: "drop a comment below" },
  { category: "banned", rule: "comment YES" },
  { category: "banned", rule: "DM me for" },
  { category: "banned", rule: "link in comments" },
  { category: "banned", rule: "hack" },
  { category: "banned", rule: "secret" },
  { category: "banned", rule: "nobody talks about this" },
  { category: "banned", rule: "underrated" },
  { category: "banned", rule: "hot take" },

  // ─── Custom: psychology hooks, engagement drivers, audience targeting ──
  { category: "custom", rule: "Use loss aversion — frame insights as 'mistakes you're making' or 'what you lose by not knowing this'" },
  { category: "custom", rule: "Apply social proof subtly — reference 'top performers I've worked with' or 'the best engineers I know'" },
  { category: "custom", rule: "Trigger reciprocity — give away a specific tip, template, or framework with no strings attached" },
  { category: "custom", rule: "Use the IKEA effect — ask readers to share their own experience, making them invested in the conversation" },
  { category: "custom", rule: "Create an us-vs-them dynamic — 'most devs do X, but the ones who get promoted do Y'" },
  { category: "custom", rule: "Target hiring managers: show you understand business impact, not just technical execution" },
  { category: "custom", rule: "Target founders/CTOs: demonstrate systems thinking and ownership beyond your role" },
  { category: "custom", rule: "Target peers: share battle-tested patterns and hard-won lessons from real projects" },
  { category: "custom", rule: "Target community: ask genuine questions, share imperfect work-in-progress, celebrate others publicly" },
  { category: "custom", rule: "Use before/after or then/now structure to make transformation tangible" },
  { category: "custom", rule: "Include a specific number in the hook — '3 months', '40% faster', 'saved $50K' — numbers anchor attention" },
  { category: "custom", rule: "Create anticipation with 'I used to think X. Then I saw the data.' pattern" },
  { category: "custom", rule: "Post between 8-10 AM Tuesday-Thursday in your audience's timezone for peak professional engagement" },
  { category: "custom", rule: "Reply to every comment within the first hour — LinkedIn boosts posts with rapid engagement signals" },
]
