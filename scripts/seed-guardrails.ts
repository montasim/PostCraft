import "dotenv/config"
import mongoose from "mongoose"
import { GuardrailModel } from "../modules/guardrail/guardrail.model"

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/linkediq"
const WORKSPACE_ID = process.env.DEFAULT_WORKSPACE_ID ?? "ws_default"

const SEED_DATA = [
  // Tone rules
  { category: "tone" as const, rule: "Professional voice" },
  { category: "tone" as const, rule: "No clickbait hooks" },
  { category: "tone" as const, rule: "No generic platitudes" },
  // Format rules
  { category: "format" as const, rule: "Max 1,300 characters" },
  { category: "format" as const, rule: "Hook under 150 chars" },
  // Banned words
  { category: "banned" as const, rule: "game changer" },
  { category: "banned" as const, rule: "synergy" },
  { category: "banned" as const, rule: "leverage" },
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
