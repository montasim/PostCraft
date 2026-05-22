"use client"

import { Button } from "@/components/ui/button"
import { NavGroup, PlanQuotaCard, BrandCard } from "@/components/shared"
import { IconPlus, IconSparkles } from "@tabler/icons-react"
import { NAV_MAIN, NAV_CONFIG } from "@/lib/constants"

interface SidebarProps {
  active: string
  onSelect: (id: string) => void
}

function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
          <IconSparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-base font-bold">LinkedIQ</span>
      </div>
      <div className="flex-1 space-y-6 px-5 py-4">
        <Button variant="outline" className="w-full gap-2">
          <IconPlus className="h-4 w-4" />
          New post
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
      </div>
      <div className="px-5 pb-4 space-y-2">
        <PlanQuotaCard />
        <BrandCard />
      </div>
    </aside>
  )
}

export { Sidebar }
