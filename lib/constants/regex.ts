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

export const PROMPT_INJECTION_PATTERNS =
  /ignore|forget|override|system\s*prompt|new\s*instructions|you are now|act as|disregard|bypass|jailbreak/i

export const SLANG_PATTERNS =
  /\b(gonna|wanna|gotta|u\b|ur\b|af\b|lol|lmao|lmfao|rofl|smh|tbh|afk|btw|idk|imo|imho|irl|omg|wtf|ftw|stfu|af|rn|prolly|def)\b/i

export const AI_CLICHE_PATTERNS =
  /in today's digital landscape|it's worth noting|let's dive in|navigate the complex|in the world of|think outside the box|paradigm shift|at the end of the day|it is what it is|the fact of the matter|in order to|due to the fact that|arguably|essentially|highly scalable|cutting-edge|revolutionary|game.?changer|synergy|leverage|circle back|reach out|touch base|quick sync|deep dive|moving forward|holistic|end to end|best in class|world class|mission critical|bleeding edge|thought leadership(?![ ]*option)/i

export const PROFANITY_PATTERNS =
  /\b(fuck|shit|ass|bitch|damn|crap|dick|bastard|piss|slut|whore|douche|jackass)\b/i

export const HATE_SPEECH_PATTERNS =
  /kill all|exterminate|destroy all|hate (group|race|religion|gender)|superior race|inferior race/i
