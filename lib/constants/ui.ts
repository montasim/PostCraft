import {
  IconSparkles,
  IconHistory,
  IconChartBar,
  IconShield,
  IconBuilding,
  IconUser,
  IconSettings,
  IconTrendingUp,
  IconBrandLinkedin,
  IconBrandFacebook,
} from "@tabler/icons-react"
import type { NavItem, SortOption, ScoreRange } from "@/types"
import type { SelectOption } from "@/components/shared/multi-select"

export const NAV_MAIN: NavItem[] = [
  { id: "generate", label: "New Post", icon: IconSparkles },
  { id: "trending", label: "Trending", icon: IconTrendingUp },
  { id: "library", label: "Library", icon: IconHistory },
  { 
    id: "insights", 
    label: "Insights", 
    icon: IconChartBar,
    subItems: [
      { id: "linkedin", label: "LinkedIn", icon: IconBrandLinkedin },
      { id: "facebook", label: "Facebook", icon: IconBrandFacebook }
    ]
  },
]

export const NAV_CONFIG: NavItem[] = [
  { id: "brand-guard", label: "Brand Guard", icon: IconShield },
  { id: "brand-voice", label: "Brand Voice", icon: IconBuilding },
]

export const NAV_ACCOUNT: NavItem[] = [
  { id: "profile", label: "Profile", icon: IconUser },
  { id: "settings", label: "Settings", icon: IconSettings },
]

export const AUDIENCE_OPTIONS: SelectOption[] = [
  {
    value: "HR Recruiters",
    label: "HR Recruiters",
    description:
      "Scanning for culture fit, communication clarity, and career trajectory signals",
  },
  {
    value: "Hiring Managers",
    label: "Hiring Managers",
    description:
      "Looking for proven problem-solvers who understand business impact",
  },
  {
    value: "Tech Leads",
    label: "Tech Leads",
    description:
      "Respect depth: architectural decisions, trade-offs, and production lessons",
  },
  {
    value: "CTO / VP Engineering",
    label: "CTO / VP Engineering",
    description:
      "Demonstrate systems thinking, ownership, and strategic technical vision",
  },
  {
    value: "Fellow Developers",
    label: "Fellow Developers",
    description:
      "Share battle-tested patterns, debugging war stories, and open-source contributions",
  },
  {
    value: "Startup Founders",
    label: "Startup Founders",
    description:
      "Show you can ship fast, wear multiple hats, and thrive in ambiguity",
  },
  {
    value: "Product Managers",
    label: "Product Managers",
    description:
      "Bridge tech and business: show you understand user problems, not just code",
  },
  {
    value: "Potential Clients",
    label: "Potential Clients",
    description: "Prove expertise through case studies and measurable outcomes",
  },
  {
    value: "Community Builders",
    label: "Community Builders",
    description: "Engage with genuine questions, amplify others, share freely",
  },
  {
    value: "Indie Hackers",
    label: "Indie Hackers",
    description:
      "Connect through shared struggles of building and shipping alone",
  },
]

export const TONE_OPTIONS: SelectOption[] = [
  {
    value: "Thought Leadership",
    label: "Thought Leadership",
    description: "Original insights backed by experience, not recycled advice",
  },
  {
    value: "Storytelling",
    label: "Storytelling",
    description:
      "Real scenarios with conflict, decision, and outcome readers can feel",
  },
  {
    value: "Educational",
    label: "Educational",
    description:
      "Break complex topics into clear, actionable steps anyone can follow",
  },
  {
    value: "Contrarian",
    label: "Contrarian",
    description:
      "Challenge common wisdom with evidence, spark productive debate",
  },
  {
    value: "Inspirational",
    label: "Inspirational",
    description:
      "Comebacks, turning points, and lessons from failure without fluff",
  },
  {
    value: "Analytical",
    label: "Analytical",
    description:
      "Data-driven takes with charts, benchmarks, or before/after comparisons",
  },
  {
    value: "Conversational",
    label: "Conversational",
    description: "Write like a DM to a smart friend — warm and approachable",
  },
  {
    value: "Action-Oriented",
    label: "Action-Oriented",
    description:
      "Give specific steps, templates, or frameworks readers can use today",
  },
]

export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: "EN", label: "English" },
  { value: "BN", label: "Bangla" },
  { value: "Banglish", label: "Banglish (Bangla + English)" },
]

export const SORT_OPTIONS: SortOption[] = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "highest-score", label: "Highest score" },
  { id: "most-engaging", label: "Most engaging" },
]

export const SCORE_RANGES: ScoreRange[] = [
  { id: "all", label: "All scores", min: 0, max: 100 },
  { id: "90+", label: "90+", min: 90, max: 100 },
  { id: "80-89", label: "80–89", min: 80, max: 89 },
  { id: "70-79", label: "70–79", min: 70, max: 79 },
  { id: "below70", label: "Below 70", min: 0, max: 69 },
]

export const INDUSTRY_OPTIONS: SelectOption[] = [
  { value: "Technology / SaaS", label: "Technology / SaaS" },
  { value: "Marketing / Advertising", label: "Marketing / Advertising" },
  { value: "Finance / FinTech", label: "Finance / FinTech" },
  { value: "Healthcare / Biotech", label: "Healthcare / Biotech" },
  { value: "Education / EdTech", label: "Education / EdTech" },
  { value: "Consulting", label: "Consulting" },
  { value: "Other", label: "Other" },
]

export const PLATFORM_OPTIONS: SelectOption[] = [
  {
    value: "linkedin",
    label: "LinkedIn",
    description:
      "Professional posts with authority, long-form industry insight",
  },
  {
    value: "twitter",
    label: "Twitter / X",
    description: "Concise quick updates, punchy, under 280 characters",
  },
  {
    value: "facebook",
    label: "Facebook",
    description: "Conversational, community-oriented, storytelling",
  },
]

export const TOPIC_OPTIONS: SelectOption[] = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nextjs", label: "Next.js" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "devops", label: "DevOps" },
  { value: "ai", label: "AI / Machine Learning" },
  { value: "cloud", label: "Cloud Computing" },
  { value: "security", label: "Security" },
  { value: "mobile", label: "Mobile Development" },
  { value: "startup", label: "Startups" },
  { value: "career", label: "Career Growth" },
  { value: "leadership", label: "Engineering Leadership" },
  { value: "open-source", label: "Open Source" },
  { value: "web-performance", label: "Web Performance" },
]
