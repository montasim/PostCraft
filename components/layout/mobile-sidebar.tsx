"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { NavGroup } from "@/components/shared"
import { IconSparkles } from "@tabler/icons-react"
import { NAV_MAIN, NAV_CONFIG, NAV_ACCOUNT } from "@/lib/constants"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  active: string
  onSelect: (id: string) => void
  trendingPrefs?: import("@/modules/prefs/prefs.schema").TrendingPrefs
}

function MobileSidebar({
  open,
  onOpenChange,
  active,
  onSelect,
  trendingPrefs,
}: MobileSidebarProps) {
  const handleSelect = (id: string) => {
    onSelect(id)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="flex h-14 flex-row items-center gap-2 border-b border-sidebar-border px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-primary to-chart-2">
            <IconSparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <SheetTitle className="text-primary font-bold">PostCraft</SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-4 p-4">
          <NavGroup
            label="Main"
            items={trendingPrefs?.enabled ? NAV_MAIN : NAV_MAIN.filter((item) => item.id !== "trending")}
            active={active}
            onSelect={handleSelect}
          />
          <NavGroup
            label="Config"
            items={NAV_CONFIG}
            active={active}
            onSelect={handleSelect}
          />
          <NavGroup
            label="Account"
            items={NAV_ACCOUNT}
            active={active}
            onSelect={handleSelect}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileSidebar }
