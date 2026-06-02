"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconChartBar, IconSparkles } from "@tabler/icons-react"

function InsightsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <IconSparkles className="h-5 w-5 text-primary" />
        <div>
          <p className="text-sm font-semibold">Performance</p>
          <p className="text-xs text-muted-foreground">
            Your content insights
          </p>
        </div>
      </div>
    </div>
  )
}

export { InsightsHeader }
