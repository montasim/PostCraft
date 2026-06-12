import "dotenv/config"
import { MongoClient } from "mongodb"

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/postcraft"

async function run() {
  console.log("Connecting to MongoDB...")
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db()

  console.log("Deleting all records from the 'account' collection...")
  const result = await db.collection("account").deleteMany({})

  console.log(`Deleted ${result.deletedCount} connected accounts.`)

  await client.close()
  console.log("Done.")
}

run().catch((err) => {
  console.error("Script failed:", err)
  process.exit(1)
})
