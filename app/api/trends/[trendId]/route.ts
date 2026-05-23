import { NextRequest, NextResponse } from "next/server"
import { trendService } from "@/modules/trend"
import { variantService } from "@/modules/variant"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ trendId: string }> }
) {
  try {
    await connectDB()
    const { trendId } = await params
    const workspaceId = await getWorkspaceId()

    const trend = await trendService.getTrendStatus(trendId, workspaceId)

    let variants: unknown[] = []
    if (trend.status === "completed") {
      variants = await variantService.getVariantsByTrend(trendId, workspaceId)
    }

    return NextResponse.json({
      success: true,
      data: { trend, variants },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
