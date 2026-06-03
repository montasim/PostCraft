import { IconActivity } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export interface HighDemandCardProps {
  className?: string
}

export function HighDemandCard({ className }: HighDemandCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-red-200 bg-red-50/50 p-3 text-red-800 transition-colors dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-300",
        className
      )}
    >
      <div className="flex items-center gap-2 font-medium">
        <IconActivity className="h-4 w-4 shrink-0" />
        <span className="text-sm leading-none">High Demand</span>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed opacity-90">
        High traffic volume. Generations are temporarily paused — try again in a few minutes.
      </p>
    </div>
  )
}
