export function getQuotaMessage(used: number, limit: number): string {
  const remaining = limit - used
  if (used === 0) return "Your first post is free. Make it count."
  if (remaining > 2) return `Posted ${used}x. Your audience is watching.`
  if (remaining > 0)
    return `${remaining} left — your best posts are still ahead`
  return "You're out of posts. Upgrade to keep your streak alive."
}

export function getQuotaFooter(used: number, limit: number): string {
  return `${used} of ${limit} posts brought to life this period`
}
