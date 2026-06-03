import { IconTrendingUp } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

interface TopicSuggestionsProps {
  loading: boolean
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}

export function TopicSuggestions({
  loading,
  suggestions,
  onSelect,
  className,
}: TopicSuggestionsProps) {
  if (!loading && suggestions.length === 0) {
    return null
  }

  return (
    <div className={cn("mt-4 space-y-1.5", className)}>
      <p className="text-[10px] text-xs font-medium tracking-wider text-foreground uppercase">
        {loading
          ? "Loading trending topics..."
          : "Trending in tech right now — pick one to get started"}
      </p>
      {loading ? (
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-40 animate-pulse rounded-md bg-skeleton"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSelect(suggestion)}
              type="button"
              className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <IconTrendingUp className="h-3 w-3 text-orange-500" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
