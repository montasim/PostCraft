# Graph Report - PostCraft  (2026-06-03)

## Corpus Check
- 294 files · ~67,391 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1159 nodes · 3341 edges · 63 communities (51 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `091cdb3c`
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
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Slices Trending|Slices Trending]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Generation Prompt|Generation Prompt]]
- [[_COMMUNITY_Quota Lib|Quota Lib]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Page Signup|Page Signup]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Settings Page|Settings Page]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_App Opengraph|App Opengraph]]
- [[_COMMUNITY_Forgot Password|Forgot Password]]
- [[_COMMUNITY_Hooks Use|Hooks Use]]
- [[_COMMUNITY_Ranking Schema|Ranking Schema]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Community 62|Community 62]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 158 edges
2. `connectDB()` - 55 edges
3. `handleApiError()` - 52 edges
4. `getEnv()` - 47 edges
5. `Button()` - 43 edges
6. `getWorkspaceId()` - 35 edges
7. `useAppSelector()` - 32 edges
8. `Card()` - 24 edges
9. `Skeleton()` - 22 edges
10. `API` - 20 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `connectDB()`  [INFERRED]
  app/api/stats/route.ts → core/config/database.ts
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `PostCreationFormInner()` --calls--> `cn()`  [INFERRED]
  components/features/generate/post-creation-form.tsx → lib/utils.ts
- `ActivityHeatmapProps` --references--> `LibraryEntry`  [EXTRACTED]
  components/features/library/activity-heatmap.tsx → types/index.ts
- `TrendingHeaderProps` --references--> `TrendingPrefs`  [EXTRACTED]
  components/features/trending/trending-header.tsx → modules/prefs/prefs.schema.ts

## Import Cycles
- None detected.

## Communities (63 total, 12 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.06
Nodes (63): getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel(), hasGroq(), getOpenRouterClient(), getOpenRouterModel(), hasOpenRouter() (+55 more)

### Community 1 - "App Api"
Cohesion: 0.07
Nodes (53): GET(), GET(), GET(), GET(), GET(), GET(), Auth, requireAuth() (+45 more)

### Community 2 - "Errors App"
Cohesion: 0.08
Nodes (30): GUARDRAIL_CATEGORIES, DEFAULT_GUARDRAILS, DefaultGuardrail, guardrailSchema, IGuardrail, guardrailRepository, CreateGuardrailInput, createGuardrailSchema (+22 more)

### Community 3 - "Errors Inngest"
Cohesion: 0.10
Nodes (34): GET(), AiErrorType, AiProviderError, classifyError(), InngestAiCallOptions, StepTools, ApiKeyEntry, getKey() (+26 more)

### Community 4 - "Generate Brand"
Cohesion: 0.11
Nodes (4): metadata, metadata, metadata, Skeleton()

