"use client"

import { Button } from "@/components/ui/button"
import { NavGroup, PlanQuotaCard, BrandCard, StreakWidget, MotivationTip } from "@/components/shared"
import { IconPlus, IconSparkles } from "@tabler/icons-react"
import { NAV_MAIN, NAV_CONFIG, NAV_ACCOUNT } from "@/lib/constants"
import Link from "next/link"

interface SidebarProps {
  active: string
  onSelect: (id: string) => void
  used?: number
  limit?: number
  brandName?: string
  streakDays?: number
  weeklyGoal?: number
  weeklyProgress?: number
}

function Sidebar({ active, onSelect, used, limit, brandName, streakDays = 0, weeklyGoal = 5, weeklyProgress = 0 }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg brand-gradient">
          <IconSparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="brand-gradient-text text-base font-bold">LinkedIQ</span>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        <Button variant="outline" className="h-9 w-full gap-2" asChild>
          <Link href="/?new=true">
            <IconPlus className="h-4 w-4" />
            Create a post
          </Link>
        </Button>
        <NavGroup
          label="Main"
          items={NAV_MAIN}
          active={active}
          onSelect={onSelect}
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
      <div className="space-y-5 px-5 pb-4">
        <PlanQuotaCard used={used} limit={limit} />
        <BrandCard name={brandName} />
      </div>
    </aside>
  )
}

export { Sidebar }
