"use client"

import { IconAlertTriangle } from "@tabler/icons-react"
import { useAppSelector } from "@/store/hooks"
import { selectAiLimitError } from "@/store/slices/workspace.slice"

function HighTrafficAlert() {
  const aiLimitError = useAppSelector(selectAiLimitError)

  if (!aiLimitError) return null

  return (
    <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50/50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-300">
      <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="flex-1">
        High traffic volume. Generations are temporarily paused — try again in a few minutes.
      </p>
    </div>
  )
}

export { HighTrafficAlert }
