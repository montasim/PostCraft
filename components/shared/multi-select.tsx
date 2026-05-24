"use client"

import * as React from "react"
import { IconCheck, IconSelector, IconX, IconPlus } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface SelectOption {
  value: string
  label: string
  description?: string
}

interface MultiSelectProps {
  options: (string | SelectOption)[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  creatable?: boolean
  maxVisible?: number
}

function normalizeOption(opt: string | SelectOption): SelectOption {
  return typeof opt === "string" ? { value: opt, label: opt } : opt
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  className,
  creatable = false,
  maxVisible,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => { setExpanded(false) }, [selected])

  const normalized = React.useMemo(() => options.map(normalizeOption), [options])
  const labelMap = React.useMemo(() => {
    const map = new Map<string, string>()
    for (const opt of normalized) map.set(opt.value, opt.label)
    return map
  }, [normalized])

  const descMap = React.useMemo(() => {
    const map = new Map<string, string>()
    for (const opt of normalized) {
      if (opt.description) map.set(opt.value, opt.description)
    }
    return map
  }, [normalized])

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((s) => s !== value)
        : [...selected, value]
    )
  }

  // Merge static options with any custom selected values
  const allOptions: SelectOption[] = creatable
    ? [
        ...normalized,
        ...selected
          .filter((s) => !normalized.some((o) => o.value === s))
          .map((s) => ({ value: s, label: s })),
      ]
    : normalized

  // Manual filtering
  const filtered = search.trim()
    ? allOptions.filter((o) =>
        o.label.toLowerCase().includes(search.trim().toLowerCase())
      )
    : allOptions

  const canCreate =
    creatable &&
    search.trim() !== "" &&
    !allOptions.some((o) => o.value.toLowerCase() === search.trim().toLowerCase())

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className={cn(
            "flex min-h-[44px] cursor-pointer flex-wrap items-center gap-1.5 overflow-hidden rounded-lg border border-input bg-transparent p-2 text-sm dark:bg-input/30",
            className
          )}
        >
          {selected.length > 0 ? (
            (() => {
              const visible = maxVisible && !expanded ? selected.slice(0, maxVisible) : selected
              const remaining = maxVisible ? selected.length - visible.length : 0
              return (
                <>
                  {visible.map((s) => {
                    const badge = (
                <Badge
                  key={s}
                  variant="secondary"
                  className="gap-1 rounded-md bg-primary/10 text-primary"
                >
                  {labelMap.get(s) ?? s}
                  <button
                    className="ml-0.5 rounded-full ring-offset-background outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") toggle(s)
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggle(s)
                    }}
                  >
                    <IconX className="h-3 w-3" />
                  </button>
                </Badge>
              )

              const desc = descMap.get(s)
              if (!desc) return badge

              return (
                <TooltipProvider key={s} delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>{badge}</TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs text-xs">
                      {desc}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
                  {remaining > 0 && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer gap-1 rounded-md bg-primary/20 text-xs text-primary"
                      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setExpanded(true) }}
                    >
                      +{remaining} more
                    </Badge>
                  )}
                  {maxVisible && expanded && selected.length > maxVisible && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer gap-1 rounded-md bg-primary/20 text-xs text-primary"
                      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setExpanded(false) }}
                    >
                      See less
                    </Badge>
                  )}
                </>
              )
            })()
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <IconSelector className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {!creatable && filtered.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {canCreate && (
              <CommandItem
                className="text-primary"
                onSelect={() => {
                  toggle(search.trim())
                  setSearch("")
                }}
              >
                <IconPlus className="mr-2 h-4 w-4" />
                Add &quot;{search.trim()}&quot;
              </CommandItem>
            )}
            {filtered.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => toggle(option.value)}
              >
                <IconCheck
                  className={cn(
                    "mr-2 h-4 w-4 shrink-0",
                    selected.includes(option.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.description ? (
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate">{option.label}</span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs text-xs">
                        {option.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span>{option.label}</span>
                )}
              </CommandItem>
            ))}
            {creatable && filtered.length === 0 && !canCreate && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
