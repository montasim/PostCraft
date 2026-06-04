import { NextResponse } from "next/server"
import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { inngest } from "@/core/queue/client"
import { connectDB } from "@/core/config/database"
import { LinkedinPost } from "@/modules/linkedin/linkedin.schema"

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { text, hashtags, scheduledTime } = body

    if (!text || !scheduledTime) {
      return NextResponse.json(
        { error: "Text and scheduledTime are required" },
        { status: 400 }
      )
    }

    await connectDB()
    const dbPost = await LinkedinPost.create({
      userId: session.user.id,
      text,
      hashtags,
      status: "scheduled",
      scheduledTime: new Date(scheduledTime),
    })

    await inngest.send({
      name: "linkedin/post-scheduled",
      data: {
        userId: session.user.id,
        text,
        hashtags,
        scheduledTime,
        postId: dbPost._id.toString(),
      },
    })

    return NextResponse.json({
      success: true,
      message: "Successfully scheduled LinkedIn post",
      id: dbPost._id,
    })
  } catch (error) {
    console.error("LinkedIn schedule error:", error)
    return NextResponse.json(
      { error: "Failed to schedule LinkedIn post" },
      { status: 500 }
    )
  }
}
