import { NextResponse } from "next/server"
import { guardrailService } from "@/modules/guardrail"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"

export async function GET() {
  try {
    await connectDB()
    const { DEFAULT_WORKSPACE_ID } = getEnv()

    const guardrails = await guardrailService.getActiveGuardrails(DEFAULT_WORKSPACE_ID)

    return NextResponse.json({
      success: true,
      data: guardrails,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
