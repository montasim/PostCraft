import { NextRequest, NextResponse } from "next/server"
import { profileService } from "@/modules/profile"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { requireAuth } from "@/core/auth/guard"
import { getWorkspaceId } from "@/core/auth/workspace"

export async function GET() {
  try {
    await connectDB()
    const session = await requireAuth()
    const workspaceId = await getWorkspaceId()

    const [profile, stats] = await Promise.all([
      profileService.getProfile(session.user.id, session),
      profileService.getProfileStats(workspaceId),
    ])

    return NextResponse.json({ success: true, data: { profile, stats } })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const session = await requireAuth()
    const body = await request.json()
    const data = await profileService.updateProfile(session.user.id, body)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}
