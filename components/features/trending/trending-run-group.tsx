"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  IconChevronDown,
  IconChevronRight,
  IconAlertCircle,
  IconBrandGithub,
  IconBrandReddit,
  IconRefresh,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { setRefineData } from "@/lib/refine-store"
import { VariantCard } from "@/components/shared/variant-card"
import type { Variant } from "@/types"
import type {
  ITrendingRun,
  TrendingGenerationPreview,
  TrendingPlatform,
} from "@/modules/trending/trending.types"

const PLATFORM_ABBREV: Record<TrendingPlatform, string> = {
  hackernews: "HN",
  devto: "Dev.to",
  github: "GitHub",
  reddit: "Reddit",
}

const SOURCE_META: Record<
  TrendingPlatform,
  { icon: React.ReactNode; className: string }
> = {
  hackernews: { icon: "Y", className: "bg-orange-600 text-white" },
  devto: { icon: "D", className: "bg-purple-600 text-white" },
  github: {
    icon: <IconBrandGithub className="h-5 w-5" />,
    className: "bg-slate-700 text-white",
  },
  reddit: {
    icon: <IconBrandReddit className="h-5 w-5" />,
    className: "bg-red-600 text-white",
  },
}

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-600",
  running: "bg-blue-500/10 text-blue-600 animate-pulse",
  failed: "bg-red-500/10 text-red-600",
}

function toVariant(gen: TrendingGenerationPreview): {
  variant: Variant
  source: { icon: React.ReactNode; className: string }
} | null {
  const v = gen.topVariant
  if (!v) return null
  return {
    variant: {
      rank: gen.sourceItem.rank,
      style: v.styleType,
      language: v.language,
      score: v.score,
      engagement: v.engagement,
      clarity: v.clarity,
      formatting: v.formatting,
      hook: v.hook,
      body: v.body,
      cta: v.cta,
      hashtags: v.hashtags,
      reasoning: v.judgeReasoning,
    },
    source: SOURCE_META[gen.sourceItem.source],
  }
}

interface TrendingRunGroupProps {
  dateLabel: string
  runs: ITrendingRun[]
  generations: TrendingGenerationPreview[]
  defaultExpanded?: boolean
}

function TrendingRunGroup({
  dateLabel,
  runs,
  generations,
  defaultExpanded = false,
}: TrendingRunGroupProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {dateLabel}
      </p>
      <div className="space-y-3">
        {runs.map((run) => (
          <RunItem
            key={run._id}
            run={run}
            generations={generations.filter((g) => g.runId === run._id)}
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
          />
        ))}
      </div>
    </div>
  )
}

function RunItem({
  run,
  generations,
  expanded,
  onToggle,
}: {
  run: ITrendingRun
  generations: TrendingGenerationPreview[]
  expanded: boolean
  onToggle: () => void
}) {
  const platformSummary = run.configSnapshot.platforms
    .map((p) => PLATFORM_ABBREV[p])
    .join(" + ")
  const time = run.ranAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <div className="rounded-lg border bg-card">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-4 py-3 text-left"
      >
        {expanded ? (
          <IconChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <IconChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-xs font-medium">{time}</span>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">
          {run.generationIds.length} posts generated
        </span>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">{platformSummary}</span>
        <span className="text-xs text-muted-foreground">·</span>
        <Badge
          variant="secondary"
          className={cn("text-[10px]", STATUS_STYLES[run.status])}
        >
          {run.status}
        </Badge>
      </button>

      {expanded && (
        <div className="border-t p-4">
          {run.status === "failed" ? (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <IconAlertCircle className="h-4 w-4" />
              Error: {run.error}
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {generations.map((gen) => (
                <TrendingVariant key={gen.generationId} generation={gen} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function TrendingVariant({
  generation,
}: {
  generation: TrendingGenerationPreview
}) {
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const mapped = toVariant(generation)
  if (!mapped) return null

  const { variant, source } = mapped
  const v = generation.topVariant!
  const fullBody = `${v.hook}\n\n${v.body}\n\n${v.cta}\n\n${v.hashtags.join(" ")}`

  async function handleCopy() {
    await navigator.clipboard.writeText(fullBody)
    setCopied(true)
    toast.success("Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <VariantCard
      variant={variant}
      copied={copied}
      onCopy={handleCopy}
      badgeLabel="Top Trending"
      headerIcon={source.icon}
      headerIconClassName={source.className}
      sourceLink={{
        title: generation.sourceItem.title,
        url: generation.sourceItem.url,
      }}
      extraActions={
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setRefineData({
              topic: `${v.hook}\n\n${v.body}\n\n${v.cta}`,
              audiences: [],
              tones: [v.styleType],
              languages: [v.language],
            })
            router.push("/")
          }}
          className="gap-1 text-xs"
        >
          <IconRefresh className="h-3.5 w-3.5" />
          Refine
        </Button>
      }
    />
  )
}

export { TrendingRunGroup, TrendingVariant }
