export type TrendingPlatform = "hackernews" | "devto" | "github" | "reddit" | "custom-rss" | string
export type TrendingLanguage = "english" | "bangla" | "banglish"
export type ScheduleType = "hourly" | "daily" | "weekly"
export type RunStatus = "running" | "completed" | "failed"
export type DraftStatus = "draft" | "published" | "dismissed"

export interface ITrendingConfig {
  workspaceId: string
  enabled: boolean
  platforms: TrendingPlatform[]
  topics: string[]
  industry: string[]
  targetAudience: string[]
  language: string[]
  postsPerPlatform: number
  topPostsForAI: number
  postsToGenerate: number
  scheduleType: ScheduleType
  scheduledTime: string
  scheduledDay: string | null
  lastRunAt: Date | null
  nextRunAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface SourceItem {
  source: TrendingPlatform
  title: string
  url: string
  score: number
  rank: number
}

export interface ITrendingRun {
  _id: string
  workspaceId: string
  configSnapshot: ITrendingConfig
  triggerMode: "manual" | "scheduled"
  metadata: {
    platformsScanned: string[]
    totalItemsFetched: number
    itemsShortlisted: number
    stepLatencies: Record<string, number>
  }
  status: RunStatus
  ranAt: Date
  sourceItems: SourceItem[]
  generationIds: string[]
  dismissed: boolean
  error: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ITrendingRawItem {
  _id: string
  runId: string
  workspaceId: string
  platform: string
  author: string
  title: string
  url: string
  engagementScore: number
  status: "shortlisted" | "discarded"
  selectionReasoning?: string
  fetchedAt: Date
}

export interface VariantPreview {
  _id: string
  styleType: string
  language: string
  hook: string
  body: string
  cta: string
  hashtags: string[]
  score: number
  engagement: number
  clarity: number
  formatting: number
  overallScore: number
  overallRank: number
  judgeReasoning: string
}

export interface TrendingGenerationPreview {
  generationId: string
  runId: string
  sourceItem: SourceItem
  topic: string
  status: string
  topVariant: VariantPreview | null
}

export interface TrendingRawItem {
  _id: string
  runId: string
  workspaceId: string
  platform: string
  author: string
  title: string
  url: string
  engagementScore: number
  status: "shortlisted" | "discarded"
  selectionReasoning?: string
  fetchedAt: Date
}
