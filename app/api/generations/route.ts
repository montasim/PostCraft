import { NextRequest, NextResponse } from "next/server"
import { generationService } from "@/modules/generation"
import { analyticsRepository } from "@/modules/analytics/analytics.repository"
import { handleApiError } from "@/core/errors/error-handler"
import { QuotaExceededError } from "@/core/errors/app-error"
import { connectDB } from "@/core/config/database"
import { getWorkspaceId, getUserId } from "@/core/auth/workspace"
import { PLAN_LIMIT } from "@/lib/constants"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()
    const userId = await getUserId()

    const overview = await analyticsRepository.getOverview(workspaceId)
    if (overview.completedGenerations >= PLAN_LIMIT) {
      throw new QuotaExceededError()
    }

    const body = await request.json()
    const result = await generationService.createGeneration(body, workspaceId, userId)

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
