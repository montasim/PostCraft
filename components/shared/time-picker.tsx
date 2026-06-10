import { useState, useMemo } from "react"
import { IconClock } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

interface TimePickerProps {
  value: string // Format: "HH:mm" (24-hour)
  onChange: (time: string) => void
  is24Hour?: boolean
  locale?: string
  timeZone?: string
  placeholder?: string
  className?: string
}

export function TimePicker({
  value,
  onChange,
  is24Hour = false,
  locale = "en-US",
  timeZone = currentTimezone,
  placeholder = "Select time...",
  className,
}: TimePickerProps) {
  const [open, setOpen] = useState(false)

  // Parse current value
  const [hhStr, mmStr] = (value || "00:00").split(":")
  const parsedHour = parseInt(hhStr || "0", 10)
  const parsedMinute = parseInt(mmStr || "0", 10)

  const isPM = parsedHour >= 12
  const h12 = parsedHour % 12 || 12
  const selectedHour = is24Hour ? parsedHour : h12
  const selectedMinute = parsedMinute
  const selectedAmpm = isPM ? "PM" : "AM"

  // Generate options
  const hours = useMemo(() => {
    return is24Hour
      ? Array.from({ length: 24 }, (_, i) => i)
      : Array.from({ length: 12 }, (_, i) => i + 1)
  }, [is24Hour])

  const minutes = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => i)
  }, [])

  const handleTimeChange = (type: "hour" | "minute" | "ampm", val: number | string) => {
    let newH = parsedHour
    let newM = parsedMinute

    if (type === "hour") {
      const h = val as number
      if (is24Hour) {
        newH = h
      } else {
        if (selectedAmpm === "PM" && h !== 12) newH = h + 12
        else if (selectedAmpm === "AM" && h === 12) newH = 0
        else newH = h
      }
    } else if (type === "minute") {
      newM = val as number
    } else if (type === "ampm") {
      const ampm = val as string
      if (ampm === "PM" && parsedHour < 12) newH = parsedHour + 12
      else if (ampm === "AM" && parsedHour >= 12) newH = parsedHour - 12
    }

    const hh = newH.toString().padStart(2, "0")
    const mm = newM.toString().padStart(2, "0")
    onChange(`${hh}:${mm}`)
  }

  // Format display string
  const displayDate = new Date()
  displayDate.setHours(parsedHour, parsedMinute, 0, 0)
  const currentTimeString = value
    ? new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
        hour12: !is24Hour,
        timeZone: timeZone,
      }).format(displayDate)
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "min-h-[44px] w-[140px] justify-between bg-transparent font-normal hover:bg-transparent dark:bg-input/30 dark:hover:bg-input/30",
            className
          )}
        >
          <div className="flex items-center">
            <IconClock className="mr-2 h-4 w-4" data-testid="ClockIcon" />
            {currentTimeString}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-3"
        align="start"
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="flex h-[220px] gap-2">
          {/* Hours Column */}
          <ScrollArea className="w-16 rounded-md border">
            <div className="flex flex-col p-1">
              {hours.map((h) => (
                <Button
                  key={h}
                  variant={selectedHour === h ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-8 w-full shrink-0 justify-center text-sm",
                    selectedHour !== h && "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => handleTimeChange("hour", h)}
                >
                  {is24Hour ? h.toString().padStart(2, "0") : h}
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* Minutes Column */}
          <ScrollArea className="w-16 rounded-md border">
            <div className="flex flex-col p-1">
              {minutes.map((m) => (
                <Button
                  key={m}
                  variant={selectedMinute === m ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-8 w-full shrink-0 justify-center text-sm",
                    selectedMinute !== m && "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => handleTimeChange("minute", m)}
                >
                  {m.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* AM/PM Column */}
          {!is24Hour && (
            <div className="flex flex-col gap-2 w-16">
              {["AM", "PM"].map((ampm) => (
                <Button
                  key={ampm}
                  variant={selectedAmpm === ampm ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-full flex-1 shrink-0 justify-center text-sm font-medium",
                    selectedAmpm !== ampm && "text-muted-foreground hover:text-foreground border-transparent bg-muted/50"
                  )}
                  onClick={() => handleTimeChange("ampm", ampm)}
                >
                  {ampm}
                </Button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
