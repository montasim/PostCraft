"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { IconFlame, IconTarget } from "@tabler/icons-react"

interface StreakWidgetProps {
  streakDays: number
  weeklyGoal: number
  weeklyProgress: number
  className?: string
}

function StreakWidget({ streakDays, weeklyGoal, weeklyProgress, className }: StreakWidgetProps) {
  const percent = Math.round((weeklyProgress / weeklyGoal) * 100)
  const isOnFire = streakDays >= 3

  return (
    <div className={cn("rounded-xl border border-sidebar-border bg-card/40 p-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg",
            isOnFire ? "bg-chart-5/20" : "bg-muted"
          )}>
            <IconFlame className={cn("h-4 w-4", isOnFire ? "text-chart-4" : "text-muted-foreground")} />
          </div>
          <div>
            <p className="text-xs font-semibold leading-none">
              {streakDays}-day streak
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              {isOnFire ? "Your audience expects your next post" : "One post away from starting your streak"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2.5">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <IconTarget className="h-3 w-3" />
            Your weekly output
          </span>
          <span>{weeklyProgress}/{weeklyGoal}</span>
        </div>
        <Progress value={percent} className="mt-1 h-1.5" />
      </div>
    </div>
  )
}

export { StreakWidget }
