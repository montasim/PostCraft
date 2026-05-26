export function getQuotaMessage(used: number, limit: number): string {
  const remaining = limit - used
  if (used === 0) return "Your ideas deserve an audience. Start writing."
  if (remaining > 2) return "You are building momentum. Your audience is noticing."
  if (remaining > 0) return `${remaining} left — your best posts are still ahead`
  return "All posts used this period. Upgrade to keep your streak alive."
}

export function getQuotaFooter(used: number, limit: number): string {
  return `${used} of ${limit} ideas brought to life this period`
}
