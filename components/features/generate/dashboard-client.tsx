"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { PostCreationForm } from "./post-creation-form"
import { BrandGuardPanel } from "./brand-guard-panel"
import { PostVariantsCarousel } from "./post-variants-carousel"
import type { Variant } from "@/types"
import { toast } from "sonner"

type GenerationStatus =
  | "idle"
  | "submitting"
  | "queued"
  | "generating"
  | "scoring"
  | "ranking"
  | "completed"
  | "failed"

const POLL_INTERVAL = 2000
const STATUS_LABELS: Record<string, string> = {
  queued: "Queued for generation...",
  generating: "AI is crafting your posts...",
  scoring: "Evaluating quality...",
  ranking: "Ranking variants...",
}

function DashboardClient() {
  const [trendId, setTrendId] = useState<string | null>(null)
  const [status, setStatus] = useState<GenerationStatus>("idle")
  const [variants, setVariants] = useState<Variant[]>([])
  const [error, setError] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => stopPolling()
  }, [stopPolling])

  useEffect(() => {
    if (!trendId || status === "completed" || status === "failed" || status === "idle") {
      stopPolling()
      return
    }

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/trends/${trendId}`)
        const data = await res.json()

        if (!data.success) {
          setStatus("failed")
          setError(data.error)
          stopPolling()
          return
        }

        const trendStatus = data.data.trend.status as GenerationStatus
        setStatus(trendStatus)

        if (trendStatus === "completed") {
          setVariants(data.data.variants)
          stopPolling()
        } else if (trendStatus === "failed") {
          setError(data.data.trend.errorMessage ?? "Generation failed")
          stopPolling()
          toast.error("Generation failed")
        }
      } catch {
        setStatus("failed")
        setError("Network error while checking status")
        stopPolling()
      }
    }, POLL_INTERVAL)

    return () => stopPolling()
  }, [trendId, status, stopPolling])

  const handleGenerate = useCallback(async (formData: {
    topic: string
    audiences: string[]
    tones: string[]
    languages: string[]
    includeEmoji: boolean
  }) => {
    setStatus("submitting")
    setError(null)
    setVariants([])

    try {
      const res = await fetch("/api/trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!data.success) {
        setStatus("failed")
        setError(data.error)
        toast.error(data.error)
        return
      }

      setTrendId(data.data.trendId)
      setStatus("queued")
      toast.success(STATUS_LABELS.queued)
    } catch {
      setStatus("failed")
      setError("Failed to submit. Please try again.")
      toast.error("Failed to submit")
    }
  }, [])

  const handleRetry = useCallback(() => {
    setTrendId(null)
    setStatus("idle")
    setVariants([])
    setError(null)
  }, [])

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row">
        <PostCreationForm onGenerate={handleGenerate} isSubmitting={status === "submitting"} />
        <BrandGuardPanel />
      </div>
      <PostVariantsCarousel
        variants={variants}
        status={status}
        error={error}
        onRetry={handleRetry}
      />
    </>
  )
}

export { DashboardClient }
