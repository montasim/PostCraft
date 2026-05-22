export interface JudgePromptData {
  hook: string
  body: string
  cta: string
  hashtags: string[]
  audiences: string[]
  topic: string
}

export function buildJudgeSystemPrompt(): string {
  return `You are a LinkedIn engagement analytics expert. You evaluate posts for their likelihood of generating meaningful engagement (likes, comments, shares) on LinkedIn.`
}

export function buildJudgePrompt(data: JudgePromptData): string {
  return `Evaluate this LinkedIn post for engagement potential.

TOPIC: ${data.topic}
TARGET AUDIENCES: ${data.audiences.join(", ")}

POST:
Hook: ${data.hook}

${data.body}

${data.cta}

${data.hashtags.join(" ")}

Rate engagement probability from 0-100 and explain your reasoning briefly.
Consider: hook strength, audience relevance, CTA effectiveness, shareability, authenticity.

Respond with valid JSON only:
{
  "score": <number 0-100>,
  "reasoning": "<string, 1-2 sentences>"
}`
}
