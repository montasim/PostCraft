# Trending Backend Implementation Prompt

## Context

The Trending feature has a complete frontend built with mock data at `modules/trending/trending.mock.ts`. The existing backend includes: prefs CRUD for trending config (`/api/prefs/trending`), Inngest-based generation pipeline (`core/queue/pipeline.ts`), Gemini AI variant generation, scoring/ranking services, and a workspace persona model. This prompt builds the backend to replace the mock data with real trending runs and generated posts.

## Strict Constraints

### Files that MUST NOT be touched
- `components/features/trending/*` — all frontend components
- `components/layout/sidebar.tsx` — already wired
- `components/layout/app-shell.tsx` — already fetches trending prefs
- `components/shared/variant-card.tsx` — already extended
- `modules/prefs/*` — already complete for trending prefs CRUD
- `app/api/prefs/trending/route.ts` — already complete
- `app/trending/page.tsx` — already complete
- `lib/constants.ts` — already has TOPIC_OPTIONS, INDUSTRY_OPTIONS
- `core/queue/pipeline.ts` — existing generation pipeline
- `core/queue/functions.ts` — existing Inngest function
- `core/queue/client.ts` — existing Inngest client

### Files that MAY be created or modified
- `modules/trending/trending.model.ts` — NEW: Mongoose models for TrendingRun
- `modules/trending/trending.repository.ts` — NEW: DB access layer
- `modules/trending/trending.service.ts` — NEW: business logic
- `modules/trending/source-fetcher.ts` — NEW: fetch trending content from platforms
- `modules/trending/trending-ranker.ts` — NEW: score and rank source items
- `app/api/trending/route.ts` — NEW: GET runs + generations for workspace
- `app/api/trending/run-now/route.ts` — NEW: POST trigger immediate run
- `core/queue/functions.ts` — MODIFY: add `runTrendingPipeline` Inngest function
- `components/features/trending/trending-shell.tsx` — MODIFY: replace mock imports with fetch

## Pre-Implementation Reading

Read these files before writing any code:
1. `modules/trending/trending.types.ts` — type contract
2. `modules/trending/trending.mock.ts` — mock data shapes
3. `modules/trending/trending-schedule.ts` — schedule utilities
4. `modules/prefs/prefs.schema.ts` — TrendingPrefs Zod schema
5. `modules/prefs/prefs.model.ts` — existing prefs model with trending sub-doc
6. `core/queue/pipeline.ts` — existing generation pipeline pattern
7. `core/queue/functions.ts` — existing Inngest function pattern
8. `core/queue/client.ts` — Inngest client
9. `modules/generation/generation.service.ts` — AI variant generation
10. `modules/scoring/scoring.service.ts` — variant scoring
11. `modules/ranking/ranking.service.ts` — variant ranking
12. `modules/variant/variant.service.ts` — variant persistence
13. `modules/generation/generation.model.ts` — generation MongoDB model
14. `core/ai/gemini.ts` — Gemini client setup
15. `core/config/database.ts` — DB connection helper
16. `core/auth/guard.ts` — requireAuth helper
17. `core/errors/app-error.ts` — error classes
18. `core/errors/error-handler.ts` — handleApiError

## Type Contract

These are the exact TypeScript interfaces the backend must produce. Every field the frontend reads is listed.

