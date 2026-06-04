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
                  <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] leading-none font-semibold text-primary-foreground">
                    {badge}
                  </span>
                )}
              </button>
              {item.subItems && item.subItems.length > 0 && (
                <ul className="mt-1 ml-4 space-y-1 border-l border-sidebar-border/50 pl-2">
                  {item.subItems.map((subItem) => {
                    const isSubActive =
                      active === `${item.id}/${subItem.id}` ||
                      active === subItem.id
                    const SubIcon = subItem.icon
                    return (
                      <li key={subItem.id} className="pl-1">
                        <button
                          onClick={() => onSelect(`${item.id}/${subItem.id}`)}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs transition",
                            isSubActive
                              ? "bg-sidebar-accent/50 font-medium text-primary"
                              : "text-muted-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                          )}
                        >
                          {SubIcon && <SubIcon className="h-3.5 w-3.5" />}
                          {subItem.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { NavGroup }
