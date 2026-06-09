import { useState, useEffect } from "react"
import { IconClock, IconFilter, IconRobot, IconBolt, IconCheck, IconChevronDown, IconChevronUp, IconTarget, IconListSearch, IconCircleCheck, IconExternalLink, IconAlertCircle } from "@tabler/icons-react"
import { VariantCarousel } from "@/components/shared"
import { TrendingVariant } from "./trending-run-group"
import type { ITrendingRun, TrendingGenerationPreview, ITrendingRawItem } from "@/modules/trending/trending.types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface TrendingTimelineProps {
  run: ITrendingRun
  generations: TrendingGenerationPreview[]
}

export function TrendingTimeline({ run, generations }: TrendingTimelineProps) {
  const [rawItems, setRawItems] = useState<ITrendingRawItem[]>([])
  const [isLoadingRaw, setIsLoadingRaw] = useState(false)
  const [showRaw, setShowRaw] = useState(false)
  
  useEffect(() => {
    setRawItems([])
    setShowRaw(false)
    setIsLoadingRaw(false)
  }, [run._id])

  const meta = run.metadata || {
    platformsScanned: [],
    totalItemsFetched: 0,
    itemsShortlisted: 0,
    stepLatencies: {}
  }

  useEffect(() => {
    async function loadRaw() {
      if ((showRaw || meta.totalItemsFetched === 0) && rawItems.length === 0) {
        setIsLoadingRaw(true)
        try {
          const res = await fetch(`/api/trending/${run._id}/raw-items`)
          const json = await res.json()
          if (json.success) {
            setRawItems(json.data)
          }
        } finally {
          setIsLoadingRaw(false)
        }
      }
    }
    loadRaw()
  }, [showRaw, run._id, rawItems.length, meta.totalItemsFetched])

  const displayTotal = meta.totalItemsFetched > 0 ? meta.totalItemsFetched : rawItems.length
  const displayShortlisted = meta.itemsShortlisted > 0 ? meta.itemsShortlisted : rawItems.filter(i => i.status === "shortlisted").length


  let failedStep: "fetch" | "shortlist" | "generate" | null = null
  if (run.status === "failed") {
    if (!meta.stepLatencies?.fetch) failedStep = "fetch"
    else if (!meta.stepLatencies?.shortlist) failedStep = "shortlist"
    else failedStep = "generate"
  }

  const ErrorBlock = ({ step }: { step: string }) => {
    if (failedStep !== step) return null
    return (
      <div className="mt-3 rounded-md bg-red-500/10 border border-red-500/20 p-3 text-left">
        <p className="text-[10px] font-semibold text-red-500/70 uppercase tracking-wider mb-1">Step Failed</p>
        <p className="text-xs font-mono text-red-600 dark:text-red-400 break-words">{run.error}</p>
      </div>
    )
  }

  const formatLatency = (ms?: number, stepName?: string) => {
    if (run.status === "failed" && failedStep === stepName) {
      return <span className="text-red-500 font-semibold">Failed</span>
    }
    if (!ms) return "N/A"
    return ms > 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`
  }

  return (
    <div className="relative pl-12 before:absolute before:inset-y-0 before:left-6 before:w-px before:bg-border space-y-8 pb-8 pt-4">

      {/* STEP 1: INITIAL STATE & SETTINGS */}
      <div className="relative">
        <div className="absolute -left-[38px] flex items-center justify-center rounded-full bg-background p-1 text-muted-foreground ring-1 ring-border">
          <IconClock className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Initiated {run.triggerMode === "scheduled" ? "Scheduled Scan" : "Manual Scan"}
            <span className="text-xs font-normal text-muted-foreground ml-2">
              {new Date(run.ranAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </h3>
          <div className="mt-3 rounded-lg border bg-card p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
              <IconTarget className="h-4 w-4" /> Snapshot Settings
            </h4>
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1">
                <span className="text-muted-foreground">Platforms:</span>
                <span className="font-medium">{run.configSnapshot.platforms.join(", ")}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1">
                <span className="text-muted-foreground">Audience:</span>
                <span className="font-medium">{run.configSnapshot.targetAudience.join(", ") || "Any"}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1">
                <span className="text-muted-foreground">Tone:</span>
                <span className="font-medium">Thought Leadership</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2: SCRAPED DATA */}
      <div className="relative">
        <div className={cn("absolute -left-[38px] flex items-center justify-center rounded-full p-1 ring-1 ring-border", failedStep === "fetch" ? "bg-red-500/10 text-red-500" : "bg-background text-blue-500")}>
          {failedStep === "fetch" ? <IconAlertCircle className="h-5 w-5" /> : <IconListSearch className="h-5 w-5" />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Data Funnel
            <Badge variant="outline" className="font-mono text-xs">{displayTotal} posts found</Badge>
            <span className="text-xs font-normal text-muted-foreground ml-auto">
              took {formatLatency(meta.stepLatencies?.fetch, "fetch")}
            </span>
          </h3>
          <ErrorBlock step="fetch" />
          <div className="mt-3 rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Scanned across {meta.platformsScanned.join(", ")} to find high-engagement posts matching your industry ({run.configSnapshot.industry.join(", ") || "General"}).
            </p>

            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between"
              onClick={() => setShowRaw(!showRaw)}
            >
              <span>{showRaw ? "Hide Raw Data" : "Inspect Raw Scraped Data"}</span>
              {showRaw ? <IconChevronUp className="h-4 w-4" /> : <IconChevronDown className="h-4 w-4" />}
            </Button>

            {showRaw && (
              <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto pr-2 rounded-md border bg-muted/30 p-2">
                {isLoadingRaw ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : rawItems.length > 0 ? (
                  rawItems.map(item => (
                    <div key={item._id} className={cn(
                      "flex items-start justify-between gap-4 p-2.5 rounded border text-sm",
                      item.status === "shortlisted" ? "bg-primary/5 border-primary/20" : "bg-background"
                    )}>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span className="capitalize">{item.platform}</span>
                          <span>&bull;</span>
                          <span>Score: {item.engagementScore}</span>
                          {item.status === "shortlisted" && (
                            <Badge variant="default" className="h-4 text-[10px] px-1 py-0 ml-2">Shortlisted</Badge>
                          )}
                        </div>
                      </div>
                      <a href={item.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                        <IconExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm text-muted-foreground p-4">No raw items found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STEP 3: AI SELECTION */}
      {failedStep !== "fetch" && (
      <div className="relative">
        <div className={cn("absolute -left-[38px] flex items-center justify-center rounded-full p-1 ring-1 ring-border", failedStep === "shortlist" ? "bg-red-500/10 text-red-500" : "bg-background text-purple-500")}>
          {failedStep === "shortlist" ? <IconAlertCircle className="h-5 w-5" /> : <IconFilter className="h-5 w-5" />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            AI Shortlisting
            <Badge variant="outline" className="font-mono text-xs">{displayShortlisted} top picks</Badge>
            <span className="text-xs font-normal text-muted-foreground ml-auto">
              took {formatLatency(meta.stepLatencies?.shortlist, "shortlist")}
            </span>
          </h3>
          <ErrorBlock step="shortlist" />
          <div className="mt-3 space-y-3">
            {showRaw && rawItems.filter(i => i.status === "shortlisted").length > 0 ? (
              rawItems.filter(i => i.status === "shortlisted").map((item, idx) => (
                <div key={item._id} className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-[10px] font-bold text-purple-600">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground italic">
                        &quot;{item.selectionReasoning || "Selected based on high engagement signals."}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">
                  The AI reviewed all {displayTotal} posts and selected the top {displayShortlisted} most relevant to your audience.
                  <br />
                  <Button variant="link" className="px-0 h-auto mt-1" onClick={() => setShowRaw(true)}>View reasoning in Raw Data</Button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* STEP 4: GENERATION */}
      {failedStep !== "fetch" && failedStep !== "shortlist" && (
      <div className="relative">
        <div className={cn("absolute -left-[38px] flex items-center justify-center rounded-full p-1 ring-1 ring-border", failedStep === "generate" ? "bg-red-500/10 text-red-500" : "bg-background text-amber-500")}>
          {failedStep === "generate" ? <IconAlertCircle className="h-5 w-5" /> : <IconRobot className="h-5 w-5" />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            AI Generation
            <span className="text-xs font-normal text-muted-foreground ml-auto">
              took {formatLatency(meta.stepLatencies?.generate, "generate")}
            </span>
          </h3>
          <ErrorBlock step="generate" />
          <div className="mt-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            Generating {run.configSnapshot.postsToGenerate} unique posts using the shortlisted topics, applying configured tone and brand guardrails.
          </div>
        </div>
      </div>
      )}

      {/* STEP 5: FINAL OUTPUT */}
      {run.status === "completed" && (
      <div className="relative">
        <div className="absolute -left-[38px] flex items-center justify-center rounded-full bg-background p-1 text-emerald-500 ring-1 ring-border">
          <IconCircleCheck className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Final Output
          </h3>
          <div className="-mx-4 sm:mx-0">
            <VariantCarousel>
              {generations.map((gen) => (
                <div
                  key={gen.generationId}
                  className="w-[85%] shrink-0 snap-start sm:w-100"
                >
                  <TrendingVariant generation={gen} />
                </div>
              ))}
            </VariantCarousel>
          </div>
        </div>
      </div>
      )}

    </div>
  )
}
