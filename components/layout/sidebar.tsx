"use client"

import { NavGroup, PlanQuotaCard, StreakWidget, MotivationTip } from "@/components/shared"
import { IconSparkles, IconClock } from "@tabler/icons-react"
import { NAV_MAIN, NAV_CONFIG, NAV_ACCOUNT } from "@/lib/constants"
import { computeNextRunAt, formatNextRun } from "@/modules/trending/trending-schedule"
import type { TrendingPrefs } from "@/modules/prefs/prefs.schema"

interface SidebarProps {
  active: string
  onSelect: (id: string) => void
  used?: number
  limit?: number
  streakDays?: number
  weeklyGoal?: number
  weeklyProgress?: number
  trendingCount?: number
  trendingPrefs?: TrendingPrefs
}

function Sidebar({ active, onSelect, used, limit, streakDays = 0, weeklyGoal = 5, weeklyProgress = 0, trendingCount = 0, trendingPrefs }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg brand-gradient">
          <IconSparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="brand-gradient-text text-base font-bold">LinkedIQ</span>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        <NavGroup
          label="Main"
          items={NAV_MAIN}
          active={active}
          onSelect={onSelect}
          badges={{ trending: trendingCount }}
        />
        <NavGroup
          label="Config"
          items={NAV_CONFIG}
          active={active}
          onSelect={onSelect}
        />
        <NavGroup
          label="Account"
          items={NAV_ACCOUNT}
          active={active}
          onSelect={onSelect}
        />
      </div>
      <div className="space-y-5 p-5">
        <PlanQuotaCard used={used} limit={limit} />
        {trendingPrefs?.enabled && (
          <div className="rounded-lg border bg-card px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <IconClock className="h-3.5 w-3.5" />
              Trending
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Next run: {formatNextRun(computeNextRunAt({
                scheduleType: trendingPrefs.scheduleType,
                scheduledTime: trendingPrefs.scheduledTime,
                scheduledDay: trendingPrefs.scheduledDay,
              }))}
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}

export { Sidebar }
