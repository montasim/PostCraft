export const PLAN_LIMIT = 3
export const PAGE_SIZE = 6

export const TOPIC_MAX_LENGTH = 2000
export const TOPIC_WARNING_THRESHOLD = 1500
export const GUARDRAIL_MAX_LENGTH = 200

export const PROFILE_BIO_MAX_LENGTH = 2000
export const PROFILE_SHORT_MAX_LENGTH = 100
export const PROFILE_WEBSITE_MAX_LENGTH = 300
export const PROFILE_TWITTER_MAX_LENGTH = 50
export const PROFILE_LINKEDIN_MAX_LENGTH = 100

export const MAX_SCORE = 100
export const MIN_SCORE = 0

export const HOOK_MAX_LENGTH = 150
export const BODY_MAX_LENGTH = 1300
export const BODY_MIN_LENGTH = 600
export const HASHTAG_MIN = 2
export const HASHTAG_MAX = 5
export const HASHTAG_COUNT_DEFAULT = 3
export const SENTENCE_LENGTH_IDEAL = 20
export const SENTENCE_LENGTH_ACCEPTABLE = 30
export const RUN_ON_THRESHOLD = 40
export const PARAGRAPH_MIN = 2
export const PARAGRAPH_MAX = 5
export const WALL_OF_TEXT_THRESHOLD = 200
export const CTA_MAX_LENGTH = 200

export const MAX_RETRIES_DEFAULT = 3
export const MAX_RETRIES_JUDGE = 2
export const BACKOFF_BASE_MS = 1000
export const POST_COUNT_MIN = 1
export const POST_COUNT_MAX = 10
export const POST_COUNT_DEFAULT = 3
export const TWITTER_BODY_MAX_LENGTH = 280

export const SCORE_MIN = 0
export const SCORE_MAX = 100

export const DB_MAX_POOL_SIZE = 10
export const DB_SERVER_SELECTION_TIMEOUT_MS = 5000
export const DB_SOCKET_TIMEOUT_MS = 45000

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 128
export const BCRYPT_SALT_ROUNDS = 10

export const LIBRARY_DEFAULT_LIMIT = 6
export const LIBRARY_DEFAULT_PAGE = 1
export const LIBRARY_THIS_WEEK_DAYS = 7
export const LIBRARY_12_WEEKS_DAYS = 84
export const LIBRARY_FUZZY_THRESHOLD = 0.5

export const TRENDING_RUN_LIMIT = 50
export const TRENDING_TOP_N = 6
export const TRENDING_KEYWORDS_MAX = 5
export const TRENDING_SUBREDDITS_MAX = 5
export const TRENDING_POSTS_DEFAULT = 5

export const INSIGHTS_MONTHLY_GOAL = 20

export const SCORE_WEIGHTS = {
  heuristic: 0.4,
  judge: 0.4,
  structure: 0.2,
} as const

export const SESSION_TIMEOUT_DEFAULT = 30
