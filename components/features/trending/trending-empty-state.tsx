"use client"

import { EmptyState } from "@/components/shared"
import { IconTrendingUp } from "@tabler/icons-react"

interface TrendingEmptyStateProps {
  onConfigure: () => void
}

function TrendingEmptyState({ onConfigure }: TrendingEmptyStateProps) {
  return (
    <EmptyState
      icon={<IconTrendingUp className="h-7 w-7" />}
      title="No trending posts yet"
      description="Set your topics and schedule. LinkedIQ scans HN, GitHub, Reddit, and Dev.to — then writes posts tailored to your voice."
      action={{ label: "Configure Settings", onClick: onConfigure }}
    />
  )
}

export { TrendingEmptyState }
