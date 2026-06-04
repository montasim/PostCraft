import { NextRequest, NextResponse } from "next/server"
import { generationService } from "@/modules/generation"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId, getUserId } from "@/core/auth/workspace"

export async function POST(request: NextRequest) {
  try {
    const workspaceId = await getWorkspaceId()
    const userId = await getUserId()

    const body = await request.json()
    const result = await generationService.createGeneration(
      body,
      workspaceId,
      userId
    )

    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
