// ─────────────────────────────────────────────────────────────
// FILE: app/api/ai-config/route.ts
//
// Debug/dashboard endpoint. Shows live quota state + key counts.
// No key values exposed — counts only.
// Protect with auth middleware in production.
// ─────────────────────────────────────────────────────────────

import { NextResponse } from "next/server"
import { quotaTracker } from "@/core/ai/quota-tracker"
import { MODEL_REGISTRY } from "@/core/ai/models"
import { getKeyCountSummary } from "@/core/ai/key-registry"

export async function GET() {
  const [summary, rawStatus] = await Promise.all([
    quotaTracker.getSummary(),
    quotaTracker.getStatus(),
  ])

  const keyCounts = getKeyCountSummary()

  const registry = MODEL_REGISTRY.map((m) => ({
    provider: m.providerId,
    model: m.modelId,
    displayName: m.displayName,
    rpm: m.rpm,
    rpd: m.rpd,
    contextWindow: m.contextWindow,
    qualityTier: m.qualityTier,
    keysConfigured: keyCounts[m.providerId] ?? 0,
  }))

  return NextResponse.json({
    keyCounts,
    registry,
    quotaSummary: summary,
    quotaDetail: rawStatus.map((r) => ({
      provider: r.provider,
      modelId: r.modelId,
      keyIndex: r.keyIndex,
      date: r.date,
      requestCount: r.requestCount,
      exhausted: r.exhausted,
      cooldownUntil: r.cooldownUntil,
    })),
  })
}
