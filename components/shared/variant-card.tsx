"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScorePill } from "@/components/shared/score-pill"
import { cn } from "@/lib/utils"
import {
  IconCopy,
  IconCheck,
  IconStar,
  IconTrophy,
  IconMedal,
  IconAward,
} from "@tabler/icons-react"
import type { Variant } from "@/types"

interface VariantCardProps {
  variant: Variant
  copied: boolean
  onCopy: () => void
}

function getRankIcon(rank: number) {
  if (rank === 1) return IconTrophy
  if (rank === 2) return IconMedal
  return IconAward
}

function VariantCard({ variant, copied, onCopy }: VariantCardProps) {
  const RankIcon = getRankIcon(variant.rank)
  const isTop = variant.rank === 1

  return (
    <Card
      className={cn(
        "relative overflow-visible p-5 transition hover:shadow-md",
        isTop && "border-primary/40 ring-1 ring-primary/20",
      )}
    >
      {isTop && (
        <Badge className="absolute -top-3 left-6 grid-flow-col items-center gap-1 rounded-full bg-gradient-to-r from-primary to-accent px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-wider text-primary-foreground shadow">
          <IconStar className="h-3 w-3 fill-current" />
          Recommended
        </Badge>
      )}

      <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1">
        <div
          className={cn(
            "row-span-2 flex h-10 w-10 items-center justify-center rounded-full",
            isTop
              ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          <RankIcon className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">#{variant.rank}</span>
          <div className="flex flex-wrap gap-1.5">
            <ScorePill label="Score" short="S" value={variant.score} color="chart-5" />
            <ScorePill label="Engagement" short="E" value={variant.engagement} color="chart-2" />
            <ScorePill label="Clarity" short="C" value={variant.clarity} color="chart-3" />
            <ScorePill label="Formatting" short="F" value={variant.formatting} color="primary" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{variant.style}</p>
          <p className="text-xs text-muted-foreground">{variant.language}</p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        <p className="text-base leading-snug">{variant.hook}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {variant.body}
        </p>
        <p className="text-sm font-medium text-primary">{variant.cta}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {variant.hashtags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs italic text-muted-foreground">
          {variant.reasoning}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          className={cn(
            "shrink-0 gap-1.5 text-xs",
            isTop && "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
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
    </Card>
  )
}

export { VariantCard }
