# Graph Report - PostCraft  (2026-06-10)

## Corpus Check
- 319 files · ~86,814 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1234 nodes · 3711 edges · 68 communities (58 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ef869890`
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
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 163 edges
2. `connectDB()` - 91 edges
3. `handleApiError()` - 55 edges
4. `Button()` - 49 edges
5. `getEnv()` - 47 edges
6. `getWorkspaceId()` - 38 edges
7. `useAppSelector()` - 34 edges
8. `Skeleton()` - 29 edges
9. `Badge()` - 24 edges
10. `Card()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `DELETE()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/post/[id]/route.ts → core/config/database.ts
- `PATCH()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/post/[id]/route.ts → core/config/database.ts
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/schedule/route.ts → core/config/database.ts
- `DELETE()` --calls--> `connectDB()`  [INFERRED]
  app/api/linkedin/post/[id]/route.ts → core/config/database.ts
- `PATCH()` --calls--> `connectDB()`  [INFERRED]
  app/api/linkedin/post/[id]/route.ts → core/config/database.ts

## Import Cycles
- None detected.

## Communities (68 total, 10 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.06
Nodes (63): GET(), AiErrorType, AiProviderError, classifyError(), getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel() (+55 more)

### Community 1 - "App Api"
Cohesion: 0.20
Nodes (20): GET(), GET(), GET(), GET(), requireAuth(), connectDB(), handleApiError(), GET() (+12 more)

### Community 2 - "Errors App"
Cohesion: 0.19
Nodes (11): generationRepository, runGenerationPipeline(), rankingService, IVariant, variantSchema, variantRepository, ScoredVariant, scoredVariantSchema (+3 more)

### Community 3 - "Errors Inngest"
Cohesion: 0.13
Nodes (17): DELETE(), PATCH(), GET(), getWorkspaceId(), GET(), POST(), PATCH(), PATCH() (+9 more)

### Community 4 - "Generate Brand"
Cohesion: 0.09
Nodes (4): metadata, metadata, metadata, Skeleton()

### Community 5 - "Layout Brand"
Cohesion: 0.10
Nodes (22): AppShell(), AppShellProps, ROUTE_MAP, formatNumber(), Header(), HeaderProps, MobileSidebar(), Sidebar() (+14 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.18
Nodes (17): PLATFORM_DISPLAY_NAMES, PlatformId, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, FacebookPreview(), FacebookPreviewProps, LinkedInPreview(), LinkedInPreviewProps (+9 more)

### Community 7 - "Prompts Judge"
Cohesion: 0.24
Nodes (7): SCORE_WEIGHTS, RawVariant, PLATFORM_LENGTH_RANGES, ScoredVariantOutput, scoreLength(), scoreStructure(), ScoringInput

### Community 8 - "Generate Brand"
Cohesion: 0.18
Nodes (18): EMPTY_DATA, InsightsContent(), InsightsData, InsightsOverviewCards(), MetricCard(), InsightsScoreDistribution(), InsightsDashboard, InsightsStyleBreakdown() (+10 more)

### Community 9 - "Insights Checkbox"
Cohesion: 0.15
Nodes (8): ApiGuardrail, BrandGuardContent(), Rule, RuleSectionProps, metadata, StreakWidgetProps, Progress(), Switch()

### Community 10 - "Generate Constants"
Cohesion: 0.09
Nodes (28): AUDIENCE_OPTIONS, INDUSTRY_OPTIONS, LANGUAGE_OPTIONS, NAV_ACCOUNT, NAV_CONFIG, NAV_MAIN, PLATFORM_OPTIONS, SORT_OPTIONS (+20 more)

### Community 11 - "Library Card"
Cohesion: 0.07
Nodes (30): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats, useMediaQuery(), ActivityHeatmapProps, BestPostHighlight(), BestPostHighlightProps, formatRelativeDate() (+22 more)

### Community 12 - "Auth Form"
Cohesion: 0.13
Nodes (18): authClient, LoginForm(), SignupForm(), VerifyEmailContent(), BannedWordsGroupProps, BrandGuardPanelProps, GuardRule, RuleGroupProps (+10 more)

### Community 13 - "Library Activity"
Cohesion: 0.11
Nodes (20): MobileSidebarProps, DAYS, PLATFORMS, TrendingSettingsPanelProps, RadioGroup(), RadioGroupItem(), SelectContent, SelectItem (+12 more)

### Community 15 - "Layout Header"
Cohesion: 0.17
Nodes (14): GET(), getAuthSession(), getUserId(), HTTP_STATUS, ERROR_MESSAGES, OTP, generationService, POST() (+6 more)

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.16
Nodes (17): useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, DatePickerProps, MultiSelectProps, TimePicker(), TimePickerProps, Command(), CommandEmpty() (+9 more)

### Community 17 - "Generation Schema"
Cohesion: 0.17
Nodes (14): generationSchema, IGeneration, aiGenerationOutputSchema, CreateGenerationInput, createGenerationSchema, GenerationStatus, generationStatusSchema, rawVariantSchema (+6 more)

### Community 18 - "Trending Runs"
Cohesion: 0.10
Nodes (26): DatePicker(), PLATFORM_ABBREV, RunItem(), SOURCE_META, STATUS_STYLES, toVariant(), TrendingRunGroup(), TrendingRunGroupProps (+18 more)

### Community 19 - "Library App"
Cohesion: 0.20
Nodes (10): HighTrafficAlert(), QuotaAlert(), selectQuotaExceeded(), useAppSelector(), AppDispatch, RootState, metadata, TrendingEmptyState() (+2 more)

### Community 20 - "Constants Options"
Cohesion: 0.21
Nodes (10): CarouselNavigation(), CarouselNavigationProps, PostVariantsCarousel(), PostVariantsCarouselProps, STATUS_HEADERS, STATUS_MESSAGES, useCarousel(), useClipboard() (+2 more)

### Community 21 - "Trending Prompts"
Cohesion: 0.18
Nodes (16): callWithTaskFallback(), LANGUAGE_TO_CODE, buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, getLatestGlobalTopics(), createRun(), dismissAllRuns() (+8 more)

### Community 22 - "Profile Content"
Cohesion: 0.11
Nodes (18): DashboardClient(), GenerationStatus, STATUS_LABELS, PostCreationForm(), requestNotificationPermission(), sendBrowserNotification(), metadata, fetchWorkspace (+10 more)

### Community 23 - "Insights Index"
Cohesion: 0.09
Nodes (27): cn(), AvatarBadge(), AvatarGroup(), AvatarGroupCount(), CardAction(), CardDescription(), Checkbox(), DropdownMenuCheckboxItem() (+19 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.13
Nodes (16): SidebarProps, HighDemandCard(), HighDemandCardProps, MotivationTip(), TIPS, NavGroup(), NavGroupProps, SectionHeader() (+8 more)

### Community 25 - "Queue Functions"
Cohesion: 0.27
Nodes (10): handler, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner, scheduleFacebookPost, scheduleLinkedInPost (+2 more)

### Community 26 - "Preview Slices"
Cohesion: 0.25
Nodes (8): FacebookPostItem(), LibraryHeaderProps, LinkedinPostItem(), EmptyState(), EmptyStateProps, TwitterPostItem(), Badge(), badgeVariants

### Community 27 - "Brand Guard"
Cohesion: 0.19
Nodes (18): ActivityHeatmap(), getDaysAgo(), HeatmapDay, BG_MAP, COLOR_MAP, ScorePillProps, Avatar(), AvatarFallback() (+10 more)

### Community 28 - "Library Repository"
Cohesion: 0.09
Nodes (25): DELETE(), GET(), DELETE(), PATCH(), POST(), POST(), POST(), POST() (+17 more)

### Community 29 - "Shared Trending"
Cohesion: 0.16
Nodes (18): { GET, POST }, buildAuthConfig(), EmailPayload, sendEmail(), buildEmailButton(), buildEmailDivider(), buildEmailLayout(), EMAIL_COMMON (+10 more)

### Community 30 - "Settings Schema"
Cohesion: 0.11
Nodes (21): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, ISettings, notificationSchema, settingsSchema (+13 more)

### Community 31 - "Insights Content"
Cohesion: 0.14
Nodes (13): API, metadata, ProfileContent(), fetchProfile, initialState, profileSlice, ProfileState, selectProfile() (+5 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.10
Nodes (27): generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, IPreviewConfigDoc, ITrendingPrefsDoc, prefsSchema, previewPrefsSubSchema, trendingPrefsSubSchema (+19 more)

### Community 33 - "Variant Schema"
Cohesion: 0.39
Nodes (6): InsightsHeader(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 34 - "Workspace Schema"
Cohesion: 0.12
Nodes (12): ERROR_CODES, RETRYABLE_ERROR_PATTERNS, AIServiceError, AppError, DatabaseError, ForbiddenError, GuardrailLimitExceededError, NotFoundError (+4 more)

### Community 35 - "Trending Global"
Cohesion: 0.22
Nodes (10): RUN_STATUSES, GlobalTrendingTopicSchema, IGlobalTrendingTopicDoc, saveGlobalTopics(), saveGlobalTopicsFailure(), ConfigSnapshotSchema, ISourceItemDoc, ITrendingRunDoc (+2 more)

### Community 36 - "Trending Empty"
Cohesion: 0.22
Nodes (11): GUARDRAIL_CATEGORIES, DEFAULT_GUARDRAILS, DefaultGuardrail, guardrailSchema, IGuardrail, guardrailRepository, CreateGuardrailInput, createGuardrailSchema (+3 more)

### Community 37 - "Trending Source"
Cohesion: 0.24
Nodes (11): AI_CONFIG, buildSourceKeywords(), DevToArticle, fetchDevTo(), fetchGitHub(), fetchHackerNews(), fetchReddit(), fetchTrendingSources() (+3 more)

### Community 38 - "App Layout"
Cohesion: 0.24
Nodes (7): fontMono, geist, metadata, RootLayout(), ThemeProvider(), ReduxProvider(), store

### Community 39 - "Constants Status"
Cohesion: 0.22
Nodes (8): DRAFT_STATUS, DRAFT_STATUSES, EXPORT_FORMATS, GENERATION_STATUS, GENERATION_STATUSES, GUARDRAIL_CATEGORY, RUN_STATUS, THEME_OPTIONS

### Community 40 - "Ranking Service"
Cohesion: 0.21
Nodes (7): fontMono, geist, GlobalError(), Button(), buttonVariants, Calendar(), CalendarDayButton()

### Community 41 - "Constants Language"
Cohesion: 0.31
Nodes (8): buildJudgePrompt(), JudgePromptData, PLATFORM_CRITERIA, judgeOutputSchema, JudgeResult, safeJsonParse(), scoreWithJudge(), stripMarkdownFences()

### Community 42 - "Community 42"
Cohesion: 0.17
Nodes (10): BrandGuardPanel(), PostCreationFormInner(), consumeRefineData(), setRefineData(), STATUS_STYLES, VariantCardWrapper(), VariantCardWrapper(), ScorePill() (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.11
Nodes (19): metadata, ConnectedAccountsCard(), SettingsContent(), SettingsData, ConfirmDialog(), ConfirmDialogProps, UpgradeModalProps, CommandDialog() (+11 more)

### Community 44 - "Slices Trending"
Cohesion: 0.48
Nodes (4): TrendingScheduleCard(), TrendingScheduleCardProps, computeNextRunAt(), formatNextRun()

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (8): GenerationWithVariants, LibraryListFilters, LibraryListResult, libraryRepository, SORT_MAP, SortMap, VariantDoc, GuardrailDetail

### Community 46 - "Generation Prompt"
Cohesion: 0.36
Nodes (6): buildPromptPayload(), GenerationData, GuardrailData, buildGenerationPrompt(), GenerationPromptData, PLATFORM_PSYCHOLOGY

### Community 47 - "Quota Lib"
Cohesion: 0.43
Nodes (5): getQuotaFooter(), getQuotaMessage(), PlanQuotaCard(), PlanQuotaCardProps, PlanQuotaCardSkeleton()

### Community 48 - "Community 48"
Cohesion: 0.26
Nodes (10): BREADCRUMB_CONFIG, BreadcrumbConfig, PageBreadcrumb(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+2 more)

### Community 49 - "Page Signup"
Cohesion: 0.33
Nodes (8): workspaceRepository, brandPersonaSchema, customHashtagSchema, personaOptionSchema, UpdateWorkspaceInput, updateWorkspaceSchema, DEFAULT_PERSONA, workspaceService

### Community 50 - "Community 50"
Cohesion: 0.35
Nodes (11): calculateHeuristicScore(), clamp(), HeuristicInput, HeuristicResult, scoreAICliche(), scoreBannedWords(), scoreCTAClarity(), scoreFormatting() (+3 more)

### Community 51 - "Settings Page"
Cohesion: 0.40
Nodes (6): IProfile, profileSchema, profileRepository, UpdateProfileInput, updateProfileSchema, profileService

### Community 52 - "Community 52"
Cohesion: 0.22
Nodes (6): DELETE(), PATCH(), deleteLinkedinPost(), updateLinkedinPost(), ILinkedinPost, LinkedinPostSchema

### Community 62 - "Community 62"
Cohesion: 0.22
Nodes (8): brandPersonaSchema, customHashtagSchema, IBrandPersona, ICustomHashtag, IPersonaOption, IWorkspace, personaOptionSchema, workspaceSchema

### Community 63 - "Community 63"
Cohesion: 0.29
Nodes (6): AUTH_TOKEN, CRON, MILLISECONDS, SCHEDULE_DEFAULTS, SECONDS, SESSION

### Community 64 - "Community 64"
Cohesion: 0.25
Nodes (8): countUndismissedRuns(), dismissAllRuns(), dismissRun(), findRunsByWorkspace(), updateRunGenerationIds(), updateRunSourceItems(), updateRunStatus(), getTrendingDashboard()

### Community 65 - "Community 65"
Cohesion: 0.29
Nodes (6): AI_MAX_TOKENS, AI_TASKS, AI_TEMPERATURE, AITask, LANGUAGE_MAP, TASK_PROVIDER_ORDER

### Community 66 - "Community 66"
Cohesion: 0.40
Nodes (4): ScoreComponents, scoreComponentsSchema, WEIGHTS, scoringService

## Knowledge Gaps
- **217 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+212 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Insights Index` to `Generate Brand`, `Preview Facebook`, `Generate Brand`, `Insights Checkbox`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Shared Useautocompletetimepicker`, `Trending Runs`, `Library App`, `Dropdown Menu`, `Preview Slices`, `Brand Guard`, `Variant Schema`, `App Layout`, `Ranking Service`, `Community 42`, `Community 43`, `Slices Trending`, `Quota Lib`, `Community 48`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `connectDB()` connect `App Api` to `Groq Gemini`, `Community 64`, `Errors App`, `Errors Inngest`, `Trending Global`, `Layout Header`, `Community 52`, `Trending Prompts`, `Queue Functions`, `Preview Slices`, `Library Repository`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Groq Gemini` to `App Api`, `App Layout`, `Layout Header`, `Library Repository`, `Shared Trending`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `connectDB()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`connectDB()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `handleApiError()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`handleApiError()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _217 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._