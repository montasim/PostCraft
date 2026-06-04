import {
  fetchHackerNews,
  fetchDevTo,
  fetchGitHub,
  fetchReddit,
} from "../modules/trending/source-fetcher"
import { logger } from "../core/logger"

async function testPlatformAvailability() {
  const keywords = ["react", "startup"]
  const count = 5

  console.log("=== Testing Trending Platforms Availability ===\n")

  // 1. Hacker News
  try {
    process.stdout.write("Testing HackerNews... ")
    const hn = await fetchHackerNews(keywords, count)
    if (hn.length > 0) {
      console.log(`✅ Success (${hn.length} items found)`)
    } else {
      console.log(`⚠️  Warning (0 items found, might be valid or query issue)`)
    }
  } catch (error) {
    console.log(`❌ Failed: ${(error as Error).message}`)
  }

  // 2. Dev.to
  try {
    process.stdout.write("Testing Dev.to... ")
    const dev = await fetchDevTo(keywords, count)
    if (dev.length > 0) {
      console.log(`✅ Success (${dev.length} items found)`)
    } else {
      console.log(`⚠️  Warning (0 items found, might be valid or query issue)`)
    }
  } catch (error) {
    console.log(`❌ Failed: ${(error as Error).message}`)
  }

  // 3. GitHub
  try {
    process.stdout.write("Testing GitHub... ")
    const gh = await fetchGitHub(keywords, count)
    if (gh.length > 0) {
      console.log(`✅ Success (${gh.length} items found)`)
    } else {
      console.log(`⚠️  Warning (0 items found, might be valid or rate limit)`)
    }
  } catch (error) {
    console.log(`❌ Failed: ${(error as Error).message}`)
  }

  // 4. Reddit
  try {
    process.stdout.write("Testing Reddit... ")
    const rd = await fetchReddit(keywords, count)
    if (rd.length > 0) {
      console.log(`✅ Success (${rd.length} items found)`)
    } else {
      console.log(
        `⚠️  Warning (0 items found, often due to 403 / 429 block without unique User-Agent)`
      )
    }
  } catch (error) {
    console.log(`❌ Failed: ${(error as Error).message}`)
  }

  console.log("\n=== Test Complete ===")
}

testPlatformAvailability().catch(console.error)
