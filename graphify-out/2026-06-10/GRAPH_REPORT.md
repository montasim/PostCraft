# Graph Report - PostCraft  (2026-06-10)

## Corpus Check
- 321 files · ~88,806 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1247 nodes · 3756 edges · 56 communities (46 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `89252d2e`
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
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_App Layout|App Layout]]
- [[_COMMUNITY_Constants Status|Constants Status]]
- [[_COMMUNITY_Ranking Service|Ranking Service]]
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
- [[_COMMUNITY_Community 67|Community 67]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 165 edges
2. `connectDB()` - 94 edges
3. `handleApiError()` - 57 edges
4. `Button()` - 50 edges
5. `getEnv()` - 47 edges
6. `getWorkspaceId()` - 40 edges
7. `useAppSelector()` - 34 edges
8. `Skeleton()` - 30 edges
9. `Badge()` - 25 edges
10. `Card()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `connectDB()`  [INFERRED]
  app/api/stats/route.ts → core/config/database.ts
- `DELETE()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/post/[id]/route.ts → core/config/database.ts
- `PATCH()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/post/[id]/route.ts → core/config/database.ts
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/schedule/route.ts → core/config/database.ts
- `DELETE()` --calls--> `connectDB()`  [INFERRED]
  app/api/linkedin/post/[id]/route.ts → core/config/database.ts

## Import Cycles
- None detected.

## Communities (56 total, 10 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.10
Nodes (33): GET(), AiErrorType, AiProviderError, classifyError(), InngestAiCallOptions, StepTools, ApiKeyEntry, getKey() (+25 more)

### Community 1 - "App Api"
Cohesion: 0.18
Nodes (15): PostVariantsCarouselProps, FacebookPreview(), FacebookPreviewProps, LinkedInPreview(), LinkedInPreviewProps, PostPreviewDialog(), PostPreviewDialogProps, TwitterPreview() (+7 more)

### Community 2 - "Errors App"
Cohesion: 0.20
Nodes (10): runGenerationPipeline(), rankingService, IVariant, variantSchema, variantRepository, ScoredVariant, scoredVariantSchema, VariantOutput (+2 more)

### Community 3 - "Errors Inngest"
Cohesion: 0.18
Nodes (7): DropdownMenuCheckboxItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent(), DropdownMenuSubTrigger()

### Community 4 - "Generate Brand"
Cohesion: 0.08
Nodes (8): getQuotaFooter(), getQuotaMessage(), metadata, metadata, PlanQuotaCard(), PlanQuotaCardProps, metadata, Skeleton()

### Community 5 - "Layout Brand"
Cohesion: 0.27
Nodes (10): buildSourceKeywords(), DevToArticle, fetchDevTo(), fetchGitHub(), fetchHackerNews(), fetchReddit(), fetchTrendingSources(), GitHubRepo (+2 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.14
Nodes (17): PLATFORM_DISPLAY_NAMES, PlatformId, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, PLATFORM_ICONS, VariantCardProps, fetchPreviewPrefs, initialState (+9 more)

### Community 7 - "Prompts Judge"
Cohesion: 0.22
Nodes (8): AI_CONFIG, AI_MAX_TOKENS, AI_TASKS, AI_TEMPERATURE, AITask, LANGUAGE_MAP, LANGUAGE_TO_CODE, TASK_PROVIDER_ORDER

### Community 8 - "Generate Brand"
Cohesion: 0.38
Nodes (9): InsightsData, insightsRepository, InsightsDashboard, insightsService, InsightsOverview, ScoreDistribution, StylePerformance, TopPerformingPost (+1 more)

### Community 10 - "Generate Constants"
Cohesion: 0.08
Nodes (16): fontMono, geist, GlobalError(), Preset, QUICK_PRESETS, QuickPresets(), QuickPresetsProps, TopicSuggestions() (+8 more)

### Community 11 - "Library Card"
Cohesion: 0.07
Nodes (30): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats, useMediaQuery(), ActivityHeatmapProps, BestPostHighlight(), BestPostHighlightProps, formatRelativeDate() (+22 more)

### Community 12 - "Auth Form"
Cohesion: 0.08
Nodes (28): authClient, LoginForm(), SignupForm(), VerifyEmailContent(), ApiGuardrail, Rule, RuleSectionProps, PostCreationFormInner() (+20 more)

### Community 13 - "Library Activity"
Cohesion: 0.09
Nodes (23): NAV_ACCOUNT, NAV_CONFIG, NAV_MAIN, MobileSidebarProps, DAYS, PLATFORMS, TrendingSettingsPanelProps, RadioGroup() (+15 more)

### Community 14 - "Error Brand"
Cohesion: 0.12
Nodes (9): HighTrafficAlert(), SelectOption, NavGroup(), PageError(), PlanQuotaCardSkeleton(), StreakWidget(), TrendingScheduleCardSkeleton(), selectAiLimitError() (+1 more)

### Community 15 - "Layout Header"
Cohesion: 0.22
Nodes (8): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, ISettings, notificationSchema, settingsSchema

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.09
Nodes (41): useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, cn(), DatePicker(), DatePickerProps, MultiSelect(), MultiSelectProps, TimePicker() (+33 more)

### Community 17 - "Generation Schema"
Cohesion: 0.15
Nodes (17): GET(), generationSchema, IGeneration, aiGenerationOutputSchema, CreateGenerationInput, createGenerationSchema, GenerationStatus, generationStatusSchema (+9 more)

### Community 18 - "Trending Runs"
Cohesion: 0.12
Nodes (21): TrendingRunGroup(), TrendingRunGroupProps, groupRunsByDate(), TrendingRunsList(), TrendingRunsListProps, DateGroup, PLATFORM_ABBREV, STATUS_DOT (+13 more)

### Community 19 - "Library App"
Cohesion: 0.11
Nodes (21): setRefineData(), STATUS_STYLES, VariantCardWrapper(), VariantCardWrapper(), QuotaAlert(), ScorePill(), VariantCard(), VariantCarousel() (+13 more)

### Community 20 - "Constants Options"
Cohesion: 0.09
Nodes (21): BannedWordsGroupProps, BrandGuardPanel(), BrandGuardPanelProps, GuardRule, RuleGroupProps, CarouselNavigation(), CarouselNavigationProps, DashboardClient() (+13 more)

### Community 21 - "Trending Prompts"
Cohesion: 0.15
Nodes (20): callWithTaskFallback(), buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, getLatestGlobalTopics(), countUndismissedRuns(), createRun(), dismissAllRuns() (+12 more)

### Community 22 - "Profile Content"
Cohesion: 0.10
Nodes (24): AUDIENCE_OPTIONS, INDUSTRY_OPTIONS, LANGUAGE_OPTIONS, PLATFORM_OPTIONS, SORT_OPTIONS, TONE_OPTIONS, TOPIC_OPTIONS, ConnectedAccountsCard() (+16 more)

### Community 23 - "Insights Index"
Cohesion: 0.22
Nodes (10): EMPTY_DATA, InsightsContent(), InsightsHeader(), InsightsOverviewCards(), MetricCard(), InsightsScoreDistribution(), InsightsStyleBreakdown(), InsightsTopPosts() (+2 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.33
Nodes (6): MILLISECONDS, TrendingScheduleCard(), TrendingScheduleCardProps, computeNextRunAt(), formatNextRun(), ScheduleType

### Community 25 - "Queue Functions"
Cohesion: 0.22
Nodes (12): handler, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner, scheduleFacebookPost, scheduleLinkedInPost (+4 more)

### Community 26 - "Preview Slices"
Cohesion: 0.25
Nodes (8): FacebookPostItem(), LibraryHeaderProps, LinkedinPostItem(), EmptyState(), EmptyStateProps, TwitterPostItem(), Badge(), badgeVariants

### Community 27 - "Brand Guard"
Cohesion: 0.14
Nodes (26): ActivityHeatmap(), getDaysAgo(), HeatmapDay, PLATFORM_PREVIEWS, ConfirmDialogProps, BG_MAP, COLOR_MAP, ScorePillProps (+18 more)

### Community 28 - "Library Repository"
Cohesion: 0.06
Nodes (74): DELETE(), GET(), DELETE(), PATCH(), DELETE(), PATCH(), POST(), POST() (+66 more)

### Community 29 - "Shared Trending"
Cohesion: 0.06
Nodes (63): getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel(), hasGroq(), getOpenRouterClient(), getOpenRouterModel(), hasOpenRouter() (+55 more)

### Community 30 - "Settings Schema"
Cohesion: 0.13
Nodes (20): settingsRepository, accountSettingsSchema, appearanceSettingsSchema, notificationSettingsSchema, UpdateSettingsInput, updateSettingsSchema, DEFAULT_ACCOUNT, DEFAULT_APPEARANCE (+12 more)

### Community 31 - "Insights Content"
Cohesion: 0.15
Nodes (11): API, ProfileContent(), StreakWidgetProps, fetchProfile, initialState, profileSlice, selectProfile(), selectProfileStats() (+3 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.11
Nodes (27): SidebarProps, generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, IPreviewConfigDoc, ITrendingPrefsDoc, prefsSchema, previewPrefsSubSchema (+19 more)

### Community 33 - "Variant Schema"
Cohesion: 0.48
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 34 - "Workspace Schema"
Cohesion: 0.14
Nodes (10): AIServiceError, AppError, DatabaseError, ForbiddenError, GuardrailLimitExceededError, NotFoundError, QueueError, QuotaExceededError (+2 more)

### Community 35 - "Trending Global"
Cohesion: 0.15
Nodes (15): GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, saveGlobalTopics(), saveGlobalTopicsFailure(), ConfigSnapshotSchema, ISourceItemDoc, ITrendingRawItemDoc, ITrendingRunDoc (+7 more)

### Community 36 - "Trending Empty"
Cohesion: 0.22
Nodes (11): GUARDRAIL_CATEGORIES, DEFAULT_GUARDRAILS, DefaultGuardrail, guardrailSchema, IGuardrail, guardrailRepository, CreateGuardrailInput, createGuardrailSchema (+3 more)

### Community 38 - "App Layout"
Cohesion: 0.24
Nodes (7): fontMono, geist, metadata, RootLayout(), ThemeProvider(), ReduxProvider(), store

### Community 39 - "Constants Status"
Cohesion: 0.20
Nodes (9): DRAFT_STATUS, DRAFT_STATUSES, EXPORT_FORMATS, GENERATION_STATUS, GENERATION_STATUSES, GUARDRAIL_CATEGORY, RUN_STATUS, RUN_STATUSES (+1 more)

### Community 45 - "Community 45"
Cohesion: 0.20
Nodes (9): generationRepository, GenerationWithVariants, LibraryListFilters, LibraryListResult, libraryRepository, SORT_MAP, SortMap, VariantDoc (+1 more)

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
Cohesion: 0.10
Nodes (29): SCORE_WEIGHTS, buildJudgePrompt(), JudgePromptData, PLATFORM_CRITERIA, calculateHeuristicScore(), clamp(), HeuristicInput, HeuristicResult (+21 more)

### Community 51 - "Settings Page"
Cohesion: 0.29
Nodes (9): IProfile, profileSchema, profileRepository, UpdateProfileInput, updateProfileSchema, profileService, ProfileState, ProfileStats (+1 more)

### Community 67 - "Community 67"
Cohesion: 0.12
Nodes (18): AppShell(), AppShellProps, ROUTE_MAP, formatNumber(), Header(), HeaderProps, MobileSidebar(), Sidebar() (+10 more)

## Knowledge Gaps
- **220 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+215 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Shared Useautocompletetimepicker` to `App Api`, `Errors Inngest`, `Generate Brand`, `Preview Facebook`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Error Brand`, `Trending Runs`, `Library App`, `Constants Options`, `Profile Content`, `Insights Index`, `Dropdown Menu`, `Preview Slices`, `Brand Guard`, `Settings Schema`, `Insights Content`, `Variant Schema`, `App Layout`, `Community 48`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `connectDB()` connect `Library Repository` to `Errors App`, `Trending Global`, `Generation Schema`, `Trending Prompts`, `Queue Functions`, `Preview Slices`, `Shared Trending`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Shared Trending` to `Groq Gemini`, `Library Repository`, `App Layout`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `connectDB()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`connectDB()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `handleApiError()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`handleApiError()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _220 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.09877551020408164 - nodes in this community are weakly interconnected._