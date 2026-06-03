import type { SourceItem } from "./trending.types"
import type { TrendingPrefs } from "../prefs/prefs.schema"
import { logger } from "@/core/logger"
import {
  EXTERNAL_API,
  AI_CONFIG,
  HTTP_STATUS,
  TRENDING_KEYWORDS_MAX,
  TRENDING_SUBREDDITS_MAX,
  TRENDING_POSTS_DEFAULT,
  MILLISECONDS,
  GITHUB_FRESH_DAYS,
} from "@/lib/constants"

interface HNHit {
  title: string
  url?: string
  points?: number
}

interface DevToArticle {
  title: string
  url: string
  positive_reactions_count?: number
  comments_count?: number
}

interface GitHubRepo {
  full_name: string
  html_url: string
  stargazers_count?: number
}

interface RedditChild {
  data: {
    title: string
    permalink: string
    score?: number
    is_self?: boolean
  }
}

export function buildSourceKeywords(config: TrendingPrefs): string[] {
  const raw = [
    ...(config.topics ?? []),
    ...(Array.isArray(config.industry)
      ? config.industry
      : [config.industry ?? ""]),
    ...(config.targetAudience ?? []),
  ]
  return [...new Set(raw.filter(Boolean).map((k) => k.toLowerCase().trim()))]
}

export async function fetchHackerNews(
  keywords: string[],
  count: number
): Promise<SourceItem[]> {
  try {
    const query = keywords.slice(0, TRENDING_KEYWORDS_MAX).join(" OR ")
    const url = `${EXTERNAL_API.HN_SEARCH}?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=${count}&numericFilters=${encodeURIComponent('points>50')}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HN API ${res.status}`)
    const data = await res.json()
    return (data.hits ?? [])
      .filter((h: HNHit) => h.url)
      .map((h: HNHit) => ({
        source: "hackernews" as const,
        title: h.title,
        url: h.url,
        score: h.points ?? 0,
        rank: 0,
      }))
  } catch (err) {
    logger.warn({ err }, "fetchHackerNews failed")
    return []
  }
}

export async function fetchDevTo(
  keywords: string[],
  count: number
): Promise<SourceItem[]> {
  try {
    const tag = keywords[0] ?? "programming"
    const url = `${EXTERNAL_API.DEVTO_ARTICLES}?tag=${encodeURIComponent(tag)}&per_page=${count}&top=7`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Dev.to API ${res.status}`)
    const articles = await res.json()
    return (articles ?? []).map((a: DevToArticle) => ({
      source: "devto" as const,
      title: a.title,
      url: a.url,
      score: (a.positive_reactions_count ?? 0) + (a.comments_count ?? 0),
      rank: 0,
    }))
  } catch (err) {
    logger.warn({ err }, "fetchDevTo failed")
    return []
  }
}

export async function fetchGitHub(
  keywords: string[],
  count: number
): Promise<SourceItem[]> {
  try {
    const sevenDaysAgo = new Date(
      Date.now() - GITHUB_FRESH_DAYS * MILLISECONDS.DAY
    )
      .toISOString()
      .split("T")[0]
    const q = `${keywords.slice(0, 3).join(" ")} created:>${sevenDaysAgo}`
    const url = `${EXTERNAL_API.GITHUB_SEARCH}?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=${count}`
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": AI_CONFIG.GITHUB_USER_AGENT,
      },
    })
    if (
      res.status === HTTP_STATUS.FORBIDDEN ||
      res.status === HTTP_STATUS.TOO_MANY_REQUESTS
    ) {
      logger.warn({ status: res.status }, "GitHub rate limit hit")
      return []
    }
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const data = await res.json()
    return (data.items ?? []).map((r: GitHubRepo) => ({
      source: "github" as const,
      title: r.full_name,
      url: r.html_url,
      score: r.stargazers_count ?? 0,
      rank: 0,
    }))
  } catch (err) {
    logger.warn({ err }, "fetchGitHub failed")
    return []
  }
}

export async function fetchReddit(
  keywords: string[],
  count: number
): Promise<SourceItem[]> {
  const subredditMap: Record<string, string> = {
    react: "reactjs",
    typescript: "typescript",
    javascript: "javascript",
    ai: "MachineLearning",
    "machine learning": "MachineLearning",
    devops: "devops",
    python: "Python",
    golang: "golang",
    backend: "backend",
    frontend: "webdev",
    startup: "startups",
    saas: "SaaS",
    developer: "programming",
    engineering: "ExperiencedDevs",
  }
  const subreddits = [
    ...new Set(
      keywords.flatMap((k) => (subredditMap[k] ? [subredditMap[k]] : []))
    ),
  ]
  const subreddit =
    subreddits.length > 0
      ? subreddits.slice(0, TRENDING_SUBREDDITS_MAX).join("+")
      : "programming+webdev"

  try {
    const url = `${EXTERNAL_API.REDDIT_HOT}/${subreddit}/hot.json?limit=${count}&raw_json=1`
    const res = await fetch(url, {
      headers: { "User-Agent": AI_CONFIG.REDDIT_USER_AGENT },
    })
    if (!res.ok) throw new Error(`Reddit API ${res.status}`)
    const data = await res.json()
    return (data?.data?.children ?? [])
      .filter((c: RedditChild) => !c.data.is_self)
      .map((c: RedditChild) => ({
        source: "reddit" as const,
        title: c.data.title,
        url: `${AI_CONFIG.REDDIT_BASE_URL}${c.data.permalink}`,
        score: c.data.score ?? 0,
        rank: 0,
      }))
  } catch (err) {
    logger.warn({ err }, "fetchReddit failed")
    return []
  }
}

export async function fetchTrendingSources(
  config: TrendingPrefs
): Promise<SourceItem[]> {
  const keywords = buildSourceKeywords(config)
  const count = config.postsPerPlatform ?? TRENDING_POSTS_DEFAULT

  const fetchers: Promise<SourceItem[]>[] = []
  if (config.platforms.includes("hackernews"))
    fetchers.push(fetchHackerNews(keywords, count))
  if (config.platforms.includes("devto"))
    fetchers.push(fetchDevTo(keywords, count))
  if (config.platforms.includes("github"))
    fetchers.push(fetchGitHub(keywords, count))
  if (config.platforms.includes("reddit"))
    fetchers.push(fetchReddit(keywords, count))

  const results = await Promise.allSettled(fetchers)
  const all = results
    .filter(
      (r): r is PromiseFulfilledResult<SourceItem[]> => r.status === "fulfilled"
    )
    .flatMap((r) => r.value)

  const seen = new Set<string>()
  return all.filter((item) => {
    if (seen.has(item.url)) return false
    seen.add(item.url)
    return true
  })
}
