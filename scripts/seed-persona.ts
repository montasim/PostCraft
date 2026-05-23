import "dotenv/config"
import mongoose from "mongoose"
import { WorkspaceModel } from "../modules/workspace/workspace.model"

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/linkediq"
const WORKSPACE_ID = process.env.SEED_WORKSPACE_ID ?? "ws_default"

const SEED_PERSONA = {
  targetAudiences: [
    "HR Recruiters",
    "Hiring Managers",
    "Tech Leads",
    "CTO / VP Engineering",
    "Fellow Developers",
    "Startup Founders",
    "Product Managers",
    "Potential Clients",
    "Community Builders",
    "Indie Hackers",
  ],
  preferredTones: [
    "Thought Leadership",
    "Storytelling",
    "Educational",
    "Contrarian",
    "Inspirational",
    "Analytical",
    "Conversational",
    "Action-Oriented",
  ],
  language: ["EN", "BN", "Banglish"],
}

async function seed() {
  console.log("Connecting to MongoDB...")
  await mongoose.connect(MONGODB_URI)

  const result = await WorkspaceModel.findOneAndUpdate(
    { workspaceId: WORKSPACE_ID },
    { $set: { persona: SEED_PERSONA } },
    { upsert: true, returnDocument: "after" }
  )

  console.log(`Seeded brand persona for workspace: ${WORKSPACE_ID}`)
  console.log(`  targetAudiences: ${result.persona.targetAudiences.length} items`)
  console.log(`  preferredTones:  ${result.persona.preferredTones.length} items`)
  console.log(`  language:        ${result.persona.language.join(", ")}`)

  await mongoose.disconnect()
  console.log("Done.")
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