```typescript
// From modules/trending/trending.types.ts

export type TrendingPlatform = "hackernews" | "devto" | "github" | "reddit"
export type ScheduleType = "hourly" | "daily" | "weekly"
export type RunStatus = "running" | "completed" | "failed"

export interface SourceItem {
  source: TrendingPlatform   // required
  title: string               // required
  url: string                  // required
  score: number                // required — popularity score from source platform
  rank: number                 // required — 1-based rank after scoring
}

export interface ITrendingRun {
  _id: string                  // required — MongoDB ObjectId as string
  workspaceId: string          // required
  configSnapshot: {            // required — snapshot of config at run time
    platforms: string[]        // required — reads: configSnapshot.platforms
    // other fields stored but NOT read by current UI
  }
  status: RunStatus            // required — "running" | "completed" | "failed"
  ranAt: Date                  // required — displayed as formatted datetime
  sourceItems: SourceItem[]    // required — can be empty [] for failed runs
  generationIds: string[]      // required — can be empty [] for failed runs
  dismissed: boolean           // required
  error: string | null         // required — null for success, error message for failed
  createdAt: Date              // required
  updatedAt: Date              // required
}

export interface VariantPreview {
  _id: string                  // required
  styleType: string            // required
  language: string             // required
  hook: string                 // required
  body: string                 // required
  cta: string                  // required
  hashtags: string[]           // required
  score: number                // required — individual score (0-100)
  engagement: number           // required — engagement subscore (0-100)
  clarity: number              // required — clarity subscore (0-100)
  formatting: number           // required — formatting subscore (0-100)
  overallScore: number         // required — composite score (0-100)
  overallRank: number          // required — rank among variants
  judgeReasoning: string       // required — AI explanation of scores
}

export interface TrendingGenerationPreview {
  generationId: string          // required
  runId: string                 // required — matches ITrendingRun._id
  sourceItem: SourceItem        // required
  topic: string                 // required
  status: string                // required — "completed" etc
  topVariant: VariantPreview | null  // required — null if generation not yet complete
}
```

## Database Models

### TrendingRun Model (`modules/trending/trending.model.ts`)

```typescript
import mongoose, { type Document, type Model } from "mongoose"

export interface ISourceItem {
  source: string          // TrendingPlatform
  title: string
  url: string
  score: number
  rank: number
}

export interface ITrendingRunDoc extends Document {
  workspaceId: string
  configSnapshot: {
    platforms: string[]
    topics: string[]
    industry: string[]
    targetAudience: string[]
    language: string[]
    postsPerPlatform: number
    topPostsForAI: number
    postsToGenerate: number
    scheduleType: string
    scheduledTime: string
    scheduledDay: string | null
  }
  status: "running" | "completed" | "failed"
  ranAt: Date
  sourceItems: ISourceItem[]
  generationIds: string[]
  dismissed: boolean
  error: string | null
  createdAt: Date
  updatedAt: Date
}

// Schema:
// workspaceId: String, required, index
// configSnapshot: embedded sub-doc (no _id), stores full config snapshot
// status: String, enum ["running","completed","failed"], default "running"
// ranAt: Date, default Date.now
// sourceItems: [{ source, title, url, score, rank }]
// generationIds: [String], default []
// dismissed: Boolean, default false
// error: String, default null
// timestamps: true
// Indexes: { workspaceId: 1, ranAt: -1 }
```

## Source Fetchers

### `modules/trending/source-fetcher.ts`

One function per platform. Each takes keywords (derived from config) and count, returns `SourceItem[]`.

**`fetchHackerNews(keywords: string[], count: number): Promise<SourceItem[]>`**
- Uses Algolia HN search API: `https://hn.algipea.com/api/v1/search`
- Params: `query` (join keywords with space), `tags=story`, `hitsPerPage=count`, `numericFilters=points>50`
- Map hits → SourceItem: `{ source: "hackernews", title: hit.title, url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`, score: hit.points, rank: 0 }` (rank assigned later)

**`fetchDevTo(keywords: string[], count: number): Promise<SourceItem[]>`**
- Uses Dev.to API: `https://dev.to/api/articles`
- Params: `tag=keyword[0]`, `per_page=count`, `top=7` (top articles from past 7 days)
- Map → SourceItem: `{ source: "devto", title: article.title, url: article.url, score: article.positive_reactions_count + article.comments_count, rank: 0 }`

**`fetchGitHub(keywords: string[], count: number): Promise<SourceItem[]>`**
- Uses GitHub search API: `https://api.github.com/search/repositories`
- Params: `q=keyword+created:>YYYY-MM-DD`, `sort=stars`, `order=desc`, `per_page=count`
- Date threshold = 7 days ago
- Map → SourceItem: `{ source: "github", title: repo.full_name, url: repo.html_url, score: repo.stargazers_count, rank: 0 }`
- Headers: `Accept: application/vnd.github.v3+json`

**`fetchReddit(keywords: string[], count: number): Promise<SourceItem[]>`**
- Uses Reddit JSON API: `https://www.reddit.com/r/{subreddit}/hot.json`
- Subreddits derived from keywords: map tech keywords to subreddits (react→reactjs, typescript→typescript, ai→MachineLearning, devops→devops, etc.)
- Params: `limit=count`
- Map → SourceItem: `{ source: "reddit", title: post.title, url: `https://reddit.com${post.permalink}`, score: post.score, rank: 0 }`
- Headers: `User-Agent: linkedIQ/1.0`

