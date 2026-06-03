# Graph Report - PostCraft  (2026-06-03)

## Corpus Check
- 294 files · ~67,244 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1159 nodes · 3329 edges · 56 communities (46 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `67f1824f`
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
- [[_COMMUNITY_Trending Source|Trending Source]]
- [[_COMMUNITY_App Layout|App Layout]]
- [[_COMMUNITY_Constants Status|Constants Status]]
- [[_COMMUNITY_Ranking Service|Ranking Service]]
- [[_COMMUNITY_Constants Language|Constants Language]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Slices Trending|Slices Trending]]
- [[_COMMUNITY_Generation Prompt|Generation Prompt]]
- [[_COMMUNITY_Quota Lib|Quota Lib]]
- [[_COMMUNITY_Page Signup|Page Signup]]
- [[_COMMUNITY_Settings Page|Settings Page]]
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
5. `Button()` - 43 edges
6. `getWorkspaceId()` - 35 edges
7. `useAppSelector()` - 32 edges
8. `Card()` - 24 edges
9. `Skeleton()` - 21 edges
10. `API` - 20 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `MetricCard()` --calls--> `cn()`  [EXTRACTED]
  components/features/insights/insights-overview-cards.tsx → lib/utils.ts
- `VariantCardWrapper()` --calls--> `useAppSelector()`  [EXTRACTED]
  components/features/library/library-card.tsx → store/hooks.ts
- `TrendingHeaderProps` --references--> `TrendingPrefs`  [EXTRACTED]
  components/features/trending/trending-header.tsx → modules/prefs/prefs.schema.ts
