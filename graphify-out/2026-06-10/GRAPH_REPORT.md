# Graph Report - PostCraft  (2026-06-06)

## Corpus Check
- 319 files · ~86,545 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1232 nodes · 3698 edges · 63 communities (55 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `22d24849`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 162 edges
2. `connectDB()` - 91 edges
3. `handleApiError()` - 55 edges
4. `Button()` - 49 edges
5. `getEnv()` - 47 edges
6. `getWorkspaceId()` - 38 edges
7. `useAppSelector()` - 34 edges
8. `Skeleton()` - 26 edges
9. `Badge()` - 24 edges
10. `Card()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/schedule/route.ts → core/config/database.ts
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/linkedin/schedule/route.ts → core/config/database.ts
- `POST()` --calls--> `connectDB()`  [INFERRED]
  app/api/twitter/schedule/route.ts → core/config/database.ts
- `DELETE()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/post/[id]/route.ts → core/config/database.ts
- `PATCH()` --calls--> `connectDB()`  [INFERRED]
  app/api/facebook/post/[id]/route.ts → core/config/database.ts

## Import Cycles
- None detected.

## Communities (63 total, 8 thin omitted)

### Community 0 - "Groq Gemini"
Cohesion: 0.12
Nodes (30): getDefaultModel(), getGeminiClient(), getGroqClient(), getGroqModel(), hasGroq(), getOpenRouterClient(), getOpenRouterModel(), hasOpenRouter() (+22 more)

### Community 1 - "App Api"
Cohesion: 0.07
Nodes (60): DELETE(), PATCH(), DELETE(), PATCH(), GET(), GET(), GET(), DELETE() (+52 more)

### Community 2 - "Errors App"
Cohesion: 0.10
Nodes (22): GenerationWithVariants, LibraryListFilters, LibraryListResult, libraryRepository, SORT_MAP, SortMap, VariantDoc, GuardrailDetail (+14 more)

### Community 3 - "Errors Inngest"
Cohesion: 0.19
Nodes (16): AiErrorType, AiProviderError, classifyError(), InngestAiCallOptions, StepTools, MODEL_REGISTRY, ModelConfig, QualityTier (+8 more)

### Community 4 - "Generate Brand"
Cohesion: 0.09
Nodes (4): metadata, metadata, metadata, Skeleton()

### Community 5 - "Layout Brand"
Cohesion: 0.10
Nodes (23): AppShellProps, ROUTE_MAP, MobileSidebar(), fetchTrendingPrefs, initialState, selectTrendingCount(), selectTrendingPrefs(), selectTrendingPrefsStatus() (+15 more)

### Community 6 - "Preview Facebook"
Cohesion: 0.18
Nodes (18): PlatformId, PostVariantsCarouselProps, FacebookPreview(), FacebookPreviewProps, LinkedInPreview(), LinkedInPreviewProps, PLATFORM_PREVIEWS, PostPreviewDialog() (+10 more)

### Community 7 - "Prompts Judge"
Cohesion: 0.17
Nodes (11): SCORE_WEIGHTS, RawVariant, ScoreComponents, scoreComponentsSchema, WEIGHTS, PLATFORM_LENGTH_RANGES, ScoredVariantOutput, scoreLength() (+3 more)

### Community 8 - "Generate Brand"
Cohesion: 0.33
Nodes (6): PLATFORM_ABBREV, RunItem(), SOURCE_META, STATUS_STYLES, toVariant(), TrendingVariant()

### Community 9 - "Insights Checkbox"
Cohesion: 0.13
Nodes (10): ApiGuardrail, BrandGuardContent(), Rule, RuleSectionProps, metadata, StreakWidgetProps, Input(), Progress() (+2 more)

### Community 10 - "Generate Constants"
Cohesion: 0.10
Nodes (21): AUDIENCE_OPTIONS, INDUSTRY_OPTIONS, LANGUAGE_OPTIONS, NAV_MAIN, PLATFORM_OPTIONS, TONE_OPTIONS, TOPIC_OPTIONS, PostCreationFormInner() (+13 more)

### Community 11 - "Library Card"
Cohesion: 0.09
Nodes (25): ActivityHeatmapProps, BestPostHighlight(), BestPostHighlightProps, formatRelativeDate(), LibraryCard(), LibraryCardProps, STATUS_STYLES, VariantCardWrapper() (+17 more)

### Community 12 - "Auth Form"
Cohesion: 0.05
Nodes (56): authClient, LoginForm(), SignupForm(), VerifyEmailContent(), BannedWordsGroupProps, BrandGuardPanelProps, GuardRule, RuleGroupProps (+48 more)

### Community 13 - "Library Activity"
Cohesion: 0.10
Nodes (22): NAV_ACCOUNT, NAV_CONFIG, MobileSidebarProps, DAYS, PLATFORMS, TrendingSettingsPanelProps, RadioGroup(), RadioGroupItem() (+14 more)

### Community 14 - "Error Brand"
Cohesion: 0.11
Nodes (10): HighDemandCard(), HighDemandCardProps, MotivationTip(), TIPS, SelectOption, NavGroup(), PageError(), StreakWidget() (+2 more)

### Community 15 - "Layout Header"
Cohesion: 0.33
Nodes (5): formatNumber(), Header(), HeaderProps, ThemeToggle(), UserDropdown()

### Community 16 - "Shared Useautocompletetimepicker"
Cohesion: 0.11
Nodes (27): SORT_OPTIONS, useAutocompleteTimepicker(), UseAutocompleteTimepickerProps, DatePicker(), DatePickerProps, MultiSelect(), MultiSelectProps, TimePicker() (+19 more)

### Community 17 - "Generation Schema"
Cohesion: 0.17
Nodes (15): generationSchema, IGeneration, generationRepository, aiGenerationOutputSchema, CreateGenerationInput, createGenerationSchema, GenerationStatus, generationStatusSchema (+7 more)

### Community 18 - "Trending Runs"
Cohesion: 0.13
Nodes (18): TrendingRunGroup(), TrendingRunGroupProps, groupRunsByDate(), TrendingRunsList(), TrendingRunsListProps, DateGroup, PLATFORM_ABBREV, STATUS_DOT (+10 more)

### Community 19 - "Library App"
Cohesion: 0.16
Nodes (11): API, useMediaQuery(), LibraryContent(), metadata, EmptyState(), HighTrafficAlert(), QuotaAlert(), selectQuotaExceeded() (+3 more)

### Community 20 - "Constants Options"
Cohesion: 0.12
Nodes (19): BrandGuardPanel(), CarouselNavigation(), CarouselNavigationProps, GenerationStatus, STATUS_LABELS, PostCreationForm(), PostVariantsCarousel(), STATUS_HEADERS (+11 more)

### Community 21 - "Trending Prompts"
Cohesion: 0.13
Nodes (23): callWithTaskFallback(), buildShortlistPrompt(), ShortlistItem, ShortlistPromptData, getLatestGlobalTopics(), countUndismissedRuns(), createRun(), dismissAllRuns() (+15 more)

### Community 22 - "Profile Content"
Cohesion: 0.15
Nodes (14): metadata, DashboardClient(), AppShell(), Sidebar(), metadata, useAppDispatch(), useAppSelector(), TrendingShell() (+6 more)

### Community 23 - "Insights Index"
Cohesion: 0.11
Nodes (27): fontMono, geist, GlobalError(), BREADCRUMB_CONFIG, BreadcrumbConfig, PageBreadcrumb(), cn(), SectionHeader() (+19 more)

### Community 24 - "Dropdown Menu"
Cohesion: 0.16
Nodes (11): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+3 more)

