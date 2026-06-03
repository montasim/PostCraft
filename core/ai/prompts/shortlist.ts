/**
 * core/ai/prompts/shortlist.ts
 *
 * OPTIMIZED: Tighter token footprint. Selection criteria condensed.
 * Output schema simplified — removed redundant fields.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShortlistItem {
  title: string;
  url?: string;
  score?: number;
  source?: string;
}

export interface ShortlistPromptData {
  items: ShortlistItem[];
  selectCount: number;
  platforms: string[];
  audiences: string[];
}

// ─── Prompt builder ───────────────────────────────────────────────────────────

export function buildShortlistPrompt(data: ShortlistPromptData): {
  system: string;
  user: string;
} {
  const itemList = data.items
    .map((item, i) => `${i + 1}. ${item.title}${item.source ? ` [${item.source}]` : ""}`)
    .join("\n");

  const system = `You are a content strategist selecting trending topics for social posts.

SELECTION RULES (in priority order):
1. Relevance — directly relates to ${data.audiences.join(", ")} on ${data.platforms.join(", ")}
2. Post potential — can generate multiple distinct angles (story, data, opinion, question)
3. Recency signal — breaking or newly emerging > evergreen
4. Diversity — no two selected topics from the same niche or framing

REJECT if: topic is too niche to generate engagement, too broad to say anything specific, or requires technical expertise the average user lacks.

OUTPUT: JSON only. {"selected":[{"title":"string","url":"string","selectionReason":"max 10 words"}]}`;

  const user = `Select ${data.selectCount} topics from this list. Platforms: ${data.platforms.join(", ")}. Audiences: ${data.audiences.join(", ")}.

TOPICS:
${itemList}`;

  return { system, user };
}
