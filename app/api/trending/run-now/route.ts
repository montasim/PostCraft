import { NextResponse } from "next/server"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId, getUserId } from "@/core/auth/workspace"
import { trendingService } from "@/modules/trending"

export async function POST() {
  try {
    const workspaceId = await getWorkspaceId()
    const userId = await getUserId()

    const data = await trendingService.triggerRun(workspaceId, userId)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}
