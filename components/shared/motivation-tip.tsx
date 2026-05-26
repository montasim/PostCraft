"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { IconBulb } from "@tabler/icons-react"

const TIPS = [
  "Posts with questions get 2x more comments.",
  "Share a failure story — vulnerability builds trust.",
  "Contrarian takes perform 40% better than generic advice.",
  "The first 3 words of your hook determine 80% of engagement.",
  "Post between 8–10 AM for maximum reach.",
  "Personal stories outperform listicles by 3x.",
  "Use 'you' in your first sentence to hook the reader.",
  "Data-backed claims get shared 5x more.",
  "End with a question to drive comments.",
  "One strong opinion > five weak ones.",
]

function MotivationTip({ className }: { className?: string }) {
  const tip = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    )
    return TIPS[dayOfYear % TIPS.length]
  }, [])

  return (
    <div className={cn("rounded-lg border border-primary/10 bg-primary/5 px-3 py-2", className)}>
      <div className="flex items-start gap-2">
        <IconBulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
        <div>
          <p className="text-[10px] font-medium text-primary uppercase tracking-wider">Pro tip</p>
          <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{tip}</p>
        </div>
      </div>
    </div>
  )
}

export { MotivationTip }
