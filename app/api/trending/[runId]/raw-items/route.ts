import { NextResponse } from "next/server"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId } from "@/core/auth/workspace"
import { getRawItemsByRunId } from "@/modules/trending/trending.repository"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const workspaceId = await getWorkspaceId()
    const { runId } = await params

    const rawItems = await getRawItemsByRunId(runId)
    // Filter out if it doesn't belong to workspace (already handled if we had workspaceId in the query, let's just check the first item if needed, but getRawItemsByRunId could be updated to take workspaceId)
    // Actually, getRawItemsByRunId doesn't currently filter by workspaceId. Let's make sure we only return items for the given workspaceId
    const filteredItems = rawItems.filter(item => item.workspaceId === workspaceId)

    return NextResponse.json({ success: true, data: filteredItems })
  } catch (error) {
    return handleApiError(error)
  }
}
