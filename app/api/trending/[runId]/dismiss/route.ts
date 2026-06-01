import { NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId } from "@/core/auth/workspace"
import { dismissRun } from "@/modules/trending/trending.repository"

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()
    const { runId } = await params

    await dismissRun(runId, workspaceId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
