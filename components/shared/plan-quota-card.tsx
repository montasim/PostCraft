"use client"

import { cn } from "@/lib/utils"
import { IconFlame, IconCrown } from "@tabler/icons-react"
import { PLAN_LIMIT } from "@/lib/constants"
import { getQuotaMessage, getQuotaFooter } from "@/lib/quota-text"

interface PlanQuotaCardProps {
  used?: number
  limit?: number
  onUpgradeClick?: () => void
}

function PlanQuotaCard({
  used = 0,
  limit = PLAN_LIMIT,
  onUpgradeClick,
}: PlanQuotaCardProps) {
  const remaining = limit - used
  const isLow = remaining > 0 && remaining <= 2
  const isExceeded = remaining <= 0

  return (
    <div className={cn(
      "rounded-xl border bg-card/40 p-3 text-sidebar-foreground transition-colors",
      isLow ? "border-chart-4/40 bg-chart-4/5" : "border-sidebar-border"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-4/20">
            <IconFlame className="h-5 w-5 text-chart-4" />
          </div>
          <div>
            <p className="text-sm leading-none">
              {remaining > 0
                ? `${remaining} AI generations left`
                : "All posts used this period"}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {getQuotaMessage(used, limit)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-1">
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              i < used
                ? i < used - 1
                  ? "bg-chart-4"
                  : "bg-chart-4/60"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      <p className="mt-1.5 text-[10px] text-muted-foreground/60">
        {getQuotaFooter(used, limit)}
      </p>

      {isExceeded && (
        <button
          onClick={onUpgradeClick}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-chart-4/15 px-3 py-1.5 text-xs font-medium text-chart-4 transition-colors hover:bg-chart-4/25"
        >
          <IconCrown className="h-3.5 w-3.5" />
          Upgrade to Pro
        </button>
      )}
    </div>
  )
}

export { PlanQuotaCard }
