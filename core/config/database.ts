import mongoose from "mongoose"
import { getEnv } from "./env"

let cached: mongoose.Connection | null = null

export async function connectDB(): Promise<mongoose.Connection> {
  if (cached && cached.readyState === 1) return cached

  const { MONGODB_URI } = getEnv()

  const opts: mongoose.ConnectOptions = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }

  const conn = await mongoose.connect(MONGODB_URI, opts)
  cached = conn.connection

  cached.on("error", (err) => {
    console.error("[DB] connection error:", err)
  })

  cached.on("disconnected", () => {
    console.warn("[DB] disconnected")
    cached = null
  })

  return cached
}

export async function disconnectDB(): Promise<void> {
  if (cached) {
    await mongoose.disconnect()
    cached = null
  }
}
