import {
  IconSparkles,
  IconHistory,
  IconChartBar,
  IconShield,
  IconBuilding,
} from "@tabler/icons-react"
import type { NavItem, Variant, HistoryEntry, SortOption, ScoreRange, AnalyticsOverview, ScoreDistribution, StylePerformance, TrendDataPoint, TopPerformingPost } from "@/types"

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

export const TONE_OPTIONS = ["Thought leader", "Story", "Contrarian", "Casual"]

export const LANGUAGE_OPTIONS = ["EN", "BN", "Banglish"]

export const PAGE_SIZE = 6

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

export const HISTORY_ENTRIES: HistoryEntry[] = [
  {
    id: "h1",
    topic: "How AI is reshaping software hiring in 2025",
    audience: ["Founders", "Recruiters"],
    tones: ["Thought leader", "Story", "Contrarian"],
    language: "English",
    includeEmoji: true,
    variants: [
      {
        rank: 1, style: "Thought leader", language: "English",
        score: 93, engagement: 91, clarity: 95, formatting: 92,
        hook: "AI just made 3 of your interview rounds obsolete. Here's what smart founders are doing instead.",
        body: "The hiring funnel hasn't changed in 20 years — but AI just broke it wide open. Companies like Shopify and Notion are cutting first-round screens entirely, using AI-generated work samples and async video instead. The result? 60% faster time-to-hire and better signal on culture fit.",
        cta: "What's one interview step you'd cut today? Drop it below 👇",
        hashtags: ["#AIHiring", "#FutureOfWork", "#TechLeadership", "#Recruiting"],
        reasoning: "Strong hook with urgency. CTA drives comment engagement.",
      },
      {
        rank: 2, style: "Story-driven", language: "English",
        score: 87, engagement: 89, clarity: 85, formatting: 86,
        hook: "Last week I rejected a senior engineer after 4 rounds. Then I realized the problem wasn't them.",
        body: "It was our process. We spent 18 hours of engineering time to learn what an AI-graded code sample showed in 20 minutes. Painful lesson — but we rebuilt the loop in a weekend and our offer-acceptance rate jumped 40%.",
        cta: "Ever rejected a great candidate because of a bad process? I'd love to hear it.",
        hashtags: ["#Hiring", "#EngineeringLeadership", "#StartupLife"],
        reasoning: "Personal narrative drives relatability.",
      },
      {
        rank: 3, style: "Contrarian", language: "English",
        score: 75, engagement: 78, clarity: 73, formatting: 74,
        hook: "Unpopular opinion: most 2025 'AI hiring tools' are just expensive ATS skins.",
        body: "I've trialed 11 of them this quarter. Only 2 changed our funnel metrics. The rest? Glorified resume parsers with a chatbot wrapper. The real edge isn't the tool — it's redesigning the loop around what AI is actually good at.",
        cta: "Which AI hiring tool actually moved the needle for you?",
        hashtags: ["#AITools", "#TalentAcquisition", "#HRTech"],
        reasoning: "Bold take generates debate. Weaker formatting.",
      },
    ],
    createdAt: "2025-05-20T10:30:00Z",
    status: "published",
  },
  {
    id: "h2",
    topic: "Why most startups fail at hiring",
    audience: ["Founders", "Engineers"],
    tones: ["Thought leader", "Story", "Casual"],
    language: "English",
    includeEmoji: false,
    variants: [
      {
        rank: 1, style: "Thought leader", language: "English",
        score: 96, engagement: 94, clarity: 97, formatting: 95,
        hook: "Unpopular opinion: most 2025 'AI hiring tools' are just expensive ATS skins.",
        body: "I've trialed 11 of them this quarter. Only 2 changed our funnel metrics. The rest? Glorified resume parsers with a chatbot wrapper. The real edge isn't the tool — it's redesigning the loop around what AI is actually good at.",
        cta: "Which AI hiring tool actually moved the needle for you?",
        hashtags: ["#AITools", "#TalentAcquisition", "#HRTech"],
        reasoning: "Bold take generates debate. Highest engagement potential.",
      },
      {
        rank: 2, style: "Story-driven", language: "English",
        score: 88, engagement: 85, clarity: 90, formatting: 88,
        hook: "Scaling from 5 to 50 people taught me one thing: your first 10 hires determine your next 100.",
        body: "I used to hire for skills. Now I hire for trajectory. The engineer who ships fast but can't collaborate? Culture debt. The designer who's 'junior' but asks the right questions? Force multiplier. Your first hires encode your company's DNA — choose wisely.",
        cta: "What's the best hiring lesson you've learned the hard way?",
        hashtags: ["#Leadership", "#StartupHiring", "#Founders"],
        reasoning: "Strong authority signal. Practical advice resonates.",
      },
      {
        rank: 3, style: "Casual", language: "English",
        score: 72, engagement: 76, clarity: 70, formatting: 71,
        hook: "Cover letters are dead. I said it. And our hiring got 3x better.",
        body: "We replaced cover letters with a 3-question async video. Took candidates 5 minutes. Took us 2 minutes to review. Signal-to-noise ratio went through the roof. The best part? Candidates loved it.",
        cta: "Are you still reading cover letters? Why?",
        hashtags: ["#HiringTips", "#RecruitingHacks", "#FutureOfWork"],
        reasoning: "Provocative hook. Simple change with big impact.",
      },
    ],
    createdAt: "2025-05-19T14:15:00Z",
    status: "published",
  },
  {
    id: "h3",
    topic: "Remote work productivity hacks",
    audience: ["Engineers", "Product Managers"],
    tones: ["Casual", "Story", "Contrarian"],
    language: "English",
    includeEmoji: true,
    variants: [
      {
        rank: 1, style: "Casual", language: "English",
        score: 82, engagement: 80, clarity: 84, formatting: 81,
        hook: "I've been remote for 4 years. These 5 habits changed everything.",
        body: "1. No meetings before 11am. 2. Time-block deep work in 90-min sprints. 3. 'Walking meetings' for 1:1s. 4. End-of-day shutdown ritual. 5. One no-screen lunch break. Sounds simple? Most people skip #5 and wonder why they burn out.",
        cta: "What's your #1 remote productivity tip?",
        hashtags: ["#RemoteWork", "#Productivity", "#WorkFromHome"],
        reasoning: "List format performs well. Conversational tone.",
      },
      {
        rank: 2, style: "Story-driven", language: "English",
        score: 75, engagement: 78, clarity: 73, formatting: 74,
        hook: "We tried a 4-day work week for 3 months. Here's the honest truth.",
        body: "Week 1: Everyone was thrilled. Week 6: Output was flat. Week 12: We reverted. Not because it doesn't work — but because we didn't redesign the work. Same meetings, same Slack culture, just less time.",
        cta: "Has anyone made a 4-day week actually work? Share your playbook.",
        hashtags: ["#FutureOfWork", "#4DayWeek", "#StartupCulture"],
        reasoning: "Honest contrarian take. Relatable failure story.",
      },
      {
        rank: 3, style: "Contrarian", language: "Banglish",
        score: 69, engagement: 74, clarity: 67, formatting: 68,
        hook: "If your remote team has more than 3 sync meetings a week, you're doing it wrong.",
        body: "We went all-in on async: Loom for updates, Notion for decisions, Slack for emergencies only. Sounds rigid? Our response time actually improved. People processed info when they were fresh, not when a calendar told them to.",
        cta: "How many sync meetings does your team have per week? Be honest.",
        hashtags: ["#AsyncWork", "#RemoteTeams", "#DistributedWork"],
        reasoning: "Low score due to weak hook and generic advice.",
      },
    ],
    createdAt: "2025-05-18T09:00:00Z",
    status: "published",
  },
  {
    id: "h4",
    topic: "Building diverse engineering teams",
    audience: ["Founders", "Designers", "Recruiters"],
    tones: ["Thought leader", "Contrarian", "Story"],
    language: "English",
    includeEmoji: false,
    variants: [
      {
        rank: 1, style: "Thought leader", language: "English",
        score: 91, engagement: 88, clarity: 93, formatting: 90,
        hook: "Diversity in tech isn't a pipeline problem — it's a design problem.",
        body: "We rewrote our job posts to remove 15 biased phrases. Applications from underrepresented groups jumped 45%. No pipeline programs. No referral bonuses. Just better language. Sometimes the simplest fix is the one nobody tries.",
        cta: "What's one hiring practice you've changed that made a real difference?",
        hashtags: ["#DiversityInTech", "#InclusiveHiring", "#Engineering"],
        reasoning: "Data-backed claim. Actionable takeaway.",
      },
      {
        rank: 2, style: "Contrarian", language: "English",
        score: 85, engagement: 87, clarity: 83, formatting: 84,
        hook: "Stop asking senior engineers to code on a whiteboard. Start doing this instead.",
        body: "We replaced live coding with system design reviews of their past work. They bring a real architecture decision they made. We discuss trade-offs. Result? Zero false negatives in 6 months and candidates say it's the best interview they've had.",
        cta: "What's your go-to interview format for senior hires?",
        hashtags: ["#EngineeringHiring", "#TechInterviews", "#SeniorEngineers"],
        reasoning: "Practical alternative to common pain point.",
      },
      {
        rank: 3, style: "Story-driven", language: "English",
        score: 78, engagement: 81, clarity: 76, formatting: 78,
        hook: "Our startup had ping-pong tables, free lunches, and a keg. We also had 40% attrition.",
        body: "Culture isn't perks — it's how you handle hard moments. When we laid off 20% of the team, the keg didn't help. What helped? Radical transparency about why and what comes next. That's when I learned: culture is what you do when it hurts.",
        cta: "What defines culture at your company — perks or principles?",
        hashtags: ["#StartupCulture", "#Leadership", "#Founders"],
        reasoning: "Vulnerable storytelling. Strong emotional resonance.",
      },
    ],
    createdAt: "2025-05-12T13:00:00Z",
    status: "draft",
  },
  {
    id: "h5",
    topic: "The 4-day work week experiment",
    audience: ["Founders", "Product Managers", "Engineers"],
    tones: ["Thought leader", "Contrarian", "Casual"],
    language: "EN",
    includeEmoji: true,
    variants: [
      {
        rank: 1, style: "Thought leader", language: "English",
        score: 90, engagement: 92, clarity: 88, formatting: 89,
        hook: "I haven't read a resume in 2 years. Here's what I look at instead.",
        body: "GitHub commits. Writing samples. A 2-minute Loom explaining their hardest problem. Resumes tell you what someone claims. Portfolio evidence tells you what they can do. The signal difference is 10x.",
        cta: "If you could only see ONE thing from a candidate, what would it be?",
        hashtags: ["#Hiring", "#Recruiting", "#NoResume"],
        reasoning: "Provocative opener. Practical alternatives provided.",
      },
      {
        rank: 2, style: "Contrarian", language: "English",
        score: 83, engagement: 86, clarity: 80, formatting: 82,
        hook: "Quiet quitting isn't real. Disengaged management is. And the data proves it.",
        body: "Gallup says 70% of disengagement traces back to the manager. Not compensation. Not perks. Not remote work. The manager. If your team is 'quiet quitting,' look in the mirror before you look at them.",
        cta: "Have you ever had a manager who made you want to go above and beyond? What did they do differently?",
        hashtags: ["#Management", "#EmployeeEngagement", "#Leadership"],
        reasoning: "Blame reframe. Strong CTA for storytelling.",
      },
      {
        rank: 3, style: "Casual", language: "BN",
        score: 65, engagement: 62, clarity: 68, formatting: 64,
        hook: "The next 100M developers aren't in Silicon Valley. They're in markets most companies ignore.",
        body: "We hired 12 engineers across Dhaka, Lagos, and Bogotá. The talent was exceptional. The challenge? Not the skills gap — it was our interview process. Once we adapted, retention hit 95%. Global hiring isn't charity, it's competitive advantage.",
        cta: "Where's the best under-the-radar tech talent you've found?",
        hashtags: ["#GlobalHiring", "#RemoteTeams", "#EmergingMarkets"],
        reasoning: "Unique perspective. Under-served topic in the space.",
      },
    ],
    createdAt: "2025-05-10T15:30:00Z",
    status: "archived",
  },
]

