"use server"

import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { connectDB } from "@/core/config/database"
import { TwitterPost } from "@/modules/twitter/twitter.schema"
import { revalidatePath } from "next/cache"

export async function deleteTwitterPost(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  await connectDB()

  const post = await TwitterPost.findOne({ _id: id, userId: session.user.id })
  if (!post) {
    throw new Error("Post not found")
  }

  await TwitterPost.deleteOne({ _id: id })
  revalidatePath("/insights/twitter")
}

export async function updateTwitterPost(
  id: string,
  text: string,
  hashtags: string[],
  scheduledTime?: Date
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  await connectDB()

  const post = await TwitterPost.findOne({ _id: id, userId: session.user.id })
  if (!post) {
    throw new Error("Post not found")
  }

  const updates: any = { text, hashtags }
  if (scheduledTime && post.status === "scheduled") {
    updates.scheduledTime = scheduledTime
  }

  await TwitterPost.updateOne({ _id: id }, { $set: updates })
  revalidatePath("/insights/twitter")
}
