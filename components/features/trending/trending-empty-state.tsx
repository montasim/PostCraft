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
      description="Configure your topics, platforms, and schedule to start receiving AI-generated LinkedIn posts automatically."
      action={{ label: "Configure Settings", onClick: onConfigure }}
    />
  )
}

export { TrendingEmptyState }
