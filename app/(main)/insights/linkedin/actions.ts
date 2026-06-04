"use server"

import { connectDB } from "@/core/config/database"
import { LinkedinPost } from "@/modules/linkedin/linkedin.schema"
import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export async function deleteLinkedinPost(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  await connectDB()

  const post = await LinkedinPost.findOne({
    _id: postId,
    userId: session.user.id,
  })
  if (!post) {
    throw new Error("Post not found")
  }

  // Optionally, if the post is scheduled, we might need to cancel the inngest event,
  // but inngest cancellation works by sending an event which we might not have set up
  // explicitly with a cancelOn for this, but Inngest will skip execution if post is deleted/status changed.

  await LinkedinPost.findByIdAndDelete(postId)

  revalidatePath("/insights/linkedin")
}

export async function updateLinkedinPost(
  postId: string,
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

  const post = await LinkedinPost.findOne({
    _id: postId,
    userId: session.user.id,
  })
  if (!post) {
    throw new Error("Post not found")
  }

  const updateData: any = { text, hashtags }
  if (scheduledTime && post.status === "scheduled") {
    updateData.scheduledTime = scheduledTime
  }

  await LinkedinPost.findByIdAndUpdate(postId, updateData)

  revalidatePath("/insights/linkedin")
}
