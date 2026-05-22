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
