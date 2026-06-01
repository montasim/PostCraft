import { NextResponse } from "next/server"
import { generationService } from "@/modules/generation"

export async function GET() {
  try {
    const totalPosts = await generationService.getTotalPostCount()

    return NextResponse.json({ success: true, data: { totalPosts } })
  } catch {
    return NextResponse.json({ success: true, data: { totalPosts: 0 } })
  }
}
