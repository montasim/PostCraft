"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  icon?: ReactNode
  action?: ReactNode
  description?: string
  className?: string
}

function SectionHeader({
  title,
  icon,
  action,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </h2>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

export { SectionHeader }
