# Graph Report - PostCraft  (2026-06-12)

## Corpus Check
- 323 files · ~91,618 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1260 nodes · 3809 edges · 67 communities (55 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b97f919f`
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
- [[_COMMUNITY_Community 49|Community 49]]
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
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/twitter/schedule/route.ts → core/config/database.ts
- `PATCH()` --calls--> `connectDB()`  [INFERRED]
  app/api/brand-guard/[id]/route.ts → core/config/database.ts
- `DELETE()` --calls--> `connectDB()`  [INFERRED]
  app/api/brand-guard/[id]/route.ts → core/config/database.ts

## Import Cycles
- None detected.

## Communities (67 total, 12 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.05
Nodes (65): GET(), AiErrorType, AiProviderError, classifyError(), getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel() (+57 more)

### Community 1 - "App Api"
Cohesion: 0.20
Nodes (16): PostVariantsCarouselProps, FacebookPreview(), FacebookPreviewProps, LinkedInPreview(), LinkedInPreviewProps, PLATFORM_PREVIEWS, PostPreviewDialog(), PostPreviewDialogProps (+8 more)

### Community 2 - "Errors App"
Cohesion: 0.26
Nodes (8): runGenerationPipeline(), rankingService, variantRepository, ScoredVariant, scoredVariantSchema, VariantOutput, variantOutputSchema, variantService

### Community 3 - "Errors Inngest"
Cohesion: 0.17
Nodes (14): callWithTaskFallback(), AI_MAX_TOKENS, AI_TEMPERATURE, AITask, LANGUAGE_MAP, LANGUAGE_TO_CODE, buildJudgePrompt(), JudgePromptData (+6 more)

### Community 4 - "Generate Brand"
Cohesion: 0.10
Nodes (3): metadata, metadata, Skeleton()

### Community 5 - "Layout Brand"
Cohesion: 0.10
Nodes (27): DELETE(), PATCH(), DELETE(), PATCH(), GET(), connectDB(), deleteFacebookPost(), updateFacebookPost() (+19 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.30
Nodes (7): FacebookPostItem(), LinkedinPostItem(), EmptyState(), EmptyStateProps, TwitterPostItem(), Badge(), badgeVariants

### Community 7 - "Prompts Judge"
Cohesion: 0.15
Nodes (16): brandPersonaSchema, customHashtagSchema, IBrandPersona, ICustomHashtag, IPersonaOption, IWorkspace, personaOptionSchema, workspaceSchema (+8 more)

### Community 8 - "Generate Brand"
Cohesion: 0.23
Nodes (12): AI_CONFIG, buildSourceKeywords(), DevToArticle, fetchDevTo(), fetchGitHub(), fetchHackerNews(), fetchReddit(), fetchRss() (+4 more)

### Community 9 - "Insights Checkbox"
Cohesion: 0.20
Nodes (11): GUARDRAIL_CATEGORIES, DEFAULT_GUARDRAILS, DefaultGuardrail, guardrailSchema, IGuardrail, guardrailRepository, CreateGuardrailInput, createGuardrailSchema (+3 more)

### Community 10 - "Generate Constants"
Cohesion: 0.11
Nodes (22): AUDIENCE_OPTIONS, INDUSTRY_OPTIONS, LANGUAGE_OPTIONS, PLATFORM_OPTIONS, SORT_OPTIONS, TONE_OPTIONS, TOPIC_OPTIONS, PostCreationFormInner() (+14 more)

### Community 11 - "Library Card"
Cohesion: 0.08
Nodes (29): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats, useMediaQuery(), ActivityHeatmapProps, BestPostHighlightProps, formatRelativeDate(), LibraryCard() (+21 more)

### Community 12 - "Auth Form"
Cohesion: 0.23
Nodes (11): authClient, LoginForm(), SignupForm(), metadata, Card(), CardAction(), CardContent(), CardDescription() (+3 more)

### Community 13 - "Library Activity"
Cohesion: 0.11
Nodes (18): DAYS, PLATFORMS, RadioGroup(), RadioGroupItem(), SelectContent, SelectItem, SelectLabel, SelectScrollDownButton (+10 more)

### Community 14 - "Error Brand"
Cohesion: 0.08
Nodes (16): getQuotaFooter(), getQuotaMessage(), HighDemandCard(), HighDemandCardProps, MotivationTip(), TIPS, NavGroup(), NavGroupProps (+8 more)

### Community 15 - "Layout Header"
Cohesion: 0.22
Nodes (8): generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, IPreviewConfigDoc, ITrendingPrefsDoc, prefsSchema, previewPrefsSubSchema, trendingPrefsSubSchema

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.13
Nodes (23): useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, DatePicker(), DatePickerProps, MultiSelect(), MultiSelectProps, TimePicker(), TimePickerProps (+15 more)

### Community 17 - "Generation Schema"
Cohesion: 0.15
Nodes (18): GENERATION_STATUS, GENERATION_STATUSES, generationSchema, IGeneration, generationRepository, aiGenerationOutputSchema, CreateGenerationInput, createGenerationSchema (+10 more)

### Community 18 - "Trending Runs"
Cohesion: 0.20
Nodes (15): PLATFORM_ABBREV, RunItem(), SOURCE_META, STATUS_STYLES, toVariant(), TrendingRunGroup(), TrendingRunGroupProps, TrendingVariant() (+7 more)

### Community 19 - "Library App"
Cohesion: 0.13
Nodes (12): metadata, DashboardClient(), AppShell(), Sidebar(), metadata, useAppDispatch(), useAppSelector(), metadata (+4 more)

### Community 20 - "Constants Options"
Cohesion: 0.15
Nodes (10): BannedWordsGroupProps, BrandGuardPanelProps, GuardRule, RuleGroupProps, BestPostHighlight(), BG_MAP, COLOR_MAP, ScorePill() (+2 more)

### Community 21 - "Trending Prompts"
Cohesion: 0.14
Nodes (18): insightsRepository, insightsService, buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, getLatestGlobalTopics(), createRun(), dismissAllRuns() (+10 more)

### Community 22 - "Profile Content"
Cohesion: 0.16
Nodes (15): PLATFORM_DISPLAY_NAMES, PlatformId, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, PLATFORM_ICONS, VariantCardProps, fetchPreviewPrefs, initialState (+7 more)

### Community 23 - "Insights Index"
Cohesion: 0.19
Nodes (20): EMPTY_DATA, InsightsContent(), InsightsData, InsightsHeader(), InsightsOverviewCards(), MetricCard(), InsightsScoreDistribution(), RANGE_COLORS (+12 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.13
Nodes (17): HighTrafficAlert(), QuotaAlert(), initialState, selectAiLimitError(), selectQuotaExceeded(), selectQuotaLimit(), selectQuotaUsed(), selectWorkspace() (+9 more)

### Community 25 - "Queue Functions"
Cohesion: 0.27
Nodes (10): handler, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner, scheduleFacebookPost, scheduleLinkedInPost (+2 more)

### Community 26 - "Preview Slices"
Cohesion: 0.12
Nodes (20): DELETE(), GET(), { GET, POST }, POST(), POST(), POST(), POST(), POST() (+12 more)

### Community 27 - "Brand Guard"
Cohesion: 0.29
Nodes (7): SidebarProps, TrendingPrefs, TrendingScheduleCardProps, TrendingPrefsState, TrendingHeader(), TrendingHeaderProps, TrendingSettingsPanelProps

### Community 28 - "Library Repository"
Cohesion: 0.14
Nodes (28): DELETE(), PATCH(), GET(), GET(), GET(), GET(), getUserId(), getWorkspaceId() (+20 more)

### Community 29 - "Shared Trending"
Cohesion: 0.14
Nodes (25): buildAuthConfig(), EmailPayload, sendEmail(), buildEmailButton(), buildEmailDivider(), buildEmailLayout(), EMAIL_COMMON, HTTP_STATUS (+17 more)

### Community 30 - "Settings Schema"
Cohesion: 0.10
Nodes (24): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, IRssFeed, ISettings, notificationSchema (+16 more)

### Community 31 - "Insights Content"
Cohesion: 0.10
Nodes (19): metadata, ProfileContent(), IProfile, profileSchema, profileRepository, UpdateProfileInput, updateProfileSchema, profileService (+11 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.40
Nodes (9): prefsRepository, GENERATION_PREFS_DEFAULTS, GenerationPrefs, generationPrefsSchema, PREVIEW_CONFIG_DEFAULTS, PreviewConfig, previewConfigSchema, TRENDING_PREFS_DEFAULTS (+1 more)

### Community 33 - "Variant Schema"
Cohesion: 0.48
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 34 - "Workspace Schema"
Cohesion: 0.12
Nodes (12): ERROR_CODES, RETRYABLE_ERROR_PATTERNS, AIServiceError, AppError, DatabaseError, ForbiddenError, GuardrailLimitExceededError, NotFoundError (+4 more)

### Community 35 - "Trending Global"
Cohesion: 0.18
Nodes (12): GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, saveGlobalTopics(), saveGlobalTopicsFailure(), ConfigSnapshotSchema, ISourceItemDoc, ITrendingRawItemDoc, ITrendingRunDoc (+4 more)

### Community 36 - "Trending Empty"
Cohesion: 0.11
Nodes (29): ActivityHeatmap(), getDaysAgo(), HeatmapDay, ConnectedAccountsCard(), SettingsContent(), SettingsData, ConfirmDialog(), ConfirmDialogProps (+21 more)

### Community 37 - "Community 37"
Cohesion: 0.10
Nodes (26): API, NAV_ACCOUNT, NAV_CONFIG, NAV_MAIN, AppShellProps, ROUTE_MAP, formatNumber(), Header() (+18 more)

### Community 38 - "App Layout"
Cohesion: 0.24
Nodes (7): fontMono, geist, metadata, RootLayout(), ThemeProvider(), ReduxProvider(), store

### Community 39 - "Constants Status"
Cohesion: 0.25
Nodes (7): DRAFT_STATUS, DRAFT_STATUSES, EXPORT_FORMATS, GUARDRAIL_CATEGORY, RUN_STATUS, RUN_STATUSES, THEME_OPTIONS

### Community 41 - "Community 41"
Cohesion: 0.11
Nodes (21): BrandGuardPanel(), CarouselNavigation(), CarouselNavigationProps, GenerationStatus, STATUS_LABELS, PostCreationForm(), PostVariantsCarousel(), STATUS_HEADERS (+13 more)

### Community 42 - "Community 42"
Cohesion: 0.21
Nodes (13): GET(), requireAuth(), getAuthSession(), GET(), PUT(), prefsService, GET(), PUT() (+5 more)

### Community 43 - "Community 43"
Cohesion: 0.25
Nodes (6): DateGroup, PLATFORM_ABBREV, STATUS_DOT, TrendingSidebar(), TrendingSidebarProps, TrendingPlatform

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (8): DraftStatus, ITrendingConfig, ITrendingRawItem, RunStatus, ScheduleType, TrendingLanguage, TrendingRawItem, VariantPreview

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (8): GenerationWithVariants, LibraryListFilters, LibraryListResult, libraryRepository, SORT_MAP, SortMap, VariantDoc, GuardrailDetail

### Community 46 - "Generation Prompt"
Cohesion: 0.36
Nodes (6): buildPromptPayload(), GenerationData, GuardrailData, buildGenerationPrompt(), GenerationPromptData, PLATFORM_PSYCHOLOGY

### Community 47 - "Community 47"
Cohesion: 0.29
Nodes (6): AUTH_TOKEN, CRON, MILLISECONDS, SCHEDULE_DEFAULTS, SECONDS, SESSION

### Community 48 - "Community 48"
Cohesion: 0.08
Nodes (27): ApiGuardrail, Rule, RuleSectionProps, TopicSuggestions(), TopicSuggestionsProps, cn(), StreakWidget(), StreakWidgetProps (+19 more)

### Community 49 - "Community 49"
Cohesion: 0.48
Nodes (4): TrendingScheduleCard(), TrendingScheduleCardSkeleton(), computeNextRunAt(), formatNextRun()

### Community 50 - "Community 50"
Cohesion: 0.13
Nodes (21): SCORE_WEIGHTS, calculateHeuristicScore(), clamp(), HeuristicInput, HeuristicResult, scoreAICliche(), scoreBannedWords(), scoreCTAClarity() (+13 more)

### Community 51 - "Settings Page"
Cohesion: 0.33
Nodes (4): COLOR_MAP, LibraryStats(), LibraryStatsProps, StatCardProps

### Community 65 - "Community 65"
Cohesion: 0.22
Nodes (7): fontMono, geist, GlobalError(), Button(), buttonVariants, Calendar(), CalendarDayButton()

### Community 67 - "Community 67"
Cohesion: 0.26
Nodes (10): BREADCRUMB_CONFIG, BreadcrumbConfig, PageBreadcrumb(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+2 more)

## Knowledge Gaps
- **224 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+219 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 48` to `App Api`, `Generate Brand`, `Preview Facebook`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Error Brand`, `Shared Useautocompletetimepicker`, `Trending Runs`, `Library App`, `Constants Options`, `Profile Content`, `Insights Index`, `Dropdown Menu`, `Variant Schema`, `Trending Empty`, `App Layout`, `Community 41`, `Community 43`, `Community 49`, `Community 65`, `Community 67`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `connectDB()` connect `Layout Brand` to `Groq Gemini`, `Errors App`, `Trending Global`, `Preview Facebook`, `Community 42`, `Trending Prompts`, `Queue Functions`, `Preview Slices`, `Library Repository`, `Shared Trending`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Groq Gemini` to `Preview Slices`, `Layout Brand`, `Shared Trending`, `App Layout`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `connectDB()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`connectDB()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `handleApiError()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`handleApiError()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _224 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.05493221131369799 - nodes in this community are weakly interconnected._