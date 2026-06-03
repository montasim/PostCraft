import { cn } from "@/lib/utils"
import { IconMap, IconUsers, IconMessageCircle } from "@tabler/icons-react"

export const QUICK_PRESETS = [
  {
    label: "Founder Mode",
    icon: IconMap,
    audiences: ["Startup Founders"],
    tones: ["Thought Leadership", "Storytelling"],
    languages: ["EN"],
  },
  {
    label: "Dev Rel",
    icon: IconUsers,
    audiences: ["Fellow Developers"],
    tones: ["Educational", "Conversational"],
    languages: ["EN"],
  },
  {
    label: "Leadership",
    icon: IconMessageCircle,
    audiences: ["CTO / VP Engineering"],
    tones: ["Thought Leadership", "Analytical"],
    languages: ["EN"],
  },
]

export type Preset = (typeof QUICK_PRESETS)[0]

interface QuickPresetsProps {
  currentAudience: string[]
  currentTones: string[]
  onSelect: (preset: Preset) => void
  className?: string
}

export function QuickPresets({
  currentAudience,
  currentTones,
  onSelect,
  className,
}: QuickPresetsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {QUICK_PRESETS.map((preset) => {
        const Icon = preset.icon
        const isActive =
          preset.audiences.every((a) => currentAudience.includes(a)) &&
          preset.tones.every((t) => currentTones.includes(t))
        return (
          <button
            key={preset.label}
            onClick={() => onSelect(preset)}
            type="button"
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {preset.label}
          </button>
        )
      })}
    </div>
  )
}
