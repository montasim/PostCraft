import { IconClock, IconRobot, IconBrandGithub, IconBrandReddit, IconFilter, IconCheck, IconAlertCircle, IconCircleCheck } from "@tabler/icons-react"
import type { ITrendingRun } from "@/modules/trending/trending.types"
import type { LibraryEntry } from "@/types"
import { cn } from "@/lib/utils"
import { VariantCarousel } from "@/components/shared/variant-carousel"
import { VariantCardWrapper } from "./library-detail"

const SOURCE_META: Record<string, { icon: React.ReactNode; label: string; className: string }> = {
  hackernews: { icon: <span className="font-bold text-xs">Y</span>, label: "HackerNews", className: "bg-background text-[#FF6600]" },
  devto: { icon: <span className="font-bold text-xs">D</span>, label: "Dev.to", className: "bg-background text-black dark:text-white" },
  github: { icon: <IconBrandGithub className="h-5 w-5" />, label: "GitHub", className: "bg-background text-slate-800 dark:text-white" },
  reddit: { icon: <IconBrandReddit className="h-5 w-5" />, label: "Reddit", className: "bg-background text-[#FF4500]" },
}

export function LibraryTimeline({ run, entry }: { run: ITrendingRun, entry: LibraryEntry }) {
  // Find the source item
  const sourceItem = run.sourceItems?.find(item => entry.topic.includes(item.url) || entry.topic.includes(item.title))
  
  const platformMeta = sourceItem && SOURCE_META[sourceItem.source] ? SOURCE_META[sourceItem.source] : { icon: <IconClock className="h-4 w-4" />, label: "Unknown", className: "bg-primary text-primary-foreground" }
  
  const metadata = run.metadata || { platformsScanned: [], totalItemsFetched: 0 }
  const config = run.configSnapshot || { topics: [] }
  
  return (
    <div className="pl-6 pt-4 pb-8 space-y-12 border-l-2 border-border ml-4 relative">
      
      {/* STEP 1: Discovery */}
      <div className="relative">
        <div className={cn("absolute -left-[38px] flex h-7 w-7 items-center justify-center rounded-full p-1 ring-1 ring-border", platformMeta.className)}>
          {platformMeta.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Original Source
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Sourced organically from {platformMeta.label}
          </p>
          {sourceItem && (
            <div className="mt-3 rounded-lg border bg-card p-4">
              <h4 className="text-sm font-medium">{sourceItem.title}</h4>
              <a href={sourceItem.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 block truncate">
                {sourceItem.url}
              </a>
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600">
                  Engagement Score: {sourceItem.score}
                </span>
                <span className="text-xs text-muted-foreground">
                  Ranked #{sourceItem.rank} across {metadata.platformsScanned?.join(", ") || "various platforms"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STEP 2: Shortlisting */}
      <div className="relative">
        <div className="absolute -left-[38px] flex items-center justify-center rounded-full bg-background text-purple-500 p-1 ring-1 ring-border">
          <IconFilter className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Content Selection
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Selected from {metadata.totalItemsFetched || "many"} raw items.
          </p>
          <div className="mt-3 rounded-lg border bg-card p-4">
            <p className="text-sm italic text-muted-foreground">
              "Identified as highly relevant for your audience: {entry.audience?.join(", ")}. Matches topics: {config.topics?.join(", ")}."
            </p>
          </div>
        </div>
      </div>

      {/* STEP 3: Generation */}
      <div className="relative">
        <div className="absolute -left-[38px] flex items-center justify-center rounded-full bg-background text-amber-500 p-1 ring-1 ring-border">
          <IconRobot className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Content Generation
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Crafted {entry.variants.length} unique variants.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-3">
              <span className="text-xs font-semibold text-muted-foreground block mb-1">Tones</span>
              <div className="flex flex-wrap gap-1">
                {entry.tones.map(t => <span key={t} className="bg-secondary px-2 py-0.5 rounded text-xs">{t}</span>)}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <span className="text-xs font-semibold text-muted-foreground block mb-1">Format Rules</span>
              <div className="text-xs text-foreground">
                Languages: {entry.language.join(", ")} <br/>
                Emojis: {entry.includeEmoji ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 4: Final Output */}
      <div className="relative">
        <div className="absolute -left-[38px] flex items-center justify-center rounded-full bg-background p-1 text-emerald-500 ring-1 ring-border">
          <IconCircleCheck className="h-5 w-5" />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Final Output
          </h3>
          <div className="-mx-4 sm:mx-0">
            <VariantCarousel>
              {entry.variants.map((variant) => (
                <div
                  key={variant.rank}
                  className="w-[90%] shrink-0 snap-start md:w-[400px] lg:w-[410px]"
                >
                  <VariantCardWrapper variant={variant} />
                </div>
              ))}
            </VariantCarousel>
          </div>
        </div>
      </div>
      
    </div>
  )
}
