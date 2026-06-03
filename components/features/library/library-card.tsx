"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScorePill } from "@/components/shared/score-pill"
import { VariantCard } from "@/components/shared/variant-card"
import { cn } from "@/lib/utils"
import { IconChevronDown, IconStack2 } from "@tabler/icons-react"
import type { LibraryEntry } from "@/types"
import { useAppSelector } from "@/store/hooks"
import { selectPersona } from "@/store/slices/workspace.slice"

const STATUS_STYLES: Record<string, string> = {
  published: "bg-chart-2/15 text-chart-2",
  draft: "bg-chart-3/15 text-chart-3",
  archived: "bg-muted text-muted-foreground",
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

interface LibraryCardProps {
  entry: LibraryEntry
  expanded: boolean
  onToggle: () => void
}

function LibraryCard({ entry, expanded, onToggle }: LibraryCardProps) {
  const bestVariant = entry.variants.reduce((best, v) =>
    v.score > best.score ? v : best
  )

  return (
    <div className="space-y-3">
      {/* Collapsed topic card */}
      <Card
        className={cn(
          "cursor-pointer p-4 transition hover:shadow-md",
          expanded && "ring-1 ring-primary/20"
        )}
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug">{entry.topic}</p>
          <IconChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
              expanded && "rotate-180"
            )}
          />
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatRelativeDate(entry.createdAt)}
          </span>
          <span className="text-muted-foreground/30">·</span>
          <Badge
            variant="secondary"
            className={cn("text-[10px]", STATUS_STYLES[entry.status])}
          >
            {entry.status}
          </Badge>
          <Badge variant="secondary" className="gap-1 text-[10px] font-normal">
            <IconStack2 className="h-3 w-3" />
            {entry.variants.length} variants
          </Badge>
          <ScorePill
            label="Best score"
            short="S"
            value={bestVariant.score}
            color="score"
          />
        </div>
      </Card>

      {/* Expanded variant cards */}
      {expanded && (
        <div className="space-y-3 pl-2">
          {entry.variants.map((variant) => (
            <VariantCardWrapper key={variant.rank} variant={variant} />
          ))}
        </div>
      )}
    </div>
  )
}

function VariantCardWrapper({ variant }: { variant: import("@/types").Variant }) {
  const [copied, setCopied] = useState(false)
  const persona = useAppSelector(selectPersona)

  const handleCopy = async () => {
    const text = `${variant.hook}\n\n${variant.body}\n\n${variant.cta}\n\n${variant.hashtags.join(" ")}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return <VariantCard variant={variant} copied={copied} onCopy={handleCopy} customHashtags={persona?.customHashtags} />
}

export { LibraryCard }
