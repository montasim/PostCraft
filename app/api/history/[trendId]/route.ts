import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"
import { handleApiError } from "@/core/errors/error-handler"
import { historyService } from "@/modules/history"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ trendId: string }> }
) {
  try {
    await connectDB()
    const { trendId } = await params
    const { DEFAULT_WORKSPACE_ID } = getEnv()

    const entry = await historyService.getEntryDetail(
      trendId,
      DEFAULT_WORKSPACE_ID
    )
    return NextResponse.json({ success: true, data: entry })
  } catch (error) {
    return handleApiError(error)
  }
}
