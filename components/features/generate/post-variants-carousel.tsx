"use client"

import { VariantCard } from "@/components/shared"
import { CarouselNavigation } from "@/components/features/generate/carousel-navigation"
import { useCarousel } from "@/hooks/use-carousel"
import { useClipboard } from "@/hooks/use-clipboard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Variant } from "@/types"
import { IconTrophy, IconLoader2, IconRefresh, IconAlertCircle, IconInbox } from "@tabler/icons-react"

function formatVariantText(variant: Variant): string {
  return `${variant.hook}\n\n${variant.body}\n\n${variant.cta}\n\n${variant.hashtags.join(" ")}`
}

const STATUS_MESSAGES: Record<string, string> = {
  queued: "Queued for generation...",
  generating: "AI is crafting your posts...",
  scoring: "Evaluating quality & engagement...",
  ranking: "Ranking best variants...",
  submitting: "Submitting...",
}

const STATUS_HEADERS: Record<string, string> = {
  queued: "Preparing generation",
  generating: "Generating variants",
  scoring: "Scoring variants",
  ranking: "Ranking variants",
  submitting: "Submitting",
}

interface PostVariantsCarouselProps {
  variants: Variant[]
  status: string
  error?: string | null
  onRetry?: () => void
}

function PostVariantsCarousel({ variants, status, error, onRetry }: PostVariantsCarouselProps) {
  const { ref, scrollLeft, scrollRight } = useCarousel()
  const { copy, isCopied } = useClipboard()

  const isProcessing = ["queued", "generating", "scoring", "ranking"].includes(status)
  const isEmpty = status === "idle" && variants.length === 0

  if (isEmpty) {
    return null
  }

  if (isProcessing) {
    return (
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <IconLoader2 className="h-5 w-5 animate-spin text-primary" />
            {STATUS_HEADERS[status] ?? "Processing"}
          </h2>
        </div>
        <div className="flex gap-4 overflow-hidden px-px py-5">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-[410px] shrink-0 space-y-4 p-5">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-24" />
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {STATUS_MESSAGES[status] ?? "Processing..."}
        </p>
      </section>
    )
  }

  if (status === "failed") {
    return (
      <section>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
            <IconAlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-sm font-semibold">Generation failed</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {error ?? "Something went wrong. Please try again."}
          </p>
          {onRetry && (
            <Button variant="outline" onClick={onRetry} className="mt-4 gap-2">
              <IconRefresh className="h-4 w-4" />
              Try again
            </Button>
          )}
        </div>
      </section>
    )
  }

  if (variants.length === 0) {
    return null
  }

  return (
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
          {variants.map((variant) => (
            <div
              key={variant.rank}
              className="w-[90%] shrink-0 snap-start md:w-[400px] lg:w-[410px]"
            >
              <VariantCard
                variant={variant}
                copied={isCopied(variant.rank)}
                onCopy={() => copy(formatVariantText(variant), variant.rank)}
              />
            </div>
          ))}
        </div>
        <CarouselNavigation
          onScrollLeft={scrollLeft}
          onScrollRight={scrollRight}
        />
      </div>
    </section>
  )
}

export { PostVariantsCarousel }
