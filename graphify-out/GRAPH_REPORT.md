# Graph Report - .  (2026-06-02)

## Corpus Check
- 286 files · ~76,707 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1186 nodes · 3049 edges · 90 communities (64 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_AI Provider Layer|AI Provider Layer]]
- [[_COMMUNITY_API Route Handlers|API Route Handlers]]
- [[_COMMUNITY_History Data Layer|History Data Layer]]
- [[_COMMUNITY_Post Creation UI|Post Creation UI]]
- [[_COMMUNITY_Loading Skeletons|Loading Skeletons]]
- [[_COMMUNITY_Project Dependencies|Project Dependencies]]
- [[_COMMUNITY_Analytics Overview|Analytics Overview]]
- [[_COMMUNITY_History UI Components|History UI Components]]
- [[_COMMUNITY_Analytics Content|Analytics Content]]
- [[_COMMUNITY_Brand Guard & Top Posts|Brand Guard & Top Posts]]
- [[_COMMUNITY_Settings Feature UI|Settings Feature UI]]
- [[_COMMUNITY_User Preferences Module|User Preferences Module]]
- [[_COMMUNITY_Generation Stats API|Generation Stats API]]
- [[_COMMUNITY_Component Configuration|Component Configuration]]
- [[_COMMUNITY_AI Prompt & Shortlist|AI Prompt & Shortlist]]
- [[_COMMUNITY_Error Boundaries|Error Boundaries]]
- [[_COMMUNITY_App Shell Pages|App Shell Pages]]
- [[_COMMUNITY_Guardrails API & UI|Guardrails API & UI]]
- [[_COMMUNITY_Guardrail Domain Module|Guardrail Domain Module]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Analytics Charts|Analytics Charts]]
- [[_COMMUNITY_UI Option Constants|UI Option Constants]]
- [[_COMMUNITY_Error Handling Classes|Error Handling Classes]]
- [[_COMMUNITY_History Card Components|History Card Components]]
- [[_COMMUNITY_Feature Pages|Feature Pages]]
- [[_COMMUNITY_Trending Global Topics|Trending Global Topics]]
- [[_COMMUNITY_Layout Dropdown|Layout Dropdown]]
- [[_COMMUNITY_Settings Module|Settings Module]]
- [[_COMMUNITY_Time Picker|Time Picker]]
- [[_COMMUNITY_Activity Heatmap|Activity Heatmap]]
- [[_COMMUNITY_Inngest & Logger|Inngest & Logger]]
- [[_COMMUNITY_Profile & Workspace UI|Profile & Workspace UI]]
- [[_COMMUNITY_History Filters & Grid|History Filters & Grid]]
- [[_COMMUNITY_Dashboard Home Page|Dashboard Home Page]]
- [[_COMMUNITY_Scoring Constants|Scoring Constants]]
- [[_COMMUNITY_App Shell Layout|App Shell Layout]]
- [[_COMMUNITY_Mobile Sidebar|Mobile Sidebar]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Multi-Select Component|Multi-Select Component]]
- [[_COMMUNITY_UI Nav Constants|UI Nav Constants]]
- [[_COMMUNITY_Build Scripts|Build Scripts]]
- [[_COMMUNITY_Workspace Module|Workspace Module]]
- [[_COMMUNITY_Trending Source Fetcher|Trending Source Fetcher]]
- [[_COMMUNITY_App Layout & Fonts|App Layout & Fonts]]
- [[_COMMUNITY_Status Enums|Status Enums]]
- [[_COMMUNITY_Design System Docs|Design System Docs]]
- [[_COMMUNITY_Header Component|Header Component]]
- [[_COMMUNITY_Heuristic Scorer|Heuristic Scorer]]
- [[_COMMUNITY_Profile Redux Slice|Profile Redux Slice]]
- [[_COMMUNITY_AI Constants|AI Constants]]
- [[_COMMUNITY_Generation Prompt Builder|Generation Prompt Builder]]
- [[_COMMUNITY_Judge Prompt|Judge Prompt]]
- [[_COMMUNITY_Settings Model|Settings Model]]
- [[_COMMUNITY_Workspace Redux Slice|Workspace Redux Slice]]
- [[_COMMUNITY_Input Group UI|Input Group UI]]
- [[_COMMUNITY_Sidebar Component|Sidebar Component]]
- [[_COMMUNITY_Analytics Header & Tabs|Analytics Header & Tabs]]
- [[_COMMUNITY_Workspace Model|Workspace Model]]
- [[_COMMUNITY_Quota Text Utilities|Quota Text Utilities]]
- [[_COMMUNITY_Empty State Component|Empty State Component]]
- [[_COMMUNITY_Guardrails Page|Guardrails Page]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_NavGroup Component|NavGroup Component]]
- [[_COMMUNITY_OpenGraph Image|OpenGraph Image]]
- [[_COMMUNITY_Claude Settings|Claude Settings]]
- [[_COMMUNITY_Claude Permissions|Claude Permissions]]
- [[_COMMUNITY_SOLID Design Docs|SOLID Design Docs]]
- [[_COMMUNITY_Forgot Password|Forgot Password]]
- [[_COMMUNITY_Theme Hook|Theme Hook]]
- [[_COMMUNITY_Login Page|Login Page]]
- [[_COMMUNITY_Ranking Schema|Ranking Schema]]
- [[_COMMUNITY_Reset Password|Reset Password]]
- [[_COMMUNITY_Motivation Tip|Motivation Tip]]
- [[_COMMUNITY_Signup Page|Signup Page]]
- [[_COMMUNITY_Verify Email|Verify Email]]
- [[_COMMUNITY_Psychology & VariantCard Docs|Psychology & VariantCard Docs]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Date & Time Pickers|Date & Time Pickers]]
- [[_COMMUNITY_Color Token Doc|Color Token Doc]]
- [[_COMMUNITY_Design System Doc|Design System Doc]]
- [[_COMMUNITY_Frontend Spec Doc|Frontend Spec Doc]]
- [[_COMMUNITY_State Strategy Doc|State Strategy Doc]]
- [[_COMMUNITY_Requirements Doc|Requirements Doc]]
- [[_COMMUNITY_Inngest GET Handler|Inngest GET Handler]]
- [[_COMMUNITY_Inngest POST Handler|Inngest POST Handler]]
- [[_COMMUNITY_Inngest PUT Handler|Inngest PUT Handler]]
- [[_COMMUNITY_Multi-Select Option|Multi-Select Option]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 145 edges
2. `connectDB()` - 50 edges
3. `handleApiError()` - 49 edges
4. `Button()` - 38 edges
5. `getEnv()` - 37 edges
6. `getWorkspaceId()` - 35 edges
7. `Card()` - 22 edges
8. `Badge()` - 19 edges
9. `Skeleton()` - 19 edges
10. `API` - 19 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `RunItem()` --calls--> `cn()`  [EXTRACTED]
  components/features/trending/trending-run-group.tsx → lib/utils.ts
- `SidebarProps` --references--> `TrendingPrefs`  [EXTRACTED]
  components/layout/sidebar.tsx → modules/prefs/prefs.schema.ts
- `CalendarDayButton()` --calls--> `cn()`  [EXTRACTED]
  components/ui/calendar.tsx → lib/utils.ts
- `CommandDialog()` --calls--> `cn()`  [EXTRACTED]
  components/ui/command.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Score Display Components** — shared_scorepill_scorepill, shared_variantcard_variantcard, history_bestposthighlight_bestposthighlight [INFERRED 0.85]
- **Tooltip-Powered UI Components** — shared_scorepill_scorepill, shared_multiselect_multiselect, history_activityheatmap_activityheatmap [EXTRACTED 1.00]
- **Plan Quota and Upgrade Flow** — shared_planquotacard_planquotacard, shared_upgrademodal_upgrademodal, shared_index_barrelexport [INFERRED 0.75]
- **LinkedIQ Core Generation Pipeline** — docs_requirements_ai_generation_pipeline, docs_requirements_scoring_system, docs_requirements_queue_system [EXTRACTED 1.00]
- **Design System Documentation Triad** — docs_design_system_linkediq_design, docs_frontend_spec_clone_spec, docs_requirements_linkediq_saas [EXTRACTED 0.95]
- **Psychology-Driven UI Cluster** — docs_design_system_consumer_psychology, docs_design_system_variant_card_pattern, docs_design_system_score_pill_pattern [EXTRACTED 0.95]

## Communities (90 total, 26 thin omitted)

### Community 0 - "AI Provider Layer"
Cohesion: 0.06
Nodes (62): getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel(), hasGroq(), getOpenRouterClient(), getOpenRouterModel(), hasOpenRouter() (+54 more)

### Community 1 - "API Route Handlers"
Cohesion: 0.12
Nodes (39): GET(), GET(), GET(), GET(), GET(), GET(), Auth, requireAuth() (+31 more)

### Community 2 - "History Data Layer"
Cohesion: 0.10
Nodes (23): GenerationWithVariants, HistoryListFilters, HistoryListResult, historyRepository, SORT_MAP, SortMap, VariantDoc, GuardrailDetail (+15 more)

### Community 3 - "Post Creation UI"
Cohesion: 0.08
Nodes (31): PostCreationFormInner(), PostCreationFormProps, consumeRefineData(), RefineData, setRefineData(), DatePicker(), PLATFORM_ABBREV, RunItem() (+23 more)

### Community 4 - "Loading Skeletons"
Cohesion: 0.09
Nodes (13): CarouselNavigation(), PostCreationForm(), PostVariantsCarousel(), PostVariantsCarouselProps, STATUS_HEADERS, STATUS_MESSAGES, useCarousel(), useClipboard() (+5 more)

### Community 5 - "Project Dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcryptjs, better-auth, class-variance-authority, clsx, cmdk, date-fns, dotenv (+24 more)

### Community 6 - "Analytics Overview"
Cohesion: 0.13
Nodes (23): MetricCard(), BREADCRUMB_CONFIG, BreadcrumbConfig, PageBreadcrumb(), cn(), Avatar(), AvatarBadge(), AvatarFallback() (+15 more)

### Community 7 - "History UI Components"
Cohesion: 0.11
Nodes (19): ActivityHeatmapProps, BestPostHighlight(), BestPostHighlightProps, HistoryCardProps, HistoryContent(), HistoryDetail(), HistoryFilters(), HistoryGrid() (+11 more)

### Community 8 - "Analytics Content"
Cohesion: 0.19
Nodes (19): AnalyticsContent(), AnalyticsData, EMPTY_DATA, AnalyticsHeader(), AnalyticsOverviewCards(), analyticsRepository, AnalyticsScoreDistribution(), AnalyticsDashboard (+11 more)

### Community 9 - "Brand Guard & Top Posts"
Cohesion: 0.14
Nodes (12): BannedWordsGroupProps, BrandGuardPanel(), BrandGuardPanelProps, GuardRule, RuleGroupProps, STATUS_STYLES, HistoryHeaderProps, ScorePill() (+4 more)

### Community 10 - "Settings Feature UI"
Cohesion: 0.17
Nodes (12): SettingsContent(), SettingsData, ConfirmDialog(), ConfirmDialogProps, UpgradeModalProps, Dialog(), DialogContent(), DialogDescription() (+4 more)

### Community 11 - "User Preferences Module"
Cohesion: 0.17
Nodes (17): generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, ITrendingPrefsDoc, prefsSchema, trendingPrefsSubSchema, prefsRepository, GENERATION_PREFS_DEFAULTS (+9 more)

### Community 12 - "Generation Stats API"
Cohesion: 0.19
Nodes (13): generationSchema, IGeneration, generationRepository, aiGenerationOutputSchema, CreateGenerationInput, createGenerationSchema, GenerationStatus, generationStatusSchema (+5 more)

### Community 13 - "Component Configuration"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 14 - "AI Prompt & Shortlist"
Cohesion: 0.19
Nodes (17): callWithTaskFallback(), buildShortlistPrompt(), buildShortlistSystemPrompt(), getLatestGlobalTopics(), countUndismissedRuns(), createRun(), findRunsByWorkspace(), dismissAllRuns() (+9 more)

### Community 15 - "Error Boundaries"
Cohesion: 0.14
Nodes (3): PageError(), SectionHeader(), SectionHeaderProps

### Community 16 - "App Shell Pages"
Cohesion: 0.17
Nodes (10): CarouselNavigationProps, formatRelativeDate(), HistoryCard(), HistoryEmpty(), HistoryEmptyProps, DatePickerProps, Button(), buttonVariants (+2 more)

### Community 17 - "Guardrails API & UI"
Cohesion: 0.15
Nodes (8): API, ApiGuardrail, Rule, RuleSectionProps, StreakWidgetProps, Input(), Progress(), Textarea()

### Community 18 - "Guardrail Domain Module"
Cohesion: 0.21
Nodes (11): GUARDRAIL_CATEGORIES, DEFAULT_GUARDRAILS, DefaultGuardrail, guardrailSchema, IGuardrail, guardrailRepository, CreateGuardrailInput, createGuardrailSchema (+3 more)

### Community 19 - "TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, baseUrl, esModuleInterop, incremental, isolatedModules, jsx, lib (+12 more)

### Community 20 - "Analytics Charts"
Cohesion: 0.28
Nodes (10): RANGE_COLORS, authClient, LoginForm(), SignupForm(), VerifyEmailContent(), Card(), CardContent(), CardFooter() (+2 more)

### Community 21 - "UI Option Constants"
Cohesion: 0.18
Nodes (11): AUDIENCE_OPTIONS, INDUSTRY_OPTIONS, LANGUAGE_OPTIONS, TONE_OPTIONS, TOPIC_OPTIONS, QUICK_PRESETS, SEED_PERSONA, Label() (+3 more)

### Community 22 - "Error Handling Classes"
Cohesion: 0.15
Nodes (9): AIServiceError, AppError, DatabaseError, ForbiddenError, NotFoundError, QueueError, QuotaExceededError, UnauthorizedError (+1 more)

### Community 23 - "History Card Components"
Cohesion: 0.13
Nodes (19): BestPostHighlight, HistoryCard, VariantCardWrapper, HistoryContent, ConfirmDialog, EmptyState, SharedComponentsBarrel, MotivationTip (+11 more)

### Community 24 - "Feature Pages"
Cohesion: 0.11
Nodes (8): metadata, metadata, AppShell(), metadata, metadata, fetchProfile, fetchWorkspace, metadata

### Community 25 - "Trending Global Topics"
Cohesion: 0.16
Nodes (14): GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, saveGlobalTopics(), saveGlobalTopicsFailure(), ConfigSnapshotSchema, ISourceItemDoc, ITrendingRunDoc, SourceItemSchema (+6 more)

### Community 26 - "Layout Dropdown"
Cohesion: 0.16
Nodes (11): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+3 more)

