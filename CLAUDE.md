# postcraft

AI-powered LinkedIn post generator. Solo professionals create, refine, and schedule LinkedIn content using multiple AI providers. MVP stage, solo dev + Claude.

## Stack

| Layer      | Tech                                                   |
| ---------- | ------------------------------------------------------ |
| Framework  | Next.js 16 (App Router, Turbopack)                     |
| Language   | TypeScript (strict mode)                               |
| Frontend   | React 19, Tailwind CSS 4, shadcn/ui, Radix             |
| State      | Redux Toolkit (workspace, profile, trending prefs)     |
| DB         | MongoDB + Mongoose 9                                   |
| Auth       | better-auth                                            |
| AI         | OpenAI, Google Gemini, OpenRouter (all via `core/ai/`) |
| Jobs       | Inngest (background pipelines)                         |
| Email      | Resend                                                 |
| Validation | Zod                                                    |
| Logging    | Pino                                                   |
| Formatting | ESLint + Prettier                                      |
| Deploy     | Vercel                                                 |

## Folder Structure

```
app/                  # Next.js App Router — routes and layouts only
  (auth)/             # Auth pages: login, signup, forgot/reset password, verify email
  api/                # Route handlers — external webhooks + Inngest only
  analytics/          # Analytics page
  guardrails/         # Guardrails management page
  history/            # Generation history page
  profile/            # User profile page
  settings/           # App settings page
  trending/           # Trending topics page
  workspace/          # Main workspace / post creation page

components/
  features/           # Page-specific feature components
  layout/             # Shell, nav, sidebar, headers
  providers/          # Context and Redux providers
  shared/             # Reusable across features
  ui/                 # shadcn/ui primitives (do not manually edit)

core/                 # Cross-cutting infrastructure
  ai/                 # AI provider abstraction (openrouter, gemini, zhipu, groq)
  auth/               # better-auth setup, session guards, auth client/server
  config/             # Database connection, env validation
  errors/             # AppError class, error handler
  logger/             # Pino logger
  queue/              # Inngest client, functions, pipeline

modules/              # Feature modules — business logic lives here
  <feature>/
    *.model.ts        # Mongoose model
    *.schema.ts       # Zod validation schemas
    *.repository.ts   # DB queries (Mongoose calls go here ONLY)
    *.service.ts      # Business logic
    *.defaults.ts     # Seed/default data (where applicable)
    prompt-builder.ts # AI prompt construction (where applicable)
    index.ts          # Public API — re-exports service functions

hooks/                # Shared React hooks
lib/                  # Utilities, constants, metadata
store/                # Redux Toolkit store + slices
scripts/              # DB seed scripts
types/                # Global TypeScript types
```

## Architecture Rules

### Module Isolation

- Route handlers and server components call `modules/<feature>/<feature>.service.ts` — never reach repositories or models directly
- Each module exports its public API via `index.ts`
- Modules may import from `core/` but never from other modules directly — use service functions if cross-module access needed

### Data Layer

- **Mongoose calls** happen in `*.repository.ts` files only
- **Zod schemas** in `*.schema.ts` validate all inputs at service boundaries
- **Models** in `*.model.ts` define Mongoose schemas

### AI Usage

- All AI interactions go through `core/ai/provider.ts` or specific provider files
- Prompt construction lives in `modules/<feature>/prompt-builder.ts`
- Never call OpenAI/Gemini/OpenRouter SDKs directly from routes or services

### Routing

- **Server Actions** for mutations (form submissions, data changes)
- **Route Handlers** (`app/api/`) for: external webhooks, Inngest endpoint, auth callbacks
- Pages use server components by default, `'use client'` only when interactivity requires it

### State Management

- Redux store holds: workspace state, profile data, trending preferences
- Components read shared state from Redux via `useSelector`
- Local component state for UI-only concerns (modals, toggles, form inputs)

## Constants Convention

All shared constants live in `lib/constants/` organized by domain:

| File         | Contents                                                                 |
| ------------ | ------------------------------------------------------------------------ |
| `status.ts`  | Status enums (generation, trending, guardrail, draft)                    |
| `regex.ts`   | Reusable regex patterns (markdown fences, heuristic scorers)             |
| `api.ts`     | API endpoints, external URLs, HTTP status codes, cache headers           |
| `errors.ts`  | Error codes, error messages, retryable error patterns                    |
| `numeric.ts` | Magic numbers, score thresholds, length limits, retry defaults           |
| `time.ts`    | Time constants (ms, seconds), session/OTP/cron config                    |
| `ai.ts`      | AI provider config, model names, temperatures, token limits              |
| `ui.ts`      | UI option data (nav items, audience/tone/language options, score ranges) |
| `mock.ts`    | Mock/demo data for development                                           |
| `index.ts`   | Barrel re-export of all modules                                          |

Rules:

- **Single source of truth** — Zod schemas define enums, constants re-export them
- **No magic values** — every number, string, regex in business logic is a named constant
- **No duplication** — if a value appears in 2+ places, it belongs in `lib/constants/`
- **No raw status strings** — always use `GENERATION_STATUS`, `RUN_STATUS`, `GUARDRAIL_CATEGORY`, etc.
- **No inline API paths** — use `API.WORKSPACE`, `API.PROFILE`, etc.
- **No raw error messages** — use `ERROR_MESSAGES.*` and `ERROR_CODES.*`
- **No inline HTTP codes** — use `HTTP_STATUS.*`
- **No inline AI config** — use `AI_TEMPERATURE.*`, `AI_MAX_TOKENS.*`, etc.
- **No raw time values** — use `MILLISECONDS.*`, `SECONDS.*`, `SESSION.*`, `AUTH_TOKEN.*`, `OTP.*`
- UI strings used only once can stay inline in components
- Mock data in `mock.ts`, never mixed with production constants
- Add new domain file if constants span a distinct concern

