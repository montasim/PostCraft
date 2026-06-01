import { NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { GenerationModel } from "@/modules/generation/generation.model"

export async function GET() {
  try {
    await connectDB()
    const totalPosts = await GenerationModel.estimatedDocumentCount()

    return NextResponse.json({ success: true, data: { totalPosts } })
  } catch {
    return NextResponse.json({ success: true, data: { totalPosts: 0 } })
  }
}
