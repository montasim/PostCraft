# LinkedIQ Design System

**Version:** 1.0
**Stack:** React 19 + Tailwind CSS v4 + shadcn/ui (Radix)
**Source of truth:** `src/styles.css`, `src/components/ui/`
**Reference implementation:** `src/routes/index.tsx` (current TanStack Start codebase — visual/behavioral reference for Next.js migration per `FRONTEND_CLONE_SPEC.md`)

---

## 1. Brand Identity

| Attribute | Value |
|-----------|-------|
| **Product** | LinkedIQ — LinkedIn Content Intelligence SaaS |
| **Purpose** | AI-powered post generation, scoring, and ranking |
| **Target user** | Founders, creators, professionals building personal brand |
| **Personality** | Authoritative yet approachable. Smart, fast, trustworthy |
| **Tone** | Action-oriented copy. No fluff. Confidence in AI output |

---

## 2. Color System

All colors use **OKLCH** color space for perceptual uniformity. Defined in `src/styles.css`.

### Semantic Tokens

| Token | Purpose | Light | Dark |
|-------|---------|-------|------|
| `--background` | Page background | `oklch(0.99 0.003 270)` | `oklch(0.129 0.042 264.695)` |
| `--foreground` | Primary text | `oklch(0.2 0.015 270)` | `oklch(0.984 0.003 247.858)` |
| `--card` | Card surfaces | `oklch(1 0 0)` | `oklch(0.208 0.042 265.755)` |
| `--card-foreground` | Card text | `oklch(0.2 0.015 270)` | `oklch(0.984 0.003 247.858)` |
| `--popover` | Dropdown/overlay bg | `oklch(1 0 0)` | `oklch(0.208 0.042 265.755)` |
| `--primary` | CTAs, active states | `oklch(0.55 0.2 295)` | `oklch(0.929 0.013 255.508)` |
| `--primary-foreground` | Text on primary | `oklch(0.99 0.003 270)` | `oklch(0.208 0.042 265.755)` |
| `--secondary` | Secondary surfaces | `oklch(0.96 0.006 270)` | `oklch(0.279 0.041 260.031)` |
| `--muted` | Muted backgrounds | `oklch(0.96 0.006 270)` | `oklch(0.279 0.041 260.031)` |
| `--muted-foreground` | Muted text | `oklch(0.5 0.018 270)` | `oklch(0.704 0.04 256.788)` |
| `--accent` | Teal accent, highlights | `oklch(0.62 0.16 165)` | `oklch(0.279 0.041 260.031)` |
| `--destructive` | Errors, warnings | `oklch(0.6 0.22 25)` | `oklch(0.704 0.191 22.216)` |
| `--border` | Borders | `oklch(0.92 0.006 270)` | `oklch(1 0 0 / 10%)` |
| `--input` | Input borders | `oklch(0.94 0.006 270)` | `oklch(1 0 0 / 15%)` |
| `--ring` | Focus rings | `oklch(0.55 0.2 295)` | `oklch(0.551 0.027 264.364)` |

### Chart Colors

| Token | Hue | Usage |
|-------|-----|-------|
| `--chart-1` | Purple (295) | Primary data, #1 rank pill |
| `--chart-2` | Teal (165) | Secondary data, #2 rank pill |
| `--chart-3` | Amber (75) | Warning, attention, #3 rank pill |
| `--chart-4` | Red (25) | Destructive, errors, #4 rank pill |
| `--chart-5` | Blue (220) | Additional data |

### Sidebar Tokens

| Token | Purpose |
|-------|---------|
| `--sidebar` | Sidebar background |
| `--sidebar-foreground` | Sidebar text |
| `--sidebar-primary` | Active nav item |
| `--sidebar-accent` | Hover state |
| `--sidebar-border` | Sidebar borders |

### Color Usage Rules

