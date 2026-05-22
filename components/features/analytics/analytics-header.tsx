"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconChartBar } from "@tabler/icons-react"

function AnalyticsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        
      </div>
      <div className="flex items-center gap-4">
        <p className="hidden text-xs text-muted-foreground sm:block">
          Last updated: just now
        </p>
        <Tabs defaultValue="30d">
          <TabsList className="h-8">
            <TabsTrigger value="7d" className="text-xs">7d</TabsTrigger>
            <TabsTrigger value="30d" className="text-xs">30d</TabsTrigger>
            <TabsTrigger value="90d" className="text-xs">90d</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

export { AnalyticsHeader }
