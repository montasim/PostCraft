import { NextResponse } from "next/server"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId } from "@/core/auth/workspace"
import { trendingService } from "@/modules/trending"

export async function GET() {
  try {
    const workspaceId = await getWorkspaceId()
    const data = await trendingService.getTrendingDashboard(workspaceId)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}