### Community 27 - "Settings Module"
Cohesion: 0.20
Nodes (13): settingsRepository, accountSettingsSchema, appearanceSettingsSchema, notificationSettingsSchema, UpdateSettingsInput, updateSettingsSchema, DEFAULT_ACCOUNT, DEFAULT_APPEARANCE (+5 more)

### Community 28 - "Time Picker"
Cohesion: 0.18
Nodes (12): format12(), parseTime(), TimePicker(), TimePickerProps, Popover(), PopoverContent(), PopoverDescription(), PopoverHeader() (+4 more)

### Community 29 - "Activity Heatmap"
Cohesion: 0.25
Nodes (12): ActivityHeatmap(), getDaysAgo(), HeatmapDay, ActivityHeatmap, MultiSelect, BG_MAP, COLOR_MAP, ScorePillProps (+4 more)

### Community 30 - "Inngest & Logger"
Cohesion: 0.23
Nodes (10): handler, logger, inngest, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner (+2 more)

### Community 31 - "Profile & Workspace UI"
Cohesion: 0.22
Nodes (8): ProfileContent(), useAppDispatch(), useAppSelector(), AppDispatch, RootState, metadata, TrendingShell(), WorkspaceContent()

### Community 32 - "History Filters & Grid"
Cohesion: 0.20
Nodes (12): HistoryFiltersProps, HistoryGridProps, HistoryFilterState, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput() (+4 more)

