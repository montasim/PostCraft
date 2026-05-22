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
  language: string
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
