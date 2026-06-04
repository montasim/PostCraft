import { connectDB } from "@/core/config/database"
import { GlobalTrendingTopic } from "./global-topics.model"
import type { ISourceItemDoc } from "./trending.model"

export async function saveGlobalTopics(
  topics: ISourceItemDoc[]
): Promise<void> {
  await connectDB()
  await GlobalTrendingTopic.create({
    topics,
    fetchedAt: new Date(),
    status: "completed",
    error: null,
  })
}

export async function saveGlobalTopicsFailure(error: string): Promise<void> {
  await connectDB()
  await GlobalTrendingTopic.create({
    topics: [],
    fetchedAt: new Date(),
    status: "failed",
    error,
  })
}

export async function getLatestGlobalTopics(): Promise<{
  topics: ISourceItemDoc[]
  fetchedAt: Date
} | null> {
  await connectDB()
  const doc = await GlobalTrendingTopic.findOne({
    status: "completed",
    "topics.0": { $exists: true },
  })
    .sort({ createdAt: -1 })
    .lean()

  if (!doc) return null
  return { topics: doc.topics, fetchedAt: doc.fetchedAt }
}
