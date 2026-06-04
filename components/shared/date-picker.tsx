"use client"

import { format } from "date-fns"
import { IconCalendar } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  date: Date | undefined
  onChange: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

function DatePicker({
  date,
  onChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-8 w-30 justify-start gap-2 text-left text-xs font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <IconCalendar className="h-3.5 w-3.5" />
          {date ? format(date, "d MMM yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onChange} autoFocus />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
