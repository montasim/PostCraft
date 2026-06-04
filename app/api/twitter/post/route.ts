import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { getAuthDb } from "@/core/auth/auth-db"
import { connectDB } from "@/core/config/database"
import { TwitterPost } from "@/modules/twitter/twitter.schema"
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
    const { text, hashtags } = body

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const { db } = getAuthDb()

    let userObjectId: ObjectId | undefined
    try {
      userObjectId = new ObjectId(session.user.id)
    } catch (e) {}

    const query = {
      userId: userObjectId
        ? { $in: [session.user.id, userObjectId] }
        : session.user.id,
      providerId: "twitter",
    }

    const account = await db.collection("account").findOne(query)

    if (!account || !account.accessToken) {
      return NextResponse.json(
        {
          error:
            "No Twitter account linked or missing access token. Please sign in with Twitter.",
        },
        { status: 403 }
      )
    }

    const token = account.accessToken

    const postContent = hashtags?.length
      ? `${text}\n\n${hashtags.map((h: string) => (h.startsWith("#") ? h : `#${h}`)).join(" ")}`
      : text

    const postRes = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: postContent,
      }),
    })

    if (!postRes.ok) {
      const errorData = await postRes.text()
      logger.error({ errorData }, "Twitter API error")

      try {
        const parsed = JSON.parse(errorData)
        if (parsed.title === "CreditsDepleted" || parsed.detail) {
          return NextResponse.json(
            {
              error:
                parsed.detail ||
                "Twitter API credits depleted or permission denied.",
            },
            { status: 500 }
          )
        }
      } catch (e) {}

      return NextResponse.json(
        { error: "Failed to post to Twitter" },
        { status: 500 }
      )
    }

    const postData = await postRes.json()
    const tweetId = postData.data?.id

    await connectDB()
    const dbPost = await TwitterPost.create({
      userId: session.user.id,
      text: text,
      hashtags,
      status: "published",
      tweetId: tweetId,
    })

    logger.info(
      { userId: session.user.id, tweetId, dbPostId: dbPost._id },
      "Successfully posted to Twitter"
    )

    return NextResponse.json({
      success: true,
      message: "Successfully posted to Twitter",
      tweetId,
      id: dbPost._id,
    })
  } catch (error) {
    logger.error(
      { err: error instanceof Error ? error.message : String(error) },
      "Twitter post error"
    )
    return NextResponse.json(
      { error: "Failed to post to Twitter" },
      { status: 500 }
    )
  }
}
