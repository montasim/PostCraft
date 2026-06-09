# Graph Report - PostCraft  (2026-06-10)

## Corpus Check
- 319 files · ~87,432 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1240 nodes · 3720 edges · 58 communities (49 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0b1d407a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Groq Gemini|Groq Gemini]]
- [[_COMMUNITY_App Api|App Api]]
- [[_COMMUNITY_Errors App|Errors App]]
- [[_COMMUNITY_Errors Inngest|Errors Inngest]]
- [[_COMMUNITY_Generate Brand|Generate Brand]]
- [[_COMMUNITY_Layout Brand|Layout Brand]]
- [[_COMMUNITY_Preview Facebook|Preview Facebook]]
- [[_COMMUNITY_Prompts Judge|Prompts Judge]]
- [[_COMMUNITY_Generate Brand|Generate Brand]]
- [[_COMMUNITY_Insights Checkbox|Insights Checkbox]]
- [[_COMMUNITY_Generate Constants|Generate Constants]]
- [[_COMMUNITY_Library Card|Library Card]]
- [[_COMMUNITY_Auth Form|Auth Form]]
- [[_COMMUNITY_Library Activity|Library Activity]]
- [[_COMMUNITY_Error Brand|Error Brand]]
- [[_COMMUNITY_Layout Header|Layout Header]]
- [[_COMMUNITY_Shared Useautocompletetimepicker|Shared Useautocompletetimepicker]]
- [[_COMMUNITY_Generation Schema|Generation Schema]]
- [[_COMMUNITY_Trending Runs|Trending Runs]]
- [[_COMMUNITY_Library App|Library App]]
- [[_COMMUNITY_Constants Options|Constants Options]]
- [[_COMMUNITY_Trending Prompts|Trending Prompts]]
- [[_COMMUNITY_Profile Content|Profile Content]]
- [[_COMMUNITY_Insights Index|Insights Index]]
- [[_COMMUNITY_Dropdown Menu|Dropdown Menu]]
- [[_COMMUNITY_Queue Functions|Queue Functions]]
- [[_COMMUNITY_Preview Slices|Preview Slices]]
- [[_COMMUNITY_Brand Guard|Brand Guard]]
- [[_COMMUNITY_Library Repository|Library Repository]]
- [[_COMMUNITY_Shared Trending|Shared Trending]]
- [[_COMMUNITY_Settings Schema|Settings Schema]]
- [[_COMMUNITY_Insights Content|Insights Content]]
- [[_COMMUNITY_Prefs Schema|Prefs Schema]]
- [[_COMMUNITY_Variant Schema|Variant Schema]]
- [[_COMMUNITY_Workspace Schema|Workspace Schema]]
- [[_COMMUNITY_Trending Global|Trending Global]]
- [[_COMMUNITY_Trending Empty|Trending Empty]]
- [[_COMMUNITY_App Layout|App Layout]]
- [[_COMMUNITY_Constants Status|Constants Status]]
- [[_COMMUNITY_Ranking Service|Ranking Service]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Generation Prompt|Generation Prompt]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Page Signup|Page Signup]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Settings Page|Settings Page]]
- [[_COMMUNITY_App Opengraph|App Opengraph]]
- [[_COMMUNITY_Forgot Password|Forgot Password]]
- [[_COMMUNITY_Hooks Use|Hooks Use]]
- [[_COMMUNITY_Ranking Schema|Ranking Schema]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 67|Community 67]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 163 edges
2. `connectDB()` - 93 edges
3. `handleApiError()` - 55 edges
4. `Button()` - 49 edges
5. `getEnv()` - 47 edges
6. `getWorkspaceId()` - 38 edges
7. `useAppSelector()` - 34 edges
8. `Skeleton()` - 29 edges
9. `Badge()` - 24 edges
10. `Card()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `PATCH()` --calls--> `connectDB()`  [INFERRED]
  app/api/brand-guard/[id]/route.ts → core/config/database.ts
- `DELETE()` --calls--> `connectDB()`  [INFERRED]
  app/api/brand-guard/[id]/route.ts → core/config/database.ts
- `DELETE()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/post/[id]/route.ts → core/config/database.ts
- `PATCH()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/post/[id]/route.ts → core/config/database.ts
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/schedule/route.ts → core/config/database.ts

## Import Cycles
- None detected.

## Communities (58 total, 9 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.06
Nodes (61): GET(), AiErrorType, AiProviderError, classifyError(), getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel() (+53 more)

### Community 1 - "App Api"
Cohesion: 0.25
Nodes (10): GET(), requireAuth(), GET(), PUT(), prefsService, GET(), PUT(), GET() (+2 more)

### Community 2 - "Errors App"
Cohesion: 0.19
Nodes (11): generationRepository, runGenerationPipeline(), rankingService, IVariant, variantSchema, variantRepository, ScoredVariant, scoredVariantSchema (+3 more)

### Community 3 - "Errors Inngest"
Cohesion: 0.13
Nodes (30): DELETE(), PATCH(), GET(), GET(), GET(), GET(), getUserId(), getWorkspaceId() (+22 more)

### Community 4 - "Generate Brand"
Cohesion: 0.08
Nodes (8): getQuotaFooter(), getQuotaMessage(), metadata, metadata, PlanQuotaCard(), PlanQuotaCardProps, metadata, Skeleton()

### Community 5 - "Layout Brand"
Cohesion: 0.13
Nodes (16): API, AppShellProps, ROUTE_MAP, connectedPlatformsSlice, ConnectedPlatformsState, fetchConnectedPlatforms, initialState, selectConnectedPlatforms() (+8 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.24
Nodes (9): PLATFORM_DISPLAY_NAMES, PlatformId, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, ScorePill(), PLATFORM_ICONS, VariantCardProps, CustomHashtag (+1 more)

### Community 7 - "Prompts Judge"
Cohesion: 0.24
Nodes (7): DashboardClient(), GenerationStatus, STATUS_LABELS, requestNotificationPermission(), sendBrowserNotification(), metadata, fetchWorkspace

### Community 8 - "Generate Brand"
Cohesion: 0.35
Nodes (10): EMPTY_DATA, InsightsData, insightsRepository, InsightsDashboard, insightsService, InsightsOverview, ScoreDistribution, StylePerformance (+2 more)

### Community 10 - "Generate Constants"
Cohesion: 0.14
Nodes (17): AUDIENCE_OPTIONS, LANGUAGE_OPTIONS, PLATFORM_OPTIONS, TONE_OPTIONS, PostCreationFormInner(), Preset, QUICK_PRESETS, QuickPresets() (+9 more)

### Community 11 - "Library Card"
Cohesion: 0.09
Nodes (26): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats, ActivityHeatmapProps, BestPostHighlight(), BestPostHighlightProps, formatRelativeDate(), LibraryCard() (+18 more)

### Community 12 - "Auth Form"
Cohesion: 0.12
Nodes (22): LoginForm(), SignupForm(), VerifyEmailContent(), ApiGuardrail, Rule, RuleSectionProps, InsightsOverviewCards(), MetricCard() (+14 more)

### Community 13 - "Library Activity"
Cohesion: 0.08
Nodes (27): INDUSTRY_OPTIONS, NAV_ACCOUNT, NAV_CONFIG, NAV_MAIN, SORT_OPTIONS, TOPIC_OPTIONS, MobileSidebarProps, DAYS (+19 more)

### Community 14 - "Error Brand"
Cohesion: 0.11
Nodes (11): HighDemandCard(), HighDemandCardProps, MotivationTip(), TIPS, SelectOption, NavGroup(), PageError(), PlanQuotaCardSkeleton() (+3 more)

### Community 15 - "Layout Header"
Cohesion: 0.22
Nodes (8): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, ISettings, notificationSchema, settingsSchema

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.09
Nodes (39): useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, cn(), DatePicker(), DatePickerProps, MultiSelect(), MultiSelectProps, SectionHeader() (+31 more)

### Community 17 - "Generation Schema"
Cohesion: 0.11
Nodes (21): AI_MAX_TOKENS, AI_TASKS, AI_TEMPERATURE, AITask, LANGUAGE_MAP, LANGUAGE_TO_CODE, TASK_PROVIDER_ORDER, generationSchema (+13 more)

### Community 18 - "Trending Runs"
Cohesion: 0.13
Nodes (19): TrendingRunGroup(), TrendingRunGroupProps, groupRunsByDate(), TrendingRunsList(), TrendingRunsListProps, DateGroup, PLATFORM_ABBREV, STATUS_DOT (+11 more)

### Community 19 - "Library App"
Cohesion: 0.14
Nodes (12): useMediaQuery(), LibraryContent(), metadata, EmptyState(), EmptyStateProps, QuotaAlert(), selectQuotaExceeded(), metadata (+4 more)

### Community 20 - "Constants Options"
Cohesion: 0.21
Nodes (10): CarouselNavigation(), CarouselNavigationProps, PostCreationForm(), PostVariantsCarousel(), STATUS_HEADERS, STATUS_MESSAGES, useCarousel(), useClipboard() (+2 more)

### Community 21 - "Trending Prompts"
Cohesion: 0.17
Nodes (18): callWithTaskFallback(), buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, getLatestGlobalTopics(), countUndismissedRuns(), createRun(), findRunsByWorkspace() (+10 more)

### Community 22 - "Profile Content"
Cohesion: 0.16
Nodes (12): HighTrafficAlert(), initialState, selectAiLimitError(), selectQuotaLimit(), selectQuotaUsed(), selectWorkspace(), selectWorkspaceStatus(), WorkspaceData (+4 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.47
Nodes (4): NavGroupProps, NavItem, PostStatus, PrivacySettings

### Community 25 - "Queue Functions"
Cohesion: 0.25
Nodes (11): handler, inngest, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner, scheduleFacebookPost (+3 more)

### Community 26 - "Preview Slices"
Cohesion: 0.14
Nodes (11): BannedWordsGroupProps, BrandGuardPanel(), BrandGuardPanelProps, GuardRule, RuleGroupProps, LibraryDetail(), LibraryHeader(), LibraryHeaderProps (+3 more)

### Community 27 - "Brand Guard"
Cohesion: 0.06
Nodes (55): authClient, PostVariantsCarouselProps, ActivityHeatmap(), getDaysAgo(), HeatmapDay, FacebookPreview(), FacebookPreviewProps, LinkedInPreview() (+47 more)

### Community 28 - "Library Repository"
Cohesion: 0.09
Nodes (36): DELETE(), GET(), { GET, POST }, DELETE(), PATCH(), POST(), POST(), DELETE() (+28 more)

### Community 29 - "Shared Trending"
Cohesion: 0.14
Nodes (24): buildAuthConfig(), EmailPayload, sendEmail(), buildEmailButton(), buildEmailDivider(), buildEmailLayout(), EMAIL_COMMON, getAuthSession() (+16 more)

### Community 30 - "Settings Schema"
Cohesion: 0.20
Nodes (13): settingsRepository, accountSettingsSchema, appearanceSettingsSchema, notificationSettingsSchema, UpdateSettingsInput, updateSettingsSchema, DEFAULT_ACCOUNT, DEFAULT_APPEARANCE (+5 more)

### Community 31 - "Insights Content"
Cohesion: 0.14
Nodes (12): metadata, ProfileContent(), fetchProfile, initialState, profileSlice, ProfileState, selectProfile(), selectProfileStats() (+4 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.05
Nodes (50): AI_CONFIG, CACHE_CONTROL, EXTERNAL_API, HTTP_STATUS, MILLISECONDS, SidebarProps, generationPrefsSubSchema, IGenerationPrefsDoc (+42 more)

### Community 33 - "Variant Schema"
Cohesion: 0.39
Nodes (6): InsightsHeader(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 34 - "Workspace Schema"
Cohesion: 0.14
Nodes (10): AIServiceError, AppError, DatabaseError, ForbiddenError, GuardrailLimitExceededError, NotFoundError, QueueError, QuotaExceededError (+2 more)

### Community 35 - "Trending Global"
Cohesion: 0.18
Nodes (12): GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, saveGlobalTopics(), saveGlobalTopicsFailure(), ConfigSnapshotSchema, ISourceItemDoc, ITrendingRawItemDoc, ITrendingRunDoc (+4 more)

### Community 36 - "Trending Empty"
Cohesion: 0.22
Nodes (11): GUARDRAIL_CATEGORIES, DEFAULT_GUARDRAILS, DefaultGuardrail, guardrailSchema, IGuardrail, guardrailRepository, CreateGuardrailInput, createGuardrailSchema (+3 more)

### Community 38 - "App Layout"
Cohesion: 0.24
Nodes (7): fontMono, geist, metadata, RootLayout(), ThemeProvider(), ReduxProvider(), store

### Community 39 - "Constants Status"
Cohesion: 0.12
Nodes (12): ERROR_CODES, ERROR_MESSAGES, RETRYABLE_ERROR_PATTERNS, DRAFT_STATUS, DRAFT_STATUSES, EXPORT_FORMATS, GENERATION_STATUS, GENERATION_STATUSES (+4 more)

### Community 40 - "Ranking Service"
Cohesion: 0.21
Nodes (7): fontMono, geist, GlobalError(), Button(), buttonVariants, Calendar(), CalendarDayButton()

### Community 42 - "Community 42"
Cohesion: 0.18
Nodes (11): PostCreationFormProps, consumeRefineData(), RefineData, setRefineData(), selectPersona(), PLATFORM_ABBREV, RunItem(), SOURCE_META (+3 more)

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (8): GenerationWithVariants, LibraryListFilters, LibraryListResult, libraryRepository, SORT_MAP, SortMap, VariantDoc, GuardrailDetail

### Community 46 - "Generation Prompt"
Cohesion: 0.36
Nodes (6): buildPromptPayload(), GenerationData, GuardrailData, buildGenerationPrompt(), GenerationPromptData, PLATFORM_PSYCHOLOGY

### Community 48 - "Community 48"
Cohesion: 0.26
Nodes (10): BREADCRUMB_CONFIG, BreadcrumbConfig, PageBreadcrumb(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+2 more)

### Community 49 - "Page Signup"
Cohesion: 0.15
Nodes (16): brandPersonaSchema, customHashtagSchema, IBrandPersona, ICustomHashtag, IPersonaOption, IWorkspace, personaOptionSchema, workspaceSchema (+8 more)

### Community 50 - "Community 50"
Cohesion: 0.09
Nodes (30): SCORE_WEIGHTS, RawVariant, buildJudgePrompt(), JudgePromptData, PLATFORM_CRITERIA, calculateHeuristicScore(), clamp(), HeuristicInput (+22 more)

### Community 51 - "Settings Page"
Cohesion: 0.40
Nodes (6): IProfile, profileSchema, profileRepository, UpdateProfileInput, updateProfileSchema, profileService

### Community 63 - "Community 63"
Cohesion: 0.33
Nodes (5): AUTH_TOKEN, CRON, SCHEDULE_DEFAULTS, SECONDS, SESSION

### Community 64 - "Community 64"
Cohesion: 0.25
Nodes (7): dismissAllRuns(), dismissRun(), getRawItemsByRunId(), insertRawItems(), updateRunGenerationIds(), updateRunSourceItems(), updateRunStatus()

### Community 67 - "Community 67"
Cohesion: 0.12
Nodes (18): metadata, AppShell(), formatNumber(), Header(), HeaderProps, MobileSidebar(), Sidebar(), ThemeToggle() (+10 more)

## Knowledge Gaps
- **220 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+215 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Shared Useautocompletetimepicker` to `Generate Brand`, `Preview Facebook`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Error Brand`, `Trending Runs`, `Library App`, `Dropdown Menu`, `Preview Slices`, `Brand Guard`, `Prefs Schema`, `Variant Schema`, `App Layout`, `Ranking Service`, `Community 42`, `Community 48`, `Community 67`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `connectDB()` connect `Library Repository` to `Groq Gemini`, `App Api`, `Errors App`, `Errors Inngest`, `Trending Global`, `Community 64`, `Trending Prompts`, `Queue Functions`, `Shared Trending`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Groq Gemini` to `Library Repository`, `Shared Trending`, `App Layout`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `connectDB()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`connectDB()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `handleApiError()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`handleApiError()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _220 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.059822361546499475 - nodes in this community are weakly interconnected._