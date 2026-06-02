"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { API, PAGE_SIZE, SCORE_RANGES } from "@/lib/constants"
import type { HistoryEntry, HistoryFilterState } from "@/types"

const DEFAULT_FILTERS: HistoryFilterState = {
  search: "",
  styles: [],
  languages: [],
  scoreRange: "all",
  sort: "newest",
}

interface HistoryStats {
  totalCount: number
  thisWeekCount: number
  bestScore: number
  avgScore: number
  streakDays: number
}

function useHistoryFilters() {
  const [filters, setFilters] = useState<HistoryFilterState>(DEFAULT_FILTERS)
  const [allEntries, setAllEntries] = useState<HistoryEntry[]>([])
  const [bestEntry, setBestEntry] = useState<HistoryEntry | null>(null)
  const [stats, setStats] = useState<HistoryStats>({
    totalCount: 0,
    thisWeekCount: 0,
    bestScore: 0,
    avgScore: 0,
    streakDays: 0,
  })
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const buildParams = useCallback(
    (pageNum: number) => {
      const params = new URLSearchParams()
      if (filters.search) params.set("search", filters.search)
      if (filters.styles.length > 0)
        params.set("styles", filters.styles.join(","))
      if (filters.languages.length > 0)
        params.set("languages", filters.languages.join(","))
      if (filters.scoreRange !== "all") {
        const range = SCORE_RANGES.find((r) => r.id === filters.scoreRange)
        if (range) {
          params.set("scoreMin", String(range.min))
          params.set("scoreMax", String(range.max))
        }
      }
      params.set("sort", filters.sort)
      params.set("page", String(pageNum))
      params.set("limit", String(PAGE_SIZE))
      return params
    },
    [filters]
  )

  const fetchEntries = useCallback(
    async (pageNum: number) => {
      try {
        setLoading(true)
        setError(null)
        const params = buildParams(pageNum)
        const res = await fetch(`${API.HISTORY}?${params}`)
        if (!res.ok) throw new Error("Failed to fetch history")
        const json = await res.json()
        if (!json.success) throw new Error("Failed to fetch history")
        return json.data as {
          entries: HistoryEntry[]
          total: number
          hasMore: boolean
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error"
        setError(msg)
        return null
      } finally {
        setLoading(false)
      }
    },
    [buildParams]
  )

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API.HISTORY}/stats`)
      if (!res.ok) return
      const json = await res.json()
      if (!json.success) return
      setBestEntry(json.data.bestEntry)
    } catch {
      // stats non-critical, silently fail
    }
  }, [])

  useEffect(() => {
    setPage(1)
    setAllEntries([])

    const load = async () => {
      const [data] = await Promise.all([fetchEntries(1), fetchStats()])
      if (data) {
        setAllEntries(data.entries)
        setHasMore(data.hasMore)

        const scores = data.entries.flatMap((e) =>
          e.variants.map((v) => v.score)
        )
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const thisWeekCount = data.entries.filter(
          (e) => new Date(e.createdAt) >= weekAgo
        ).length

        setStats({
          totalCount: data.total,
          thisWeekCount,
          bestScore: scores.length > 0 ? Math.max(...scores) : 0,
          avgScore:
            scores.length > 0
              ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
              : 0,
          streakDays: 0,
        })
      }
    }
    load()
  }, [fetchEntries, fetchStats])

  const loadMore = useCallback(async () => {
    const nextPage = page + 1
    const data = await fetchEntries(nextPage)
    if (data) {
      setAllEntries((prev) => [...prev, ...data.entries])
      setHasMore(data.hasMore)
      setPage(nextPage)
    }
  }, [page, fetchEntries])

  const filteredEntries = useMemo(() => allEntries, [allEntries])

  const visibleEntries = useMemo(() => filteredEntries, [filteredEntries])

  return {
    filters,
    setFilters,
    filteredEntries,
    visibleEntries,
    hasMore,
    loadMore,
    bestEntry,
    stats,
    allEntries,
    loading,
    error,
  }
}

export { useHistoryFilters }
