"use client"

import { IconFlame } from "@tabler/icons-react"
import { POSTS_USED, PLAN_LIMIT } from "@/lib/constants"
import { getQuotaMessage, getQuotaFooter } from "@/lib/quota-text"

interface PlanQuotaCardProps {
  used?: number
  limit?: number
}

function PlanQuotaCard({
  used = POSTS_USED,
  limit = PLAN_LIMIT,
}: PlanQuotaCardProps) {
  const remaining = limit - used

  return (
    <div className="rounded-xl border border-sidebar-border bg-card/40 p-3 text-sidebar-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20">
            <IconFlame className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <p className="text-sm leading-none">
              {remaining > 0
                ? `${remaining} generations left`
                : "Plan limit reached"}
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
                  ? "bg-orange-400"
                  : "bg-orange-400/60"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      <p className="mt-1.5 text-[10px] text-muted-foreground/60">
        {getQuotaFooter(used, limit)}
      </p>
    </div>
  )
}

export { PlanQuotaCard }