### Community 33 - "Dashboard Home Page"
Cohesion: 0.22
Nodes (9): metadata, DashboardClient(), GenerationStatus, STATUS_LABELS, requestNotificationPermission(), sendBrowserNotification(), UpgradeModal(), selectPersona() (+1 more)

### Community 34 - "Scoring Constants"
Cohesion: 0.19
Nodes (8): SCORE_WEIGHTS, RawVariant, ScoreComponents, scoreComponentsSchema, WEIGHTS, ScoredVariantOutput, ScoringInput, scoringService

### Community 35 - "App Shell Layout"
Cohesion: 0.19
Nodes (9): AppShellProps, ROUTE_MAP, fetchTrendingPrefs, initialState, selectTrendingCount(), selectTrendingPrefs(), trendingPrefsSlice, selectQuotaLimit() (+1 more)

### Community 36 - "Mobile Sidebar"
Cohesion: 0.21
Nodes (8): MobileSidebarProps, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 37 - "Dev Dependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, eslint-config-next, @eslint/eslintrc, postcss, prettier, prettier-plugin-tailwindcss, tailwindcss (+5 more)

### Community 38 - "Multi-Select Component"
Cohesion: 0.22
Nodes (9): MultiSelect(), MultiSelectProps, SelectOption, DAYS, PLATFORMS, TrendingSettingsPanel(), TrendingSettingsPanelProps, RadioGroup() (+1 more)

