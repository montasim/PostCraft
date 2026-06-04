import "dotenv/config"
import mongoose from "mongoose"
import { WorkspaceModel } from "../modules/workspace/workspace.model"
import {
  AUDIENCE_OPTIONS,
  TONE_OPTIONS,
  LANGUAGE_OPTIONS,
  TOPIC_OPTIONS,
  INDUSTRY_OPTIONS,
} from "../lib/constants"

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/postcraft"
const WORKSPACE_ID = process.env.SEED_WORKSPACE_ID ?? "ws_default"

const SEED_PERSONA = {
  targetAudiences: AUDIENCE_OPTIONS,
  preferredTones: TONE_OPTIONS,
  language: LANGUAGE_OPTIONS,
  topics: TOPIC_OPTIONS,
  industry: INDUSTRY_OPTIONS,
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
  console.log(
    `  targetAudiences: ${result.persona.targetAudiences.length} items`
  )
  console.log(
    `  preferredTones:  ${result.persona.preferredTones.length} items`
  )
  console.log(
    `  language:        ${result.persona.language.map((l: { value: string }) => l.value).join(", ")}`
  )
  console.log(`  topics:          ${result.persona.topics.length} items`)
  console.log(`  industry:        ${result.persona.industry.length} items`)

  await mongoose.disconnect()
  console.log("Done.")
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
