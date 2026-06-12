import { connectDB } from "@/core/config/database"
import { TrendingRun, TrendingRawItem, type ITrendingRunDoc, type ITrendingRawItemDoc } from "./trending.model"
import type { ISourceItemDoc } from "./trending.model"
import { TRENDING_RUN_LIMIT } from "@/lib/constants"

export async function createRun(
  data: Partial<ITrendingRunDoc>
): Promise<ITrendingRunDoc> {
  await connectDB()
  return TrendingRun.create(data)
}

export async function insertRawItems(
  items: Partial<ITrendingRawItemDoc>[]
): Promise<void> {
  await connectDB()
  if (items.length > 0) {
    await TrendingRawItem.insertMany(items)
  }
}

export async function getRawItemsByRunId(
  runId: string
): Promise<ITrendingRawItemDoc[]> {
  await connectDB()
  return TrendingRawItem.find({ runId }).lean()
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

export async function updateRunStage(
  runId: string,
  stage: string
): Promise<void> {
  await connectDB()
  await TrendingRun.updateOne({ _id: runId }, { $set: { stage } })
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

export async function updateRunMetadata(
  runId: string,
  updates: {
    totalItemsFetched?: number
    itemsShortlisted?: number
    stepLatencies?: Record<string, number>
  }
): Promise<void> {
  await connectDB()
  const run = await TrendingRun.findById(runId)
  if (!run) return

  if (!run.metadata) {
    run.metadata = {} as any
  }

  if (updates.totalItemsFetched !== undefined) {
    run.metadata.totalItemsFetched = updates.totalItemsFetched
  }
  if (updates.itemsShortlisted !== undefined) {
    run.metadata.itemsShortlisted = updates.itemsShortlisted
  }
  if (updates.stepLatencies) {
    if (!run.metadata.stepLatencies) {
      run.metadata.stepLatencies = {}
    }
    for (const [key, val] of Object.entries(updates.stepLatencies)) {
      ;(run.metadata.stepLatencies as any)[key] = val
    }
  }
  
  // Mark modified just in case
  run.markModified("metadata")
  await run.save()
}
