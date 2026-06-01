"use client"

import { cn } from "@/lib/utils"
import type { NavItem } from "@/types"

interface NavGroupProps {
  label: string
  items: NavItem[]
  active: string
  onSelect: (id: string) => void
  badges?: Record<string, number>
}

function NavGroup({ label, items, active, onSelect, badges }: NavGroupProps) {
  return (
    <div>
      <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          const badge = badges?.[item.id]
          return (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-sidebar-accent font-medium text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {badge != null && badge > 0 && (
                  <span className="ml-auto text-[10px] font-semibold bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 leading-none">
                    {badge}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { NavGroup }
