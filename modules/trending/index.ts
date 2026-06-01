import {
  getTrendingDashboard,
  dismissRun,
  dismissAllRuns,
  triggerRun,
  getGlobalTopics,
  generatePostsFromTrends,
  shortlistWithAI,
} from "./trending.service"

export const trendingService = {
  getTrendingDashboard,
  dismissRun,
  dismissAllRuns,
  triggerRun,
  getGlobalTopics,
  generatePostsFromTrends,
  shortlistWithAI,
}

export type { ShortlistOutput } from "./trending.service"
