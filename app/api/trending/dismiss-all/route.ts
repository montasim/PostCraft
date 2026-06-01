import { NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { getWorkspaceId } from "@/core/auth/workspace"
import { dismissAllRuns } from "@/modules/trending/trending.repository"

export async function PATCH() {
  try {
    await connectDB()
    const workspaceId = await getWorkspaceId()

    await dismissAllRuns(workspaceId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
