import { inngest } from "./client"
import { runGenerationPipeline } from "./pipeline"
import { fetchTrendingSources } from "@/modules/trending/source-fetcher"
import { rankSourceItems } from "@/modules/trending/trending-ranker"
import {
  createRun,
  updateRunSourceItems,
  updateRunGenerationIds,
  updateRunStatus,
  updateRunStage,
} from "@/modules/trending/trending.repository"
import {
  generatePostsFromTrends,
  shortlistWithAI,
} from "@/modules/trending/trending.service"
import { sendTrendingCompletionEmail } from "@/modules/trending/trending-email"
import {
  saveGlobalTopics,
  saveGlobalTopicsFailure,
} from "@/modules/trending/global-topics.repository"
import { prefsRepository } from "@/modules/prefs/prefs.repository"
import { computeNextRunAt } from "@/modules/trending/trending-schedule"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"
import { connectDB } from "@/core/config/database"
import { insightsRepository } from "@/modules/insights/insights.repository"
import {
  PLAN_LIMIT,
  GENERATION_EVENT,
  CRON,
  TRENDING_TOP_N,
  WORKSPACE_ID_PREFIX,
} from "@/lib/constants"
import { RUN_STATUS } from "@/lib/constants"
import { logger } from "@/core/logger"

export const generatePosts = inngest.createFunction(
  {
    id: "generate-posts",
    name: "Generate Posts",
    retries: 3,
    triggers: [{ event: GENERATION_EVENT }],
  },
  async ({ event }) => {
    const { generationId, workspaceId } = event.data as {
      generationId: string
      workspaceId: string
    }
    await runGenerationPipeline(generationId, workspaceId)
  }
)

export const runTrendingPipeline = inngest.createFunction(
  {
    id: "run-trending-pipeline",
    name: "Run Trending Pipeline",
    retries: 2,
    triggers: [{ event: "trending/run-triggered" }],
  },
  async ({ event, step }) => {
    const { workspaceId, userId, config, runId } = event.data as {
      workspaceId: string
      userId: string
      config: TrendingPrefs
      runId: string
    }

    try {
      const quotaOk = await step.run("check-quota", async () => {
        await connectDB()
        await updateRunStage(runId, "Checking quota")
        const dailyUsage = await insightsRepository.getDailyUsage(workspaceId)
        if (dailyUsage.totalPostsGenerated >= PLAN_LIMIT) {
          await updateRunStatus(runId, RUN_STATUS.FAILED, "Quota exceeded")
          logger.info(
            { workspaceId, runId },
            "Skipped — quota exhausted. Scheduling resumes on upgrade."
          )
          return false
        }
        return true
      })

      if (!quotaOk) return

      const { rawItems, fetchLatency } = await step.run("fetch-sources", async () => {
        await connectDB()
        await updateRunStage(runId, "Fetching trending sources")
        const t0 = Date.now()
        const items = await fetchTrendingSources(config)
        return { rawItems: items, fetchLatency: Date.now() - t0 }
      })
      
      const rankedItems = await step.run("rank-items", async () => {
        await connectDB()
        await updateRunStage(runId, "Ranking items by engagement")
        const ranked = rankSourceItems(rawItems)
        await updateRunSourceItems(runId, ranked)
        return ranked
      })

      const { shortlisted, shortlistLatency } = await step.run("shortlist-ai", async () => {
        await connectDB()
        await updateRunStage(runId, "Analyzing topics with AI")
        const t1 = Date.now()
        const items = await shortlistWithAI(
          rankedItems,
          config,
          config.topPostsForAI ?? 5
        )
        return { shortlisted: items, shortlistLatency: Date.now() - t1 }
      })
      
      await step.run("save-metadata", async () => {
        await connectDB()
        const { insertRawItems, updateRunMetadata } = await import("@/modules/trending/trending.repository")
        
        const shortlistedUrls = new Set(shortlisted.map((i) => i.url))
        const rawItemDocs = rawItems.map((item) => {
          const isShortlisted = shortlistedUrls.has(item.url)
          const matched = isShortlisted ? shortlisted.find((s) => s.url === item.url) : null
          return {
            runId,
            workspaceId,
            platform: item.source,
            author: "",
            title: item.title,
            url: item.url,
            engagementScore: item.score,
            status: isShortlisted ? "shortlisted" : "discarded",
            selectionReasoning: matched?.selectionReason || "",
          } as const
        })
        await insertRawItems(rawItemDocs)
        
        await updateRunMetadata(runId, {
          totalItemsFetched: rawItems.length,
          itemsShortlisted: shortlisted.length,
          stepLatencies: {
            fetch: fetchLatency,
            shortlist: shortlistLatency,
          }
        })
      })

      const { generationIds, generateLatency } = await step.run("generate-posts", async () => {
        await connectDB()
        await updateRunStage(runId, "Generating posts with AI")
        const t2 = Date.now()
        const ids = await generatePostsFromTrends(
          shortlisted,
          config,
          workspaceId,
          userId
        )
        return { generationIds: ids, generateLatency: Date.now() - t2 }
      })
      
      await step.run("finalize-run", async () => {
        await connectDB()
        await updateRunStage(runId, "Saving final results")
        const { updateRunMetadata } = await import("@/modules/trending/trending.repository")
        await updateRunMetadata(runId, {
          stepLatencies: { generate: generateLatency }
        })

        await updateRunGenerationIds(runId, generationIds)
        await updateRunStatus(runId, RUN_STATUS.COMPLETED)

        await sendTrendingCompletionEmail(userId, runId).catch((err) => {
          logger.warn(
            { userId, runId, err: String(err) },
            "Failed to send trending completion email"
          )
        })
      })
    } catch (err) {
      await step.run("handle-error", async () => {
        await connectDB()
        const message = err instanceof Error ? err.message : "Unknown error"
        logger.error(
          { workspaceId, runId, err: message },
          "Trending pipeline failed"
        )
        await updateRunStatus(runId, RUN_STATUS.FAILED, message)
      })
      throw err
    }
  }
)

