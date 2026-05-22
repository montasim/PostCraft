"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"

const ROUTE_MAP: Record<string, string> = {
  generate: "/",
  history: "/history",
  analytics: "/analytics",
  guardrails: "/",
  workspace: "/",
}

interface AppShellProps {
  children: React.ReactNode
}

function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const active =
    pathname === "/history"
      ? "history"
      : pathname === "/analytics"
        ? "analytics"
        : "generate"

  const handleSelect = (id: string) => {
    router.push(ROUTE_MAP[id] ?? "/")
    setMobileOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active={active} onSelect={handleSelect} />
      <MobileSidebar
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        active={active}
        onSelect={handleSelect}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMobileMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="space-y-10">{children}</div>
        </main>
      </div>
    </div>
  )
}

export { AppShell }
