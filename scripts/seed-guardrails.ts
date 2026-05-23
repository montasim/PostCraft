import "dotenv/config"
import mongoose from "mongoose"
import { GuardrailModel } from "../modules/guardrail/guardrail.model"

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/linkediq"
const WORKSPACE_ID = process.env.SEED_WORKSPACE_ID ?? "ws_default"

const SEED_DATA = [
  // ─── Tone: voice, authority, authenticity ──────────────────────
  { category: "tone" as const, rule: "Write like you talk to a respected colleague — warm, direct, no jargon" },
  { category: "tone" as const, rule: "Lead with specific experience or insight, not vague advice" },
  { category: "tone" as const, rule: "Show vulnerability or a lesson learned — authenticity builds trust faster than perfection" },
  { category: "tone" as const, rule: "Use contrarian takes only when backed by real evidence or personal experience" },
  { category: "tone" as const, rule: "Address the reader directly with 'you' and 'your' to create personal connection" },
  { category: "tone" as const, rule: "Share numbers, timelines, or concrete outcomes — specificity signals credibility" },
  { category: "tone" as const, rule: "End with conviction, not hedging — replace 'maybe try' with 'do this'" },
  { category: "tone" as const, rule: "Write for one person, not a crowd — imagine your ideal reader and speak to them" },
  { category: "tone" as const, rule: "Avoid humble-bragging — if sharing an achievement, pair it with the struggle behind it" },
  { category: "tone" as const, rule: "Use short declarative sentences for emphasis and longer ones for storytelling rhythm" },

  // ─── Format: structure, hooks, CTAs ────────────────────────────
  { category: "format" as const, rule: "Hook must create a curiosity gap — reader should need to keep reading to resolve tension" },
  { category: "format" as const, rule: "First line: bold claim, surprising stat, or counterintuitive statement under 150 chars" },
  { category: "format" as const, rule: "Max 1,300 characters total — every sentence must earn its place" },
  { category: "format" as const, rule: "Use single-line paragraphs with blank line breaks — white space increases dwell time" },
  { category: "format" as const, rule: "Structure: Hook → Context → Insight/Story → Takeaway → CTA" },
  { category: "format" as const, rule: "Place the key insight in the first 3 lines — LinkedIn truncates the rest in feed" },
  { category: "format" as const, rule: "Use 3-5 bullet points max when listing — more kills readability" },
  { category: "format" as const, rule: "End with a specific question or clear next step — open-ended CTA gets more replies than 'thoughts?'" },
  { category: "format" as const, rule: "Avoid external links in the post — LinkedIn penalizes outbound clicks. Put links in comments instead" },
  { category: "format" as const, rule: "Use 1-3 relevant hashtags only — more dilutes reach and looks spammy" },
  { category: "format" as const, rule: "If telling a story, use 'I' statements and scene-setting details — who, what, when, what happened" },

  // ─── Banned: clichés, spam signals, algorithm penalties ────────
  { category: "banned" as const, rule: "game changer" },
  { category: "banned" as const, rule: "synergy" },
  { category: "banned" as const, rule: "leverage" },
  { category: "banned" as const, rule: "excited to announce" },
  { category: "banned" as const, rule: "thrilled to share" },
  { category: "banned" as const, rule: "in this together" },
  { category: "banned" as const, rule: "new year new me" },
  { category: "banned" as const, rule: "happy to share" },
  { category: "banned" as const, rule: "let that sink in" },
  { category: "banned" as const, rule: "drop a comment below" },
  { category: "banned" as const, rule: "comment YES" },
  { category: "banned" as const, rule: "DM me for" },
  { category: "banned" as const, rule: "link in comments" },
  { category: "banned" as const, rule: "hack" },
  { category: "banned" as const, rule: "secret" },
  { category: "banned" as const, rule: "nobody talks about this" },
  { category: "banned" as const, rule: "underrated" },
  { category: "banned" as const, rule: "hot take" },

  // ─── Custom: psychology hooks, engagement drivers, audience targeting ──
  { category: "custom" as const, rule: "Use loss aversion — frame insights as 'mistakes you're making' or 'what you lose by not knowing this'" },
  { category: "custom" as const, rule: "Apply social proof subtly — reference 'top performers I've worked with' or 'the best engineers I know'" },
  { category: "custom" as const, rule: "Trigger reciprocity — give away a specific tip, template, or framework with no strings attached" },
  { category: "custom" as const, rule: "Use the IKEA effect — ask readers to share their own experience, making them invested in the conversation" },
  { category: "custom" as const, rule: "Create an us-vs-them dynamic — 'most devs do X, but the ones who get promoted do Y'" },
  { category: "custom" as const, rule: "Target hiring managers: show you understand business impact, not just technical execution" },
  { category: "custom" as const, rule: "Target founders/CTOs: demonstrate systems thinking and ownership beyond your role" },
  { category: "custom" as const, rule: "Target peers: share battle-tested patterns and hard-won lessons from real projects" },
  { category: "custom" as const, rule: "Target community: ask genuine questions, share imperfect work-in-progress, celebrate others publicly" },
  { category: "custom" as const, rule: "Use before/after or then/now structure to make transformation tangible" },
  { category: "custom" as const, rule: "Include a specific number in the hook — '3 months', '40% faster', 'saved $50K' — numbers anchor attention" },
  { category: "custom" as const, rule: "Create anticipation with 'I used to think X. Then I saw the data.' pattern" },
  { category: "custom" as const, rule: "Post between 8-10 AM Tuesday-Thursday in your audience's timezone for peak professional engagement" },
  { category: "custom" as const, rule: "Reply to every comment within the first hour — LinkedIn boosts posts with rapid engagement signals" },
]

async function seed() {
  console.log("Connecting to MongoDB...")
  await mongoose.connect(MONGODB_URI)

  const existing = await GuardrailModel.countDocuments({ workspaceId: WORKSPACE_ID })
  if (existing > 0) {
    console.log(`Found ${existing} existing guardrails. Skipping seed.`)
    await mongoose.disconnect()
    return
  }

  const docs = SEED_DATA.map((item) => ({
    ...item,
    workspaceId: WORKSPACE_ID,
    isActive: true,
  }))

  await GuardrailModel.insertMany(docs)
  console.log(`Seeded ${docs.length} guardrail rules for workspace: ${WORKSPACE_ID}`)

  await mongoose.disconnect()
  console.log("Done.")
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