- `RunItem()` --calls--> `cn()`  [EXTRACTED]
  components/features/trending/trending-run-group.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (56 total, 10 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.06
Nodes (63): getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel(), hasGroq(), getOpenRouterClient(), getOpenRouterModel(), hasOpenRouter() (+55 more)

### Community 1 - "App Api"
Cohesion: 0.07
Nodes (51): GET(), GET(), GET(), GET(), GET(), Auth, requireAuth(), getAuthSession() (+43 more)

### Community 2 - "Errors App"
Cohesion: 0.08
Nodes (30): GUARDRAIL_CATEGORIES, DEFAULT_GUARDRAILS, DefaultGuardrail, guardrailSchema, IGuardrail, guardrailRepository, CreateGuardrailInput, createGuardrailSchema (+22 more)

### Community 3 - "Errors Inngest"
Cohesion: 0.10
Nodes (34): GET(), AiErrorType, AiProviderError, classifyError(), InngestAiCallOptions, StepTools, ApiKeyEntry, getKey() (+26 more)

### Community 4 - "Generate Brand"
Cohesion: 0.12
Nodes (3): metadata, metadata, Skeleton()

### Community 5 - "Layout Brand"
Cohesion: 0.13
Nodes (23): AppShell(), AppShellProps, ROUTE_MAP, Sidebar(), VariantCardWrapper(), QuotaAlert(), fetchWorkspace, initialState (+15 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.15
Nodes (21): PLATFORM_DISPLAY_NAMES, PlatformId, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, PostVariantsCarouselProps, FacebookPreview(), FacebookPreviewProps, LinkedInPreview() (+13 more)

### Community 7 - "Prompts Judge"
Cohesion: 0.10
Nodes (29): SCORE_WEIGHTS, buildJudgePrompt(), JudgePromptData, PLATFORM_CRITERIA, calculateHeuristicScore(), clamp(), HeuristicInput, HeuristicResult (+21 more)

### Community 8 - "Generate Brand"
Cohesion: 0.13
Nodes (15): BannedWordsGroupProps, BrandGuardPanel(), BrandGuardPanelProps, GuardRule, RuleGroupProps, LibraryDetail(), LibraryHeader(), LibraryHeaderProps (+7 more)

### Community 9 - "Insights Checkbox"
Cohesion: 0.08
Nodes (32): TopicSuggestions(), TopicSuggestionsProps, cn(), DatePicker(), HighDemandCard(), HighDemandCardProps, MotivationTip(), TIPS (+24 more)

### Community 10 - "Generate Constants"
Cohesion: 0.14
Nodes (18): AUDIENCE_OPTIONS, INDUSTRY_OPTIONS, LANGUAGE_OPTIONS, PLATFORM_OPTIONS, SORT_OPTIONS, TONE_OPTIONS, TOPIC_OPTIONS, PostCreationFormInner() (+10 more)

### Community 11 - "Library Card"
Cohesion: 0.08
Nodes (28): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats, ActivityHeatmapProps, BestPostHighlight(), BestPostHighlightProps, formatRelativeDate(), LibraryCard() (+20 more)

### Community 12 - "Auth Form"
Cohesion: 0.19
Nodes (14): authClient, LoginForm(), SignupForm(), VerifyEmailContent(), metadata, Card(), CardAction(), CardContent() (+6 more)

### Community 13 - "Library Activity"
Cohesion: 0.11
Nodes (20): MobileSidebarProps, DAYS, PLATFORMS, RadioGroup(), RadioGroupItem(), SelectContent, SelectItem, SelectLabel (+12 more)

### Community 14 - "Error Brand"
Cohesion: 0.11
Nodes (8): EmptyState(), EmptyStateProps, HighTrafficAlert(), NavGroup(), NavGroupProps, PageError(), UpgradeModal(), NavItem

### Community 15 - "Layout Header"
Cohesion: 0.23
Nodes (8): API, formatNumber(), Header(), HeaderProps, MobileSidebar(), ThemeToggle(), UserDropdown(), selectTotalPosts()

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.19
Nodes (16): useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, DatePickerProps, MultiSelect(), MultiSelectProps, TimePicker(), TimePickerProps, Command() (+8 more)

### Community 17 - "Generation Schema"
Cohesion: 0.12
Nodes (20): GENERATION_STATUS, GENERATION_STATUSES, generationSchema, IGeneration, generationRepository, aiGenerationOutputSchema, CreateGenerationInput, createGenerationSchema (+12 more)

### Community 18 - "Trending Runs"
Cohesion: 0.10
Nodes (26): setRefineData(), PLATFORM_ABBREV, RunItem(), SOURCE_META, STATUS_STYLES, toVariant(), TrendingRunGroup(), TrendingRunGroupProps (+18 more)

### Community 19 - "Library App"
Cohesion: 0.24
Nodes (3): TrendingHeader(), TrendingHeaderProps, Button()

### Community 20 - "Constants Options"
Cohesion: 0.21
Nodes (10): CarouselNavigation(), CarouselNavigationProps, PostVariantsCarousel(), STATUS_HEADERS, STATUS_MESSAGES, useCarousel(), useClipboard(), VariantCarousel() (+2 more)

### Community 21 - "Trending Prompts"
Cohesion: 0.17
Nodes (18): callWithTaskFallback(), buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, getLatestGlobalTopics(), countUndismissedRuns(), createRun(), findRunsByWorkspace() (+10 more)

### Community 22 - "Profile Content"
Cohesion: 0.14
Nodes (12): metadata, ProfileContent(), fetchProfile, initialState, profileSlice, ProfileState, selectProfile(), selectProfileStats() (+4 more)

### Community 23 - "Insights Index"
Cohesion: 0.26
Nodes (10): BREADCRUMB_CONFIG, BreadcrumbConfig, PageBreadcrumb(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+2 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.16
Nodes (11): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+3 more)

### Community 25 - "Queue Functions"
Cohesion: 0.23
Nodes (9): handler, insightsRepository, insightsService, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner (+1 more)

### Community 26 - "Preview Slices"
Cohesion: 0.10
Nodes (15): metadata, fetchPreviewPrefs, initialState, previewPrefsSlice, PreviewPrefsState, selectEnabledPlatforms(), selectPreviewPrefs(), updatePreviewPrefs (+7 more)

### Community 27 - "Brand Guard"
Cohesion: 0.12
Nodes (15): ApiGuardrail, BrandGuardContent(), Rule, RuleSectionProps, metadata, ActivityHeatmap(), getDaysAgo(), HeatmapDay (+7 more)

### Community 28 - "Library Repository"
Cohesion: 0.24
Nodes (7): DashboardClient(), GenerationStatus, STATUS_LABELS, PostCreationForm(), requestNotificationPermission(), sendBrowserNotification(), metadata

### Community 29 - "Shared Trending"
Cohesion: 0.40
Nodes (6): IProfile, profileSchema, profileRepository, UpdateProfileInput, updateProfileSchema, profileService

### Community 30 - "Settings Schema"
Cohesion: 0.07
Nodes (35): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, ISettings, notificationSchema, settingsSchema (+27 more)

### Community 31 - "Insights Content"
Cohesion: 0.20
Nodes (19): EMPTY_DATA, InsightsContent(), InsightsData, InsightsHeader(), InsightsOverviewCards(), MetricCard(), InsightsScoreDistribution(), RANGE_COLORS (+11 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.18
Nodes (17): generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, IPreviewConfigDoc, ITrendingPrefsDoc, prefsSchema, previewPrefsSubSchema, trendingPrefsSubSchema (+9 more)

### Community 33 - "Variant Schema"
Cohesion: 0.48
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 34 - "Workspace Schema"
Cohesion: 0.67
Nodes (3): buttonVariants, Calendar(), CalendarDayButton()

### Community 35 - "Trending Global"
Cohesion: 0.16
Nodes (14): GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, saveGlobalTopics(), saveGlobalTopicsFailure(), ConfigSnapshotSchema, ISourceItemDoc, ITrendingRunDoc, SourceItemSchema (+6 more)

### Community 36 - "Trending Empty"
Cohesion: 0.18
Nodes (6): useMediaQuery(), LibraryContent(), metadata, metadata, TrendingEmptyState(), TrendingEmptyStateProps

### Community 37 - "Trending Source"
Cohesion: 0.27
Nodes (10): buildSourceKeywords(), DevToArticle, fetchDevTo(), fetchGitHub(), fetchHackerNews(), fetchReddit(), fetchTrendingSources(), GitHubRepo (+2 more)

### Community 38 - "App Layout"
Cohesion: 0.24
Nodes (7): fontMono, geist, metadata, RootLayout(), ThemeProvider(), ReduxProvider(), store

### Community 39 - "Constants Status"
Cohesion: 0.25
Nodes (7): DRAFT_STATUS, DRAFT_STATUSES, EXPORT_FORMATS, GUARDRAIL_CATEGORY, RUN_STATUS, RUN_STATUSES, THEME_OPTIONS

### Community 41 - "Constants Language"
Cohesion: 0.22
Nodes (8): AI_CONFIG, AI_MAX_TOKENS, AI_TASKS, AI_TEMPERATURE, AITask, LANGUAGE_MAP, LANGUAGE_TO_CODE, TASK_PROVIDER_ORDER

### Community 44 - "Slices Trending"
Cohesion: 0.12
Nodes (17): NAV_ACCOUNT, NAV_CONFIG, NAV_MAIN, SidebarProps, TrendingPrefs, TrendingScheduleCard(), TrendingScheduleCardProps, fetchTrendingPrefs (+9 more)

### Community 46 - "Generation Prompt"
Cohesion: 0.36
Nodes (6): buildPromptPayload(), GenerationData, GuardrailData, buildGenerationPrompt(), GenerationPromptData, PLATFORM_PSYCHOLOGY

### Community 47 - "Quota Lib"
Cohesion: 0.53
Nodes (4): getQuotaFooter(), getQuotaMessage(), PlanQuotaCard(), PlanQuotaCardProps

### Community 51 - "Settings Page"
Cohesion: 0.12
Nodes (16): metadata, SettingsContent(), SettingsData, ConfirmDialog(), ConfirmDialogProps, UpgradeModalProps, AccountSettings, NotificationSettings (+8 more)

## Knowledge Gaps
- **206 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+201 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Insights Checkbox` to `Generate Brand`, `Layout Brand`, `Preview Facebook`, `Generate Brand`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Error Brand`, `Shared Useautocompletetimepicker`, `Trending Runs`, `Library App`, `Insights Index`, `Dropdown Menu`, `Preview Slices`, `Brand Guard`, `Insights Content`, `Variant Schema`, `Workspace Schema`, `Trending Empty`, `App Layout`, `Slices Trending`, `Quota Lib`, `Settings Page`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Groq Gemini` to `App Api`, `Errors Inngest`, `App Layout`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `connectDB()` connect `App Api` to `Groq Gemini`, `Errors App`, `Trending Global`, `Trending Prompts`, `Queue Functions`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `connectDB()` (e.g. with `GET()` and `GET()`) actually correct?**
  _`connectDB()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `handleApiError()` (e.g. with `GET()` and `GET()`) actually correct?**
  _`handleApiError()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _206 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.060083594566353184 - nodes in this community are weakly interconnected._