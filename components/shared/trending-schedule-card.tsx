import { IconClock, IconSettings } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  computeNextRunAt,
  formatNextRun,
} from "@/modules/trending/trending-schedule"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"

export interface TrendingScheduleCardProps {
  prefs: TrendingPrefs
  onSettingsClick?: () => void
  className?: string
}

export function TrendingScheduleCard({
  prefs,
  onSettingsClick,
  className,
}: TrendingScheduleCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-chart-4/20 bg-chart-4/5 p-3 text-sidebar-foreground transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium text-chart-4">
          <IconClock className="h-4 w-4 shrink-0" />
          <span className="text-sm leading-none">Trending</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="-mr-1.5 -mt-1.5 h-6 w-6 text-chart-4/70 hover:bg-chart-4/10 hover:text-chart-4"
          onClick={onSettingsClick}
          aria-label="Trending settings"
        >
          <IconSettings className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-chart-4/70">
        Next run:{" "}
        {formatNextRun(
          computeNextRunAt({
            scheduleType: prefs.scheduleType,
            scheduledTime: prefs.scheduledTime,
            scheduledDay: prefs.scheduledDay,
          })
        )}
      </p>
    </div>
  )
}
