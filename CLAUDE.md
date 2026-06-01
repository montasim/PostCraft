# linkedIQ

AI-powered LinkedIn post generator. Solo professionals create, refine, and schedule LinkedIn content using multiple AI providers. MVP stage, solo dev + Claude.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Frontend | React 19, Tailwind CSS 4, shadcn/ui, Radix |
| State | Redux Toolkit (workspace, profile, trending prefs) |
| DB | MongoDB + Mongoose 9 |
| Auth | better-auth |
| AI | OpenAI, Google Gemini, OpenRouter (all via `core/ai/`) |
| Jobs | Inngest (background pipelines) |
| Email | Resend |
| Validation | Zod |
| Logging | Pino |
| Formatting | ESLint + Prettier |
| Deploy | Vercel |

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
