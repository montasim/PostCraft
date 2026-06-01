"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { PostCreationForm } from "./post-creation-form"
import { BrandGuardPanel } from "./brand-guard-panel"
import { PostVariantsCarousel } from "./post-variants-carousel"
import { UpgradeModal } from "@/components/shared/upgrade-modal"
import type { Variant } from "@/types"
import type { SelectOption } from "@/components/shared/multi-select"
import { toast } from "sonner"
import { consumeRefineData } from "@/lib/refine-store"
import { sendBrowserNotification, requestNotificationPermission } from "@/lib/browser-notification"
import { GENERATION_PREFS_DEFAULTS, type GenerationPrefs } from "@/modules/prefs/prefs.schema"

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
  const [generationId, setGenerationId] = useState<string | null>(null)
  const [status, setStatus] = useState<GenerationStatus>("idle")
  const [variants, setVariants] = useState<Variant[]>([])
  const [error, setError] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("")
  const [quotaExceeded, setQuotaExceeded] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [generationPrefs, setGenerationPrefs] = useState<GenerationPrefs>({ ...GENERATION_PREFS_DEFAULTS })
  const [refineData] = useState(() => consumeRefineData())
  const [personaOptions, setPersonaOptions] = useState<{
    audiences: SelectOption[]
    tones: SelectOption[]
    languages: SelectOption[]
  }>({ audiences: [], tones: [], languages: [] })
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const notifiedRef = useRef<string | null>(null)

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setUserName(res.data.profile.fullName)
      })
      .catch(() => {})

    fetch("/api/workspace")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          if (res.data.usage.used >= res.data.usage.limit) {
            setQuotaExceeded(true)
          }
          const persona = res.data.persona
          if (persona) {
            const toOptions = (items: { value: string; label: string; description?: string }[]) =>
              items.map((i) => ({ value: i.value, label: i.label, description: i.description }))
            setPersonaOptions({
              audiences: toOptions(persona.targetAudiences ?? []),
              tones: toOptions(persona.preferredTones ?? []),
              languages: toOptions(persona.language ?? []),
            })
          }
        }
      })
      .catch(() => {})

    fetch("/api/prefs/generation")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setGenerationPrefs(res.data)
      })
      .catch(() => {})
  }, [])

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
    if (!generationId || status === "completed" || status === "failed" || status === "idle") {
      stopPolling()
      return
    }

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/generations/${generationId}`)
        const data = await res.json()

        if (!data.success) {
          setStatus("failed")
          setError(data.error)
          stopPolling()
          return
        }

        const generationStatus = data.data.generation.status as GenerationStatus
        setStatus(generationStatus)

        if (generationStatus === "completed") {
          setVariants(data.data.variants)
          stopPolling()
        } else if (generationStatus === "failed") {
          setError(data.data.generation.errorMessage ?? "Generation failed")
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
  }, [generationId, status, stopPolling])

  useEffect(() => {
    if (status !== "completed" || !generationId || notifiedRef.current === generationId) return
    notifiedRef.current = generationId

    async function notify() {
      try {
        const res = await fetch("/api/settings")
        const data = await res.json()
        if (!data.success || !data.data?.notifications?.emailGenerationComplete) return
        const granted = await requestNotificationPermission()
        if (!granted) return
        sendBrowserNotification("Your posts are ready", {
          body: "3 versions ranked and waiting for you.",
        })
      } catch {}
    }
    notify()
  }, [status, generationId])

  const handleGenerate = useCallback(async (formData: {
    topic: string
    audiences: string[]
    tones: string[]
    languages: string[]
    includeEmoji: boolean
  }) => {
    if (quotaExceeded) {
      setUpgradeOpen(true)
      return
    }

    setStatus("submitting")
    setError(null)
    setVariants([])
    notifiedRef.current = null

    try {
      const res = await fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!data.success) {
        if (data.code === "QUOTA_EXCEEDED") {
          setQuotaExceeded(true)
          setUpgradeOpen(true)
          setStatus("idle")
          return
        }
        setStatus("failed")
        setError(data.error)
        toast.error(data.error)
        return
      }

      setGenerationId(data.data.generationId)
      setStatus("queued")
      toast.success(STATUS_LABELS.queued)
    } catch {
      setStatus("failed")
      setError("Failed to submit. Please try again.")
      toast.error("Failed to submit")
    }
  }, [])

  const handleRetry = useCallback(() => {
    setGenerationId(null)
    setStatus("idle")
    setVariants([])
    setError(null)
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row">
        <PostCreationForm
          onGenerate={handleGenerate}
          isSubmitting={status === "submitting"}
          quotaExceeded={quotaExceeded}
          userName={userName}
          initialPrefs={generationPrefs}
          initialRefine={refineData}
          audienceOptions={personaOptions.audiences}
          toneOptions={personaOptions.tones}
          languageOptions={personaOptions.languages}
        />
        <BrandGuardPanel />
      </div>
      <PostVariantsCarousel
        variants={variants}
        status={status}
        error={error}
        onRetry={handleRetry}
      />
      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} />
    </div>
  )
}

export { DashboardClient }