// ─── Global Trending Topics Cron ────────────────────────────────────────────

const GLOBAL_TRENDING_CONFIG = {
  enabled: true,
  platforms: ["hackernews", "devto", "reddit"],
  topics: [
    "AI",
    "startup",
    "engineering",
    "productivity",
    "hiring",
    "remote work",
  ],
  industry: ["software", "saas"],
  targetAudience: ["developers", "founders", "tech leads"],
  language: ["english"],
  postsPerPlatform: 5,
  topPostsForAI: 6,
  postsToGenerate: 6,
  hashtagCount: 3,
  publishPlatforms: ["linkedin"],
  scheduleType: "daily" as const,
  scheduledTime: "06:00",
  scheduledDay: null,
} satisfies TrendingPrefs

export const fetchGlobalTrendingTopics = inngest.createFunction(
  {
    id: "fetch-global-trending-topics",
    name: "Fetch Global Trending Topics",
    retries: 2,
    triggers: [{ cron: CRON.DAILY_6AM }],
  },
  async ({ step }) => {
    const rawItems = await step.run("fetch-sources", async () => {
      await connectDB()
      return fetchTrendingSources(GLOBAL_TRENDING_CONFIG)
    })

    const topTopics = await step.run("rank-and-select", async () => {
      const ranked = rankSourceItems(rawItems)
      return ranked.slice(0, TRENDING_TOP_N)
    })

    await step.run("save-topics", async () => {
      await connectDB()
      if (topTopics.length === 0) {
        await saveGlobalTopicsFailure("No items fetched from any source")
        return
      }
      await saveGlobalTopics(topTopics)
      logger.info({ count: topTopics.length }, "Global trending topics saved")
    })

    return { fetched: rawItems.length, saved: topTopics.length }
  }
)

// ─── Self-Scheduling Trending Runner ──────────────────────────────────────

