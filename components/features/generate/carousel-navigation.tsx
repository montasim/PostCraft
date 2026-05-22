"use client"

import { Button } from "@/components/ui/button"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

interface CarouselNavigationProps {
  onScrollLeft: () => void
  onScrollRight: () => void
}

function CarouselNavigation({
  onScrollLeft,
  onScrollRight,
}: CarouselNavigationProps) {
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full opacity-0 shadow-md transition-opacity group-hover:opacity-100"
        onClick={onScrollLeft}
      >
        <IconChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full opacity-0 shadow-md transition-opacity group-hover:opacity-100"
        onClick={onScrollRight}
      >
        <IconChevronRight className="h-4 w-4" />
      </Button>
    </>
  )
}

export { CarouselNavigation }