### Community 5 - "Layout Brand"
Cohesion: 0.17
Nodes (12): initialState, selectAiLimitError(), selectQuotaLimit(), selectQuotaUsed(), selectWorkspace(), selectWorkspaceStatus(), WorkspaceData, workspaceSlice (+4 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.18
Nodes (18): PlatformId, PostVariantsCarouselProps, FacebookPreview(), FacebookPreviewProps, LinkedInPreview(), LinkedInPreviewProps, PLATFORM_PREVIEWS, PostPreviewDialog() (+10 more)

### Community 7 - "Prompts Judge"
Cohesion: 0.10
Nodes (29): SCORE_WEIGHTS, buildJudgePrompt(), JudgePromptData, PLATFORM_CRITERIA, calculateHeuristicScore(), clamp(), HeuristicInput, HeuristicResult (+21 more)

### Community 8 - "Generate Brand"
Cohesion: 0.11
Nodes (18): PLATFORM_DISPLAY_NAMES, BannedWordsGroupProps, BrandGuardPanel(), BrandGuardPanelProps, GuardRule, RuleGroupProps, LibraryDetail(), LibraryHeader() (+10 more)

### Community 9 - "Insights Checkbox"
Cohesion: 0.09
Nodes (25): Preset, QUICK_PRESETS, QuickPresets(), QuickPresetsProps, TopicSuggestions(), TopicSuggestionsProps, MetricCard(), cn() (+17 more)

### Community 10 - "Generate Constants"
Cohesion: 0.18
Nodes (10): INDUSTRY_OPTIONS, NAV_ACCOUNT, NAV_MAIN, SORT_OPTIONS, TOPIC_OPTIONS, NavGroup(), NavGroupProps, NavItem (+2 more)

### Community 11 - "Library Card"
Cohesion: 0.09
Nodes (26): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats, BestPostHighlight(), BestPostHighlightProps, formatRelativeDate(), LibraryCard(), LibraryCardProps (+18 more)

### Community 12 - "Auth Form"
Cohesion: 0.24
Nodes (11): authClient, LoginForm(), SignupForm(), VerifyEmailContent(), RANGE_COLORS, metadata, Card(), CardContent() (+3 more)

### Community 13 - "Library Activity"
Cohesion: 0.19
Nodes (9): NAV_CONFIG, MobileSidebarProps, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay() (+1 more)

### Community 14 - "Error Brand"
Cohesion: 0.12
Nodes (6): EmptyState(), EmptyStateProps, PageError(), UpgradeModal(), TrendingEmptyState(), TrendingEmptyStateProps

### Community 15 - "Layout Header"
Cohesion: 0.18
Nodes (12): AppShell(), AppShellProps, ROUTE_MAP, formatNumber(), Header(), HeaderProps, MobileSidebar(), ThemeToggle() (+4 more)

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.18
Nodes (14): useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, MultiSelectProps, TimePicker(), TimePickerProps, Command(), CommandDialog(), CommandEmpty() (+6 more)

### Community 17 - "Generation Schema"
Cohesion: 0.15
Nodes (18): GENERATION_STATUS, GENERATION_STATUSES, generationSchema, IGeneration, generationRepository, aiGenerationOutputSchema, CreateGenerationInput, createGenerationSchema (+10 more)

### Community 18 - "Trending Runs"
Cohesion: 0.08
Nodes (30): PostCreationFormInner(), PostCreationFormProps, consumeRefineData(), RefineData, setRefineData(), PLATFORM_ABBREV, RunItem(), SOURCE_META (+22 more)

### Community 19 - "Library App"
Cohesion: 0.24
Nodes (3): TrendingHeader(), TrendingHeaderProps, Button()

### Community 20 - "Constants Options"
Cohesion: 0.21
Nodes (10): CarouselNavigation(), CarouselNavigationProps, PostCreationForm(), PostVariantsCarousel(), STATUS_HEADERS, STATUS_MESSAGES, useCarousel(), useClipboard() (+2 more)

### Community 21 - "Trending Prompts"
Cohesion: 0.15
Nodes (19): callWithTaskFallback(), buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, inngest, getLatestGlobalTopics(), countUndismissedRuns(), createRun() (+11 more)

### Community 22 - "Profile Content"
Cohesion: 0.14
Nodes (12): metadata, ProfileContent(), fetchProfile, initialState, profileSlice, ProfileState, selectProfile(), selectProfileStats() (+4 more)

### Community 23 - "Insights Index"
Cohesion: 0.26
Nodes (10): BREADCRUMB_CONFIG, BreadcrumbConfig, PageBreadcrumb(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+2 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.16
Nodes (12): MultiSelect(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator() (+4 more)

### Community 25 - "Queue Functions"
Cohesion: 0.26
Nodes (9): handler, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner, saveGlobalTopics(), saveGlobalTopicsFailure() (+1 more)

### Community 26 - "Preview Slices"
Cohesion: 0.13
Nodes (18): API, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, AUDIENCE_OPTIONS, LANGUAGE_OPTIONS, PLATFORM_OPTIONS, TONE_OPTIONS, fetchPreviewPrefs (+10 more)

### Community 27 - "Brand Guard"
Cohesion: 0.14
Nodes (14): ApiGuardrail, Rule, RuleSectionProps, ActivityHeatmap(), ActivityHeatmapProps, getDaysAgo(), HeatmapDay, BG_MAP (+6 more)

### Community 28 - "Library Repository"
Cohesion: 0.24
Nodes (7): DashboardClient(), GenerationStatus, STATUS_LABELS, requestNotificationPermission(), sendBrowserNotification(), metadata, fetchWorkspace

### Community 29 - "Shared Trending"
Cohesion: 0.40
Nodes (6): IProfile, profileSchema, profileRepository, UpdateProfileInput, updateProfileSchema, profileService

### Community 30 - "Settings Schema"
Cohesion: 0.07
Nodes (35): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, ISettings, notificationSchema, settingsSchema (+27 more)

### Community 31 - "Insights Content"
Cohesion: 0.18
Nodes (19): EMPTY_DATA, InsightsContent(), InsightsData, InsightsHeader(), InsightsOverviewCards(), InsightsScoreDistribution(), InsightsDashboard, InsightsStyleBreakdown() (+11 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.40
Nodes (9): prefsRepository, GENERATION_PREFS_DEFAULTS, GenerationPrefs, generationPrefsSchema, PREVIEW_CONFIG_DEFAULTS, PreviewConfig, previewConfigSchema, TRENDING_PREFS_DEFAULTS (+1 more)

### Community 33 - "Variant Schema"
Cohesion: 0.48
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 34 - "Workspace Schema"
Cohesion: 0.18
Nodes (11): DatePicker(), DatePickerProps, buttonVariants, Calendar(), CalendarDayButton(), Popover(), PopoverContent(), PopoverDescription() (+3 more)

### Community 35 - "Trending Global"
Cohesion: 0.18
Nodes (12): GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, ConfigSnapshotSchema, ISourceItemDoc, ITrendingRunDoc, SourceItemSchema, TrendingRunSchema, dismissAllRuns() (+4 more)

### Community 36 - "Trending Empty"
Cohesion: 0.19
Nodes (14): useMediaQuery(), Sidebar(), VariantCardWrapper(), LibraryContent(), VariantCardWrapper(), HighTrafficAlert(), QuotaAlert(), selectQuotaExceeded() (+6 more)

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

### Community 42 - "Community 42"
Cohesion: 0.18
Nodes (14): SidebarProps, TrendingPrefs, SelectOption, DAYS, PLATFORMS, TrendingSettingsPanel(), TrendingSettingsPanelProps, SelectContent (+6 more)

### Community 43 - "Community 43"
Cohesion: 0.27
Nodes (9): ConfirmDialogProps, UpgradeModalProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+1 more)

### Community 44 - "Slices Trending"
Cohesion: 0.48
Nodes (4): TrendingScheduleCard(), TrendingScheduleCardProps, computeNextRunAt(), formatNextRun()

### Community 45 - "Community 45"
Cohesion: 0.21
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 46 - "Generation Prompt"
Cohesion: 0.36
Nodes (6): buildPromptPayload(), GenerationData, GuardrailData, buildGenerationPrompt(), GenerationPromptData, PLATFORM_PSYCHOLOGY

### Community 47 - "Quota Lib"
Cohesion: 0.53
Nodes (4): getQuotaFooter(), getQuotaMessage(), PlanQuotaCard(), PlanQuotaCardProps

### Community 48 - "Community 48"
Cohesion: 0.22
Nodes (8): generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, IPreviewConfigDoc, ITrendingPrefsDoc, prefsSchema, previewPrefsSubSchema, trendingPrefsSubSchema

### Community 49 - "Page Signup"
Cohesion: 0.29
Nodes (4): fetchTrendingPrefs, initialState, trendingPrefsSlice, TrendingPrefsState

### Community 51 - "Settings Page"
Cohesion: 0.14
Nodes (7): metadata, SettingsContent(), SettingsData, ConfirmDialog(), AccountSettings, NotificationSettings, DialogTrigger()

## Knowledge Gaps
- **206 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+201 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Insights Checkbox` to `Generate Brand`, `Preview Facebook`, `Generate Brand`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Error Brand`, `Shared Useautocompletetimepicker`, `Trending Runs`, `Library App`, `Insights Index`, `Dropdown Menu`, `Preview Slices`, `Brand Guard`, `Insights Content`, `Variant Schema`, `Workspace Schema`, `Trending Empty`, `App Layout`, `Community 42`, `Community 43`, `Slices Trending`, `Community 45`, `Quota Lib`?**
  _High betweenness centrality (0.184) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Groq Gemini` to `App Api`, `Errors Inngest`, `App Layout`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Generate Brand` to `Trending Empty`, `Generate Brand`, `Insights Checkbox`, `Settings Page`, `Constants Options`, `Profile Content`, `Preview Slices`, `Brand Guard`, `Insights Content`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `connectDB()` (e.g. with `GET()` and `GET()`) actually correct?**
  _`connectDB()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `handleApiError()` (e.g. with `GET()` and `GET()`) actually correct?**
  _`handleApiError()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _206 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.060083594566353184 - nodes in this community are weakly interconnected._