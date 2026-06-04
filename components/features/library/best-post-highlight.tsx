"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScorePill } from "@/components/shared/score-pill"
import { cn } from "@/lib/utils"
import { IconTrophy, IconCopy, IconCheck } from "@tabler/icons-react"
import type { LibraryEntry } from "@/types"

interface BestPostHighlightProps {
  entry: LibraryEntry
  copied: boolean
  onCopy: () => void
}

function BestPostHighlight({ entry, copied, onCopy }: BestPostHighlightProps) {
  const bestVariant = entry.variants.reduce((best, v) =>
    v.score > best.score ? v : best
  )

  return (
    <Card
      className={cn(
        "relative overflow-visible p-4",
        "border-primary/40 ring-1 ring-primary/20"
      )}
    >
      <Badge className="absolute -top-3 left-6 grid-flow-col items-center gap-1 rounded-full bg-linear-to-br from-primary to-chart-2 px-2.5 py-1 text-[10px] leading-none font-bold tracking-wider text-primary-foreground uppercase shadow">
        <IconTrophy className="h-3 w-3 fill-current" />
        Your best post
      </Badge>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <p className="text-sm font-semibold">{entry.topic}</p>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {bestVariant.hook}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-1.5">
            <ScorePill
              label="Score"
              short="S"
              value={bestVariant.score}
              color="score"
            />
            <ScorePill
              label="Engagement"
              short="E"
              value={bestVariant.engagement}
              color="engagement"
            />
            <ScorePill
              label="Clarity"
              short="C"
              value={bestVariant.clarity}
              color="clarity"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onCopy}
            className={cn(
              "gap-1.5 text-xs",
              "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
            )}
          >
            {copied ? (
              <>
                <IconCheck className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <IconCopy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export { BestPostHighlight }
