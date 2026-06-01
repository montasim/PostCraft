import { NextResponse } from "next/server"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId } from "@/core/auth/workspace"
import { trendingService } from "@/modules/trending"

export async function PATCH() {
  try {
    const workspaceId = await getWorkspaceId()

    await trendingService.dismissAllRuns(workspaceId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
