import { MongoClient, type Db } from "mongodb"

let client: MongoClient | null = null
let db: Db | null = null

export function getAuthDb(): { db: Db; client: MongoClient } {
  if (db && client) return { db, client }

  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error("MONGODB_URI not set")

  client = new MongoClient(uri)
  // Connect eagerly — Better Auth needs the db instance synchronously for the adapter,
  // but the actual operations happen asynchronously. MongoClient buffers commands
  // until the connection is established, so this is safe.
  void client.connect().catch(() => {})
  db = client.db()

  return { db, client }
}
