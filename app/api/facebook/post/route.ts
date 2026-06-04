import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { getAuthDb } from "@/core/auth/auth-db"
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
      providerId: "facebook",
    }

    const account = await db.collection("account").findOne(query)

    if (!account || !account.accessToken) {
      return NextResponse.json(
        {
          error:
            "No Facebook account linked or missing access token. Please sign in with Facebook.",
        },
        { status: 403 }
      )
    }

    const token = account.accessToken

    const pagesRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${token}`
    )
    if (!pagesRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Facebook pages. Token may be expired." },
        { status: 401 }
      )
    }

    const pagesData = await pagesRes.json()
    if (!pagesData.data || pagesData.data.length === 0) {
      return NextResponse.json(
        {
          error:
            "No Facebook pages found for this account. You must have a Facebook Page to post.",
        },
        { status: 400 }
      )
    }

    const page = pagesData.data[0]
    const pageId = page.id
    const pageToken = page.access_token

    const postContent = hashtags?.length
      ? `${text}\n\n${hashtags.map((h: string) => (h.startsWith("#") ? h : `#${h}`)).join(" ")}`
      : text

    const postRes = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}/feed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: postContent,
          access_token: pageToken,
        }),
      }
    )

    if (!postRes.ok) {
      const errorData = await postRes.text()
      logger.error({ errorData, pageId }, "Facebook API error")
      return NextResponse.json(
        { error: "Failed to post to Facebook" },
        { status: 500 }
      )
    }

    const postData = await postRes.json()
    const postId = postData.id

    await connectDB()
    const dbPost = await FacebookPost.create({
      userId: session.user.id,
      text: text,
      hashtags,
      status: "published",
      postId: postId,
    })

    logger.info(
      { userId: session.user.id, pageId, postId, dbPostId: dbPost._id },
      "Successfully posted to Facebook Page"
    )

    return NextResponse.json({
      success: true,
      message: "Successfully posted to Facebook",
      postId,
      id: dbPost._id,
    })
  } catch (error) {
    logger.error(
      { err: error instanceof Error ? error.message : String(error) },
      "Facebook post error"
    )
    return NextResponse.json(
      { error: "Failed to post to Facebook" },
      { status: 500 }
    )
  }
}
