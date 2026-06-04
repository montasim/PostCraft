import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { connectDB } from "@/core/config/database"
import { FacebookPost } from "@/modules/facebook/facebook.schema"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }
    
    await connectDB()
    const { id } = await params
    
    const post = await FacebookPost.findOneAndDelete({
      _id: id,
      userId: session.user.id
    })
    
    if (!post) {
      return NextResponse.json({ success: false, error: "Not found or unauthorized" }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }
    
    const body = await req.json()
    const { text, hashtags } = body
    
    if (!text) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }
    
    await connectDB()
    const { id } = await params
    
    const post = await FacebookPost.findOneAndUpdate(
      { _id: id, userId: session.user.id, status: "scheduled" },
      { text, hashtags },
      { new: true }
    )
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: "Not found, unauthorized, or post is not in 'scheduled' status." },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, post })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
