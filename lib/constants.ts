import {
  IconSparkles,
  IconHistory,
  IconChartBar,
  IconShield,
  IconBuilding,
} from "@tabler/icons-react"
import type { NavItem, Variant } from "@/types"

export const POSTS_USED = 3
export const PLAN_LIMIT = 5

export const NAV_MAIN: NavItem[] = [
  { id: "generate", label: "Generate", icon: IconSparkles },
  { id: "history", label: "History", icon: IconHistory },
  { id: "analytics", label: "Analytics", icon: IconChartBar },
]

export const NAV_CONFIG: NavItem[] = [
  { id: "guardrails", label: "Guardrails", icon: IconShield },
  { id: "workspace", label: "Workspace", icon: IconBuilding },
]

export const VARIANTS: Variant[] = [
  {
    rank: 1,
    style: "Thought leader",
    language: "English",
    score: 91,
    engagement: 89,
    clarity: 94,
    formatting: 91,
    hook: "AI just made 3 of your interview rounds obsolete. Here's what smart founders are doing instead.",
    body: "The hiring funnel hasn't changed in 20 years — but AI just broke it wide open. Companies like Shopify and Notion are cutting first-round screens entirely, using AI-generated work samples and async video instead. The result? 60% faster time-to-hire and better signal on culture fit.",
    cta: "What's one interview step you'd cut today? Drop it below 👇",
    hashtags: ["#AIHiring", "#FutureOfWork", "#TechLeadership", "#Recruiting"],
    reasoning:
      "Strong hook with urgency. CTA drives comment engagement. Well-structured with social proof.",
  },
  {
    rank: 2,
    style: "Story-driven",
    language: "English",
    score: 84,
    engagement: 86,
    clarity: 82,
    formatting: 85,
    hook: "Last week I rejected a senior engineer after 4 rounds. Then I realized the problem wasn't them.",
    body: "It was our process. We spent 18 hours of engineering time to learn what an AI-graded code sample showed in 20 minutes. Painful lesson — but we rebuilt the loop in a weekend and our offer-acceptance rate jumped 40%.",
    cta: "Ever rejected a great candidate because of a bad process? I'd love to hear it.",
    hashtags: ["#Hiring", "#EngineeringLeadership", "#StartupLife"],
    reasoning:
      "Personal narrative drives relatability. Slightly weaker formatting due to dense paragraph.",
  },
  {
    rank: 3,
    style: "Contrarian",
    language: "English",
    score: 78,
    engagement: 82,
    clarity: 76,
    formatting: 77,
    hook: "Unpopular opinion: most 2025 'AI hiring tools' are just expensive ATS skins.",
    body: "I've trialed 11 of them this quarter. Only 2 changed our funnel metrics. The rest? Glorified resume parsers with a chatbot wrapper. The real edge isn't the tool — it's redesigning the loop around what AI is actually good at.",
    cta: "Which AI hiring tool actually moved the needle for you?",
    hashtags: ["#AITools", "#TalentAcquisition", "#HRTech"],
    reasoning:
      "Bold take generates debate. Hook risks alienating tool vendors in audience.",
  },
]

export const AUDIENCE_OPTIONS = [
  "Founders",
  "Investors",
  "Engineers",
  "Recruiters",
  "Product Managers",
  "Designers",
]

export const TONE_OPTIONS = [
  "Thought leader",
  "Story",
  "Contrarian",
  "Casual",
]

export const LANGUAGE_OPTIONS = ["EN", "BN", "Banglish"]
