import { z } from "zod"

export const generationPrefsSchema = z.object({
  audiences: z.array(z.string().min(1)).min(1),
  tones: z.array(z.string().min(1)).min(1),
  languages: z.array(z.string().min(1)).min(1),
  emoji: z.boolean(),
  postCount: z.number().min(1).max(3).default(1),
  hashtagCount: z.number().min(1).max(10).default(3),
  platforms: z.array(z.string()).default([]),
})

export type GenerationPrefs = z.infer<typeof generationPrefsSchema>

export const GENERATION_PREFS_DEFAULTS: GenerationPrefs = {
  audiences: ["Startup Founders"],
  tones: ["Thought Leadership", "Storytelling"],
  languages: ["EN"],
  emoji: true,
  postCount: 1,
  hashtagCount: 3,
  platforms: [],
}

export const trendingPrefsSchema = z.object({
  enabled: z.boolean().default(false),
  platforms: z.array(z.string()).max(3).default([]),
  topics: z.array(z.string()).default([]),
  industry: z.array(z.string()).default([]),
  targetAudience: z.array(z.string()).default([]),
  language: z.array(z.string()).default([]),
  postsPerPlatform: z.number().min(1).max(20).default(5),
  topPostsForAI: z.number().min(1).max(10).default(5),
  postsToGenerate: z.number().min(1).max(10).default(3),
  scheduleType: z.enum(["hourly", "daily", "weekly"]).default("daily"),
  scheduledTime: z.string().default("09:00"),
  scheduledDay: z.string().nullable().default(null),
})

export type TrendingPrefs = z.infer<typeof trendingPrefsSchema>

export const previewConfigSchema = z.object({
  enabledPlatforms: z.array(z.enum(["linkedin", "twitter", "facebook"])),
})

export type PreviewConfig = z.infer<typeof previewConfigSchema>

export const PREVIEW_CONFIG_DEFAULTS: PreviewConfig = {
  enabledPlatforms: [],
}

export const TRENDING_PREFS_DEFAULTS: TrendingPrefs = {
  enabled: false,
  platforms: [],
  topics: [],
  industry: [],
  targetAudience: [],
  language: [],
  postsPerPlatform: 5,
  topPostsForAI: 5,
  postsToGenerate: 3,
  scheduleType: "daily",
  scheduledTime: "09:00",
  scheduledDay: null,
}
