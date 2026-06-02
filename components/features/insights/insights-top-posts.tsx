"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScorePill } from "@/components/shared/score-pill"
import { IconTrophy, IconMedal, IconAward } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import type { TopPerformingPost } from "@/types"

function AnalyticsTopPosts({ posts }: { posts: TopPerformingPost[] }) {
  if (posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <IconTrophy className="h-4 w-4 text-chart-1" />
            Top Performing Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-muted-foreground">
            Data starts after your first post. Generate one and come back — your
            best performer will show up here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconTrophy className="h-4 w-4 text-chart-1" />
          Top Performing Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {posts.map((post, i) => (
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
                  <span className="text-[10px] text-muted-foreground">
                    {post.date}
                  </span>
                </div>
                <div className="mt-1.5 flex gap-1.5">
                  <ScorePill
                    label="Score"
                    short="S"
                    value={post.score}
                    color="score"
                  />
                  <ScorePill
                    label="Engagement"
                    short="E"
                    value={post.engagement}
                    color="engagement"
                  />
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
