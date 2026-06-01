import { NextResponse } from "next/server"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId } from "@/core/auth/workspace"
import { trendingService } from "@/modules/trending"

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const workspaceId = await getWorkspaceId()
    const { runId } = await params

    await trendingService.dismissRun(runId, workspaceId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
