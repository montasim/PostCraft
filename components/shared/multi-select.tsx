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

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  creatable?: boolean
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  className,
  creatable = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((s) => s !== value)
        : [...selected, value]
    )
  }

  // Merge static options with any custom selected values
  const allOptions = creatable
    ? [...options, ...selected.filter((s) => !options.includes(s))]
    : options

  // Manual filtering
  const filtered = search.trim()
    ? allOptions.filter((o) =>
        o.toLowerCase().includes(search.trim().toLowerCase())
      )
    : allOptions

  const canCreate =
    creatable &&
    search.trim() !== "" &&
    !allOptions.some((o) => o.toLowerCase() === search.trim().toLowerCase())

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className={cn(
            "flex max-h-[88px] min-h-[44px] cursor-pointer flex-wrap items-center gap-1.5 overflow-x-hidden overflow-y-auto rounded-lg border border-input bg-transparent p-2 text-sm dark:bg-input/30",
            className
          )}
        >
          {selected.length > 0 ? (
            selected.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="gap-1 rounded-md bg-primary/10 text-primary"
              >
                {s}
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
            ))
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
                key={option}
                value={option}
                onSelect={() => toggle(option)}
              >
                <IconCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
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
