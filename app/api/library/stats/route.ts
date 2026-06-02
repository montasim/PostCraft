import { NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { libraryService } from "@/modules/library"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function GET() {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()

    const [stats, heatmap, streakDays, bestEntry] = await Promise.all([
      libraryService.getStats(workspaceId),
      libraryService.getHeatmapData(workspaceId),
      libraryService.getStreakDays(workspaceId),
      libraryService.getBestEntry(workspaceId),
    ])

    return NextResponse.json({
      success: true,
      data: { stats, heatmap, streakDays, bestEntry },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
