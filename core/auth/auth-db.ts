import { MongoClient, type Db } from "mongodb"
import { getEnv } from "@/core/config/env"

let client: MongoClient | null = null
let db: Db | null = null

export function getAuthDb(): { db: Db; client: MongoClient } {
  if (db && client) return { db, client }

  const uri = getEnv().MONGODB_URI

  client = new MongoClient(uri)
  // Intentionally swallowed: MongoClient buffers commands until connected
  void client.connect().catch(() => {})
  db = client.db()

  return { db, client }
}
