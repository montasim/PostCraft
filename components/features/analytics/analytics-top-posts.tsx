"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScorePill } from "@/components/shared/score-pill"
import { TOP_POSTS } from "@/lib/constants"
import { IconTrophy, IconMedal, IconAward } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"

function AnalyticsTopPosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconTrophy className="h-4 w-4 text-chart-1" />
          Top Performing Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {TOP_POSTS.map((post, i) => (
          <div key={i}>
            {i > 0 && <Separator className="my-3" />}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                {i === 0 ? (
                  <IconTrophy className="h-3.5 w-3.5 text-chart-1" />
                ) : i === 1 ? (
                  <IconMedal className="h-3.5 w-3.5 text-chart-2" />
                ) : (
                  <IconAward className="h-3.5 w-3.5 text-chart-3" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{post.topic}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {post.style}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{post.date}</span>
                </div>
                <div className="mt-1.5 flex gap-1.5">
                  <ScorePill label="Score" short="S" value={post.score} color="chart-5" />
                  <ScorePill label="Engagement" short="E" value={post.engagement} color="chart-2" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export { AnalyticsTopPosts }
