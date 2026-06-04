import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { getAuthDb } from "@/core/auth/auth-db"

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = getAuthDb()
    
    let userObjectId: ObjectId | undefined;
    try {
      userObjectId = new ObjectId(session.user.id);
    } catch(e) {}

    const query = userObjectId 
      ? { userId: { $in: [session.user.id, userObjectId] } }
      : { userId: session.user.id };

    const accounts = await db.collection("account").find(query).toArray()

    return NextResponse.json({
      success: true,
      data: accounts.map((a) => ({
        providerId: a.providerId,
        accountId: a.accountId,
        createdAt: a.createdAt,
      })),
    })
  } catch (error) {
    console.error("Failed to fetch accounts:", error)
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const providerId = searchParams.get("providerId")

    if (!providerId) {
      return NextResponse.json({ error: "Provider ID is required" }, { status: 400 })
    }

    const { db } = getAuthDb()
    
    let userObjectId: ObjectId | undefined;
    try {
      userObjectId = new ObjectId(session.user.id);
    } catch(e) {}

    const query = {
      userId: userObjectId ? { $in: [session.user.id, userObjectId] } : session.user.id,
      providerId: providerId,
    }

    await db.collection("account").deleteOne(query)

    return NextResponse.json({ success: true, message: "Account disconnected" })
  } catch (error) {
    console.error("Failed to disconnect account:", error)
    return NextResponse.json({ error: "Failed to disconnect account" }, { status: 500 })
  }
}
