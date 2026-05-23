import { NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"
import { handleApiError } from "@/core/errors/error-handler"
import { historyService } from "@/modules/history"

export async function GET() {
  try {
    await connectDB()
    const { DEFAULT_WORKSPACE_ID } = getEnv()

    const [stats, heatmap, streakDays, bestEntry] = await Promise.all([
      historyService.getStats(DEFAULT_WORKSPACE_ID),
      historyService.getHeatmapData(DEFAULT_WORKSPACE_ID),
      historyService.getStreakDays(DEFAULT_WORKSPACE_ID),
      historyService.getBestEntry(DEFAULT_WORKSPACE_ID),
    ])

    return NextResponse.json({
      success: true,
      data: { stats, heatmap, streakDays, bestEntry },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
