"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavGroup } from "@/components/shared"
import { IconPlus, IconSparkles } from "@tabler/icons-react"
import { NAV_MAIN, NAV_CONFIG, NAV_ACCOUNT } from "@/lib/constants"
import Link from "next/link"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  active: string
  onSelect: (id: string) => void
}

function MobileSidebar({
  open,
  onOpenChange,
  active,
  onSelect,
}: MobileSidebarProps) {
  const handleSelect = (id: string) => {
    onSelect(id)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="flex h-14 flex-row items-center gap-2 border-b border-sidebar-border px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg brand-gradient">
            <IconSparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <SheetTitle className="brand-gradient-text text-base font-bold">LinkedIQ</SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-6 p-5">
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link href="/?new=true">
              <IconPlus className="h-4 w-4" />
              New post
            </Link>
          </Button>
          <NavGroup
            label="Main"
            items={NAV_MAIN}
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
