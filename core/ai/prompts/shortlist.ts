export function buildShortlistSystemPrompt(): string {
  return `You are a content strategist for LinkedIn post generation.
Your job is to select the most engaging trending topics for a specific professional audience.
You understand what drives LinkedIn engagement: controversy, practical insight, and timely relevance.
Always respond with valid JSON only. No markdown fences. No explanation outside the JSON.`
}

export function buildShortlistPrompt(
  items: Array<{ title: string; url: string; score: number; source: string; rank: number }>,
  persona: {
    targetAudience: string[]
    topics: string[]
    industry: string[]
    language: string[]
  },
  topN: number
): string {
  const audienceStr = persona.targetAudience.join(", ") || "software developers"
  const topicsStr = persona.topics.join(", ") || "software development"
  const industryStr = persona.industry.join(", ") || "technology"
  const languageStr = persona.language.join(", ") || "english"

  return `Select the ${topN} best topics for LinkedIn posts from the list below.

TARGET AUDIENCE: ${audienceStr}
RELEVANT TOPICS: ${topicsStr}
INDUSTRY: ${industryStr}
LANGUAGE: ${languageStr}

AVAILABLE ITEMS (${items.length} total):
${items.map((item, i) =>
  `${i + 1}. [Platform: ${item.source.toUpperCase()} | Score: ${item.score}]
   Title: ${item.title}
   URL: ${item.url}`
).join("\n\n")}

SELECTION CRITERIA (in priority order):
1. Relevance — matches the audience's interests and topics
2. Engagement potential — controversial, insightful, or timely for LinkedIn
3. Platform score — higher score = more community validation
4. Diversity — prefer items from different platforms when scores are similar

Return exactly ${topN} items. Maintain all original fields unchanged.

Respond with this exact JSON shape:
{
  "selected": [
    {
      "title": "<exact title from input>",
      "url": "<exact url from input>",
      "score": <number>,
      "source": "<exact source from input>",
      "rank": <new 1-based rank after your selection>,
      "selectionReason": "<one sentence: why this topic works for this audience>"
    }
  ]
}`
}
