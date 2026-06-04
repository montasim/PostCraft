import { useMemo } from "react"

interface UseAutocompleteTimepickerProps {
  is24Hour?: boolean
  locale?: string
  timeZone?: string
  interval?: number
}

export function useAutocompleteTimepicker({
  is24Hour = false,
  locale = "en-US",
  timeZone,
  interval = 30, // Default to 30 minutes
}: UseAutocompleteTimepickerProps = {}) {
  const timeOptions = useMemo(() => {
    const options: Date[] = []
    const date = new Date()
    date.setHours(0, 0, 0, 0)

    for (let i = 0; i < 24 * 60; i += interval) {
      const time = new Date(date)
      time.setMinutes(i)
      options.push(time)
    }
    return options
  }, [interval])

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: !is24Hour,
      timeZone: timeZone,
    }).format(date)
  }

  return { timeOptions, formatTime }
}
