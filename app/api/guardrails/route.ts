import { NextRequest, NextResponse } from "next/server"
import { guardrailService } from "@/modules/guardrail"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { DEFAULT_WORKSPACE_ID } = getEnv()

    const activeOnly = request.nextUrl.searchParams.get("active") === "true"
    const guardrails = activeOnly
      ? await guardrailService.getActiveGuardrails(DEFAULT_WORKSPACE_ID)
      : await guardrailService.getAllGuardrails(DEFAULT_WORKSPACE_ID)

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
    const { DEFAULT_WORKSPACE_ID } = getEnv()

    const body = await request.json()
    const guardrail = await guardrailService.addGuardrule(body, DEFAULT_WORKSPACE_ID)

    return NextResponse.json(
      { success: true, data: guardrail },
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
