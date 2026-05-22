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
