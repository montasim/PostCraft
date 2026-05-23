import { NextRequest, NextResponse } from "next/server"
import { generationService } from "@/modules/generation"
import { variantService } from "@/modules/variant"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ generationId: string }> }
) {
  try {
    await connectDB()
    const { generationId } = await params
    const workspaceId = await getWorkspaceId()

    const generation = await generationService.getGenerationStatus(generationId, workspaceId)

    let variants: unknown[] = []
    if (generation.status === "completed") {
      variants = await variantService.getVariantsByTrend(generationId, workspaceId)
    }

    return NextResponse.json({
      success: true,
      data: { generation, variants },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
