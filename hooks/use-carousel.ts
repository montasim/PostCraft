"use client"

import { useRef, useCallback } from "react"

function useCarousel() {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = useCallback((direction: "left" | "right") => {
    if (!ref.current) return
    const delta = ref.current.offsetWidth * 0.5
    ref.current.scrollBy({
      left: direction === "left" ? -delta : delta,
      behavior: "smooth",
    })
  }, [])

  const scrollLeft = useCallback(() => scroll("left"), [scroll])
  const scrollRight = useCallback(() => scroll("right"), [scroll])

  return { ref, scrollLeft, scrollRight }
}

export { useCarousel }
