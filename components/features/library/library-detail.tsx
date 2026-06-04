"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VariantCard } from "@/components/shared/variant-card"
import { VariantCarousel } from "@/components/shared/variant-carousel"
import { BrandGuardPanel } from "@/components/features/generate/brand-guard-panel"
import type { LibraryEntry } from "@/types"
import { useAppSelector } from "@/store/hooks"
import { selectPersona } from "@/store/slices/workspace.slice"
import { IconTrophy, IconFileText, IconRefresh } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { setRefineData } from "@/lib/refine-store"

function formatVariantText(v: {
  hook: string
  body: string
  cta: string
  hashtags: string[]
}) {
  return `${v.hook}\n\n${v.body}\n\n${v.cta}\n\n${v.hashtags.join(" ")}`
}

function OriginalInputCard({ entry }: { entry: LibraryEntry }) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <IconFileText className="h-4 w-4 text-primary" />
          Original input
        </CardTitle>
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
            <p className="text-xs font-semibold text-muted-foreground">Emoji</p>
            <Badge variant="secondary" className="text-[10px]">
              {entry.includeEmoji ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function VariantCardWrapper({
  variant,
}: {
  variant: import("@/types").Variant
}) {
  const [copied, setCopied] = useState(false)
  const persona = useAppSelector(selectPersona)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatVariantText(variant))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <VariantCard 
      variant={variant} 
      copied={copied} 
      onCopy={handleCopy} 
      customHashtags={persona?.customHashtags} 
      extraActions={
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setRefineData({
              topic: `${variant.hook}\n\n${variant.body}\n\n${variant.cta}`,
              audiences: [],
              tones: [variant.style],
              languages: [variant.language],
            })
            window.location.href = "/"
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

function LibraryDetail({
  entry,
}: {
  entry: LibraryEntry & {
    guardrails?: {
      id: string
      category: "tone" | "format" | "banned" | "custom"
      rule: string
      isActive: boolean
    }[]
  }
}) {
  return (
    <div className="space-y-4">
      {/* Two-column: input card + brand guard */}
      <div className="flex flex-col items-stretch gap-4 lg:flex-row">
        <div className="min-w-0 flex-1 flex">
          <OriginalInputCard entry={entry} />
        </div>
        <div className="relative hidden w-[40%] shrink-0 lg:block">
          <div className="absolute inset-0">
            <BrandGuardPanel
              showButton={false}
              title="Used Brand Guard"
              guardrails={entry.guardrails}
              className="flex h-full max-h-none w-full flex-col md:w-full"
            />
          </div>
        </div>
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
        <VariantCarousel>
          {entry.variants.map((variant) => (
            <div
              key={variant.rank}
              className="w-[90%] shrink-0 snap-start md:w-[400px] lg:w-[410px]"
            >
              <VariantCardWrapper variant={variant} />
            </div>
          ))}
        </VariantCarousel>
      </section>
    </div>
  )
}

export { LibraryDetail }
