"use client"

import { Button } from "@/components/ui/button"
import { IconPlayerPlay, IconSettings, IconLoader2 } from "@tabler/icons-react"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"

interface TrendingHeaderProps {
  enabled: boolean
  prefs: TrendingPrefs
  isRunning: boolean
  onOpenSettings: () => void
  onRunNow: () => void
}

function TrendingHeader({ enabled, prefs, isRunning, onOpenSettings, onRunNow }: TrendingHeaderProps) {
  return (
     <div className="flex gap-4">
        {enabled && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={onRunNow}
            disabled={isRunning}
          >
            {isRunning ? (
              <IconLoader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <IconPlayerPlay className="h-3.5 w-3.5" />
            )}
            Run Now
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
  )
}

export { TrendingHeader }
