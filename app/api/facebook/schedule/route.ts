import { NextResponse } from "next/server"
import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { inngest } from "@/core/queue/client"
import { connectDB } from "@/core/config/database"
import { FacebookPost } from "@/modules/facebook/facebook.schema"
import { logger } from "@/core/logger"

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
      return NextResponse.json({ error: "Text and scheduledTime are required" }, { status: 400 })
    }

    await connectDB()
    const dbPost = await FacebookPost.create({
      userId: session.user.id,
      text,
      hashtags,
      status: "scheduled",
      scheduledTime: new Date(scheduledTime),
    })

    await inngest.send({
      name: "facebook/post-scheduled",
      data: {
        userId: session.user.id,
        text,
        hashtags,
        scheduledTime,
        postId: dbPost._id.toString(),
      }
    })
    
    logger.info({ userId: session.user.id, postId: dbPost._id.toString(), scheduledTime }, "Successfully scheduled Facebook post event sent to queue")

    return NextResponse.json({ success: true, message: "Successfully scheduled Facebook post", id: dbPost._id })
  } catch (error) {
    logger.error({ err: error instanceof Error ? error.message : String(error) }, "Facebook schedule error")
    return NextResponse.json({ error: "Failed to schedule Facebook post" }, { status: 500 })
  }
}
