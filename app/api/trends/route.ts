import { NextRequest, NextResponse } from "next/server"
import { trendService } from "@/modules/trend"
import { handleApiError } from "@/core/errors/error-handler"
import { connectDB } from "@/core/config/database"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const result = await trendService.createTrend(body)

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
