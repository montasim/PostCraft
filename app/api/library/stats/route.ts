import { NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { historyService } from "@/modules/history"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function GET() {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()

    const [stats, heatmap, streakDays, bestEntry] = await Promise.all([
      historyService.getStats(workspaceId),
      historyService.getHeatmapData(workspaceId),
      historyService.getStreakDays(workspaceId),
      historyService.getBestEntry(workspaceId),
    ])

    return NextResponse.json({
      success: true,
      data: { stats, heatmap, streakDays, bestEntry },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
