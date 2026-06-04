import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { getAuthDb } from "@/core/auth/auth-db"
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
    const { text, hashtags } = body

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Get the LinkedIn account for the user
    const { db } = getAuthDb()
    
    let userObjectId: ObjectId | undefined;
    try {
      userObjectId = new ObjectId(session.user.id);
    } catch(e) {}

    const query = {
      userId: userObjectId ? { $in: [session.user.id, userObjectId] } : session.user.id,
      providerId: "linkedin",
    }

    const account = await db.collection("account").findOne(query)

    if (!account || !account.accessToken) {
      return NextResponse.json(
        { error: "No LinkedIn account linked or missing access token. Please sign in with LinkedIn." },
        { status: 403 }
      )
    }

    const token = account.accessToken

    // Fetch the user's LinkedIn Profile ID
    const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!profileRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch LinkedIn profile. Token may be expired." },
        { status: 401 }
      )
    }

    const profile = await profileRes.json()
    const personUrn = `urn:li:person:${profile.sub}`
    const postContent = hashtags?.length
      ? `${text}\n\n${hashtags.map((h: string) => h.startsWith('#') ? h : `#${h}`).join(' ')}`
      : text

    // Post to LinkedIn
    const postRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: personUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: postContent,
            },
            shareMediaCategory: "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      }),
    })

    if (!postRes.ok) {
      const errorData = await postRes.text()
      console.error("LinkedIn API error:", errorData)
      return NextResponse.json({ error: "Failed to post to LinkedIn" }, { status: 500 })
    }

    const postUrn = postRes.headers.get("x-restli-id") || ""

    await connectDB()
    const dbPost = await LinkedinPost.create({
      userId: session.user.id,
      text: text,
      hashtags,
      status: "published",
      urn: postUrn,
    })

    return NextResponse.json({ success: true, message: "Successfully posted to LinkedIn", urn: postUrn, id: dbPost._id })
  } catch (error) {
    console.error("LinkedIn post error:", error)
    return NextResponse.json({ error: "Failed to post to LinkedIn" }, { status: 500 })
  }
}