### Community 25 - "Queue Functions"
Cohesion: 0.27
Nodes (10): handler, fetchGlobalTrendingTopics, generatePosts, recoverScheduledTrending, runTrendingPipeline, scheduledTrendingRunner, scheduleFacebookPost, scheduleLinkedInPost (+2 more)

### Community 26 - "Preview Slices"
Cohesion: 0.24
Nodes (8): FacebookPostItem(), LibraryHeaderProps, LinkedinPostItem(), TwitterPostItem(), Badge(), badgeVariants, Label(), Textarea()

### Community 27 - "Brand Guard"
Cohesion: 0.26
Nodes (10): ActivityHeatmap(), getDaysAgo(), HeatmapDay, BG_MAP, COLOR_MAP, ScorePillProps, Tooltip(), TooltipContent() (+2 more)

### Community 28 - "Library Repository"
Cohesion: 0.11
Nodes (22): DELETE(), GET(), { GET, POST }, POST(), POST(), POST(), POST(), POST() (+14 more)

### Community 29 - "Shared Trending"
Cohesion: 0.15
Nodes (19): buildAuthConfig(), EmailPayload, sendEmail(), buildEmailButton(), buildEmailDivider(), buildEmailLayout(), EMAIL_COMMON, THEME_COLORS (+11 more)

### Community 30 - "Settings Schema"
Cohesion: 0.20
Nodes (13): settingsRepository, accountSettingsSchema, appearanceSettingsSchema, notificationSettingsSchema, UpdateSettingsInput, updateSettingsSchema, DEFAULT_ACCOUNT, DEFAULT_APPEARANCE (+5 more)

### Community 31 - "Insights Content"
Cohesion: 0.15
Nodes (13): PLATFORM_DISPLAY_NAMES, PLATFORMS, PREVIEW_CONFIG_DEFAULTS, PLATFORM_ICONS, VariantCardProps, fetchPreviewPrefs, initialState, previewPrefsSlice (+5 more)

### Community 32 - "Prefs Schema"
Cohesion: 0.15
Nodes (21): SidebarProps, generationPrefsSubSchema, IGenerationPrefsDoc, IPrefs, IPreviewConfigDoc, ITrendingPrefsDoc, prefsSchema, previewPrefsSubSchema (+13 more)

