import { NextResponse } from "next/server"
import { generationService } from "@/modules/generation"
import { connectDB } from "@/core/config/database"

export async function GET() {
  try {
    await connectDB()
    const totalPosts = await generationService.getTotalPostCount()

    return NextResponse.json({ success: true, data: { totalPosts } })
  } catch (error) {
    console.error("[Stats API Error]:", error)
    return NextResponse.json({ success: true, data: { totalPosts: 0 } })
  }
}
