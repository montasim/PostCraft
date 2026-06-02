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
    <div
      className={cn(
        "rounded-xl border bg-card/40 p-3 text-sidebar-foreground transition-colors",
        isLow
          ? "border-amber-200/60 bg-amber-50/40 dark:border-amber-800/30 dark:bg-amber-950/20"
          : "border-sidebar-border"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100/60 dark:bg-amber-900/30">
            <IconFlame className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm leading-none">
              {remaining > 0
                ? `${remaining} posts left`
                : "You're out of free posts."}
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
                  ? "bg-amber-500 dark:bg-amber-400"
                  : "bg-amber-500/60 dark:bg-amber-400/60"
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
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-100/60 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-200/60 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-800/40"
        >
          <IconCrown className="h-3.5 w-3.5" />
          Upgrade to Pro
        </button>
      )}
    </div>
  )
}

export { PlanQuotaCard }
