"use client"

import { CarouselNavigation } from "@/components/features/generate/carousel-navigation"
import { useCarousel } from "@/hooks/use-carousel"

interface VariantCarouselProps {
  children: React.ReactNode
}

function VariantCarousel({ children }: VariantCarouselProps) {
  const { ref, scrollLeft, scrollRight } = useCarousel()

  return (
    <div className="group relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-px py-5 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <CarouselNavigation
        onScrollLeft={scrollLeft}
        onScrollRight={scrollRight}
      />
    </div>
  )
}

export { VariantCarousel }
