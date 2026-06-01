import { NextRequest, NextResponse } from "next/server"
import { workspaceService } from "@/modules/workspace"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function GET() {
  try {
    const workspaceId = await getWorkspaceId()
    const data = await workspaceService.getWorkspace(workspaceId)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const workspaceId = await getWorkspaceId()
    const body = await request.json()
    const data = await workspaceService.updateWorkspace(workspaceId, body)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE() {
  try {
    const workspaceId = await getWorkspaceId()
    await workspaceService.deleteWorkspaceCascade(workspaceId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