| Context | Token | Tailwind class |
|---------|-------|----------------|
| Page background | `--background` | `bg-background` |
| Card surface | `--card` | `bg-card` |
| Primary CTA | `--primary` | `bg-primary` |
| Secondary text | `--muted-foreground` | `text-muted-foreground` |
| Borders (general) | `--border` | `border-border` |
| Input borders | `--input` | `border-input` |
| Sidebar borders | `--sidebar-border` | `border-sidebar-border` |
| Score pills | chart-1..4 | `bg-chart-1`, etc. |
| Quota/progress | orange-400/500 | Custom (`bg-orange-400`) |
| Focus state | `--ring` | `ring-ring` |

---

## 3. Typography

### Font Stack

Default system font stack via Tailwind v4 (no custom fonts loaded).

### Size Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-[10px]` | 10px | Micro labels (progress footer) |
| `text-[11px]` | 11px | Subtle hints (quota subtitle) |
| `text-xs` | 12px | Small labels, badges, timestamps |
| `text-sm` | 14px | Body text, form labels, nav items |
| `text-base` | 16px | Default body |
| `text-lg` | 18px | Counters, emphasized values |
| `text-xl` | 20px | Section headings |

### Weight Scale

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Body text, descriptions |
| `font-medium` | 500 | Nav items, form labels, badges |
| `font-semibold` | 600 | Card titles, section labels |
| `font-bold` | 700 | Headings, counters, emphasis |

### Line Height

| Class | Usage |
|-------|-------|
| `leading-none` | Tight headings |
| `leading-tight` | Card titles |
| Default (1.5) | Body text |

---

## 4. Spacing & Layout

### App Shell

```
+----------------------------------------------------------+
| Header (h-14 = 3.5rem)                                   |
+----------+-----------------------------------------------+
| Sidebar  | Content (flex-1 overflow-y-auto)              |
| w-64     |   px-5 py-6 (content padding)                 |
| (16rem)  |   space-y-10 (section gap)                    |
|          |                                               |
+----------+-----------------------------------------------+
```

### Sidebar Layout

```
+------------------+
| Logo (px-5 py-5) |
+------------------+
| Nav (px-5 py-4)  |
| - Main group     |
| - Config group   |
+------------------+
| Bottom cards     |
| (px-5 pb-4)      |
| - Plan quota     |
| - Brand card     |
+------------------+
```

### Spacing Tokens

| Context | Value | Tailwind |
|---------|-------|----------|
| Page horizontal | 20px | `px-5` |
| Page vertical | 24px | `py-6` |
| Card padding (compact) | 12px | `p-3` |
| Card padding (standard) | 20px | `p-5` |
| Card padding (spacious) | 24px | `p-6` |
| Section gap | 40px | `space-y-10` |
| Nav group gap | 24px | `space-y-6` |
| Element gap (tight) | 4px | `gap-1` |
| Element gap (small) | 6px | `gap-1.5` |
| Element gap (default) | 8px | `gap-2` |
| Element gap (medium) | 10px | `gap-2.5` |
| Element gap (large) | 16px | `gap-4` |

---

## 5. Border & Radius

### Radius Scale

Defined in `src/styles.css`:

| Token | Value | Tailwind |
|-------|-------|----------|
| `--radius` | 0.875rem (14px) | Base |
| `--radius-sm` | 10px | `rounded-sm` |
| `--radius-md` | 12px | `rounded-md` |
| `--radius-lg` | 14px | `rounded-lg` |
| `--radius-xl` | 18px | `rounded-xl` |
| `--radius-2xl` | 22px | `rounded-2xl` |

### Radius Usage

| Component | Class | Value |
|-----------|-------|-------|
| Cards | `rounded-xl` | 18px |
| Icon containers | `rounded-lg` | 14px |
| Buttons (default) | `rounded-md` | 12px |
| Badges/pills | `rounded-md` | 12px |
| Avatars | `rounded-full` | 50% |
| Toggle buttons | `rounded-full` | 50% |
| Progress segments | `rounded-full` | Full round |

### Border Usage

| Context | Class |
|---------|-------|
| Card default | `border` (uses `--border`) |
| Input fields | `border border-input` |
| Sidebar elements | `border-sidebar-border` |
| Highlighted card | `border-primary/40 ring-1 ring-primary/20` |

---

## 6. Shadows

