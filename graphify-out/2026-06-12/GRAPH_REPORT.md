# Graph Report - PostCraft  (2026-06-12)

## Corpus Check
- 323 files · ~91,208 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1259 nodes · 3796 edges · 65 communities (54 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `706df4fd`
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
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Generation Prompt|Generation Prompt]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Settings Page|Settings Page]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_App Opengraph|App Opengraph]]
- [[_COMMUNITY_Forgot Password|Forgot Password]]
- [[_COMMUNITY_Hooks Use|Hooks Use]]
- [[_COMMUNITY_Ranking Schema|Ranking Schema]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Inngest Route|Inngest Route]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 67|Community 67]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 167 edges
2. `connectDB()` - 95 edges
3. `handleApiError()` - 57 edges
4. `Button()` - 50 edges
5. `getEnv()` - 47 edges
6. `getWorkspaceId()` - 40 edges
7. `useAppSelector()` - 34 edges
8. `Skeleton()` - 31 edges
9. `Badge()` - 25 edges
10. `Card()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/schedule/route.ts → core/config/database.ts
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/linkedin/schedule/route.ts → core/config/database.ts
- `GET()` --calls--> `connectDB()`  [INFERRED]
  app/api/stats/route.ts → core/config/database.ts
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/twitter/schedule/route.ts → core/config/database.ts
- `PATCH()` --calls--> `connectDB()`  [INFERRED]
  app/api/brand-guard/[id]/route.ts → core/config/database.ts

## Import Cycles
- None detected.

## Communities (65 total, 11 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.10
Nodes (33): GET(), AiErrorType, AiProviderError, classifyError(), InngestAiCallOptions, StepTools, ApiKeyEntry, getKey() (+25 more)

### Community 1 - "App Api"
Cohesion: 0.15
Nodes (20): PLATFORM_DISPLAY_NAMES, PlatformId, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, PostVariantsCarouselProps, FacebookPreview(), FacebookPreviewProps, LinkedInPreview() (+12 more)

### Community 2 - "Errors App"
Cohesion: 0.20
Nodes (10): runGenerationPipeline(), rankingService, IVariant, variantSchema, variantRepository, ScoredVariant, scoredVariantSchema, VariantOutput (+2 more)

### Community 3 - "Errors Inngest"
Cohesion: 0.27
Nodes (8): InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea(), Input()

### Community 4 - "Generate Brand"
Cohesion: 0.10
Nodes (3): metadata, metadata, Skeleton()

### Community 5 - "Layout Brand"
Cohesion: 0.12
Nodes (24): DELETE(), PATCH(), DELETE(), PATCH(), connectDB(), deleteFacebookPost(), updateFacebookPost(), deleteLinkedinPost() (+16 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.16
Nodes (14): setRefineData(), STATUS_STYLES, VariantCardWrapper(), LibraryTimeline(), SOURCE_META, ScorePill(), PLATFORM_ICONS, VariantCard() (+6 more)

### Community 7 - "Prompts Judge"
Cohesion: 0.15
Nodes (16): brandPersonaSchema, customHashtagSchema, IBrandPersona, ICustomHashtag, IPersonaOption, IWorkspace, personaOptionSchema, workspaceSchema (+8 more)

### Community 8 - "Generate Brand"
Cohesion: 0.38
Nodes (9): InsightsData, insightsRepository, InsightsDashboard, insightsService, InsightsOverview, ScoreDistribution, StylePerformance, TopPerformingPost (+1 more)

### Community 9 - "Insights Checkbox"
Cohesion: 0.22
Nodes (11): GUARDRAIL_CATEGORIES, DEFAULT_GUARDRAILS, DefaultGuardrail, guardrailSchema, IGuardrail, guardrailRepository, CreateGuardrailInput, createGuardrailSchema (+3 more)

### Community 10 - "Generate Constants"
Cohesion: 0.16
Nodes (14): PostCreationForm(), PostCreationFormInner(), PostCreationFormProps, Preset, QUICK_PRESETS, QuickPresets(), QuickPresetsProps, TopicSuggestions() (+6 more)

### Community 11 - "Library Card"
Cohesion: 0.07
Nodes (31): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats, useMediaQuery(), ActivityHeatmapProps, BestPostHighlight(), BestPostHighlightProps, formatRelativeDate() (+23 more)

### Community 12 - "Auth Form"
Cohesion: 0.18
Nodes (13): authClient, LoginForm(), SignupForm(), VerifyEmailContent(), RANGE_COLORS, metadata, Card(), CardContent() (+5 more)

### Community 13 - "Library Activity"
Cohesion: 0.08
Nodes (29): INDUSTRY_OPTIONS, NAV_ACCOUNT, NAV_CONFIG, NAV_MAIN, SORT_OPTIONS, TOPIC_OPTIONS, MobileSidebarProps, SelectOption (+21 more)

### Community 14 - "Error Brand"
Cohesion: 0.08
Nodes (17): getQuotaFooter(), getQuotaMessage(), HighDemandCard(), HighDemandCardProps, MotivationTip(), TIPS, NavGroup(), NavGroupProps (+9 more)

### Community 15 - "Layout Header"
Cohesion: 0.18
Nodes (10): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, IRssFeed, ISettings, notificationSchema (+2 more)

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.13
Nodes (23): useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, DatePickerProps, MultiSelect(), MultiSelectProps, TimePicker(), TimePickerProps, Command() (+15 more)

### Community 17 - "Generation Schema"
Cohesion: 0.15
Nodes (17): GET(), generationSchema, IGeneration, aiGenerationOutputSchema, CreateGenerationInput, createGenerationSchema, GenerationStatus, generationStatusSchema (+9 more)

### Community 18 - "Trending Runs"
Cohesion: 0.17
Nodes (17): PLATFORM_ABBREV, RunItem(), SOURCE_META, STATUS_STYLES, toVariant(), TrendingRunGroup(), TrendingRunGroupProps, TrendingVariant() (+9 more)

### Community 19 - "Library App"
Cohesion: 0.20
Nodes (12): Sidebar(), VariantCardWrapper(), QuotaAlert(), selectQuotaExceeded(), useAppDispatch(), useAppSelector(), metadata, TrendingEmptyState() (+4 more)

### Community 20 - "Constants Options"
Cohesion: 0.25
Nodes (5): BannedWordsGroupProps, BrandGuardPanel(), BrandGuardPanelProps, GuardRule, RuleGroupProps

### Community 21 - "Trending Prompts"
Cohesion: 0.20
Nodes (14): callWithTaskFallback(), buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, getLatestGlobalTopics(), dismissAllRuns(), dismissRun(), generatePostsFromTrends() (+6 more)

### Community 22 - "Profile Content"
Cohesion: 0.13
Nodes (16): API, AUDIENCE_OPTIONS, LANGUAGE_OPTIONS, PLATFORM_OPTIONS, TONE_OPTIONS, fetchPreviewPrefs, initialState, previewPrefsSlice (+8 more)

### Community 23 - "Insights Index"
Cohesion: 0.22
Nodes (10): EMPTY_DATA, InsightsContent(), InsightsHeader(), InsightsOverviewCards(), MetricCard(), InsightsScoreDistribution(), InsightsStyleBreakdown(), InsightsTopPosts() (+2 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.16
Nodes (13): selectTrendingPrefsStatus(), initialState, selectAiLimitError(), selectQuotaLimit(), selectQuotaUsed(), selectWorkspace(), selectWorkspaceStatus(), WorkspaceData (+5 more)

### Community 25 - "Queue Functions"
Cohesion: 0.16
Nodes (15): POST(), POST(), POST(), handler, logger, inngest, fetchGlobalTrendingTopics, generatePosts (+7 more)

### Community 26 - "Preview Slices"
Cohesion: 0.10
Nodes (22): DELETE(), GET(), { GET, POST }, POST(), POST(), POST(), Auth, getAuthDb() (+14 more)

### Community 27 - "Brand Guard"
Cohesion: 0.50
Nodes (3): ActivityHeatmap(), getDaysAgo(), HeatmapDay

### Community 28 - "Library Repository"
Cohesion: 0.13
Nodes (29): DELETE(), PATCH(), GET(), GET(), GET(), GET(), getAuthSession(), getUserId() (+21 more)

### Community 29 - "Shared Trending"
Cohesion: 0.05
Nodes (69): getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel(), hasGroq(), getOpenRouterClient(), getOpenRouterModel(), hasOpenRouter() (+61 more)

### Community 30 - "Settings Schema"
Cohesion: 0.15
Nodes (17): settingsRepository, accountSettingsSchema, appearanceSettingsSchema, notificationSettingsSchema, rssFeedSchema, UpdateSettingsInput, updateSettingsSchema, DEFAULT_ACCOUNT (+9 more)

### Community 31 - "Insights Content"
Cohesion: 0.15
Nodes (11): metadata, ProfileContent(), fetchProfile, initialState, profileSlice, ProfileState, selectProfile(), selectProfileStats() (+3 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.07
Nodes (39): MILLISECONDS, SidebarProps, generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, IPreviewConfigDoc, ITrendingPrefsDoc, prefsSchema (+31 more)

### Community 33 - "Variant Schema"
Cohesion: 0.48
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 34 - "Workspace Schema"
Cohesion: 0.14
Nodes (10): AIServiceError, AppError, DatabaseError, ForbiddenError, GuardrailLimitExceededError, NotFoundError, QueueError, QuotaExceededError (+2 more)

### Community 35 - "Trending Global"
Cohesion: 0.18
Nodes (12): GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, saveGlobalTopics(), saveGlobalTopicsFailure(), ConfigSnapshotSchema, ISourceItemDoc, ITrendingRawItemDoc, ITrendingRunDoc (+4 more)

### Community 36 - "Trending Empty"
Cohesion: 0.13
Nodes (24): ConnectedAccountsCard(), SettingsContent(), SettingsData, ConfirmDialog(), ConfirmDialogProps, BG_MAP, COLOR_MAP, ScorePillProps (+16 more)

### Community 37 - "Community 37"
Cohesion: 0.13
Nodes (14): AppShellProps, ROUTE_MAP, HighTrafficAlert(), connectedPlatformsSlice, ConnectedPlatformsState, fetchConnectedPlatforms, initialState, selectConnectedPlatforms() (+6 more)

### Community 38 - "App Layout"
Cohesion: 0.24
Nodes (7): fontMono, geist, metadata, RootLayout(), ThemeProvider(), ReduxProvider(), store

### Community 39 - "Constants Status"
Cohesion: 0.20
Nodes (9): DRAFT_STATUS, DRAFT_STATUSES, EXPORT_FORMATS, GENERATION_STATUS, GENERATION_STATUSES, GUARDRAIL_CATEGORY, RUN_STATUS, RUN_STATUSES (+1 more)

### Community 40 - "Ranking Service"
Cohesion: 0.20
Nodes (5): ApiGuardrail, BrandGuardContent(), Rule, RuleSectionProps, metadata

### Community 41 - "Community 41"
Cohesion: 0.24
Nodes (8): CarouselNavigation(), CarouselNavigationProps, PostVariantsCarousel(), STATUS_HEADERS, STATUS_MESSAGES, useCarousel(), useClipboard(), VariantCarouselProps

### Community 42 - "Community 42"
Cohesion: 0.22
Nodes (12): GET(), requireAuth(), GET(), PUT(), prefsService, GET(), PUT(), GET() (+4 more)

### Community 43 - "Community 43"
Cohesion: 0.21
Nodes (8): DashboardClient(), GenerationStatus, STATUS_LABELS, requestNotificationPermission(), sendBrowserNotification(), metadata, selectUserName(), fetchWorkspace

### Community 44 - "Community 44"
Cohesion: 0.14
Nodes (12): DatePicker(), PLATFORM_ABBREV, STATUS_DOT, TrendingSidebar(), DraftStatus, ITrendingConfig, ITrendingRawItem, RunStatus (+4 more)

### Community 45 - "Community 45"
Cohesion: 0.20
Nodes (9): generationRepository, GenerationWithVariants, LibraryListFilters, LibraryListResult, libraryRepository, SORT_MAP, SortMap, VariantDoc (+1 more)

### Community 46 - "Generation Prompt"
Cohesion: 0.36
Nodes (6): buildPromptPayload(), GenerationData, GuardrailData, buildGenerationPrompt(), GenerationPromptData, PLATFORM_PSYCHOLOGY

### Community 48 - "Community 48"
Cohesion: 0.09
Nodes (29): BREADCRUMB_CONFIG, BreadcrumbConfig, cn(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+21 more)

### Community 50 - "Community 50"
Cohesion: 0.09
Nodes (30): AI_MAX_TOKENS, SCORE_WEIGHTS, buildJudgePrompt(), JudgePromptData, PLATFORM_CRITERIA, calculateHeuristicScore(), clamp(), HeuristicInput (+22 more)

### Community 51 - "Settings Page"
Cohesion: 0.40
Nodes (6): IProfile, profileSchema, profileRepository, UpdateProfileInput, updateProfileSchema, profileService

### Community 65 - "Community 65"
Cohesion: 0.25
Nodes (4): fontMono, geist, GlobalError(), Button()

### Community 67 - "Community 67"
Cohesion: 0.22
Nodes (9): AppShell(), formatNumber(), Header(), HeaderProps, MobileSidebar(), PageBreadcrumb(), ThemeToggle(), UserDropdown() (+1 more)

## Knowledge Gaps
- **224 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+219 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 48` to `App Api`, `Errors Inngest`, `Generate Brand`, `Preview Facebook`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Error Brand`, `Shared Useautocompletetimepicker`, `Trending Runs`, `Library App`, `Constants Options`, `Profile Content`, `Insights Index`, `Preview Slices`, `Prefs Schema`, `Variant Schema`, `Trending Empty`, `App Layout`, `Ranking Service`, `Community 44`, `Community 65`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `connectDB()` connect `Layout Brand` to `Errors App`, `Trending Global`, `Community 42`, `Generation Schema`, `Trending Prompts`, `Queue Functions`, `Preview Slices`, `Library Repository`, `Shared Trending`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Shared Trending` to `Groq Gemini`, `Layout Brand`, `App Layout`, `Queue Functions`, `Preview Slices`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `connectDB()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`connectDB()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `handleApiError()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`handleApiError()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _224 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.09877551020408164 - nodes in this community are weakly interconnected._