"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { IconClock } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

function parseTime(time: string): { hour: number; minute: number } {
  const [h, m] = time.split(":").map(Number)
  return { hour: h ?? 9, minute: m ?? 0 }
}

function toTimeStr(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

function format12(time: string): string {
  const { hour, minute } = parseTime(time)
  const ampm = hour >= 12 ? "PM" : "AM"
  const h12 = hour % 12 || 12
  return `${h12}:${minute.toString().padStart(2, "0")} ${ampm}`
}

interface TimePickerProps {
  value: string
  onChange: (time: string) => void
  className?: string
}

function TimePicker({ value, onChange, className }: TimePickerProps) {
  const { hour, minute } = parseTime(value)

  function setHour(h12: number) {
    const isPM = hour >= 12
    const newHour = isPM ? (h12 === 12 ? 12 : h12 + 12) : (h12 === 12 ? 0 : h12)
    onChange(toTimeStr(newHour, minute))
  }

  function setMinute(m: number) {
    onChange(toTimeStr(hour, m))
  }

  function setAmpm(ampm: "AM" | "PM") {
    let newHour = hour
    if (ampm === "AM" && hour >= 12) newHour = hour - 12
    else if (ampm === "PM" && hour < 12) newHour = hour + 12
    onChange(toTimeStr(newHour, minute))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-8 gap-1.5 text-xs font-normal", className)}
        >
          <IconClock className="h-3 w-3" />
          {format12(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex h-[200px] divide-x">
          {/* Hours */}
          <ScrollArea className="w-[56px]">
            <div className="flex flex-col p-1">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <button
                  key={h}
                  onClick={() => setHour(h)}
                  className={cn(
                    "rounded-sm px-2 py-1 text-xs hover:bg-accent",
                    hour % 12 === h % 12 && "bg-primary text-primary-foreground hover:bg-primary"
                  )}
                >
                  {h}
                </button>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          {/* Minutes */}
          <ScrollArea className="w-[56px]">
            <div className="flex flex-col p-1">
              {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                <button
                  key={m}
                  onClick={() => setMinute(m)}
                  className={cn(
                    "rounded-sm px-2 py-1 text-xs hover:bg-accent",
                    minute === m && "bg-primary text-primary-foreground hover:bg-primary"
                  )}
                >
                  {m.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          {/* AM/PM */}
          <ScrollArea className="w-[48px]">
            <div className="flex flex-col p-1">
              {(["AM", "PM"] as const).map((ampm) => (
                <button
                  key={ampm}
                  onClick={() => setAmpm(ampm)}
                  className={cn(
                    "rounded-sm px-2 py-1 text-xs hover:bg-accent",
                    ((ampm === "AM" && hour < 12) || (ampm === "PM" && hour >= 12)) &&
                      "bg-primary text-primary-foreground hover:bg-primary"
                  )}
                >
                  {ampm}
                </button>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { TimePicker }
