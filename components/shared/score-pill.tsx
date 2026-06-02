"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ScorePillProps {
  label: string
  short: string
  value: number
  color: string
}

const COLOR_MAP: Record<string, string> = {
  primary: "text-primary",
  "chart-1": "text-chart-1",
  "chart-2": "text-chart-2",
  "chart-3": "text-chart-3",
  "chart-4": "text-chart-4",
  "chart-5": "text-chart-5",
  score: "text-emerald-600 dark:text-emerald-400",
  engagement: "text-amber-600 dark:text-amber-400",
  clarity: "text-sky-600 dark:text-sky-400",
  formatting: "text-violet-600 dark:text-violet-400",
}

const BG_MAP: Record<string, string> = {
  score: "bg-emerald-600/10 dark:bg-emerald-400/10",
  engagement: "bg-amber-600/10 dark:bg-amber-400/10",
  clarity: "bg-sky-600/10 dark:bg-sky-400/10",
  formatting: "bg-violet-600/10 dark:bg-violet-400/10",
}

function ScorePill({ label, short, value, color }: ScorePillProps) {
  const bgOverride = BG_MAP[color]
  const bgStyle = bgOverride
    ? undefined
    : { background: `color-mix(in oklab, var(--${color}) 10%, transparent)` }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${COLOR_MAP[color] ?? "text-foreground"} ${bgOverride ?? ""}`}
            style={bgStyle}
          >
            <span className="opacity-60">{short}</span>
            {value}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {label}: {value}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ScorePill }
