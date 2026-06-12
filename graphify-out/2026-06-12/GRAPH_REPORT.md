# Graph Report - PostCraft  (2026-06-12)

## Corpus Check
- 323 files · ~90,992 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1258 nodes · 3793 edges · 67 communities (56 shown, 11 thin omitted)
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
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 67|Community 67]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 167 edges
2. `connectDB()` - 94 edges
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
- `DELETE()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/post/[id]/route.ts → core/config/database.ts

## Import Cycles
- None detected.

## Communities (67 total, 11 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.10
Nodes (33): GET(), AiErrorType, AiProviderError, classifyError(), InngestAiCallOptions, StepTools, ApiKeyEntry, getKey() (+25 more)

### Community 1 - "App Api"
Cohesion: 0.19
Nodes (15): PLATFORM_DISPLAY_NAMES, PlatformId, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, PostVariantsCarouselProps, FacebookPreview(), FacebookPreviewProps, LinkedInPreview() (+7 more)

### Community 2 - "Errors App"
Cohesion: 0.31
Nodes (8): IVariant, variantSchema, variantRepository, ScoredVariant, scoredVariantSchema, VariantOutput, variantOutputSchema, variantService

### Community 3 - "Errors Inngest"
Cohesion: 0.15
Nodes (19): authClient, ConfirmDialog(), Avatar(), AvatarFallback(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent() (+11 more)

### Community 4 - "Generate Brand"
Cohesion: 0.10
Nodes (3): metadata, metadata, Skeleton()

### Community 5 - "Layout Brand"
Cohesion: 0.26
Nodes (11): buildSourceKeywords(), DevToArticle, fetchDevTo(), fetchGitHub(), fetchHackerNews(), fetchReddit(), fetchRss(), fetchTrendingSources() (+3 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.18
Nodes (12): STATUS_STYLES, VariantCardWrapper(), LibraryTimeline(), SOURCE_META, ScorePill(), PLATFORM_ICONS, VariantCard(), VariantCardProps (+4 more)

### Community 7 - "Prompts Judge"
Cohesion: 0.27
Nodes (9): AI_MAX_TOKENS, buildJudgePrompt(), JudgePromptData, PLATFORM_CRITERIA, judgeOutputSchema, JudgeResult, safeJsonParse(), scoreWithJudge() (+1 more)

### Community 8 - "Generate Brand"
Cohesion: 0.38
Nodes (9): InsightsData, insightsRepository, InsightsDashboard, insightsService, InsightsOverview, ScoreDistribution, StylePerformance, TopPerformingPost (+1 more)

### Community 10 - "Generate Constants"
Cohesion: 0.20
Nodes (11): PostCreationFormInner(), PostCreationFormProps, Preset, QUICK_PRESETS, QuickPresets(), QuickPresetsProps, TopicSuggestions(), TopicSuggestionsProps (+3 more)

### Community 11 - "Library Card"
Cohesion: 0.07
Nodes (31): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats, useMediaQuery(), ActivityHeatmapProps, BestPostHighlight(), BestPostHighlightProps, formatRelativeDate() (+23 more)

### Community 12 - "Auth Form"
Cohesion: 0.20
Nodes (12): LoginForm(), SignupForm(), VerifyEmailContent(), RANGE_COLORS, metadata, Card(), CardContent(), CardFooter() (+4 more)

### Community 13 - "Library Activity"
Cohesion: 0.10
Nodes (22): NAV_ACCOUNT, NAV_CONFIG, NAV_MAIN, MobileSidebarProps, DAYS, PLATFORMS, RadioGroup(), RadioGroupItem() (+14 more)

### Community 14 - "Error Brand"
Cohesion: 0.07
Nodes (21): getQuotaFooter(), getQuotaMessage(), HighDemandCard(), HighDemandCardProps, MotivationTip(), TIPS, NavGroup(), NavGroupProps (+13 more)

### Community 15 - "Layout Header"
Cohesion: 0.18
Nodes (10): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, IRssFeed, ISettings, notificationSchema (+2 more)

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.13
Nodes (22): useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, DatePickerProps, MultiSelect(), MultiSelectProps, TimePicker(), TimePickerProps, Command() (+14 more)

### Community 17 - "Generation Schema"
Cohesion: 0.14
Nodes (20): GET(), GENERATION_STATUS, GENERATION_STATUSES, generationSchema, IGeneration, generationRepository, aiGenerationOutputSchema, CreateGenerationInput (+12 more)

### Community 18 - "Trending Runs"
Cohesion: 0.19
Nodes (16): PLATFORM_ABBREV, RunItem(), SOURCE_META, STATUS_STYLES, toVariant(), TrendingRunGroup(), TrendingRunGroupProps, TrendingVariant() (+8 more)

### Community 19 - "Library App"
Cohesion: 0.14
Nodes (15): DashboardClient(), VariantCardWrapper(), metadata, HighTrafficAlert(), QuotaAlert(), selectQuotaExceeded(), selectWorkspace(), useAppDispatch() (+7 more)

### Community 20 - "Constants Options"
Cohesion: 0.17
Nodes (11): API, BannedWordsGroupProps, BrandGuardPanel(), BrandGuardPanelProps, GuardRule, RuleGroupProps, GenerationStatus, STATUS_LABELS (+3 more)

### Community 21 - "Trending Prompts"
Cohesion: 0.17
Nodes (18): callWithTaskFallback(), buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, getLatestGlobalTopics(), countUndismissedRuns(), createRun(), findRunsByWorkspace() (+10 more)

### Community 22 - "Profile Content"
Cohesion: 0.15
Nodes (13): metadata, AUDIENCE_OPTIONS, INDUSTRY_OPTIONS, LANGUAGE_OPTIONS, PLATFORM_OPTIONS, SORT_OPTIONS, TONE_OPTIONS, TOPIC_OPTIONS (+5 more)

### Community 23 - "Insights Index"
Cohesion: 0.24
Nodes (9): EMPTY_DATA, InsightsContent(), InsightsHeader(), InsightsOverviewCards(), InsightsScoreDistribution(), InsightsStyleBreakdown(), InsightsTopPosts(), InsightsTrendChart() (+1 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.13
Nodes (16): SidebarProps, TrendingPrefs, TrendingScheduleCardProps, fetchTrendingPrefs, initialState, selectTrendingCount(), selectTrendingPrefs(), selectTrendingPrefsStatus() (+8 more)

### Community 25 - "Queue Functions"
Cohesion: 0.22
Nodes (12): handler, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner, scheduleFacebookPost, scheduleLinkedInPost (+4 more)

### Community 26 - "Preview Slices"
Cohesion: 0.31
Nodes (5): FacebookPostItem(), LinkedinPostItem(), EmptyState(), EmptyStateProps, TwitterPostItem()

### Community 27 - "Brand Guard"
Cohesion: 0.24
Nodes (10): ActivityHeatmap(), getDaysAgo(), HeatmapDay, BG_MAP, COLOR_MAP, ScorePillProps, Tooltip(), TooltipContent() (+2 more)

### Community 28 - "Library Repository"
Cohesion: 0.06
Nodes (69): DELETE(), GET(), DELETE(), PATCH(), DELETE(), PATCH(), POST(), GET() (+61 more)

### Community 29 - "Shared Trending"
Cohesion: 0.05
Nodes (71): getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel(), hasGroq(), getOpenRouterClient(), getOpenRouterModel(), hasOpenRouter() (+63 more)

### Community 30 - "Settings Schema"
Cohesion: 0.24
Nodes (11): settingsRepository, accountSettingsSchema, appearanceSettingsSchema, notificationSettingsSchema, rssFeedSchema, UpdateSettingsInput, updateSettingsSchema, DEFAULT_ACCOUNT (+3 more)

### Community 31 - "Insights Content"
Cohesion: 0.14
Nodes (12): metadata, ProfileContent(), fetchProfile, initialState, profileSlice, ProfileState, selectProfile(), selectProfileStats() (+4 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.11
Nodes (24): generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, IPreviewConfigDoc, ITrendingPrefsDoc, prefsSchema, previewPrefsSubSchema, trendingPrefsSubSchema (+16 more)

### Community 33 - "Variant Schema"
Cohesion: 0.48
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 34 - "Workspace Schema"
Cohesion: 0.06
Nodes (37): GUARDRAIL_CATEGORIES, AIServiceError, AppError, DatabaseError, ForbiddenError, GuardrailLimitExceededError, NotFoundError, QueueError (+29 more)

### Community 35 - "Trending Global"
Cohesion: 0.13
Nodes (17): GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, ConfigSnapshotSchema, ISourceItemDoc, ITrendingRawItemDoc, ITrendingRunDoc, MetadataSchema, SourceItemSchema (+9 more)

### Community 36 - "Trending Empty"
Cohesion: 0.15
Nodes (13): ConnectedAccountsCard(), SettingsContent(), SettingsData, ConfirmDialogProps, UpgradeModalProps, Dialog(), DialogContent(), DialogDescription() (+5 more)

### Community 37 - "Community 37"
Cohesion: 0.13
Nodes (16): AppShellProps, ROUTE_MAP, connectedPlatformsSlice, ConnectedPlatformsState, fetchConnectedPlatforms, initialState, selectConnectedPlatforms(), fetchWorkspace (+8 more)

### Community 38 - "App Layout"
Cohesion: 0.24
Nodes (7): fontMono, geist, metadata, RootLayout(), ThemeProvider(), ReduxProvider(), store

### Community 39 - "Constants Status"
Cohesion: 0.25
Nodes (7): DRAFT_STATUS, DRAFT_STATUSES, EXPORT_FORMATS, GUARDRAIL_CATEGORY, RUN_STATUS, RUN_STATUSES, THEME_OPTIONS

### Community 40 - "Ranking Service"
Cohesion: 0.18
Nodes (7): ApiGuardrail, Rule, RuleSectionProps, StreakWidgetProps, Progress(), Switch(), PLATFORM_ICONS

### Community 41 - "Community 41"
Cohesion: 0.22
Nodes (9): CarouselNavigation(), CarouselNavigationProps, PostVariantsCarousel(), STATUS_HEADERS, STATUS_MESSAGES, useCarousel(), useClipboard(), VariantCarousel() (+1 more)

### Community 42 - "Community 42"
Cohesion: 0.23
Nodes (6): runGenerationPipeline(), rankingService, ScoreComponents, scoreComponentsSchema, WEIGHTS, scoringService

### Community 43 - "Community 43"
Cohesion: 0.33
Nodes (5): POST(), POST(), POST(), logger, inngest

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (7): DatePicker(), DateGroup, PLATFORM_ABBREV, STATUS_DOT, TrendingSidebar(), TrendingSidebarProps, TrendingPlatform

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (8): GenerationWithVariants, LibraryListFilters, LibraryListResult, libraryRepository, SORT_MAP, SortMap, VariantDoc, GuardrailDetail

### Community 46 - "Generation Prompt"
Cohesion: 0.36
Nodes (6): buildPromptPayload(), GenerationData, GuardrailData, buildGenerationPrompt(), GenerationPromptData, PLATFORM_PSYCHOLOGY

### Community 47 - "Community 47"
Cohesion: 0.22
Nodes (8): AccountSettings, AppearanceSettings, NotificationSettings, PostStatus, PrivacySettings, RssFeed, ScoreRange, SortOption

### Community 48 - "Community 48"
Cohesion: 0.10
Nodes (30): MetricCard(), BREADCRUMB_CONFIG, BreadcrumbConfig, cn(), AvatarBadge(), AvatarGroup(), AvatarGroupCount(), Breadcrumb() (+22 more)

### Community 49 - "Page Signup"
Cohesion: 0.29
Nodes (6): SCORE_WEIGHTS, PLATFORM_LENGTH_RANGES, ScoredVariantOutput, scoreLength(), scoreStructure(), ScoringInput

### Community 50 - "Community 50"
Cohesion: 0.35
Nodes (11): calculateHeuristicScore(), clamp(), HeuristicInput, HeuristicResult, scoreAICliche(), scoreBannedWords(), scoreCTAClarity(), scoreFormatting() (+3 more)

### Community 51 - "Settings Page"
Cohesion: 0.40
Nodes (6): IProfile, profileSchema, profileRepository, UpdateProfileInput, updateProfileSchema, profileService

### Community 52 - "Community 52"
Cohesion: 0.25
Nodes (7): DraftStatus, ITrendingConfig, RunStatus, ScheduleType, TrendingLanguage, TrendingRawItem, VariantPreview

### Community 65 - "Community 65"
Cohesion: 0.25
Nodes (4): fontMono, geist, GlobalError(), Button()

### Community 67 - "Community 67"
Cohesion: 0.20
Nodes (10): AppShell(), formatNumber(), Header(), HeaderProps, MobileSidebar(), PageBreadcrumb(), Sidebar(), ThemeToggle() (+2 more)

## Knowledge Gaps
- **224 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+219 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 48` to `Errors Inngest`, `Generate Brand`, `Preview Facebook`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Error Brand`, `Shared Useautocompletetimepicker`, `Trending Runs`, `Library App`, `Constants Options`, `Profile Content`, `Insights Index`, `Preview Slices`, `Brand Guard`, `Variant Schema`, `Trending Empty`, `App Layout`, `Ranking Service`, `Community 44`, `Community 65`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `connectDB()` connect `Library Repository` to `Trending Global`, `Community 42`, `Community 43`, `Generation Schema`, `Trending Prompts`, `Queue Functions`, `Preview Slices`, `Shared Trending`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Shared Trending` to `Groq Gemini`, `Library Repository`, `App Layout`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `connectDB()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`connectDB()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `handleApiError()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`handleApiError()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _224 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.09877551020408164 - nodes in this community are weakly interconnected._