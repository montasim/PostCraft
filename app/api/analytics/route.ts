import { NextResponse } from "next/server"
import { analyticsService } from "@/modules/analytics"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"

export async function GET() {
  try {
    await connectDB()
    const { DEFAULT_WORKSPACE_ID } = getEnv()

    const dashboard = await analyticsService.getDashboard(DEFAULT_WORKSPACE_ID)

    return NextResponse.json({
      success: true,
      data: dashboard,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