### Community 39 - "UI Nav Constants"
Cohesion: 0.17
Nodes (9): NAV_ACCOUNT, NAV_CONFIG, NAV_MAIN, SCORE_RANGES, SORT_OPTIONS, DEFAULT_FILTERS, HistoryStats, ScoreRange (+1 more)

### Community 40 - "Build Scripts"
Cohesion: 0.17
Nodes (12): scripts, build, dev, dev:inngest, dev:next, format, lint, seed (+4 more)

### Community 41 - "Workspace Module"
Cohesion: 0.38
Nodes (7): workspaceRepository, brandPersonaSchema, personaOptionSchema, UpdateWorkspaceInput, updateWorkspaceSchema, DEFAULT_PERSONA, workspaceService

### Community 42 - "Trending Source Fetcher"
Cohesion: 0.27
Nodes (10): buildSourceKeywords(), DevToArticle, fetchDevTo(), fetchGitHub(), fetchHackerNews(), fetchReddit(), fetchTrendingSources(), GitHubRepo (+2 more)

### Community 43 - "App Layout & Fonts"
Cohesion: 0.24
Nodes (7): fontMono, geist, metadata, RootLayout(), ThemeProvider(), ReduxProvider(), store

### Community 44 - "Status Enums"
Cohesion: 0.20
Nodes (9): DRAFT_STATUS, DRAFT_STATUSES, EXPORT_FORMATS, GENERATION_STATUS, GENERATION_STATUSES, GUARDRAIL_CATEGORY, RUN_STATUS, RUN_STATUSES (+1 more)

