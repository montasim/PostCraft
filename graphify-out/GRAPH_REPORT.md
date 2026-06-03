# Graph Report - .  (2026-06-03)

## Corpus Check
- 293 files · ~66,538 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1156 nodes · 3320 edges · 62 communities (52 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

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
- [[_COMMUNITY_Trending Source|Trending Source]]
- [[_COMMUNITY_App Layout|App Layout]]
- [[_COMMUNITY_Constants Status|Constants Status]]
- [[_COMMUNITY_Ranking Service|Ranking Service]]
- [[_COMMUNITY_Constants Language|Constants Language]]
- [[_COMMUNITY_Prefs Model|Prefs Model]]
- [[_COMMUNITY_Settings Model|Settings Model]]
- [[_COMMUNITY_Slices Trending|Slices Trending]]
- [[_COMMUNITY_Workspace Model|Workspace Model]]
- [[_COMMUNITY_Generation Prompt|Generation Prompt]]
- [[_COMMUNITY_Quota Lib|Quota Lib]]
- [[_COMMUNITY_Trending Schedule|Trending Schedule]]
- [[_COMMUNITY_Page Signup|Page Signup]]
- [[_COMMUNITY_Brand Guard|Brand Guard]]
- [[_COMMUNITY_Settings Page|Settings Page]]
- [[_COMMUNITY_Hooks Use|Hooks Use]]
- [[_COMMUNITY_Trending Ranker|Trending Ranker]]
- [[_COMMUNITY_App Opengraph|App Opengraph]]
- [[_COMMUNITY_Forgot Password|Forgot Password]]
- [[_COMMUNITY_Hooks Use|Hooks Use]]
- [[_COMMUNITY_Ranking Schema|Ranking Schema]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 156 edges
2. `connectDB()` - 53 edges
3. `handleApiError()` - 52 edges
4. `getEnv()` - 47 edges
5. `Button()` - 42 edges
6. `getWorkspaceId()` - 35 edges
7. `useAppSelector()` - 32 edges
8. `Card()` - 23 edges
9. `Skeleton()` - 21 edges
10. `API` - 20 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `PostVariantsCarouselProps` --references--> `Variant`  [EXTRACTED]
  components/features/generate/post-variants-carousel.tsx → types/index.ts
- `VariantCardWrapper()` --calls--> `useAppSelector()`  [EXTRACTED]
  components/features/library/library-detail.tsx → store/hooks.ts
- `AvatarImage()` --calls--> `cn()`  [EXTRACTED]
  components/ui/avatar.tsx → lib/utils.ts
- `AvatarBadge()` --calls--> `cn()`  [EXTRACTED]
  components/ui/avatar.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (62 total, 10 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.06
Nodes (64): getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel(), hasGroq(), getOpenRouterClient(), getOpenRouterModel(), hasOpenRouter() (+56 more)

### Community 1 - "App Api"
Cohesion: 0.11
Nodes (40): { GET, POST }, GET(), GET(), GET(), GET(), GET(), Auth, requireAuth() (+32 more)

### Community 2 - "Errors App"
Cohesion: 0.07
Nodes (28): GUARDRAIL_CATEGORIES, AIServiceError, AppError, DatabaseError, ForbiddenError, GuardrailLimitExceededError, NotFoundError, QueueError (+20 more)

### Community 3 - "Errors Inngest"
Cohesion: 0.10
Nodes (34): GET(), AiErrorType, AiProviderError, classifyError(), InngestAiCallOptions, StepTools, ApiKeyEntry, getKey() (+26 more)

### Community 4 - "Generate Brand"
Cohesion: 0.08
Nodes (13): CarouselNavigation(), CarouselNavigationProps, PostVariantsCarousel(), PostVariantsCarouselProps, STATUS_HEADERS, STATUS_MESSAGES, useCarousel(), useClipboard() (+5 more)

### Community 5 - "Layout Brand"
Cohesion: 0.10
Nodes (30): metadata, DashboardClient(), AppShellProps, ROUTE_MAP, Sidebar(), VariantCardWrapper(), HighTrafficAlert(), QuotaAlert() (+22 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.10
Nodes (29): PlatformId, FacebookPreview(), FacebookPreviewProps, LinkedInPreview(), LinkedInPreviewProps, PLATFORM_PREVIEWS, PostPreviewDialog(), PostPreviewDialogProps (+21 more)

### Community 7 - "Prompts Judge"
Cohesion: 0.10
Nodes (29): SCORE_WEIGHTS, buildJudgePrompt(), JudgePromptData, PLATFORM_CRITERIA, calculateHeuristicScore(), clamp(), HeuristicInput, HeuristicResult (+21 more)

### Community 8 - "Generate Brand"
Cohesion: 0.11
Nodes (21): BannedWordsGroupProps, BrandGuardPanel(), BrandGuardPanelProps, GuardRule, RuleGroupProps, STATUS_STYLES, VariantCardWrapper(), ScorePill() (+13 more)

### Community 9 - "Insights Checkbox"
Cohesion: 0.09
Nodes (29): MetricCard(), cn(), DatePicker(), RunItem(), CardAction(), CardDescription(), Checkbox(), CommandDialog() (+21 more)

### Community 10 - "Generate Constants"
Cohesion: 0.09
Nodes (24): AUDIENCE_OPTIONS, LANGUAGE_OPTIONS, PLATFORM_OPTIONS, TONE_OPTIONS, GenerationStatus, STATUS_LABELS, PostCreationForm(), PostCreationFormInner() (+16 more)

### Community 11 - "Library Card"
Cohesion: 0.09
Nodes (22): ActivityHeatmapProps, BestPostHighlight(), BestPostHighlightProps, formatRelativeDate(), LibraryCard(), LibraryCardProps, LibraryContent(), LibraryDetail() (+14 more)

### Community 12 - "Auth Form"
Cohesion: 0.18
Nodes (13): authClient, LoginForm(), SignupForm(), VerifyEmailContent(), RANGE_COLORS, SettingsData, Card(), CardContent() (+5 more)

### Community 13 - "Library Activity"
Cohesion: 0.12
Nodes (21): ActivityHeatmap(), getDaysAgo(), HeatmapDay, BG_MAP, COLOR_MAP, ScorePillProps, DAYS, PLATFORMS (+13 more)

### Community 14 - "Error Brand"
Cohesion: 0.11
Nodes (7): HighDemandCard(), HighDemandCardProps, MotivationTip(), TIPS, PageError(), SectionHeader(), SectionHeaderProps

### Community 15 - "Layout Header"
Cohesion: 0.13
Nodes (18): AppShell(), formatNumber(), Header(), HeaderProps, MobileSidebar(), BREADCRUMB_CONFIG, BreadcrumbConfig, PageBreadcrumb() (+10 more)

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.20
Nodes (15): useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, DatePickerProps, MultiSelectProps, TimePicker(), TimePickerProps, Command(), CommandEmpty() (+7 more)

### Community 17 - "Generation Schema"
Cohesion: 0.17
Nodes (15): generationSchema, IGeneration, aiGenerationOutputSchema, CreateGenerationInput, createGenerationSchema, GenerationStatus, generationStatusSchema, RawVariant (+7 more)

### Community 18 - "Trending Runs"
Cohesion: 0.13
Nodes (19): TrendingRunGroup(), TrendingRunGroupProps, groupRunsByDate(), TrendingRunsList(), TrendingRunsListProps, DateGroup, PLATFORM_ABBREV, STATUS_DOT (+11 more)

### Community 19 - "Library App"
Cohesion: 0.15
Nodes (10): LibraryEmpty(), LibraryEmptyProps, LibraryFiltersProps, LibraryGridProps, EmptyStateProps, LibraryFilterState, Button(), buttonVariants (+2 more)

### Community 20 - "Constants Options"
Cohesion: 0.12
Nodes (16): INDUSTRY_OPTIONS, NAV_ACCOUNT, NAV_CONFIG, NAV_MAIN, SORT_OPTIONS, TOPIC_OPTIONS, MobileSidebarProps, ScoreRange (+8 more)

### Community 21 - "Trending Prompts"
Cohesion: 0.18
Nodes (16): callWithTaskFallback(), buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, getLatestGlobalTopics(), countUndismissedRuns(), createRun(), findRunsByWorkspace() (+8 more)

### Community 22 - "Profile Content"
Cohesion: 0.15
Nodes (12): API, metadata, ProfileContent(), fetchProfile, initialState, profileSlice, ProfileState, selectProfile() (+4 more)

### Community 23 - "Insights Index"
Cohesion: 0.24
Nodes (14): InsightsData, insightsRepository, InsightsDashboard, insightsService, AccountSettings, AppearanceSettings, InsightsOverview, NotificationSettings (+6 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.16
Nodes (11): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+3 more)

### Community 25 - "Queue Functions"
Cohesion: 0.22
Nodes (12): handler, inngest, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner, dismissAllRuns() (+4 more)

### Community 26 - "Preview Slices"
Cohesion: 0.18
Nodes (11): PLATFORM_DISPLAY_NAMES, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, fetchPreviewPrefs, initialState, previewPrefsSlice, PreviewPrefsState, selectEnabledPlatforms() (+3 more)

### Community 27 - "Brand Guard"
Cohesion: 0.18
Nodes (7): ApiGuardrail, Rule, RuleSectionProps, StreakWidget(), StreakWidgetProps, Progress(), Switch()

### Community 28 - "Library Repository"
Cohesion: 0.20
Nodes (9): generationRepository, GenerationWithVariants, LibraryListFilters, LibraryListResult, libraryRepository, SORT_MAP, SortMap, VariantDoc (+1 more)

### Community 29 - "Shared Trending"
Cohesion: 0.19
Nodes (11): SidebarProps, TrendingPrefs, SelectOption, NavGroup(), NavGroupProps, TrendingScheduleCardProps, TrendingHeader(), TrendingHeaderProps (+3 more)

### Community 30 - "Settings Schema"
Cohesion: 0.26
Nodes (10): settingsRepository, accountSettingsSchema, appearanceSettingsSchema, notificationSettingsSchema, UpdateSettingsInput, updateSettingsSchema, DEFAULT_ACCOUNT, DEFAULT_APPEARANCE (+2 more)

### Community 31 - "Insights Content"
Cohesion: 0.24
Nodes (9): EMPTY_DATA, InsightsContent(), InsightsHeader(), InsightsOverviewCards(), InsightsScoreDistribution(), InsightsStyleBreakdown(), InsightsTopPosts(), InsightsTrendChart() (+1 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.40
Nodes (9): prefsRepository, GENERATION_PREFS_DEFAULTS, GenerationPrefs, generationPrefsSchema, PREVIEW_CONFIG_DEFAULTS, PreviewConfig, previewConfigSchema, TRENDING_PREFS_DEFAULTS (+1 more)

### Community 33 - "Variant Schema"
Cohesion: 0.31
Nodes (8): IVariant, variantSchema, variantRepository, ScoredVariant, scoredVariantSchema, VariantOutput, variantOutputSchema, variantService

### Community 34 - "Workspace Schema"
Cohesion: 0.33
Nodes (8): workspaceRepository, brandPersonaSchema, customHashtagSchema, personaOptionSchema, UpdateWorkspaceInput, updateWorkspaceSchema, DEFAULT_PERSONA, workspaceService

### Community 35 - "Trending Global"
Cohesion: 0.24
Nodes (9): GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, saveGlobalTopics(), saveGlobalTopicsFailure(), ConfigSnapshotSchema, ISourceItemDoc, ITrendingRunDoc, SourceItemSchema (+1 more)

### Community 36 - "Trending Empty"
Cohesion: 0.27
Nodes (6): useMediaQuery(), EmptyState(), metadata, TrendingEmptyState(), TrendingEmptyStateProps, TrendingShell()

### Community 37 - "Trending Source"
Cohesion: 0.27
Nodes (10): buildSourceKeywords(), DevToArticle, fetchDevTo(), fetchGitHub(), fetchHackerNews(), fetchReddit(), fetchTrendingSources(), GitHubRepo (+2 more)

### Community 38 - "App Layout"
Cohesion: 0.24
Nodes (7): fontMono, geist, metadata, RootLayout(), ThemeProvider(), ReduxProvider(), store

### Community 39 - "Constants Status"
Cohesion: 0.20
Nodes (9): DRAFT_STATUS, DRAFT_STATUSES, EXPORT_FORMATS, GENERATION_STATUS, GENERATION_STATUSES, GUARDRAIL_CATEGORY, RUN_STATUS, RUN_STATUSES (+1 more)

### Community 40 - "Ranking Service"
Cohesion: 0.28
Nodes (3): generationService, runGenerationPipeline(), rankingService

### Community 41 - "Constants Language"
Cohesion: 0.22
Nodes (8): AI_CONFIG, AI_MAX_TOKENS, AI_TASKS, AI_TEMPERATURE, AITask, LANGUAGE_MAP, LANGUAGE_TO_CODE, TASK_PROVIDER_ORDER

### Community 42 - "Prefs Model"
Cohesion: 0.22
Nodes (8): generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, IPreviewConfigDoc, ITrendingPrefsDoc, prefsSchema, previewPrefsSubSchema, trendingPrefsSubSchema

### Community 43 - "Settings Model"
Cohesion: 0.22
Nodes (8): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, ISettings, notificationSchema, settingsSchema

### Community 44 - "Slices Trending"
Cohesion: 0.22
Nodes (6): fetchTrendingPrefs, initialState, selectTrendingCount(), selectTrendingPrefs(), trendingPrefsSlice, TrendingPrefsState

### Community 45 - "Workspace Model"
Cohesion: 0.22
Nodes (8): brandPersonaSchema, customHashtagSchema, IBrandPersona, ICustomHashtag, IPersonaOption, IWorkspace, personaOptionSchema, workspaceSchema

### Community 46 - "Generation Prompt"
Cohesion: 0.36
Nodes (6): buildPromptPayload(), GenerationData, GuardrailData, buildGenerationPrompt(), GenerationPromptData, PLATFORM_PSYCHOLOGY

### Community 47 - "Quota Lib"
Cohesion: 0.53
Nodes (4): getQuotaFooter(), getQuotaMessage(), PlanQuotaCard(), PlanQuotaCardProps

### Community 48 - "Trending Schedule"
Cohesion: 0.60
Nodes (3): TrendingScheduleCard(), computeNextRunAt(), formatNextRun()

### Community 52 - "Hooks Use"
Cohesion: 0.40
Nodes (3): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats

### Community 53 - "Trending Ranker"
Cohesion: 0.50
Nodes (3): rankSourceItems(), ShortlistOutput, SourceItem

## Knowledge Gaps
- **205 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+200 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Insights Checkbox` to `Generate Brand`, `Layout Brand`, `Preview Facebook`, `Generate Brand`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Error Brand`, `Layout Header`, `Shared Useautocompletetimepicker`, `Trending Runs`, `Library App`, `Constants Options`, `Dropdown Menu`, `Brand Guard`, `Shared Trending`, `Trending Empty`, `App Layout`, `Quota Lib`, `Trending Schedule`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Groq Gemini` to `App Api`, `Errors Inngest`, `App Layout`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `Button()` connect `Library App` to `Generate Brand`, `Layout Brand`, `Preview Facebook`, `Trending Empty`, `Generate Brand`, `Insights Checkbox`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Layout Header`, `Shared Useautocompletetimepicker`, `Trending Schedule`, `Constants Options`, `Profile Content`, `Brand Guard`, `Shared Trending`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `connectDB()` (e.g. with `GET()` and `GET()`) actually correct?**
  _`connectDB()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `handleApiError()` (e.g. with `GET()` and `GET()`) actually correct?**
  _`handleApiError()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _205 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.0603448275862069 - nodes in this community are weakly interconnected._