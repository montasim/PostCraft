"use client"

import { useState, useMemo } from "react"
import { HISTORY_ENTRIES, PAGE_SIZE, SCORE_RANGES } from "@/lib/constants"
import type { HistoryEntry, HistoryFilterState } from "@/types"

const DEFAULT_FILTERS: HistoryFilterState = {
  search: "",
  styles: [],
  languages: [],
  scoreRange: "all",
  sort: "newest",
}

function useHistoryFilters() {
  const [filters, setFilters] = useState<HistoryFilterState>(DEFAULT_FILTERS)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const bestScore = (e: HistoryEntry) =>
    Math.max(...e.variants.map((v) => v.score))

  const bestEngagement = (e: HistoryEntry) =>
    Math.max(...e.variants.map((v) => v.engagement))

  const filteredEntries = useMemo(() => {
    let result = [...HISTORY_ENTRIES]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((e) => e.topic.toLowerCase().includes(q))
    }

    if (filters.styles.length > 0) {
      result = result.filter((e) =>
        e.variants.some((v) => filters.styles.includes(v.style))
      )
    }

    if (filters.languages.length > 0) {
      result = result.filter((e) =>
        e.variants.some((v) => filters.languages.includes(v.language))
      )
    }

    if (filters.scoreRange !== "all") {
      const range = SCORE_RANGES.find((r) => r.id === filters.scoreRange)
      if (range) {
        result = result.filter(
          (e) => bestScore(e) >= range.min && bestScore(e) <= range.max
        )
      }
    }

    switch (filters.sort) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        break
      case "highest-score":
        result.sort((a, b) => bestScore(b) - bestScore(a))
        break
      case "most-engaging":
        result.sort((a, b) => bestEngagement(b) - bestEngagement(a))
        break
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }

    return result
  }, [filters])

  const visibleEntries = useMemo(
    () => filteredEntries.slice(0, visibleCount),
    [filteredEntries, visibleCount]
  )

  const hasMore = visibleCount < filteredEntries.length
  const loadMore = () => setVisibleCount((c) => c + PAGE_SIZE)

  const bestEntry = useMemo(() => {
    const scoreOf = (e: HistoryEntry) =>
      Math.max(...e.variants.map((v) => v.score))
    return HISTORY_ENTRIES.reduce<HistoryEntry | null>(
      (best, e) => (!best || scoreOf(e) > scoreOf(best) ? e : best),
      null
    )
  }, [])

  const stats = useMemo(() => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisWeekCount = HISTORY_ENTRIES.filter(
      (e) => new Date(e.createdAt) >= weekAgo
    ).length

    const scores = HISTORY_ENTRIES.flatMap((e) => e.variants.map((v) => v.score))
    const topScore = Math.max(...scores)
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let streakDays = 0
    const checkDate = new Date(today)
    let iterating = true
    while (iterating) {
      const dayStr = checkDate.toISOString().slice(0, 10)
      const hasPost = HISTORY_ENTRIES.some(
        (e) => e.createdAt.slice(0, 10) === dayStr
      )
      if (hasPost) {
        streakDays++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        iterating = false
      }
    }

    return {
      totalCount: HISTORY_ENTRIES.length,
      thisWeekCount,
      bestScore: topScore,
      avgScore,
      streakDays,
    }
  }, [])

  return {
    filters,
    setFilters,
    filteredEntries,
    visibleEntries,
    hasMore,
    loadMore,
    bestEntry,
    stats,
    allEntries: HISTORY_ENTRIES,
  }
}

export { useHistoryFilters }
