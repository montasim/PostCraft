import { NextRequest, NextResponse } from "next/server"
import { guardrailService } from "@/modules/guardrail"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { DEFAULT_WORKSPACE_ID } = getEnv()
    const { id } = await params
    const body = await request.json()

    const result = await guardrailService.toggleGuardrail(
      id,
      DEFAULT_WORKSPACE_ID,
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
    const { DEFAULT_WORKSPACE_ID } = getEnv()
    const { id } = await params

    await guardrailService.removeGuardrail(id, DEFAULT_WORKSPACE_ID)

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
