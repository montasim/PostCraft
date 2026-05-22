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
  "chart-2": "text-chart-2",
  "chart-3": "text-chart-3",
  "chart-5": "text-chart-5",
}

function ScorePill({ label, short, value, color }: ScorePillProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${COLOR_MAP[color] ?? "text-foreground"}`}
            style={{
              background: `color-mix(in oklab, var(--${color}) 10%, transparent)`,
            }}
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
