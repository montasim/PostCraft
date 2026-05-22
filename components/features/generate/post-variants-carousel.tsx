"use client"

import { VariantCard } from "@/components/shared"
import { CarouselNavigation } from "@/components/features/generate/carousel-navigation"
import { useCarousel } from "@/hooks/use-carousel"
import { useClipboard } from "@/hooks/use-clipboard"
import { VARIANTS } from "@/lib/constants"
import type { Variant } from "@/types"
import { IconTrophy } from "@tabler/icons-react"

function formatVariantText(variant: Variant): string {
  return `${variant.hook}\n\n${variant.body}\n\n${variant.cta}\n\n${variant.hashtags.join(" ")}`
}

function PostVariantsCarousel() {
  const { ref, scrollLeft, scrollRight } = useCarousel()
  const { copy, isCopied } = useClipboard()

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
            style={{ background: "color-mix(in oklab, var(--chart-1) 10%, transparent)" }}
          >
            Heuristic 40%
          </span>
          <span
            className="inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold text-chart-2"
            style={{ background: "color-mix(in oklab, var(--chart-2) 10%, transparent)" }}
          >
            Judge LLM 40%
          </span>
          <span
            className="inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold text-chart-3"
            style={{ background: "color-mix(in oklab, var(--chart-3) 10%, transparent)" }}
          >
            Structure 20%
          </span>
        </div>
      </div>
      <div className="group relative">
        <div
          ref={ref}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-px py-5 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {VARIANTS.map((variant) => (
            <div
              key={variant.rank}
              className="w-[90%] shrink-0 snap-start md:w-[400px] lg:w-[410px]"
            >
              <VariantCard
                variant={variant}
                copied={isCopied(variant.rank)}
                onCopy={() =>
                  copy(formatVariantText(variant), variant.rank)
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
