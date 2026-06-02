import { NextRequest, NextResponse } from "next/server"
import { guardrailService } from "@/modules/guardrail"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()

    const activeOnly = request.nextUrl.searchParams.get("active") === "true"
    const guardrails = activeOnly
      ? await guardrailService.getActiveGuardrails(workspaceId)
      : await guardrailService.getAllGuardrails(workspaceId)

    return NextResponse.json({
      success: true,
      data: guardrails,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()

    const body = await request.json()
    const guardrail = await guardrailService.addGuardrule(body, workspaceId)

    return NextResponse.json(
      { success: true, data: guardrail },
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