**`fetchTrendingSources(config: TrendingPrefs): Promise<SourceItem[]>`**
- Calls appropriate fetcher for each platform in `config.platforms`
- Passes `config.postsPerPlatform` as count
- Keywords built from: `config.topics` + `config.industry` + `config.targetAudience`
- Deduplicates by URL, assigns rank by score (descending)

## Keyword Builder

### `buildSourceKeywords(config: TrendingPrefs): string[]`

Combines config fields into search keywords:
- `config.topics` — primary keywords
- `config.industry` — context keywords (e.g., "software development" → "software")
- `config.targetAudience` — audience context (e.g., "developers" → "developer")
- Deduplicate and return flat array

## Ranker

### `rankSourceItems(items: SourceItem[]): SourceItem[]`

- Sort by `score` descending
- Assign `rank` = index + 1
- Return sorted array

## Generation Service

### `generatePostsFromTrends(run: ITrendingRunDoc, topN: number, postsToGenerate: number, workspaceId: string): Promise<string[]>`

For each of the top N source items (sorted by rank):
1. Build a generation topic: `${sourceItem.title}\n\nSource: ${sourceItem.url}`
2. Call existing `generationService.createGeneration()` with:
   - `topic`: the built topic string
   - `audiences`: from run config `targetAudience`
   - `tones`: default ["Thought leader"] (or from workspace persona)
   - `languages`: from run config `language` (map to language codes)
   - `includeEmoji`: true
3. Collect the returned generationId
4. Return array of generationIds

After all generations are created, update the run document with `generationIds` and `status: "completed"`.

## Repositories

### `modules/trending/trending.repository.ts`

```typescript
// create(data: Partial<ITrendingRunDoc>): Promise<ITrendingRunDoc>
// findById(runId: string): Promise<ITrendingRunDoc | null>
// findByWorkspace(workspaceId: string, filters?: { dateFrom?: Date; dateTo?: Date }): Promise<ITrendingRunDoc[]>
// updateStatus(runId: string, status: RunStatus, error?: string): Promise<void>
// addGenerationIds(runId: string, generationIds: string[]): Promise<void>
```

## Inngest Functions

### Add to `core/queue/functions.ts`

```typescript
export const runTrendingPipeline = inngest.createFunction(
  {
    id: "run-trending-pipeline",
    name: "Run Trending Pipeline",
    retries: 2,
  },
  { event: "trending/run-triggered" },
  async ({ event }) => {
    const { workspaceId, config, runId } = event.data as {
      workspaceId: string
      config: TrendingPrefs
      runId: string
    }

    // 1. Fetch trending content from all enabled platforms
    const sourceItems = await fetchTrendingSources(config)
    const rankedItems = rankSourceItems(sourceItems)

    // 2. Save source items to run
    await trendingRepository.updateSourceItems(runId, rankedItems)

    // 3. Take top N items and generate posts
    const topItems = rankedItems.slice(0, config.topPostsForAI)
    const generationIds = await generatePostsFromTrends(
      { ...run, configSnapshot: config },
      topItems,
      config.postsToGenerate,
      workspaceId
    )

    // 4. Update run with generation IDs and mark completed
    await trendingRepository.addGenerationIds(runId, generationIds)
    await trendingRepository.updateStatus(runId, "completed")
  }
)
```

## API Routes

### `app/api/trending/route.ts` — GET

Returns runs and their generations for the authenticated workspace.

**Request:** `GET /api/trending`
**Auth:** `requireAuth()`
**Response:**
```json
{
  "success": true,
  "data": {
    "runs": ITrendingRun[],
    "generations": TrendingGenerationPreview[]
  }
}
```

Implementation:
1. Get workspaceId from session (`session.user.id` → `ws_${userId}`)
2. Fetch runs: `trendingRepository.findByWorkspace(workspaceId)` — sorted by ranAt desc, limit 50
3. Collect all generationIds from all runs
4. Fetch generations from existing `generationRepository` and `variantRepository`:
   - For each generationId, fetch the generation doc and its top-ranked variant
   - Map to `TrendingGenerationPreview` shape
