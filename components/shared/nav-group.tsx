"use client"

import { cn } from "@/lib/utils"
import type { NavItem } from "@/types"

interface NavGroupProps {
  label: string
  items: NavItem[]
  active: string
  onSelect: (id: string) => void
}

function NavGroup({ label, items, active, onSelect }: NavGroupProps) {
  return (
    <div>
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-sidebar-accent text-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { NavGroup }