| Context | Class |
|---------|-------|
| Card base | `shadow` |
| Card hover | `hover:shadow-md` |
| Primary button | `shadow-lg shadow-primary/30` |
| Popover/dropdown | `shadow-md` |
| No shadow (flat) | `shadow-none` |

---

## 7. Component Patterns

### Card (shadcn/ui)

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Base pattern
<Card className="rounded-xl border bg-card text-card-foreground shadow">
  <CardContent>...</CardContent>
</Card>

// Hoverable
<Card className="... hover:shadow-md transition">
```

### Primary Button (Gradient)

```tsx
<Button className="bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30 text-primary-foreground">
  Generate
</Button>
```

### Score Pill (Custom)

```tsx
// ScorePill — color by metric type (authoritative mapping)
const colorMap: Record<string, string> = {
  primary: "text-primary",     // Formatting
  "chart-2": "text-chart-2",   // Engagement
  "chart-3": "text-chart-3",   // Clarity
  "chart-5": "text-chart-5",   // Overall Score
};

// Usage in VariantCard:
<ScorePill label="Score" short="S" value={variant.score} color="chart-5" />
<ScorePill label="Engagement" short="E" value={variant.engagement} color="chart-2" />
<ScorePill label="Clarity" short="C" value={variant.clarity} color="chart-3" />
<ScorePill label="Formatting" short="F" value={variant.formatting} color="primary" />

// Pill with tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <div
        className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${colorMap[color] ?? "text-foreground"}`}
        style={{ background: `color-mix(in oklab, var(--${color}) 15%, transparent)` }}
      >
        <span className="opacity-60">{short}</span>
        {value}
      </div>
    </TooltipTrigger>
    <TooltipContent>{label}: {value}</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Progress Bar (Segmented)

```tsx
// Plan quota — segmented bar
<div className="mt-3 flex gap-1">
  {Array.from({ length: limit }).map((_, i) => (
    <div
      key={i}
      className={`h-1.5 flex-1 rounded-full transition-all ${
        i < used
          ? i < used - 1 ? "bg-orange-400" : "bg-orange-400/60"
          : "bg-white/10"
      }`}
    />
  ))}
</div>
```

### Multi-Select (Custom)

```tsx
<MultiSelect
  options={["Founders", "Investors", ...]}
  selected={selected}
  onChange={setSelected}
  placeholder="Select..."
