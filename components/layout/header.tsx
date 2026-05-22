"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { UserDropdown } from "@/components/layout/user-dropdown"
import { PageBreadcrumb } from "@/components/layout/page-breadcrumb"
import { IconMenu2 } from "@tabler/icons-react"

interface HeaderProps {
  onMobileMenuOpen: () => void
}

function Header({ onMobileMenuOpen }: HeaderProps) {
  return (
    <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-5">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={onMobileMenuOpen}
        >
          <IconMenu2 className="h-4 w-4" />
        </Button>
        <PageBreadcrumb />
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground md:inline-flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          <span>2,481 creators posted this week</span>
        </div>
        <ThemeToggle />
        <UserDropdown />
      </div>
    </header>
  )
}

export { Header }
