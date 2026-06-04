"use server"

import { connectDB } from "@/core/config/database"
import { FacebookPost } from "@/modules/facebook/facebook.schema"
import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export async function deleteFacebookPost(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  await connectDB()

  const post = await FacebookPost.findOne({ _id: postId, userId: session.user.id })
  if (!post) {
    throw new Error("Post not found")
  }

  await FacebookPost.findByIdAndDelete(postId)

  revalidatePath("/insights/facebook")
}

export async function updateFacebookPost(postId: string, text: string, hashtags: string[], scheduledTime?: Date) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  await connectDB()

  const post = await FacebookPost.findOne({ _id: postId, userId: session.user.id })
  if (!post) {
    throw new Error("Post not found")
  }

  const updateData: any = { text, hashtags }
  if (scheduledTime && post.status === "scheduled") {
    updateData.scheduledTime = scheduledTime
  }

  await FacebookPost.findByIdAndUpdate(postId, updateData)

  revalidatePath("/insights/facebook")
}
