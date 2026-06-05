"use client"

import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { NavGroup } from "@/components/shared"
import { NAV_MAIN, NAV_CONFIG, NAV_ACCOUNT } from "@/lib/constants"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  active: string
  onSelect: (id: string) => void
  trendingPrefs?: import("@/modules/prefs/prefs.schema").TrendingPrefs
  connectedPlatforms?: string[]
}

function MobileSidebar({
  open,
  onOpenChange,
  active,
  onSelect,
  trendingPrefs,
  connectedPlatforms = [],
}: MobileSidebarProps) {
  const handleSelect = (id: string) => {
    onSelect(id)
    onOpenChange(false)
  }

  const filteredNavItems = NAV_MAIN
    .filter((item) =>
      item.id === "trending" ? trendingPrefs?.enabled : true
    )
    .map((item) =>
      item.id === "insights"
        ? {
            ...item,
            subItems: item.subItems?.filter((sub) =>
              connectedPlatforms.includes(sub.id)
            ),
          }
        : item
    )
    .filter(
      (item) => item.id !== "insights" || (item.subItems && item.subItems.length > 0)
    )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="flex h-14 flex-row items-center gap-2 border-b border-sidebar-border px-4">
          <Image
            src="/logo.png"
            alt="PostCraft"
            width={28}
            height={28}
            className="rounded-lg shadow-sm"
          />
          <SheetTitle className="font-bold text-primary">PostCraft</SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-4 p-4">
          <NavGroup
            label="Main"
            items={filteredNavItems}
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
