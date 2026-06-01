export const MARKDOWN_FENCE_OPEN = /^```(?:json)?\s*\n?/i
export const MARKDOWN_FENCE_CLOSE = /\n?```\s*$/i

export const HAS_DIGITS = /\d+/
export const HOOK_PATTERNS =
  /^(unpopular opinion|i (?:just|haven't|recently)|last week|here's why)/i
export const CTA_PATTERNS =
  /(?:share|comment|drop|tell me|what's your|how do you)/i
export const SENTENCE_SPLIT = /[.!?]+/
export const WORD_SPLIT = /\s+/
export const PARAGRAPH_SPLIT = /\n\n+/
export const DATA_PATTERNS = /\d+%|\$|\d+x/
export const LIST_PATTERNS = /^\d+[\.\)]|^- |^• /m
export const LINE_SPLIT = /\n/
export const WALL_OF_TEXT_LINE = /^.{200,}$/