export const ANALYTICS_OVERVIEW: AnalyticsOverview = {
  totalPosts: 15,
  avgScore: 82,
  avgEngagement: 84,
  successRate: 97,
  weeklyChange: 8,
  streakDays: 4,
  consistencyScore: 78,
  monthlyGoalProgress: 15,
  monthlyGoal: 20,
  topPercentile: 12,
}

export const SCORE_DISTRIBUTION: ScoreDistribution[] = [
  { range: "90-100", count: 5, percentage: 33 },
  { range: "80-89", count: 6, percentage: 40 },
  { range: "70-79", count: 3, percentage: 20 },
  { range: "Below 70", count: 1, percentage: 7 },
]

export const STYLE_PERFORMANCE: StylePerformance[] = [
  { style: "Thought leader", avgScore: 90, avgEngagement: 88, count: 6 },
  { style: "Story-driven", avgScore: 83, avgEngagement: 86, count: 4 },
  { style: "Contrarian", avgScore: 81, avgEngagement: 84, count: 3 },
  { style: "Casual", avgScore: 73, avgEngagement: 72, count: 2 },
]

export const TREND_DATA: TrendDataPoint[] = [
  { date: "Apr 18", score: 55, engagement: 58 },
  { date: "Apr 22", score: 90, engagement: 92 },
  { date: "Apr 25", score: 83, engagement: 86 },
  { date: "Apr 28", score: 65, engagement: 62 },
  { date: "May 2", score: 85, engagement: 87 },
  { date: "May 5", score: 78, engagement: 81 },
  { date: "May 8", score: 91, engagement: 88 },
  { date: "May 10", score: 69, engagement: 74 },
  { date: "May 12", score: 82, engagement: 80 },
  { date: "May 15", score: 72, engagement: 76 },
  { date: "May 17", score: 96, engagement: 94 },
  { date: "May 18", score: 75, engagement: 78 },
  { date: "May 19", score: 88, engagement: 85 },
  { date: "May 20", score: 93, engagement: 91 },
]

export const TOP_POSTS: TopPerformingPost[] = [
  { topic: "The contrarian take on AI hiring tools", score: 96, engagement: 94, style: "Contrarian", date: "May 17" },
  { topic: "How AI is reshaping software hiring in 2025", score: 93, engagement: 91, style: "Thought leader", date: "May 20" },
  { topic: "How to interview senior engineers", score: 91, engagement: 88, style: "Thought leader", date: "May 8" },
  { topic: "The resume is dead", score: 90, engagement: 92, style: "Thought leader", date: "Apr 22" },
  { topic: "The 4-day work week experiment", score: 90, engagement: 92, style: "Thought leader", date: "May 10" },
]
