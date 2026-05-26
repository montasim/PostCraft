"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  features?: string[]
  variant?: "default" | "compact" | "centered"
  className?: string
}

function EmptyState({
  icon,
  title,
  description,
  action,
  features,
  variant = "default",
  className,
}: EmptyStateProps) {
  const variants = {
    default: "rounded-xl border border-dashed border-border/60 bg-muted/20 px-6 py-10",
    compact: "rounded-lg border border-dashed border-border/40 bg-muted/10 px-4 py-6",
    centered: "flex flex-col items-center text-center rounded-xl border border-dashed border-border/60 bg-muted/20 px-6 py-10",
  }

  return (
    <div className={cn(variants[variant], className)}>
      {icon && (
        <div className={cn(
          "flex items-center justify-center rounded-2xl bg-primary/10",
          variant === "compact" ? "mb-3 h-10 w-10" : "mb-4 h-14 w-14"
        )}>
          <div className={variant === "compact" ? "text-primary/60" : "text-primary/60"}>
            {icon}
          </div>
        </div>
      )}

      <h3 className={cn(
        "font-semibold text-foreground",
        variant === "compact" ? "text-sm" : "text-sm"
      )}>
        {title}
      </h3>

      {description && (
        <p className={cn(
          "mt-1.5 text-muted-foreground",
          variant === "compact" ? "text-xs" : "text-xs leading-relaxed"
        )}>
          {description}
        </p>
      )}

      {features && features.length > 0 && (
        <div className={cn(
          "flex flex-wrap gap-2",
          variant === "centered" ? "justify-center" : "",
          variant === "compact" ? "mt-3" : "mt-5"
        )}>
          {features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center rounded-full border border-border/40 bg-background px-3 py-1 text-[10px] font-medium text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      )}

      {action && (
        <Button
          variant="outline"
          size="sm"
          onClick={action.onClick}
          className={cn(
            "mt-4",
            variant === "compact" ? "h-7 text-xs" : ""
          )}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}

export { EmptyState }
