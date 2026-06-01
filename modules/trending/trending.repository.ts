import { connectDB } from "@/core/config/database"
import { TrendingRun, type ITrendingRunDoc } from "./trending.model"
import type { ISourceItemDoc } from "./trending.model"
import { TRENDING_RUN_LIMIT } from "@/lib/constants"

export async function createRun(
  data: Partial<ITrendingRunDoc>
): Promise<ITrendingRunDoc> {
  await connectDB()
  return TrendingRun.create(data)
}

export async function findRunsByWorkspace(
  workspaceId: string,
  limit = TRENDING_RUN_LIMIT
): Promise<ITrendingRunDoc[]> {
  await connectDB()
  return TrendingRun.find({ workspaceId })
    .sort({ ranAt: -1 })
    .limit(limit)
    .lean()
}

export async function updateRunStatus(
  runId: string,
  status: "running" | "completed" | "failed",
  error?: string
): Promise<void> {
  await connectDB()
  await TrendingRun.updateOne(
    { _id: runId },
    { $set: { status, error: error ?? null } }
  )
}

export async function updateRunSourceItems(
  runId: string,
  sourceItems: ISourceItemDoc[]
): Promise<void> {
  await connectDB()
  await TrendingRun.updateOne({ _id: runId }, { $set: { sourceItems } })
}

export async function updateRunGenerationIds(
  runId: string,
  generationIds: string[]
): Promise<void> {
  await connectDB()
  await TrendingRun.updateOne({ _id: runId }, { $set: { generationIds } })
}

export async function dismissRun(
  runId: string,
  workspaceId: string
): Promise<void> {
  await connectDB()
  await TrendingRun.updateOne(
    { _id: runId, workspaceId },
    { $set: { dismissed: true } }
  )
}

export async function dismissAllRuns(workspaceId: string): Promise<void> {
  await connectDB()
  await TrendingRun.updateMany(
    { workspaceId, dismissed: false },
    { $set: { dismissed: true } }
  )
}

export async function countUndismissedRuns(
  workspaceId: string
): Promise<number> {
  await connectDB()
  return TrendingRun.countDocuments({
    workspaceId,
    dismissed: false,
    status: "completed",
  })
}
