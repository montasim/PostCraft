export function getQuotaMessage(used: number, limit: number): string {
  if (used === 0) return "Your ideas deserve great posts — start now"
  if (used < Math.floor(limit / 2))
    return "Good progress — keep the creative flow going"
  if (used < limit) return "Running low — upgrade for unlimited"
  return "Upgrade your plan to unlock more"
}

export function getQuotaFooter(used: number, limit: number): string {
  if (used === limit) return "Upgrade for unlimited generations"
  if (used >= limit - 1) return "1 generation remaining"
  return `${used} of ${limit} used this period`
}
