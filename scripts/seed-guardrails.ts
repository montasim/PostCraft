import "dotenv/config"
import mongoose from "mongoose"
import { GuardrailModel } from "../modules/guardrail/guardrail.model"
import { DEFAULT_GUARDRAILS } from "../modules/guardrail/guardrail.defaults"

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/postcraft"
const WORKSPACE_ID = process.env.SEED_WORKSPACE_ID ?? "ws_default"

async function seed() {
  console.log("Connecting to MongoDB...")
  await mongoose.connect(MONGODB_URI)

  const existing = await GuardrailModel.countDocuments({ workspaceId: WORKSPACE_ID })
  if (existing > 0) {
    console.log(`Found ${existing} existing guardrails. Skipping seed.`)
    await mongoose.disconnect()
    return
  }

  const docs = DEFAULT_GUARDRAILS.map((item) => ({
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
