import { NextRequest, NextResponse } from "next/server"
import { guardrailService } from "@/modules/guardrail"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()
    const { id } = await params
    const body = await request.json()

    const result = await guardrailService.toggleGuardrail(
      id,
      workspaceId,
      body.isActive
    )

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()
    const { id } = await params

    await guardrailService.removeGuardrail(id, workspaceId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