### Community 45 - "Design System Docs"
Cohesion: 0.20
Nodes (10): Modular Component Architecture, ScorePill Component Pattern, Frontend 7-Phase Build Order, AI Generation Pipeline, Multi-Agent Pipeline Architecture, Queue System, Scoring System, Service Layer Pattern (+2 more)

### Community 46 - "Header Component"
Cohesion: 0.33
Nodes (7): formatNumber(), Header(), HeaderProps, MobileSidebar(), ThemeToggle(), UserDropdown(), selectTotalPosts()

### Community 47 - "Heuristic Scorer"
Cohesion: 0.42
Nodes (9): calculateHeuristicScore(), clamp(), HeuristicInput, HeuristicResult, scoreBannedWords(), scoreCTAClarity(), scoreFormatting(), scoreHookStrength() (+1 more)

### Community 48 - "Profile Redux Slice"
Cohesion: 0.24
Nodes (9): initialState, profileSlice, ProfileState, selectProfile(), selectProfileStats(), selectProfileStatus(), selectUserName(), ProfileStats (+1 more)

### Community 49 - "AI Constants"
Cohesion: 0.22
Nodes (8): AI_CONFIG, AI_MAX_TOKENS, AI_TASKS, AI_TEMPERATURE, AITask, LANGUAGE_MAP, LANGUAGE_TO_CODE, TASK_PROVIDER_ORDER

