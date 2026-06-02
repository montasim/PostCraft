import { NextResponse } from "next/server"
import { insightsService } from "@/modules/insights"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function GET() {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()

    const dashboard = await insightsService.getDashboard(workspaceId)

    return NextResponse.json({
      success: true,
      data: dashboard,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
