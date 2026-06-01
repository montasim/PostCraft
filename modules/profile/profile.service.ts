import { profileRepository } from "./profile.repository"
import { updateProfileSchema, type UpdateProfileInput } from "./profile.schema"
import { analyticsRepository } from "@/modules/analytics/analytics.repository"
import { historyRepository } from "@/modules/history/history.repository"
import { getAuthDb } from "@/core/auth/auth-db"
import { ObjectId } from "mongodb"
import { ValidationError } from "@/core/errors/app-error"
import type { UserProfile, ProfileStats } from "@/types"

export const profileService = {
  async getProfile(userId: string, session: { user: { name?: string | null; email?: string | null; image?: string | null; createdAt?: Date | null } }) {
    const doc = await profileRepository.findByUserId(userId)

    const profile: UserProfile = {
      fullName: session.user.name ?? "",
      email: session.user.email ?? "",
      bio: doc?.bio ?? "",
      location: doc?.location ?? "",
      title: doc?.title ?? "",
      company: doc?.company ?? "",
      website: doc?.website ?? "",
      twitterHandle: doc?.twitterHandle ?? "",
      linkedInSlug: doc?.linkedInSlug ?? "",
      avatarUrl: session.user.image ?? "",
      joinedDate: session.user.createdAt?.toISOString() ?? new Date().toISOString(),
    }

    return profile
  },

  async getProfileStats(workspaceId: string): Promise<ProfileStats> {
    const [overview, currentStreak, longestStreak] = await Promise.all([
      analyticsRepository.getOverview(workspaceId),
      historyRepository.getStreakDays(workspaceId),
      historyRepository.getLongestStreak(workspaceId),
    ])

    const avgScore = overview.avgScore
    const topPercentile = Math.max(1, 100 - avgScore)

    return {
      postsGenerated: overview.totalPosts,
      currentStreak,
      longestStreak,
      avgScore,
      topPercentile,
    }
  },

  async updateProfile(userId: string, data: UpdateProfileInput) {
    const parsed = updateProfileSchema.safeParse(data)
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message).join(", ")
      throw new ValidationError(errors)
    }

    if (parsed.data.fullName) {
      const { db } = getAuthDb()
      await db.collection("user").updateOne(
        { _id: new ObjectId(userId) },
        { $set: { name: parsed.data.fullName } }
      )
    }

    const profileData = { ...parsed.data }
    delete (profileData as Record<string, unknown>).fullName

    const updated = await profileRepository.upsert(userId, profileData)

    return {
      fullName: parsed.data.fullName,
      bio: updated.bio,
      location: updated.location,
      title: updated.title,
      company: updated.company,
      website: updated.website,
      twitterHandle: updated.twitterHandle,
      linkedInSlug: updated.linkedInSlug,
    }
  },
}
