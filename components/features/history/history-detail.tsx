"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VariantCard } from "@/components/shared/variant-card"
import { BrandGuardPanel } from "@/components/features/generate/brand-guard-panel"
import { CarouselNavigation } from "@/components/features/generate/carousel-navigation"
import { useCarousel } from "@/hooks/use-carousel"
import type { HistoryEntry } from "@/types"
import { IconTrophy } from "@tabler/icons-react"

function formatVariantText(v: {
  hook: string
  body: string
  cta: string
  hashtags: string[]
}) {
  return `${v.hook}\n\n${v.body}\n\n${v.cta}\n\n${v.hashtags.join(" ")}`
}

function OriginalInputCard({ entry }: { entry: HistoryEntry }) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Original input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Topic */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground">Topic</p>
          <div className="min-h-[200px] rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm leading-relaxed dark:bg-input/30">
            {entry.topic}
          </div>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground">
              Audience
            </p>
            <div className="flex flex-wrap gap-1">
              {entry.audience.map((a) => (
                <Badge key={a} variant="secondary" className="text-[10px]">
                  {a}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground">Tone</p>
            <div className="flex flex-wrap gap-1">
              {entry.tones.map((t) => (
                <Badge key={t} variant="secondary" className="text-[10px]">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground">
              Language
            </p>
            <Badge variant="secondary" className="text-[10px]">
              {entry.language.join(", ")}
            </Badge>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground">
              Emoji
            </p>
            <Badge variant="secondary" className="text-[10px]">
              {entry.includeEmoji ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function VariantCardWrapper({ variant }: { variant: import("@/types").Variant }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatVariantText(variant))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return <VariantCard variant={variant} copied={copied} onCopy={handleCopy} />
}

function HistoryDetail({ entry }: { entry: HistoryEntry & { guardrails?: { id: string; category: "tone" | "format" | "banned" | "custom"; rule: string; isActive: boolean }[] } }) {
  const { ref, scrollLeft, scrollRight } = useCarousel()

  return (
    <div className="space-y-5">
      {/* Two-column: input card + brand guard */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <OriginalInputCard entry={entry} />
        <BrandGuardPanel showButton={false} title="Used Brand Guard" guardrails={entry.guardrails} />
      </div>

      {/* Ranked variants carousel */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <IconTrophy className="h-5 w-5 text-chart-1" />
            Ranked variants
          </h2>
          <div className="flex gap-1.5">
            <span
              className="inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold text-chart-1"
              style={{
                background:
                  "color-mix(in oklab, var(--chart-1) 10%, transparent)",
              }}
            >
              Heuristic 40%
            </span>
            <span
              className="inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold text-chart-2"
              style={{
                background:
                  "color-mix(in oklab, var(--chart-2) 10%, transparent)",
              }}
            >
              Judge LLM 40%
            </span>
            <span
              className="inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold text-chart-3"
              style={{
                background:
                  "color-mix(in oklab, var(--chart-3) 10%, transparent)",
              }}
            >
              Structure 20%
            </span>
          </div>
        </div>
        <div className="group relative">
          <div
            ref={ref}
            className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto px-px py-5 [&::-webkit-scrollbar]:hidden"
          >
            {entry.variants.map((variant) => (
              <div
                key={variant.rank}
                className="w-[90%] shrink-0 snap-start md:w-[400px] lg:w-[410px]"
              >
                <VariantCardWrapper variant={variant} />
              </div>
            ))}
          </div>
          <CarouselNavigation
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
          />
        </div>
      </section>
    </div>
  )
}

export { HistoryDetail }
