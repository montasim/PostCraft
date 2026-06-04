import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { libraryService } from "@/modules/library"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ generationId: string }> }
) {
  try {
    await connectDB()
    const { generationId } = await params
    const workspaceId = await getWorkspaceId()

    const entry = await libraryService.getEntryDetail(generationId, workspaceId)
    return NextResponse.json({ success: true, data: entry })
  } catch (error) {
    return handleApiError(error)
  }
}
