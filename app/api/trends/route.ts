import { NextRequest, NextResponse } from "next/server"
import { trendService } from "@/modules/trend"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { isDev } from "@/core/config/env"
import { runGenerationPipeline } from "@/core/queue/pipeline"
import { getWorkspaceId, getUserId } from "@/core/auth/workspace"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()
    const userId = await getUserId()

    const body = await request.json()
    const result = await trendService.createTrend(body, workspaceId, userId)

    // Dev sync mode: run pipeline directly instead of QStash
    if (isDev()) {
      runGenerationPipeline(result.trendId, workspaceId).catch((err) => {
        console.error("[dev-sync] Pipeline error:", err)
      })
    }

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
