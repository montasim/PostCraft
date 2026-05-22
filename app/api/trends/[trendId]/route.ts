import { NextRequest, NextResponse } from "next/server"
import { trendService } from "@/modules/trend"
import { variantService } from "@/modules/variant"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getEnv } from "@/core/config/env"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ trendId: string }> }
) {
  try {
    await connectDB()
    const { trendId } = await params
    const { DEFAULT_WORKSPACE_ID } = getEnv()

    const trend = await trendService.getTrendStatus(trendId, DEFAULT_WORKSPACE_ID)

    let variants: unknown[] = []
    if (trend.status === "completed") {
      variants = await variantService.getVariantsByTrend(trendId, DEFAULT_WORKSPACE_ID)
    }

    return NextResponse.json({
      success: true,
      data: { trend, variants },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