export const scheduledTrendingRunner = inngest.createFunction(
  {
    id: "scheduled-trending-runner",
    name: "Scheduled Trending Runner",
    retries: 2,
    triggers: [{ event: "trending/schedule-set" }],
    singleton: {
      key: "event.data.userId",
      mode: "cancel",
    },
    cancelOn: [
      {
        event: "trending/schedule-cancel",
        match: "data.userId",
        timeout: "30d",
      },
    ],
  },
  async ({ event, step }) => {
    const { userId, workspaceId } = event.data as {
      userId: string
      workspaceId: string
    }

    const prefs = await step.run("get-prefs", async () => {
      await connectDB()
      const doc = await prefsRepository.findByUserId(userId)
      return doc?.trending ?? null
    })

    if (!prefs?.enabled) return { skipped: true, reason: "disabled" }

    const nextRunAt = await step.run("compute-next", async () => {
      const date = computeNextRunAt({
        scheduleType: prefs.scheduleType,
        scheduledTime: prefs.scheduledTime,
        scheduledDay: prefs.scheduledDay,
      })
      return date.toISOString()
    })

    await step.sleepUntil("wait-for-schedule", new Date(nextRunAt))

    const quotaCheck = await step.run("check-quota", async () => {
      await connectDB()
      const dailyUsage = await insightsRepository.getDailyUsage(workspaceId)
      return dailyUsage.totalPostsGenerated < PLAN_LIMIT
    })

    if (quotaCheck) {
      await step.run("execute", async () => {
        const run = await createRun({
          workspaceId,
          triggerMode: "scheduled",
          metadata: {
            platformsScanned: prefs.platforms,
            totalItemsFetched: 0,
            itemsShortlisted: 0,
            stepLatencies: {} as Record<string, number>,
          },
          configSnapshot: {
            platforms: prefs.platforms,
            topics: prefs.topics,
            industry: prefs.industry,
            targetAudience: prefs.targetAudience,
            language: prefs.language,
            postsPerPlatform: prefs.postsPerPlatform,
            topPostsForAI: prefs.topPostsForAI,
            postsToGenerate: prefs.postsToGenerate,
            scheduleType: prefs.scheduleType,
            scheduledTime: prefs.scheduledTime,
            scheduledDay: prefs.scheduledDay,
          },
          status: "running",
          ranAt: new Date(),
          sourceItems: [],
          generationIds: [],
          dismissed: false,
          error: null,
        })

        await inngest.send({
          name: "trending/run-triggered",
          data: {
            workspaceId,
            userId,
            config: prefs as TrendingPrefs,
            runId: run._id.toString(),
          },
        })
      })
    } else {
      logger.info(
        { workspaceId },
        "Skipped — quota exhausted. Scheduling resumes on upgrade."
      )
    }

    await step.sendEvent("schedule-next", {
      name: "trending/schedule-set",
      data: { userId, workspaceId },
    })

    return { executed: quotaCheck, nextRunAt }
  }
)

// ─── Recovery Cron ────────────────────────────────────────────────────────

export const recoverScheduledTrending = inngest.createFunction(
  {
    id: "recover-scheduled-trending",
    name: "Recover Scheduled Trending",
    retries: 1,
    triggers: [{ cron: CRON.WEEKLY_MONDAY_3AM }],
  },
  async ({ step }) => {
    const enabledUsers = await step.run("find-enabled-users", async () => {
      await connectDB()
      const docs = await prefsRepository.findEnabledTrending()
      return docs.map((doc) => ({
        userId: doc.userId,
        workspaceId: `${WORKSPACE_ID_PREFIX}${doc.userId}`,
      }))
    })

    if (enabledUsers.length === 0) return { recovered: 0 }

    await step.sendEvent(
      "redispatch-schedules",
      enabledUsers.map((u) => ({
        name: "trending/schedule-set",
        data: u,
      }))
    )

    logger.info(
      { count: enabledUsers.length },
      "Recovered scheduled trending chains"
    )
    return { recovered: enabledUsers.length }
  }
)

