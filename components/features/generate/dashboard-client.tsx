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
import {
  sendBrowserNotification,
  requestNotificationPermission,
} from "@/lib/browser-notification"
import {
  GENERATION_PREFS_DEFAULTS,
  type GenerationPrefs,
} from "@/modules/prefs/prefs.schema"
import { API } from "@/lib/constants"
import { useAppSelector } from "@/store/hooks"
import {
  selectQuotaExceeded,
  selectPersona,
} from "@/store/slices/workspace.slice"
import { selectUserName } from "@/store/slices/profile.slice"

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
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [generationPrefs, setGenerationPrefs] = useState<GenerationPrefs>({
    ...GENERATION_PREFS_DEFAULTS,
  })
  const [refineData] = useState(() => consumeRefineData())
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const notifiedRef = useRef<string | null>(null)

  const quotaExceededFromStore = useAppSelector(selectQuotaExceeded)
  const persona = useAppSelector(selectPersona)
  const userName = useAppSelector(selectUserName)

  const [quotaExceeded, setQuotaExceeded] = useState(quotaExceededFromStore)

  const personaOptions: {
    audiences: SelectOption[]
    tones: SelectOption[]
    languages: SelectOption[]
  } = (() => {
    if (!persona) return { audiences: [], tones: [], languages: [] }
    const toOptions = (
      items: { value: string; label: string; description?: string }[]
    ) =>
      items.map((i) => ({
        value: i.value,
        label: i.label,
        description: i.description,
      }))
    return {
      audiences: toOptions(persona.targetAudiences ?? []),
      tones: toOptions(persona.preferredTones ?? []),
      languages: toOptions(persona.language ?? []),
    }
  })()

  useEffect(() => {
    fetch(API.PREFS_GENERATION)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setGenerationPrefs(res.data)
      })
      .catch(() => {
        // Non-critical: generation prefs load failed, defaults apply
      })
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
    if (
      !generationId ||
      status === "completed" ||
      status === "failed" ||
      status === "idle"
    ) {
      stopPolling()
      return
    }

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API.GENERATIONS}/${generationId}`)
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
    if (
      status !== "completed" ||
      !generationId ||
      notifiedRef.current === generationId
    )
      return
    notifiedRef.current = generationId

    async function notify() {
      try {
        const res = await fetch(API.SETTINGS)
        const data = await res.json()
        if (!data.success || !data.data?.notifications?.emailGenerationComplete)
          return
        const granted = await requestNotificationPermission()
        if (!granted) return
        sendBrowserNotification("Your posts are ready", {
          body: "3 versions ranked and waiting for you.",
        })
      } catch {
        // Non-critical: notification permission/settings check failed
      }
    }
    notify()
  }, [status, generationId])

  const handleGenerate = useCallback(
    async (formData: {
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
        const res = await fetch(API.GENERATIONS, {
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
    },
    [quotaExceeded]
  )

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
