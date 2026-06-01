import { NextRequest, NextResponse } from "next/server"
import { prefsService } from "@/modules/prefs"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"
import { requireAuth } from "@/core/auth/guard"

export async function GET() {
  try {
    await connectDB()
    const session = await requireAuth()
    const data = await prefsService.getTrendingPrefs(session.user.id)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const session = await requireAuth()
    const body = await request.json()
    const data = await prefsService.saveTrendingPrefs(session.user.id, body)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return handleApiError(error)
  }
}
