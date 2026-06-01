import mongoose from "mongoose"
import {
  DB_MAX_POOL_SIZE,
  DB_SERVER_SELECTION_TIMEOUT_MS,
  DB_SOCKET_TIMEOUT_MS,
} from "@/lib/constants"
import { getEnv } from "./env"

let cached: mongoose.Connection | null = null

export async function connectDB(): Promise<mongoose.Connection> {
  if (cached && cached.readyState === 1) return cached

  const { MONGODB_URI } = getEnv()

  const opts: mongoose.ConnectOptions = {
    maxPoolSize: DB_MAX_POOL_SIZE,
    serverSelectionTimeoutMS: DB_SERVER_SELECTION_TIMEOUT_MS,
    socketTimeoutMS: DB_SOCKET_TIMEOUT_MS,
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