## DO

- Use Zod to validate all inputs at service boundaries
- Validate environment variables at boot via `core/config/env.ts`
- Use `core/logger` (Pino) for all logging — no `console.log`
- Use `core/errors/AppError` for typed error handling
- Keep Mongoose models and Zod schemas in sync
- Use shadcn/ui components from `components/ui/` — add new ones via `npx shadcn add`
- Follow conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`
- Lazy load heavy components (AI results, charts, editors)
- Use semantic HTML and basic ARIA attributes
- Extract all hardcoded values to `lib/constants/` following the Constants Convention
- Run `pnpm lint` and `pnpm typecheck` before considering work done

## DON'T

- **No DB calls in routes or components** — always go through `modules/<feature>/<feature>.service.ts`
- **No `'use client'` unless necessary** — prefer server components, extract client boundaries to smallest possible components
- **No internal fetch chains** — server actions and direct function calls only, never fetch own API routes from server code
- **No raw env access** — all env vars validated through `core/config/env.ts` at startup
- **No direct AI SDK calls** outside `core/ai/`
- **No editing `components/ui/`** manually — use `npx shadcn add` or `npx shadcn diff`
- **No `console.log`** — use `core/logger`
- **No `any` types** — TypeScript strict means strict
- **No `eslint-disable` comments** — fix the underlying issue instead of suppressing lint warnings

## Before You Write Code

1. **Identify the module** — which feature does this change belong to?
2. **Check existing patterns** — look at the closest module for service/repository/schema conventions
3. **Schema first** — if adding data, define Zod schema before implementation
4. **Validate route** — is this a mutation (server action) or external endpoint (route handler)?
5. **Client boundary** — does this need `'use client'`? Can it stay server?
6. **State location** — does this data belong in Redux or local component state?
7. **Error handling** — use `AppError` with proper status codes
8. **Logging** — add structured logs at service level, not in routes

## Anti-Patterns

- **God modules** — a module doing too much gets split. One module = one domain concept
- **Props drilling** — if data passes through 3+ component layers, use Redux or context
- **Duplicate fetching** — same data fetched in multiple components belongs in Redux store
- **Fat route files** — route handlers delegate to services, they don't contain business logic
- **Mixed concerns** — UI components don't import from mongoose. Service files don't import React
- **Unvalidated external input** — every API boundary gets Zod validation
- **Hardcoded secrets** — env vars only, validated at boot
- **Catch-all error swallowing** — `catch (e) {}` is forbidden. Log or rethrow

## New Component Checklist

When creating a **new component or page**, follow these rules before writing any code:

### UI Psychology & Engagement

- Apply psychology-driven design: use micro-copy that motivates action (not generic labels)
- Icons must reinforce meaning — choose Tabler icons that visually communicate the action
- Use color intentionally: `brand-gradient` for primary CTAs, muted tones for secondary actions
- Empty states must feel encouraging, not barren — include a clear next step
- Error states must be specific and actionable, not alarming
- Loading states must feel fast — use skeleton loaders that match real content shape

### SEO & Metadata (new pages only)

- Every `page.tsx` must export a `Metadata` object with `title` and `description`
- Title format: `"{Feature} — PostCraftt"` or descriptive standalone title
- Description: 120-160 characters, includes relevant keywords, human-readable
- Use Open Graph and Twitter Card metadata for social sharing pages
- Set canonical URLs where appropriate

### Loading Skeletons

- Every page with a `loading.tsx` must mirror the real content layout exactly
- Skeleton shape = real content shape: same grid columns, same card structure, same spacing
- Skeleton spacing must match the rendered component spacing (`p-4`, `gap-4`, `space-y-4`)
- Use `Skeleton` from `components/ui/skeleton` — never plain `div` placeholders

### Code Quality

- **Clean code**: functions < 50 lines, components < 200 lines, single responsibility
- **SOLID principles**: one reason to change per module/component, open for extension via composition
- **Modular approach**: extract reusable logic into shared hooks/utils, feature-specific stays in feature folder
- **Next.js best practices**: server components by default, `'use client'` at leaf boundary only, streaming with `Suspense` where beneficial
- **Type safety**: no `any`, no type assertions unless unavoidable, derive types from Zod schemas

### Spacing Standard

- Container/section-level: `p-4`, `gap-4`, `space-y-4`, `m-4` — **always `*-4`**
- Component-internal micro-spacing: `gap-1`, `gap-2`, `px-2`, `py-1` for icon-to-text, badges, tight groups
- Negative margins to break out of parent padding: `-m-4` (not `lg:-m-4` unless layout requires it)
- Large breathing room: `py-8`, `py-10`, `py-20` only for intentional spacers
- Never mix `p-5`, `p-6`, `space-y-5`, `space-y-6` at container level

### Mobile Responsiveness

- All new components must work on screens 320px–1920px
- Use Tailwind responsive prefixes: mobile-first (`sm:`, `md:`, `lg:`, `xl:`)
- Horizontal overflow is forbidden — use `overflow-x-auto` with `shrink-0` children for scrollable content
- Card grids: single column mobile, multi-column desktop (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Split layouts (sidebar + detail): stack on mobile, side-by-side on desktop
- Touch targets: minimum 44px tap area for interactive elements
- Test every new page/component at 375px (iPhone SE) before marking done

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
