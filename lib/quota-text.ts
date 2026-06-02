export function getQuotaMessage(used: number, limit: number): string {
  const remaining = limit - used
  if (used === 0) return "Your first post is free. Make it count."
  if (remaining > 1) return `Posted ${used}x. Your audience is watching.`
  if (remaining > 0) return `${remaining} left — make it your best one yet`
  return "Daily limit reached — resets at UTC midnight"
}

export function getQuotaFooter(used: number, limit: number): string {
  return `${used} of ${limit} posts used today`
}
