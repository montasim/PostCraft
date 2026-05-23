export function getQuotaMessage(used: number, limit: number): string {
  const remaining = limit - used
  if (used === 0) return "Your ideas deserve great posts — start now"
  if (remaining > 2) return "Good progress — keep the creative flow going"
  if (remaining > 0) return "Running low — upgrade for unlimited"
  return "Plan limit reached — upgrade for unlimited"
}

export function getQuotaFooter(used: number, limit: number): string {
  return `${used} of ${limit} used this period`
}
