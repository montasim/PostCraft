"use client"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MultiSelect } from "@/components/shared"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { IconSearch, IconArrowsSort, IconScoreboard } from "@tabler/icons-react"
import { SORT_OPTIONS, SCORE_RANGES } from "@/lib/constants"
import { TONE_OPTIONS, LANGUAGE_OPTIONS } from "@/lib/constants"
import type { HistoryFilterState } from "@/types"

interface HistoryFiltersProps {
  filters: HistoryFilterState
  onFiltersChange: (filters: HistoryFilterState) => void
  resultCount: number
}

function HistoryFilters({
  filters,
  onFiltersChange,
  resultCount,
}: HistoryFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <IconSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          className="pl-9"
        />
      </div>

      <MultiSelect
        options={TONE_OPTIONS}
        selected={filters.styles}
        onChange={(styles) => onFiltersChange({ ...filters, styles })}
        placeholder="Style"
      />

      <MultiSelect
        options={LANGUAGE_OPTIONS}
        selected={filters.languages}
        onChange={(languages) => onFiltersChange({ ...filters, languages })}
        placeholder="Language"
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <IconScoreboard className="h-3.5 w-3.5" />
            {SCORE_RANGES.find((r) => r.id === filters.scoreRange)?.label ?? "All scores"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="start">
          <Command>
            <CommandList>
              {SCORE_RANGES.map((range) => (
                <CommandItem
                  key={range.id}
                  onSelect={() =>
                    onFiltersChange({ ...filters, scoreRange: range.id })
                  }
                  className="text-xs"
                >
                  {range.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <IconArrowsSort className="h-3.5 w-3.5" />
            {SORT_OPTIONS.find((s) => s.id === filters.sort)?.label ?? "Newest first"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() =>
                onFiltersChange({ ...filters, sort: option.id })
              }
              className="text-xs"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Badge variant="secondary" className="text-xs">
        {resultCount} result{resultCount !== 1 ? "s" : ""}
      </Badge>
    </div>
  )
}

export { HistoryFilters }