### Community 50 - "Generation Prompt Builder"
Cohesion: 0.42
Nodes (7): buildGenerationPrompt(), GenerationData, GuardrailData, buildDeveloperPrompt(), buildSystemPrompt(), buildUserPrompt(), GenerationPromptData

### Community 51 - "Judge Prompt"
Cohesion: 0.39
Nodes (7): buildJudgePrompt(), buildJudgeSystemPrompt(), JudgePromptData, judgeOutputSchema, JudgeResult, scoreWithJudge(), stripMarkdownFences()

### Community 52 - "Settings Model"
Cohesion: 0.22
Nodes (8): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, ISettings, notificationSchema, settingsSchema

### Community 53 - "Workspace Redux Slice"
Cohesion: 0.25
Nodes (8): initialState, selectWorkspace(), selectWorkspaceStatus(), WorkspaceData, workspaceSlice, WorkspaceState, BrandPersona, PersonaOption

### Community 54 - "Input Group UI"
Cohesion: 0.28
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 55 - "Sidebar Component"
Cohesion: 0.39
Nodes (5): Sidebar(), SidebarProps, StreakWidget(), computeNextRunAt(), formatNextRun()

### Community 56 - "Analytics Header & Tabs"
Cohesion: 0.48
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 57 - "Workspace Model"
Cohesion: 0.29
Nodes (6): brandPersonaSchema, IBrandPersona, IPersonaOption, IWorkspace, personaOptionSchema, workspaceSchema

### Community 58 - "Quota Text Utilities"
Cohesion: 0.53
Nodes (4): getQuotaFooter(), getQuotaMessage(), PlanQuotaCard(), PlanQuotaCardProps

### Community 59 - "Empty State Component"
Cohesion: 0.33
Nodes (4): EmptyState(), EmptyStateProps, TrendingEmptyState(), TrendingEmptyStateProps

### Community 61 - "Package Metadata"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 62 - "NavGroup Component"
Cohesion: 0.67
Nodes (3): NavGroup(), NavGroupProps, NavItem

### Community 66 - "SOLID Design Docs"
Cohesion: 0.67
Nodes (3): SOLID Principles in React, Server/Client Boundary Strategy, SOLID Engineering Constraints

## Knowledge Gaps
- **303 isolated node(s):** `PreToolUse`, `allow`, `metadata`, `metadata`, `metadata` (+298 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Analytics Overview` to `Post Creation UI`, `Loading Skeletons`, `History UI Components`, `Analytics Content`, `Brand Guard & Top Posts`, `Settings Feature UI`, `Error Boundaries`, `App Shell Pages`, `Guardrails API & UI`, `Analytics Charts`, `UI Option Constants`, `Layout Dropdown`, `Time Picker`, `Activity Heatmap`, `Profile & Workspace UI`, `History Filters & Grid`, `Mobile Sidebar`, `Multi-Select Component`, `App Layout & Fonts`, `Input Group UI`, `Sidebar Component`, `Analytics Header & Tabs`, `Quota Text Utilities`, `Empty State Component`, `NavGroup Component`, `Motivation Tip`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `connectDB()` connect `API Route Handlers` to `AI Provider Layer`, `Trending Global Topics`, `Inngest & Logger`, `AI Prompt & Shortlist`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `ScorePill` connect `History Card Components` to `Activity Heatmap`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `connectDB()` (e.g. with `GET()` and `GET()`) actually correct?**
  _`connectDB()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `handleApiError()` (e.g. with `GET()` and `GET()`) actually correct?**
  _`handleApiError()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PreToolUse`, `allow`, `metadata` to the rest of the system?**
  _303 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AI Provider Layer` be split into smaller, more focused modules?**
  _Cohesion score 0.05506549051055867 - nodes in this community are weakly interconnected._