export const scheduleLinkedInPost = inngest.createFunction(
  {
    id: "schedule-linkedin-post",
    name: "Schedule LinkedIn Post",
    retries: 2,
    triggers: [{ event: "linkedin/post-scheduled" }],
  },
  async ({ event, step }) => {
    const { userId, scheduledTime, postId } = event.data as {
      userId: string
      scheduledTime: string
      postId?: string
    }

    await step.sleepUntil("wait-for-schedule", new Date(scheduledTime))

    await step.run("post-to-linkedin", async () => {
      const { connectDB } = await import("@/core/config/database")
      const { getAuthDb } = await import("@/core/auth/auth-db")
      const { LinkedinPost } =
        await import("@/modules/linkedin/linkedin.schema")
      const { ObjectId } = await import("mongodb")

      await connectDB()

      let currentText = event.data.text as string
      let currentHashtags = event.data.hashtags as string[]

      if (postId) {
        const dbPost = await LinkedinPost.findById(postId)
        if (!dbPost || dbPost.status !== "scheduled") {
          return { skipped: true, reason: "post_deleted_or_not_scheduled" }
        }
        currentText = dbPost.text
        currentHashtags = dbPost.hashtags || []
      }
      const { db } = getAuthDb()

      let userObjectId
      try {
        userObjectId = new ObjectId(userId)
      } catch (e) {}

      const query = {
        userId: userObjectId ? { $in: [userId, userObjectId] } : userId,
        providerId: "linkedin",
      }

      const account = await db.collection("account").findOne(query)
      if (!account || !account.accessToken)
        throw new Error("No LinkedIn token found")

      const token = account.accessToken

      const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!profileRes.ok) throw new Error("Failed to fetch LinkedIn profile")

      const profile = await profileRes.json()
      const personUrn = `urn:li:person:${profile.sub}`

      const postContent = currentHashtags?.length
        ? `${currentText}\n\n${currentHashtags.map((h: string) => (h.startsWith("#") ? h : `#${h}`)).join(" ")}`
        : currentText

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
        const err = await postRes.text()
        if (postId) {
          await LinkedinPost.findByIdAndUpdate(postId, {
            status: "failed",
            error: err,
          })
        }
        throw new Error(`LinkedIn API error: ${err}`)
      }

      const urn = postRes.headers.get("x-restli-id") || ""

      if (postId) {
        await LinkedinPost.findByIdAndUpdate(postId, {
          status: "published",
          urn,
        })
      }

      return { success: true, urn }
    })
  }
)

export const scheduleFacebookPost = inngest.createFunction(
  {
    id: "schedule-facebook-post",
    name: "Schedule Facebook Post",
    retries: 2,
    triggers: [{ event: "facebook/post-scheduled" }],
  },
  async ({ event, step }) => {
    const { userId, scheduledTime, postId } = event.data as {
      userId: string
      scheduledTime: string
      postId?: string
    }

    await step.sleepUntil("wait-for-schedule", new Date(scheduledTime))

    await step.run("post-to-facebook", async () => {
      const { connectDB } = await import("@/core/config/database")
      const { getAuthDb } = await import("@/core/auth/auth-db")
      const { FacebookPost } =
        await import("@/modules/facebook/facebook.schema")
      const { ObjectId } = await import("mongodb")

      await connectDB()

      let currentText = event.data.text as string
      let currentHashtags = event.data.hashtags as string[]

      if (postId) {
        const dbPost = await FacebookPost.findById(postId)
        if (!dbPost || dbPost.status !== "scheduled") {
          return { skipped: true, reason: "post_deleted_or_not_scheduled" }
        }
        currentText = dbPost.text
        currentHashtags = dbPost.hashtags || []
      }
      const { db } = getAuthDb()

      let userObjectId
      try {
        userObjectId = new ObjectId(userId)
      } catch (e) {}

      const query = {
        userId: userObjectId ? { $in: [userId, userObjectId] } : userId,
        providerId: "facebook",
      }

      const account = await db.collection("account").findOne(query)
      if (!account || !account.accessToken)
        throw new Error("No Facebook token found")

      const token = account.accessToken

      const pagesRes = await fetch(
        `https://graph.facebook.com/v19.0/me/accounts?access_token=${token}`
      )
      if (!pagesRes.ok) throw new Error("Failed to fetch Facebook pages")

      const pagesData = await pagesRes.json()
      if (!pagesData.data || pagesData.data.length === 0) {
        throw new Error("No Facebook pages found for this account")
      }

      const page = pagesData.data[0]
      const pageId = page.id
      const pageToken = page.access_token

      const postContent = currentHashtags?.length
        ? `${currentText}\n\n${currentHashtags.map((h: string) => (h.startsWith("#") ? h : `#${h}`)).join(" ")}`
        : currentText

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
        const err = await postRes.text()
        if (postId) {
          await FacebookPost.findByIdAndUpdate(postId, {
            status: "failed",
            error: err,
          })
        }
        logger.error({ err, pageId, userId }, "Facebook scheduled post failed")
        throw new Error(`Facebook API error: ${err}`)
      }

      const postData = await postRes.json()
      const returnedPostId = postData.id

      if (postId) {
        await FacebookPost.findByIdAndUpdate(postId, {
          status: "published",
          postId: returnedPostId,
        })
      }

      logger.info(
        { postId: returnedPostId, userId, pageId },
        "Successfully executed scheduled Facebook post"
      )

      return { success: true, postId: returnedPostId }
    })
  }
)

