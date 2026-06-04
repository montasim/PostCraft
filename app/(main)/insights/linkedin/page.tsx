import { auth } from "@/core/auth/auth"
import { headers } from "next/headers"
import { connectDB } from "@/core/config/database"
import { LinkedinPost } from "@/modules/linkedin/linkedin.schema"
import { redirect } from "next/navigation"
import { EmptyState } from "@/components/shared/empty-state"
import { Badge } from "@/components/ui/badge"
import { IconClock } from "@tabler/icons-react"
import Link from "next/link"
import { LinkedinPostItem } from "./linkedin-post-item"

export default async function LinkedInInsightsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user) {
    redirect("/login")
  }

  await connectDB()

  const posts = await LinkedinPost.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean()

  const serializedPosts = posts.map((p: any) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
    scheduledTime: p.scheduledTime ? p.scheduledTime.toISOString() : undefined,
  }))

  const { getAuthDb } = await import("@/core/auth/auth-db")
  const { db } = getAuthDb()
  let userObjectId: any
  try { userObjectId = new (await import("mongodb")).ObjectId(session.user.id) } catch (e) { }

  const account = await db.collection("account").findOne({
    userId: userObjectId ? { $in: [session.user.id, userObjectId] } : session.user.id,
    providerId: "linkedin",
  })

  let linkedinUser = {
    name: session.user.name,
    image: session.user.image,
    email: session.user.email,
  }

  if (account && account.accessToken) {
    try {
      const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
        headers: { Authorization: `Bearer ${account.accessToken}` },
      })
      if (profileRes.ok) {
        const profile = await profileRes.json()
        linkedinUser.name = profile.name || linkedinUser.name
        linkedinUser.image = profile.picture || linkedinUser.image
      }
    } catch (e) { }
  }

  const publishedCount = posts.filter((p: any) => p.status === "published").length
  const scheduledCount = posts.filter((p: any) => p.status === "scheduled").length
  const failedCount = posts.filter((p: any) => p.status === "failed").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-md font-semibold">LinkedIn Posts</h1>
          <p className="text-sm text-muted-foreground">
            View your published and scheduled LinkedIn posts.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/10">
            {publishedCount} Published
          </Badge>
          <Badge variant="outline" className="border-blue-500/30 text-blue-600 bg-blue-500/10">
            {scheduledCount} Scheduled
          </Badge>
          <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/10">
            {failedCount} Failed
          </Badge>
        </div>
      </div>

      {serializedPosts.length === 0 ? (
        <EmptyState
          title="No scheduled posts yet"
          description="When you schedule a post, it automatically posts at the date and time you choose."
          icon={<IconClock className="h-6 w-6" />}
          variant="centered"
        >
          <div className="mt-4 flex justify-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
              Go generate one
            </Link>
          </div>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
          {serializedPosts.map((post: any) => (
            <LinkedinPostItem key={post._id} post={post} user={linkedinUser} />
          ))}
        </div>
      )}
    </div>
  )
}
