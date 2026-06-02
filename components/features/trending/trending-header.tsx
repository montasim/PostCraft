"use client"

import { Button } from "@/components/ui/button"
import { IconPlayerPlay, IconSettings, IconLoader2 } from "@tabler/icons-react"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"

interface TrendingHeaderProps {
  enabled: boolean
  prefs: TrendingPrefs
  isRunning: boolean
  quotaExceeded?: boolean
  onOpenSettings: () => void
  onRunNow: () => void
}

function TrendingHeader({
  enabled,
  prefs,
  isRunning,
  quotaExceeded,
  onOpenSettings,
  onRunNow,
}: TrendingHeaderProps) {
  function formatSchedule(): string {
    if (!enabled) return "Not scheduled"
    const time = prefs.scheduledTime
      ? new Date(`2000-01-01T${prefs.scheduledTime}`).toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        )
      : ""
    if (prefs.scheduleType === "hourly") return "Every hour"
    if (prefs.scheduleType === "weekly")
      return `weekly on ${prefs.scheduledDay} at ${time}`
    return `daily at ${time}`
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-4">
        {enabled && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={onRunNow}
            disabled={isRunning || quotaExceeded}
          >
            {isRunning ? (
              <IconLoader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <IconPlayerPlay className="h-3.5 w-3.5" />
            )}
            {quotaExceeded ? "Quota Exceeded" : "Scan Now"}
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 text-xs"
          onClick={onOpenSettings}
        >
          <IconSettings className="h-3.5 w-3.5" />
          Settings
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Next run: {formatSchedule()}
      </p>
    </div>
  )
}

export { TrendingHeader }