/>
```

### NavGroup (Sidebar)

```tsx
// Sidebar nav group with label
<div className="space-y-1">
  <p className="px-2 text-xs font-semibold text-muted-foreground">{label}</p>
  {items.map((item) => (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm
        ${active === item.id ? "bg-sidebar-accent text-primary font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </button>
  ))}
</div>
```

### VariantCard (Ranked Content)

```tsx
// Top-ranked gets special styling
<div className={`rounded-xl border p-5 ${
  isTop ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
}`}>
  {/* Rank icon: Trophy (#1), Medal (#2), Award (#3+) */}
  {/* "Recommended" badge for #1 */}
  {/* Score pills row */}
  {/* Post content preview */}
  {/* Copy button */}
</div>
```

### Badge (Hashtag)

```tsx
<Badge variant="secondary" className="text-xs font-normal">
  #hashtag
</Badge>
```

---

## 8. Iconography

**Library:** `lucide-react`

### Size Scale

| Size | Class | Usage |
|------|-------|-------|
| Small | `h-3 w-3` | Inline badges, close buttons |
| Medium | `h-4 w-4` | Nav items, buttons, form elements |
| Large | `h-5 w-5` | Feature icons, emphasis |

### Core Icons

| Icon | Usage |
|------|-------|
| `Sparkles` | AI/generate actions. Animated with `group-hover:rotate-12` |
| `TrendingUp` | Trend/topic section |
| `Shield` | Guardrails/brand protection |
| `Flame` | Streak/quota indicator |
| `Trophy` | #1 rank |
| `Medal` | #2 rank |
| `Award` | #3+ rank |
| `Star` | "Recommended" badge |
| `Copy` | Copy action |
| `Check` | Success/copied state |
| `X` | Close/dismiss |
| `User` | Profile |
| `Settings` | Settings |
| `LogOut` | Logout |
| `Sun` / `Moon` | Theme toggle |

---

## 9. Responsive Breakpoints

Mobile-first. Breakpoints via Tailwind:

| Prefix | Width | Device |
|--------|-------|--------|
| (default) | 0–639px | Mobile |
| `sm:` | 640px+ | Large mobile / small tablet |
| `md:` | 768px+ | Tablet |
| `lg:` | 1024px+ | Desktop |

### Layout Patterns

```tsx
// Sidebar hidden on mobile, visible on md+
<aside className="hidden md:flex w-64 ...">

// Mobile hamburger
<Button className="md:hidden" onClick={() => setMobileOpen(true)}>

// Content stacks on mobile, side-by-side on desktop
<div className="flex flex-col lg:flex-row gap-5">

// Grid: 1 col mobile, 3 col tablet+
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

// Carousel cards: 90% mobile, fixed width tablet/desktop
<div className="w-[90%] shrink-0 snap-start md:w-[400px] lg:w-[410px]">
```

---

## 10. Animation & Transitions

| Context | Class |
|---------|-------|
| Button hover | `transition-colors` |
| Card hover | `transition hover:shadow-md` |
| Sparkles icon | `transition group-hover:rotate-12` |
| Progress segments | `transition-all` |
| Live indicator | `animate-pulse` |
| Tooltip | `animate-in fade-in-0` |
| Theme toggle icon | `transition-transform` |

---

## 11. Consumer Psychology Patterns

These patterns are embedded in the UI to drive engagement, retention, and upgrades.

### Scarcity

Show limited resources to create urgency.

```tsx
// Plan quota — "X generations left"
<p>{POSTS_USED < PLAN_LIMIT ? `${PLAN_LIMIT - POSTS_USED} generations left` : "Plan limit reached"}</p>
```

**Placement:** Sidebar bottom card. Visible on every page.

### Loss Aversion

Make users fear losing progress or access.

```tsx
// Tiered messaging based on usage
POSTS_USED === 0 → "Your ideas deserve great posts — start now"
POSTS_USED < half → "Good progress — keep the creative flow going"
POSTS_USED < limit → "Running low — upgrade for unlimited"
POSTS_USED === limit → "Upgrade your plan to unlock more"
```

### Social Proof

Show that others are actively using the product.

```tsx
// Navbar indicator
<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
<span>2,481 creators posted this week</span>
```

**Placement:** Header, always visible.

### Anchoring

Present a "best" option to frame decisions.

```tsx
// "Recommended" badge on #1 variant
{isTop && (
  <Badge className="gap-1 border-primary/40 bg-primary/10 text-primary">
    <Star className="h-3 w-3" /> Recommended
  </Badge>
)}
```

**Placement:** Carousel variant cards.

### Goal Gradient

Visualize progress to motivate completion.

```tsx
// Segmented progress bar (plan quota)
// Each segment = 1 generation used
// Filled = orange-400, Last filled = orange-400/60, Empty = white/10
```

### Reward / Achievement

Celebrate accomplishments with visual markers.

```tsx
// Rank icons differentiate quality
#1 → <Trophy className="h-5 w-5 text-chart-5" />
#2 → <Medal className="h-5 w-5 text-chart-4" />
#3 → <Award className="h-5 w-5 text-chart-3" />
```

### Authority

Position the system as expert.

```tsx
// Scoring breakdown transparency
"Heuristic 40% · Judge LLM 40% · Structure 20%"

// Value proposition
"Write LinkedIn posts that get engagement. AI generates, scores, and ranks your content in seconds."
```

### Endowment Effect

Create ownership and investment.

```tsx
// Brand identity card in sidebar
<p className="text-xs text-muted-foreground">Your brand</p>
<span>Personal Brand</span>

// Personalization settings (audience, tone, language)
// User invests time configuring → higher perceived value
```

### Commitment & Consistency

Small commitments lead to larger engagement.

```tsx
// Multi-step configuration before generation
1. Select audience → "Speak directly to your ideal reader"
2. Select tones → "Match your personal brand voice"
3. Select languages → "Reach audiences in their language"
4. Toggle emoji → "Include emoji"
5. Click Generate
```

### Friction Reduction

Lower barriers to action.

```tsx
// Placeholder text reduces blank page anxiety
placeholder="e.g. Why most startups fail at hiring, AI replacing resume screening..."

// Time estimate reduces uncertainty
"~12s to publish"

// Combined action buttons
"Copy & post" (not "Copy" then "Post")
```

---

## 12. Dark/Light Theme

### Theme Switching

Themes controlled by CSS class on root element:

```tsx
// Toggle implementation (conditional — adds/removes .light, :root is dark default)
document.documentElement.classList.toggle("light", theme === "light");
```

### Tailwind v4 Configuration

```css
/* src/styles.css */
@custom-variant dark (&:is(.dark *));
```

### Rules

- **Default theme:** Dark
- All colors defined as CSS custom properties in OKLCH
- Components use semantic tokens (`bg-background`, `text-foreground`) — never hardcoded colors
- Theme-specific overrides only in `src/styles.css`, never in component classes
- Orange accent (quota/streak) is theme-independent: `bg-orange-400`, `bg-orange-500/20`

---

## 13. File Structure Reference

```
src/
├── components/
│   └── ui/              # shadcn/ui components (41 total)
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── command.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── popover.tsx
│       ├── scroll-area.tsx
│       ├── sonner.tsx          # Toast notifications
│       └── tooltip.tsx
├── routes/
│   └── index.tsx        # Current TanStack Start dashboard (visual reference for migration)
├── lib/
│   └── utils.ts         # cn() utility
└── styles.css           # Design tokens, theme definitions
```

---

## 14. Do's and Don'ts

### Do

- Use semantic color tokens (`bg-primary`, `text-muted-foreground`)
- Use `cn()` for conditional class merging
- Follow mobile-first responsive design
- Wrap tooltips in `TooltipProvider`
- Use `toast` from `sonner` directly (not from `@/components/ui/sonner`)
- Import `Flame`, `Trophy`, etc. from `lucide-react`
- Keep cards at `rounded-xl`
- Use segmented progress bars for quota/limits

### Don't

- Hardcode color values in components
- Use `overflow-hidden` on parent containers that contain scrollable children
- Use Radix `ScrollArea` for containers needing horizontal scroll (its Root has `overflow-hidden`)
- Create new components without checking `src/components/ui/` first
- Use emoji in UI text unless user enables it
- Mix font sizes outside the defined scale
- Add shadows beyond the defined levels

---

## 15. Component Architecture (SOLID in React)

### Single Responsibility Principle (SRP)

Each component does **one thing**. Extract when a component handles 2+ concerns.

```tsx
// Bad — form + fetch + display in one component
function PostGenerator() {
  const [data, setData] = useState();
  // fetch logic...
  // form logic...
  // display logic...
}

// Good — split by concern
function PostGeneratorPage() {
  return (
    <PostForm onSubmit={handleSubmit} />
    <VariantResults variants={data} />
  );
}
```

**Rule of thumb:** If you name a component with "and" (e.g., `FormAndResults`), extract.

### Open/Closed Principle (OCP)

Extend behavior via composition, not modification.

```tsx
// Good — base Card accepts children, never modified
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>

// Good — variant behavior via props/composition
function VariantCard({ variant, rank, isRecommended }: VariantCardProps) {
  // Behavior determined by props, not subclassing
}
```

### Liskov Substitution Principle (LSP)

Shared interfaces for similar components. All card variants accept the same base props.

```tsx
// Shared interface for ranked items
interface RankedItemProps {
  rank: number;
  score: number;
  isRecommended?: boolean;
}

// Both VariantCard and HistoryCard implement RankedItemProps
function VariantCard({ rank, score, isRecommended }: RankedItemProps) { ... }
function HistoryCard({ rank, score }: RankedItemProps) { ... }
```

### Interface Segregation Principle (ISP)

Small, focused prop interfaces. Prefer `Pick<>` over passing full objects.

```tsx
// Bad — entire user object passed
function UserCard({ user }: { user: User }) { ... }

// Good — only what's needed
function UserCard({ name, avatar }: { name: string; avatar: string }) { ... }

// Good — Pick for larger sets
function PostPreview({ post }: { post: Pick<Post, "title" | "excerpt"> }) { ... }
```

### Dependency Inversion Principle (DIP)

Components receive data via props/hooks. Never import services directly.

```tsx
// Bad — component imports API directly
import { fetchPosts } from "@/services/api";
function PostList() {
  const posts = fetchPosts(); // tight coupling
}

// Good — data injected via props
function PostList({ posts }: { posts: Post[] }) { ... }

// Good — data via custom hook (abstraction)
function PostList() {
  const { data } = usePosts(); // hook abstracts data source
}
```

---

## 16. Modular Component Structure

### File Organization

```
src/
├── components/
│   ├── ui/                    # Primitive shadcn/ui (never modify directly)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── shared/                # Shared app components (used across 2+ pages)
│   │   ├── nav-group.tsx
│   │   ├── score-pill.tsx
│   │   ├── variant-card.tsx
│   │   ├── multi-select.tsx
│   │   └── index.ts           # Barrel export
│   ├── layout/                # Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── app-shell.tsx
│   │   └── index.ts
│   └── features/              # Feature-scoped components
│       ├── generate/          # Post generation feature
│       │   ├── trend-input.tsx
│       │   ├── guardrails-panel.tsx
│       │   └── index.ts
│       ├── history/           # History feature
│       └── analytics/         # Analytics feature
├── hooks/                     # Custom hooks
│   ├── use-theme.ts
│   ├── use-carousel.ts
│   └── use-posts.ts
├── lib/                       # Utilities
│   ├── utils.ts               # cn() helper
│   └── constants.ts           # Shared constants
├── types/                     # Shared TypeScript types
│   └── index.ts
└── routes/
    ├── index.tsx              # Dashboard page
    ├── history.tsx            # History page
    └── analytics.tsx          # Analytics page
```

### When to Extract

| Condition | Action |
|-----------|--------|
| Used in 2+ pages | Move to `components/shared/` |
| Component > 150 lines | Split into sub-components |
| Logic reusable across components | Extract to `hooks/` |
| Constants used in multiple places | Move to `lib/constants.ts` |
| Types shared across features | Move to `types/` |

### Barrel Exports

Every module exports via `index.ts`:

```tsx
// src/components/shared/index.ts
export { NavGroup } from "./nav-group";
export { ScorePill } from "./score-pill";
export { VariantCard } from "./variant-card";
export { MultiSelect } from "./multi-select";
```

Import from barrel, not individual files:

```tsx
// Good
import { ScorePill, VariantCard } from "@/components/shared";

// Bad
import { ScorePill } from "@/components/shared/score-pill";
import { VariantCard } from "@/components/shared/variant-card";
```

---

## 17. Next.js Frontend Best Practices

### Server Components First

```tsx
// Default: Server Component (no "use client")
// Good for: static content, data fetching, SEO
export default function Page() {
  return <PostList posts={await getPosts()} />;
}
```

Only add `"use client"` when component needs:
- `useState`, `useEffect`, `useRef`
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers (`onClick`, `onChange`)
- Custom hooks that use state/effects

```tsx
"use client"; // Only when necessary

import { useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  // ...
}
```

### Data Fetching

```tsx
// Server Component — fetch directly (no useEffect)
async function PostHistory() {
  const posts = await db.posts.findMany();
  return <HistoryTable posts={posts} />;
}

// Client Component — use React Query
"use client";
function usePosts() {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
}
```

### Error Handling

```tsx
// error.tsx — catches route-level errors
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <p className="text-destructive">Something went wrong</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

### Loading States

```tsx
// loading.tsx — automatic suspense fallback
export default function Loading() {
  return <Skeleton className="h-96 w-full rounded-xl" />;
}
```

### Colocation

Keep related files together:

```
src/components/features/generate/
├── trend-input.tsx
├── trend-input.test.tsx      # Test next to component
├── guardrails-panel.tsx
├── guardrails-panel.test.tsx
└── index.ts
```

---

## 18. Clean Code Rules

### Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Components | PascalCase | `VariantCard`, `ScorePill` |
| Functions | camelCase | `handleSubmit`, `calculateScore` |
| Variables | camelCase | `postsUsed`, `activeTab` |
| Constants | UPPER_SNAKE | `POSTS_USED`, `DAILY_LIMIT`, `NAV_ITEMS` |
| Types/Interfaces | PascalCase | `VariantCardProps`, `NavItem` |
| CSS classes | kebab-case via Tailwind | `bg-primary`, `text-sm` |
| Files | kebab-case | `variant-card.tsx`, `use-posts.ts` |
| Hooks | use-prefix | `useTheme`, `useCarousel` |

### No Magic Numbers

```tsx
// Bad
<div className="mt-3" />
if (POSTS_USED === 5) { ... }
<Progress value={71} />

// Good
const SECTION_GAP = "mt-3";
const PLAN_LIMIT = 5;
const PROGRESS_DEFAULT = 71;
```

### Component Size Limit

Max ~150 lines per component. If larger, extract:

```tsx
// Before: 200-line VariantCard
function VariantCard({ variant, rank }) {
  // rank icon logic (10 lines)
  // score pill logic (15 lines)
  // content display (20 lines)
  // action buttons (15 lines)
  // ... total 200 lines
}

// After: extracted sub-components
function VariantCard({ variant, rank }) {
  return (
    <Card>
      <RankBadge rank={rank} />
      <ScorePills scores={variant.scores} />
      <PostContent post={variant} />
      <CardActions post={variant} isTop={rank === 0} />
    </Card>
  );
}
```

### Early Returns

```tsx
// Bad — nested conditions
function VariantCard({ variant, rank }) {
  if (variant) {
    if (rank >= 0) {
      return <div>...</div>;
    }
  }
  return null;
}

// Good — early return
function VariantCard({ variant, rank }) {
  if (!variant || rank < 0) return null;
  return <div>...</div>;
}
```

### Type Safety

```tsx
// Bad
function handleCopy(post: any) { ... }

// Good
interface VariantPost {
  id: string;
  content: string;
  score: number;
}

function handleCopy(post: VariantPost) { ... }

// Good — Zod for runtime validation
import { z } from "zod";
const PostSchema = z.object({
  id: z.string(),
  content: z.string(),
  score: z.number().min(0).max(100),
});
```

### Class Merging

```tsx
// Bad — string concatenation
<div className={"card " + (active ? "active" : "")}>

// Good — cn() utility
import { cn } from "@/lib/utils";
<div className={cn("card", active && "active")}>
```

---

## 19. State Management

### Decision Matrix

| State Scope | Solution | Example |
|-------------|----------|---------|
| Single component | `useState` | Form inputs, toggle state |
| Shared across 2-3 siblings | Lift to parent | Selected tab, active filter |
| URL-shareable | URL params | Search query, page number |
| Global (theme, auth) | React Context | `ThemeContext`, `AuthContext` |
| Server data | React Query | Posts, user profile, history |
| Form state | Controlled components | Input values, validation |

### State Rules

1. **Start local.** Only lift state when child components need it.
2. **Never duplicate derived state.** Compute on the fly.

```tsx
// Bad — duplicated state
const [posts, setPosts] = useState([]);
const [postCount, setPostCount] = useState(0); // derived from posts

// Good — derive it
const posts = usePosts();
const postCount = posts.length; // computed
```

3. **URL state for shareable filters.** Use `useSearchParams()`.

```tsx
// Good — shareable URL: /history?page=2&sort=date
const searchParams = useSearchParams();
const page = searchParams.get("page") ?? "1";
```

4. **React Query for server state.** Never store API data in useState.

```tsx
// Good
function usePosts(workspaceId: string) {
  return useQuery({
    queryKey: ["posts", workspaceId],
    queryFn: () => api.getPosts(workspaceId),
    staleTime: 5 * 60 * 1000,
  });
}
```

5. **Context only when truly global.** Theme, auth, workspace — not per-page state.

```tsx
// Good — theme is truly global
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>();

// Bad — form state doesn't need context
const FormContext = createContext<{ values: FormValues }>(); // just pass as props
```
