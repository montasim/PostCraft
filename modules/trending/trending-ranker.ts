import type { SourceItem } from "./trending.types"

export function rankSourceItems(items: SourceItem[]): SourceItem[] {
  return [...items]
    .sort((a, b) => b.score - a.score)
    .map((item, i) => ({ ...item, rank: i + 1 }))
}
