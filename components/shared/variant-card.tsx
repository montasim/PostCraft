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
  IconExternalLink,
} from "@tabler/icons-react"
import type { Variant } from "@/types"

interface VariantCardProps {
  variant: Variant
  copied: boolean
  onCopy: () => void
  badgeLabel?: string
  headerIcon?: React.ReactNode
  headerIconClassName?: string
  sourceLink?: { title: string; url: string }
  extraActions?: React.ReactNode
}

function VariantCard({
  variant,
  copied,
  onCopy,
  badgeLabel = "Recommended",
  headerIcon,
  headerIconClassName,
  sourceLink,
  extraActions,
}: VariantCardProps) {
  const isTop = variant.rank === 1

  return (
    <Card
      className={cn(
        "relative overflow-visible p-4 transition hover:shadow-md",
        isTop && "border-primary/40 ring-1 ring-primary/20"
      )}
    >
      {isTop && (
        <Badge className="absolute -top-3 left-6 grid-flow-col items-center gap-1 rounded-full px-2.5 py-1 text-[10px] leading-none font-bold tracking-wider text-primary-foreground uppercase shadow bg-linear-to-br from-primary to-chart-2">
          <IconStar className="h-3 w-3 fill-current" />
          {badgeLabel}
        </Badge>
      )}

      <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1">
        <div
          className={cn(
            "row-span-2 flex h-10 w-10 items-center justify-center rounded-full",
            headerIcon
              ? headerIconClassName
              : isTop
                ? "text-primary-foreground bg-linear-to-br from-primary to-chart-2"
                : "bg-muted text-muted-foreground"
          )}
        >
          {headerIcon ??
            (variant.rank === 1 ? (
              <IconTrophy className="h-5 w-5" />
            ) : variant.rank === 2 ? (
              <IconMedal className="h-5 w-5" />
            ) : (
              <IconAward className="h-5 w-5" />
            ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">#{variant.rank}</span>
          <div className="flex flex-wrap gap-1.5">
            <ScorePill
              label="Score"
              short="S"
              value={variant.score}
              color="score"
            />
            <ScorePill
              label="Engagement"
              short="E"
              value={variant.engagement}
              color="engagement"
            />
            <ScorePill
              label="Clarity"
              short="C"
              value={variant.clarity}
              color="clarity"
            />
            <ScorePill
              label="Formatting"
              short="F"
              value={variant.formatting}
              color="formatting"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{variant.style}</p>
          <p className="text-xs text-muted-foreground">{variant.language}</p>
        </div>
      </div>

      <Separator className="my-4" />

      {sourceLink && (
        <>
          <a
            href={sourceLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <IconExternalLink className="h-3 w-3 shrink-0" />
            <span className="truncate">{sourceLink.title}</span>
          </a>
          <Separator className="my-4" />
        </>
      )}

      <div className="space-y-3">
        <p className="text-base leading-snug">{variant.hook}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {variant.body}
        </p>
        <p className="text-sm font-medium">{variant.cta}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {variant.hashtags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <p className="mb-3 text-xs text-muted-foreground italic">
        {variant.reasoning}
      </p>
      <div className="flex items-center gap-1.5">
        {extraActions}
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          className={cn(
            "gap-1.5 text-xs",
            isTop &&
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
    </Card>
  )
}

export { VariantCard }