5. Also fetch sourceItems from each run to populate the generation's `sourceItem` field
   - Match by generation index to sourceItems index (generation[i] corresponds to sourceItems[i])

### `app/api/trending/run-now/route.ts` — POST

Triggers an immediate trending run.

**Request:** `POST /api/trending/run-now`
**Auth:** `requireAuth()`
**Request body:** none (uses saved prefs)
**Response:**
```json
{
  "success": true,
  "data": { "runId": "string" }
}
```

Implementation:
1. Get workspaceId from session
2. Fetch trending prefs: `prefsService.getTrendingPrefs(userId)`
3. Validate: platforms.length > 0
4. Create run document: status "running", configSnapshot = prefs, ranAt = now
5. Send Inngest event: `inngest.send({ name: "trending/run-triggered", data: { workspaceId, config: prefs, runId } })`
6. Return runId

## Frontend Wiring

### `components/features/trending/trending-shell.tsx`

Replace mock data with real API calls:

```typescript
// Replace:
import { MOCK_RUNS, MOCK_GENERATIONS } from "@/modules/trending/trending.mock"

// Add state:
const [runs, setRuns] = useState<ITrendingRun[]>([])
const [generations, setGenerations] = useState<TrendingGenerationPreview[]>([])

// Add fetch in useEffect (after existing prefs/workspace fetches):
fetch("/api/trending")
  .then((r) => r.json())
  .then((res) => {
    if (res.success && res.data) {
      setRuns(res.data.runs)
      setGenerations(res.data.generations)
      if (res.data.runs.length > 0) {
        setSelectedRunId(res.data.runs[0]._id)
      }
    }
  })
  .catch(() => toast.error("Failed to load trending data"))

// handleRunNow — replace setTimeout with:
async function handleRunNow() {
  setIsRunning(true)
  try {
    const res = await fetch("/api/trending/run-now", { method: "POST" })
    const result = await res.json()
    if (result.success) {
      toast.success("Run started")
      // Optionally poll or refetch after delay
    }
  } catch {
    toast.error("Failed to start run")
  }
  setIsRunning(false)
}
```

### `components/layout/app-shell.tsx`

The `trendingCount` is currently hardcoded to 3. Replace with a real unread count from the trending API, or remove the badge entirely for now and set `trendingCount={0}` until the backend provides a count endpoint.

## Implementation Order

1. **TrendingRun model** — `modules/trending/trending.model.ts` — no dependencies
2. **TrendingRun repository** — `modules/trending/trending.repository.ts` — depends on model
3. **Source fetchers** — `modules/trending/source-fetcher.ts` — no dependencies
4. **Ranker** — included in source-fetcher or separate `trending-ranker.ts`
5. **Trending service** — `modules/trending/trending.service.ts` — depends on repo + source fetcher
6. **Inngest function** — modify `core/queue/functions.ts` — depends on service + repo
7. **API route GET /api/trending** — `app/api/trending/route.ts` — depends on repo + existing variant repo
8. **API route POST /api/trending/run-now** — `app/api/trending/run-now/route.ts` — depends on service + Inngest
9. **Frontend wiring** — modify `trending-shell.tsx` — depends on all API routes working
10. **AppShell trendingCount** — replace hardcoded 3 — depends on API

## Definition of Done

- [ ] `GET /api/trending` returns runs + generations matching exact type shapes
- [ ] `POST /api/trending/run-now` creates a run and triggers Inngest event
- [ ] Inngest function fetches from all 4 platforms, ranks, generates posts
- [ ] Each generated post maps to a `TrendingGenerationPreview` with `topVariant` populated
- [ ] `configSnapshot.platforms` is stored on the run and rendered in sidebar
- [ ] Failed runs show error message in detail area
- [ ] `ranAt` is a real Date that formats correctly in sidebar
- [ ] `generationIds` array is populated after generation completes
- [ ] "Refine" button navigates to `/?generationId=XXX` (existing generate page handles this)
- [ ] Sidebar schedule card in main sidebar shows real `formatNextRun()` result
- [ ] No mock imports remain in `trending-shell.tsx`
- [ ] TypeScript compiles with zero errors