### Community 33 - "Variant Schema"
Cohesion: 0.48
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 34 - "Workspace Schema"
Cohesion: 0.14
Nodes (10): AIServiceError, AppError, DatabaseError, ForbiddenError, GuardrailLimitExceededError, NotFoundError, QueueError, QuotaExceededError (+2 more)

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
Cohesion: 0.40
Nodes (3): SCORE_RANGES, DEFAULT_FILTERS, LibraryStats

### Community 41 - "Constants Language"
Cohesion: 0.15
Nodes (15): AI_MAX_TOKENS, AI_TASKS, AI_TEMPERATURE, AITask, LANGUAGE_MAP, LANGUAGE_TO_CODE, TASK_PROVIDER_ORDER, buildJudgePrompt() (+7 more)

### Community 42 - "Community 42"
Cohesion: 0.33
Nodes (6): ProviderName, getCollection(), KeyAvailability, QuotaRecord, QuotaTracker, todayUtc()

### Community 43 - "Community 43"
Cohesion: 0.11
Nodes (19): ConnectedAccountsCard(), SettingsData, ConfirmDialog(), ConfirmDialogProps, UpgradeModal(), UpgradeModalProps, connectedPlatformsSlice, ConnectedPlatformsState (+11 more)

### Community 44 - "Slices Trending"
Cohesion: 0.39
Nodes (5): MILLISECONDS, TrendingScheduleCard(), computeNextRunAt(), formatNextRun(), ScheduleType

### Community 45 - "Community 45"
Cohesion: 0.27
Nodes (11): GET(), ApiKeyEntry, getKey(), getKeyCountSummary(), getKeysForProvider(), getRegistry(), hasKeys(), keyCount() (+3 more)

### Community 46 - "Generation Prompt"
Cohesion: 0.36
Nodes (6): buildPromptPayload(), GenerationData, GuardrailData, buildGenerationPrompt(), GenerationPromptData, PLATFORM_PSYCHOLOGY

### Community 47 - "Quota Lib"
Cohesion: 0.53
Nodes (4): getQuotaFooter(), getQuotaMessage(), PlanQuotaCard(), PlanQuotaCardProps

### Community 49 - "Page Signup"
Cohesion: 0.33
Nodes (8): workspaceRepository, brandPersonaSchema, customHashtagSchema, personaOptionSchema, UpdateWorkspaceInput, updateWorkspaceSchema, DEFAULT_PERSONA, workspaceService

### Community 50 - "Community 50"
Cohesion: 0.35
Nodes (11): calculateHeuristicScore(), clamp(), HeuristicInput, HeuristicResult, scoreAICliche(), scoreBannedWords(), scoreCTAClarity(), scoreFormatting() (+3 more)

### Community 52 - "Community 52"
Cohesion: 0.22
Nodes (8): accountSchema, appearanceSchema, IAccountSettings, IAppearanceSettings, INotificationSettings, ISettings, notificationSchema, settingsSchema

### Community 53 - "Community 53"
Cohesion: 0.33
Nodes (4): insightsRepository, insightsService, IVariant, variantSchema

### Community 62 - "Community 62"
Cohesion: 0.22
Nodes (8): brandPersonaSchema, customHashtagSchema, IBrandPersona, ICustomHashtag, IPersonaOption, IWorkspace, personaOptionSchema, workspaceSchema

### Community 63 - "Community 63"
Cohesion: 0.29
Nodes (6): AUTH_TOKEN, CRON, OTP, SCHEDULE_DEFAULTS, SECONDS, SESSION

## Knowledge Gaps
- **217 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+212 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Insights Index` to `Generate Brand`, `Preview Facebook`, `Generate Brand`, `Insights Checkbox`, `Generate Constants`, `Library Card`, `Auth Form`, `Library Activity`, `Error Brand`, `Shared Useautocompletetimepicker`, `Trending Runs`, `Library App`, `Constants Options`, `Profile Content`, `Dropdown Menu`, `Preview Slices`, `Brand Guard`, `Insights Content`, `Variant Schema`, `App Layout`, `Community 43`, `Slices Trending`, `Quota Lib`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **Why does `connectDB()` connect `App Api` to `Groq Gemini`, `Errors App`, `Trending Global`, `Trending Prompts`, `Queue Functions`, `Preview Slices`, `Library Repository`, `Shared Trending`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `getEnv()` connect `Groq Gemini` to `App Api`, `Errors Inngest`, `App Layout`, `Community 42`, `Community 45`, `Library Repository`, `Shared Trending`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `connectDB()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`connectDB()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `handleApiError()` (e.g. with `DELETE()` and `PATCH()`) actually correct?**
  _`handleApiError()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _217 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Groq Gemini` be split into smaller, more focused modules?**
  _Cohesion score 0.11829268292682926 - nodes in this community are weakly interconnected._