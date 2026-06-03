# Final AI-Agent Implementation Plan (Production Grade)

System: Social Media Content Intelligence SaaS (Text-Only, Free-Tier, Modular, SOLID-compliant)

Goal: Build a daily-use system that reliably generates, evaluates, and ranks social media posts for personal growth, engagement, and client acquisition.

> **Migration Context:** The current codebase uses TanStack Start + Vite (React 19).
> This requirements doc describes the target Next.js 15 App Router architecture.
> The frontend will be migrated from TanStack Start to Next.js as described in `FRONTEND_CLONE_SPEC.md`.

---

# 1. Core Execution Principle

AI agent is not “coding features”.

AI agent is responsible for:

```txt id="p0"
design → implement → validate → test → refine
```

Every output must be:

* modular
* typed
* testable
* isolated
* service-driven

No monolithic generation.

---

# 2. Agent System Architecture

You will use a **multi-agent pipeline**, each with strict responsibility boundaries.

## Agents

### 1. Architecture Agent

Defines:

* module boundaries
* interfaces
* data models
* system contracts

### 2. Backend Agent

Implements:

* services
* repositories
* API routes
* workers

### 3. AI Prompt Agent

Implements:

* prompt system
* guardrail injection
* schema enforcement
* evaluation prompts

### 4. Frontend Agent

Implements:

* Next.js UI (App Router)
* forms
* dashboards
* history UI

### 5. QA Agent

Implements:

* unit tests
* integration tests
* worker validation
* AI schema validation

---

# 3. Global Engineering Constraints

Every agent MUST follow:

```txt id="c1"
- SOLID principles
- Clean Code rules
- strict TypeScript
- Zod validation everywhere
- repository pattern only
- service layer isolation
- no AI logic in API routes
- no DB access outside repositories
```

---

# 4. System Architecture (Final)

```txt id="arch"
Next.js App Router (UI + API)
        ↓
Route Handlers (thin layer only)
        ↓
Service Layer (business logic)
        ↓
Repository Layer (DB access only)
        ↓
MongoDB
        ↓
QStash Queue
        ↓
Workers
   ├── Generation Worker
   ├── Scoring Worker
   ├── Ranking Worker
   └── Notification Worker
        ↓
Gemini AI (via AI SDK)
```

---

# 5. Module Structure (MANDATORY)

```txt id="structure"
src/
├── app/
├── modules/
│   ├── trend/
│   ├── variant/
│   ├── generation/
│   ├── scoring/
│   ├── ranking/
│   ├── guardrail/
│   └── workspace/
├── core/
│   ├── ai/
│   ├── db/
│   ├── queue/
│   ├── config/
│   ├── logger/
│   ├── errors/
│   └── utils/
├── interfaces/
│   ├── services/
│   ├── repositories/
│   └── ai/
├── workers/
└── shared/
```

> **Note:** The backend module structure above lives alongside a frontend component architecture described in `DESIGN_SYSTEM.md` section 16. Frontend components follow a separate organizational pattern: `src/components/ui/` (shadcn primitives), `src/components/shared/` (reusable app components), `src/components/layout/` (layout shell), and `src/components/features/` (feature-scoped). The `src/modules/` structure above is for backend business logic only.

---

# 6. Data Models (Final Schema Set)

## Trend (Input Job)

```ts id="m1"
{
  workspaceId
  topic
  audiences[]
  tones[]
  languages[] // stored: lowercase codes (en, bn, banglish); display: uppercase labels (EN, BN, Banglish)
  includeEmoji
  status
  createdBy
}
```

---

## Variant (Output Unit)

```ts id="m2"
{
  trendId
  language
  styleType
  hook
  body
  cta
  hashtags[]
  fullPost

  engagementScore
  clarityScore
  formattingScore
  overallRank
  judgeReasoning

  model
}
```

---

## Guardrail

```ts id="m3"
{
  workspaceId
  category // tone | format | banned | custom
  rule
  isActive
}
```

---

## Generation Job

```ts id="m4"
{
  trendId
  status
  retries
  model
  tokenUsage
  latency
  error
}
```

---

# 7. AI Generation Pipeline (Core Logic)

```txt id="p1"
INPUT (Topic + Preferences)
   ↓
Guardrail Injection (DB)
   ↓
Prompt Builder (versioned)
   ↓
Gemini Call
   ↓
Zod Validation
   ↓
Normalization Layer
   ↓
Heuristic Scoring
   ↓
Judge LLM Scoring
   ↓
Ranking Engine
   ↓
Persist Variants
```

