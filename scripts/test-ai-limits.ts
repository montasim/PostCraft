import { config } from "dotenv"
config()
import { PROVIDER_CALLERS } from "../core/ai/provider-client"
import { getKeysForProvider } from "../core/ai/key-registry"
import { logger } from "../core/logger"

// Suppress pino logs
logger.level = "silent"

const PROVIDER_URLS: Record<string, string> = {
  groq: "https://api.groq.com/openai/v1",
  gemini: "https://generativelanguage.googleapis.com/v1beta",
  openrouter: "https://openrouter.ai/api/v1",
  zhipu: "https://open.bigmodel.cn/api/paas/v4",
}

async function testZhipuAnthropic() {
  const keys = getKeysForProvider("zhipu")
  const key = keys[0]?.value

  if (!key) {
    console.log(
      "❌ - zhipu (Anthropic) - glm-5.1 - https://api.z.ai/api/anthropic/v1/messages (No Key)"
    )
    return
  }

  try {
    const res = await fetch("https://api.z.ai/api/anthropic/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "glm-5.1",
        max_tokens: 50,
        messages: [{ role: "user", content: "hello" }],
      }),
    })

    if (res.ok) {
      console.log(
        `✅ - zhipu (Anthropic) - glm-5.1 - https://api.z.ai/api/anthropic/v1/messages`
      )
    } else {
      const data = await res.text()
      let msg = res.statusText
      try {
        const parsed = JSON.parse(data)
        if (parsed.error && parsed.error.message) msg = parsed.error.message
      } catch {}
      console.log(
        `❌ - zhipu (Anthropic) - glm-5.1 - https://api.z.ai/api/anthropic/v1/messages (${msg})`
      )
    }
  } catch (e: any) {
    console.log(
      `❌ - zhipu (Anthropic) - glm-5.1 - https://api.z.ai/api/anthropic/v1/messages (${e.message})`
    )
  }
}

async function testStandardProviders() {
  const tests = [
    { provider: "groq", model: "llama-3.3-70b-versatile" },
    { provider: "gemini", model: "gemini-2.5-flash" },
    { provider: "gemini", model: "gemini-2.0-flash" },
    { provider: "openrouter", model: "google/gemma-4-31b-it:free" },
    { provider: "zhipu", model: "glm-5.1" },
  ]

  for (const t of tests) {
    const url = PROVIDER_URLS[t.provider] || "Unknown URL"
    try {
      const keys = getKeysForProvider(t.provider as any)
      if (!keys || keys.length === 0) {
        console.log(`❌ - ${t.provider} - ${t.model} - ${url} (No Key)`)
        continue
      }

      const caller =
        PROVIDER_CALLERS[t.provider as keyof typeof PROVIDER_CALLERS]
      await caller(keys[0].value, t.model, 0, {
        system: "You are a helpful assistant. Output JSON.",
        user: "Say Hello in JSON.",
        temperature: 0.1,
        maxTokens: 50,
      })
      console.log(`✅ - ${t.provider} - ${t.model} - ${url}`)
    } catch (e: any) {
      let errorMsg = e.message
      try {
        const parsed = JSON.parse(e.message)
        if (parsed.error && parsed.error.message) {
          errorMsg = parsed.error.message
        } else if (parsed.message) {
          errorMsg = parsed.message
        }
      } catch {
        const jsonMatch = e.message.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0])
            if (parsed.error && parsed.error.message)
              errorMsg = parsed.error.message
          } catch {}
        }
      }
      if (errorMsg.length > 80) errorMsg = errorMsg.substring(0, 80) + "..."
      // Clean newlines
      errorMsg = errorMsg.replace(/\r?\n|\r/g, " ")
      console.log(`❌ - ${t.provider} - ${t.model} - ${url} (${errorMsg})`)
    }
  }
}

async function main() {
  console.log("\n--- AI Model Status Report ---\n")
  await testStandardProviders()
  await testZhipuAnthropic()
  console.log("\n------------------------------\n")
}

main().catch(console.error)
