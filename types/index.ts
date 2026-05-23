import type { ComponentType } from "react"

export interface Variant {
  rank: number
  style: string
  language: string
  score: number
  engagement: number
  clarity: number
  formatting: number
  hook: string
  body: string
  cta: string
  hashtags: string[]
  reasoning: string
}

export interface NavItem {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
}

export type PostStatus = "published" | "draft" | "archived"

export interface HistoryEntry {
  id: string
  variants: Variant[]
  topic: string
  audience: string[]
  tones: string[]
  language: string[]
  includeEmoji: boolean
  createdAt: string
  status: PostStatus
}

export interface HistoryFilterState {
  search: string
  styles: string[]
  languages: string[]
  scoreRange: string
  sort: string
}

export interface SortOption {
  id: string
  label: string
}

export interface ScoreRange {
  id: string
  label: string
  min: number
  max: number
}

export interface AnalyticsOverview {
  totalPosts: number
  avgScore: number
  avgEngagement: number
  successRate: number
  weeklyChange: number
  streakDays: number
  consistencyScore: number
  monthlyGoalProgress: number
  monthlyGoal: number
  topPercentile: number
}

export interface ScoreDistribution {
  range: string
  count: number
  percentage: number
}

export interface StylePerformance {
  style: string
  avgScore: number
  avgEngagement: number
  count: number
}

export interface TrendDataPoint {
  date: string
  score: number
  engagement: number
}

export interface TopPerformingPost {
  topic: string
  score: number
  engagement: number
  style: string
  date: string
}

export interface WorkspaceProfile {
  name: string
  description: string
  industry: string
}

export interface BrandPersona {
  targetAudiences: string[]
  preferredTones: string[]
  language: string[]
}

export interface UserProfile {
  fullName: string
  email: string
  bio: string
  location: string
  title: string
  company: string
  website: string
  twitterHandle: string
  linkedInSlug: string
  avatarUrl: string
  joinedDate: string
}

export interface ProfileStats {
  postsGenerated: number
  currentStreak: number
  longestStreak: number
  avgScore: number
  topPercentile: number
}

export interface NotificationSettings {
  emailGenerationComplete: boolean
  emailWeeklyDigest: boolean
  emailProductUpdates: boolean
  pushPostReminder: boolean
}

export interface PrivacySettings {
  profileVisibility: "public" | "private"
  showActivityStatus: boolean
  shareUsageAnalytics: boolean
}

export interface AppearanceSettings {
  theme: "system" | "dark" | "light"
  compactMode: boolean
  fontSize: "small" | "default" | "large"
}

export interface AccountSettings {
  twoFactorEnabled: boolean
  sessionTimeout: number
  dataExportFormat: "json" | "csv"
}
