"use client"

import { VariantCard } from "@/components/shared"
import { CarouselNavigation } from "@/components/features/generate/carousel-navigation"
import { useCarousel } from "@/hooks/use-carousel"
import { useClipboard } from "@/hooks/use-clipboard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Variant } from "@/types"
import { useAppSelector } from "@/store/hooks"
import { selectPersona } from "@/store/slices/workspace.slice"
import { setRefineData } from "@/lib/refine-store"
import {
  IconTrophy,
  IconLoader2,
  IconRefresh,
  IconAlertCircle,
  IconInbox,
  IconSparkles,
} from "@tabler/icons-react"

function formatVariantText(variant: Variant): string {
  return `${variant.hook}\n\n${variant.body}\n\n${variant.cta}\n\n${variant.hashtags.join(" ")}`
}

const STATUS_MESSAGES: Record<string, string> = {
  queued: "Added to queue. Your turn is coming...",
  generating: "Writing your first variant...",
  scoring: "Checking the score...",
  ranking: "Picking the winner...",
  submitting: "Wrapping up...",
}

const STATUS_HEADERS: Record<string, string> = {
  queued: "Added to queue",
  scoring: "Scoring engagement",
  ranking: "Picking the winner",
  submitting: "Finishing up",
}

interface PostVariantsCarouselProps {
  variants: Variant[]
  status: string
  postCount: number
  error?: string | null
  onRetry?: () => void
}

function PostVariantsCarousel({
  variants,
  status,
  postCount,
  error,
  onRetry,
}: PostVariantsCarouselProps) {
  const { ref, scrollLeft, scrollRight } = useCarousel()
  const { copy, isCopied } = useClipboard()
  const persona = useAppSelector(selectPersona)

  const isProcessing = ["queued", "generating", "scoring", "ranking"].includes(
    status
  )
  const isEmpty = status === "idle" && variants.length === 0

  if (isEmpty) {
    return (
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
            <IconTrophy className="h-5 w-5" />
            Write one post. Get three versions, ranked.
          </h2>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <IconSparkles className="h-7 w-7 text-primary/60" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Drop your topic above. PostCraft writes 3 variants, scores each,
              and tells you which one hits hardest.
            </h3>
            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Share your idea above and hit{" "}
              <span className="font-medium text-primary">Write My Post</span>.
              You'll get 3 social-ready versions, each scored for engagement,
              clarity, and readability.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {[
                "3 unique versions",
                "Scored and ranked",
                "Copy and post in seconds",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-border/40 bg-background px-3 py-1 text-[10px] font-medium text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (isProcessing) {
    return (
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <IconLoader2 className="h-5 w-5 animate-spin text-primary" />
            {status === "generating"
              ? `Writing variant 1 of ${postCount}`
              : STATUS_HEADERS[status] ?? "Processing"}
          </h2>
        </div>
        <div className="flex gap-4 overflow-hidden px-px py-4">
          {Array.from({ length: postCount }, (_, i) => i + 1).map((i) => (
            <Card key={i} className="w-[410px] shrink-0 space-y-4 p-4">
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
          <h3 className="text-sm font-semibold">Something went wrong</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {error ?? "We couldn't generate your post. We've been notified."}
          </p>
          {onRetry && (
            <Button variant="outline" onClick={onRetry} className="mt-4 gap-2">
              <IconRefresh className="h-4 w-4" />
              Retry
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
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <IconSparkles className="h-5 w-5 text-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {postCount} post{postCount !== 1 ? "s" : ""}, ready for your audience
          </p>
          <p className="text-[11px] text-muted-foreground">
            {variants.length} version{variants.length !== 1 ? "s" : ""} ranked by engagement score. Version #1 is
            your strongest.
          </p>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <IconTrophy className="h-5 w-5 text-chart-1" />
          Pick your best post
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