---

# 8. Prompt System (Strict Design)

## Prompt Structure

```txt id="p2"
SYSTEM:
Role definition

DEVELOPER:
output schema + constraints

GUARDRAILS:
(dynamic DB rules)

USER:
topic only
```

---

## Output Contract

```ts id="p3"
{
  variants: [
    {
      language,
      styleType,
      hook,
      body,
      cta,
      hashtags
    }
  ]
}
```

---

# 9. Scoring System

## Layer 1: Deterministic Engine

Pure function:

* hook strength
* CTA clarity
* readability
* structure
* banned word penalties
* formatting quality

---

## Layer 2: Judge LLM

Separate model call:

* evaluates engagement probability
* returns structured reasoning

---

## Final Ranking Formula

```txt id="s1"
FinalScore =
  0.4 heuristic +
  0.4 judgeLLM +
  0.2 structure quality
```

---

# 10. Service Layer Rules

Each module must have:

```txt id="sv1"
Controller → Service → Repository
```

Rules:

* services contain business logic only
* controllers are thin
* repositories handle DB only
* no cross-layer leakage

---

# 11. Worker System Rules

Workers are orchestration only.

```txt id="w1"
NO BUSINESS LOGIC IN WORKERS
```

Worker responsibilities:

* fetch job
* call services
* persist results
* update status

---

# 12. API Design (Next.js Best Practice)

## Route Handler Pattern

```ts id="api1"
validate input (Zod)
→ call service
→ return response
```

No exceptions:

* no DB calls
* no AI calls
* no business logic

---

# 13. SaaS Isolation Rule (Critical)

Every query MUST include:

```txt id="saas1"
workspaceId filter mandatory
```

No bypass.

---

# 14. Queue System

Single queue:

```txt id="q1"
content-generation
```

Retry policy:

* max 3 retries
* exponential backoff
* dead-letter after failure

---

# 15. AI Agent Task Execution Format (MANDATORY)

Every agent task must follow:

```txt id="agent1"
ROLE:
OBJECTIVE:
CONSTRAINTS:
INPUTS:
OUTPUT FORMAT:
FILES TO CREATE:
FILES NOT TO TOUCH:
TEST REQUIREMENTS:
DEFINITION OF DONE:
```

---

# 16. Build Order (STRICT)

Do not deviate:

```txt id="order1"
1. Database models + repositories
2. Trend creation API
3. Queue system integration
4. Gemini integration layer
5. Variant generation
6. Scoring engine (heuristic)
7. Judge LLM integration
8. Ranking engine
9. Frontend dashboard
10. History + analytics
11. Observability + QA
```

> **Note:** Steps 9-10 (Frontend dashboard, History + analytics) are detailed in `FRONTEND_CLONE_SPEC.md` section 12, which provides a 7-phase frontend-only build order. The frontend phases align with these steps but should be executed using the component structure from `DESIGN_SYSTEM.md` section 16.

---

# 17. Frontend Architecture Rules

## Next.js Rules

* Server components default
* Client components only when needed
* No API logic in UI
* No stateful business logic in components

---

## UI Modules

```txt id="ui1"
TrendInputForm
VariantCard
ScoreBadge
HistoryTable
WorkspaceSelector
```

---

# 18. Observability (Minimal but Required)

* Sentry → errors
* logs → Pino
* DB → persistence tracking only

Track:

* generation success rate
* scoring failure rate
* queue latency

---

# 19. Testing Strategy (QA Agent)

## Required Coverage

* Zod validation tests
* service unit tests
* worker integration tests
* AI output schema tests
* ranking consistency tests

---

# 20. Final System Behavior

Daily flow:

```txt id="flow"
User enters topic
→ system generates variants
→ system evaluates quality
→ system ranks outputs
→ user copies best post
→ posts on social media
→ system learns via usage tracking
```

---

# 21. Strategic Outcome

If executed correctly:

You get:

* daily content production system
* engagement optimization engine
* structured AI writing pipeline
* personal distribution machine
* portfolio + client acquisition tool

---

# Final Constraint Summary

```txt id="final"
NO MONOLITHIC LOGIC
STRICT MODULE BOUNDARIES
STRICT TYPE SAFETY
SERVICE-DRIVEN ARCHITECTURE
REPOSITORY PATTERN ONLY
AI IS ISOLATED IN CORE/AI
QUEUE DRIVEN EXECUTION
```

---

This is the complete AI-agent execution blueprint for building a production-grade social media intelligence SaaS with long-term scalability and daily real-world usage value.
