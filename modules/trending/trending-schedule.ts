import type { ScheduleType } from "./trending.types"
import { MILLISECONDS } from "@/lib/constants"

import { toZonedTime, fromZonedTime } from "date-fns-tz"

export function computeNextRunAt(config: {
  scheduleType: ScheduleType
  scheduledTime: string
  scheduledDay: string | null
  timezone?: string
}): Date {
  const tz = config.timezone || "UTC"
  const [hours, minutes] = config.scheduledTime.split(":").map(Number)
  
  const nowUtc = new Date()
  const nowZoned = toZonedTime(nowUtc, tz)
  
  const nextZoned = new Date(nowZoned)
  nextZoned.setHours(hours, minutes, 0, 0)

  if (config.scheduleType === "hourly") {
    const elapsed = nowZoned.getMinutes() + nowZoned.getSeconds() / 60
    nextZoned.setHours(nowZoned.getHours())
    if (elapsed >= minutes) {
      nextZoned.setHours(nowZoned.getHours() + 1)
    }
    nextZoned.setMinutes(minutes, 0, 0)
    return fromZonedTime(nextZoned, tz)
  }

  if (nextZoned <= nowZoned) {
    nextZoned.setDate(nextZoned.getDate() + 1)
  }

  if (config.scheduleType === "weekly" && config.scheduledDay) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const target = days.indexOf(config.scheduledDay)
    const current = nextZoned.getDay()
    const diff = (target - current + 7) % 7
    nextZoned.setDate(nextZoned.getDate() + diff)
  }

  return fromZonedTime(nextZoned, tz)
}

export function formatNextRun(date: Date | null): string {
  if (!date) return "Not scheduled"

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / MILLISECONDS.DAY
  )

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  if (diffDays === 0) return `Today at ${time}`
  if (diffDays === 1) return `Tomorrow at ${time}`
  return `${date.toLocaleDateString("en-US", { weekday: "long" })} at ${time}`
}

export function formatRelativeTime(date: Date | null): string {
  if (!date) return "Never"

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / MILLISECONDS.MINUTE)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