export const scheduleTwitterPost = inngest.createFunction(
  {
    id: "schedule-twitter-post",
    name: "Schedule Twitter Post",
    retries: 2,
    triggers: [{ event: "twitter/post-scheduled" }],
  },
  async ({ event, step }) => {
    const { userId, scheduledTime, postId } = event.data as {
      userId: string
      scheduledTime: string
      postId?: string
    }

    await step.sleepUntil("wait-for-schedule", new Date(scheduledTime))

    await step.run("post-to-twitter", async () => {
      const { connectDB } = await import("@/core/config/database")
      const { getAuthDb } = await import("@/core/auth/auth-db")
      const { TwitterPost } = await import("@/modules/twitter/twitter.schema")
      const { ObjectId } = await import("mongodb")

      await connectDB()

      let currentText = event.data.text as string
      let currentHashtags = event.data.hashtags as string[]

      if (postId) {
        const dbPost = await TwitterPost.findById(postId)
        if (!dbPost || dbPost.status !== "scheduled") {
          return { skipped: true, reason: "post_deleted_or_not_scheduled" }
        }
        currentText = dbPost.text
        currentHashtags = dbPost.hashtags || []
      }
      const { db } = getAuthDb()

      let userObjectId
      try {
        userObjectId = new ObjectId(userId)
      } catch (e) {}

      const query = {
        userId: userObjectId ? { $in: [userId, userObjectId] } : userId,
        providerId: "twitter",
      }

      const account = await db.collection("account").findOne(query)
      if (!account || !account.accessToken)
        throw new Error("No Twitter token found")

      const token = account.accessToken

      const postContent = currentHashtags?.length
        ? `${currentText}\n\n${currentHashtags.map((h: string) => (h.startsWith("#") ? h : `#${h}`)).join(" ")}`
        : currentText

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
        const err = await postRes.text()
        if (postId) {
          await TwitterPost.findByIdAndUpdate(postId, {
            status: "failed",
            error: err,
          })
        }
        const { logger } = await import("@/core/logger")
        logger.error({ err, userId }, "Twitter scheduled post failed")
        throw new Error(`Twitter API error: ${err}`)
      }

      const postData = await postRes.json()
      const returnedTweetId = postData.data?.id

      if (postId) {
        await TwitterPost.findByIdAndUpdate(postId, {
          status: "published",
          tweetId: returnedTweetId,
        })
      }

      const { logger } = await import("@/core/logger")
      logger.info(
        { tweetId: returnedTweetId, userId },
        "Successfully executed scheduled Twitter post"
      )

      return { success: true, tweetId: returnedTweetId }
    })
  }
)
