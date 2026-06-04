// ─────────────────────────────────────────────────────────────
// FILE: core/ai/quota-tracker.ts  (v2 — key-aware)
//
// MongoDB-backed quota tracking per (provider, model, keyIndex).
// Each API key has its own independent quota counters.
// If groq#0 is exhausted, groq#1 still has its full 1,000 RPD.
//
// Uses a dedicated Mongoose connection so quota operations
// don't interfere with the main app DB pool.
// ─────────────────────────────────────────────────────────────

import mongoose, { type Collection } from "mongoose"
import type { ProviderName } from "./models"
import { MODEL_REGISTRY } from "./models"
import { getEnv } from "@/core/config/env"
import { logger } from "@/core/logger"

// ── Types ─────────────────────────────────────────────────────

export interface QuotaRecord {
  provider: ProviderName
  modelId: string
  /** Which API key account this record tracks */
  keyIndex: number
  /** UTC date YYYY-MM-DD — records auto-expire after 48h */
  date: string
  /** Successful requests made today with this key */
  requestCount: number
  /** True once confirmed exhausted via API response or RPD threshold hit */
  exhausted: boolean
  /** ISO timestamp — this key+model is in RPM cooldown until here */
  cooldownUntil: string | null
  /** ISO timestamp of last update — useful for debugging */
  updatedAt: string
}

export interface KeyAvailability {
  provider: ProviderName
  modelId: string
  keyIndex: number
  available: boolean
  reason: "ok" | "exhausted" | "cooldown" | "no_key"
  cooldownUntil?: string
  requestCount?: number
}

// ── MongoDB connection ─────────────────────────────────────────

let _collection: Collection<QuotaRecord> | null = null

async function getCollection(): Promise<Collection<QuotaRecord>> {
  if (_collection) return _collection

  const { MONGODB_URI } = getEnv()

  // Use a dedicated connection for quota tracking — isolated from main pool
  const conn = await mongoose
    .createConnection(MONGODB_URI, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    })
    .asPromise()

  _collection = conn.collection<QuotaRecord>("ai_quota_tracker_v2")

  // Unique index per (provider, modelId, keyIndex, date)
  await _collection.createIndex(
    { provider: 1, modelId: 1, keyIndex: 1, date: 1 },
    { unique: true }
  )
  // TTL: auto-delete records after 48 hours
  await _collection.createIndex(
    { updatedAt: 1 },
    { expireAfterSeconds: 60 * 60 * 48 }
  )

  logger.info("Quota tracker collection initialized")

  return _collection
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10)
}

// ── QuotaTracker class ─────────────────────────────────────────

export class QuotaTracker {
  // ── Read ──────────────────────────────────────────────────

  async getRecord(
    provider: ProviderName,
    modelId: string,
    keyIndex: number
  ): Promise<QuotaRecord> {
    const col = await getCollection()
    const existing = await col.findOne({
      provider,
      modelId,
      keyIndex,
      date: todayUtc(),
    })

    return (
      existing ?? {
        provider,
        modelId,
        keyIndex,
        date: todayUtc(),
        requestCount: 0,
        exhausted: false,
        cooldownUntil: null,
        updatedAt: new Date().toISOString(),
      }
    )
  }

  /**
   * Check if a specific (provider, model, key) combination can accept
   * a new request right now.
   */
  async isAvailable(
    provider: ProviderName,
    modelId: string,
    keyIndex: number
  ): Promise<KeyAvailability> {
    const record = await this.getRecord(provider, modelId, keyIndex)
    const now = new Date()

    if (record.exhausted) {
      return {
        provider,
        modelId,
        keyIndex,
        available: false,
        reason: "exhausted",
      }
    }

    if (record.cooldownUntil && new Date(record.cooldownUntil) > now) {
      return {
        provider,
        modelId,
        keyIndex,
        available: false,
        reason: "cooldown",
        cooldownUntil: record.cooldownUntil,
      }
    }

    // Proactive RPD check against registry config
    const config = MODEL_REGISTRY.find(
      (m) => m.providerId === provider && m.modelId === modelId
    )
    if (config && config.rpd !== -1 && record.requestCount >= config.rpd) {
      // Proactively mark exhausted so future checks skip the DB read
      await this.markExhausted(provider, modelId, keyIndex)
      return {
        provider,
        modelId,
        keyIndex,
        available: false,
        reason: "exhausted",
      }
    }

    return {
      provider,
      modelId,
      keyIndex,
      available: true,
      reason: "ok",
      requestCount: record.requestCount,
    }
  }

  // ── Write ─────────────────────────────────────────────────

  async recordRequest(
    provider: ProviderName,
    modelId: string,
    keyIndex: number
  ): Promise<void> {
    const col = await getCollection()
    await col.updateOne(
      { provider, modelId, keyIndex, date: todayUtc() },
      {
        $inc: { requestCount: 1 },
        $set: { updatedAt: new Date().toISOString() },
        $setOnInsert: { exhausted: false, cooldownUntil: null },
      },
      { upsert: true }
    )
  }

  async markExhausted(
    provider: ProviderName,
    modelId: string,
    keyIndex: number
  ): Promise<void> {
    const col = await getCollection()
    await col.updateOne(
      { provider, modelId, keyIndex, date: todayUtc() },
      {
        $set: { exhausted: true, updatedAt: new Date().toISOString() },
        $setOnInsert: { requestCount: 0, cooldownUntil: null },
      },
      { upsert: true }
    )
  }

  /**
   * Set an RPM cooldown for a specific key+model.
   * Default 65 seconds (1 minute + buffer).
   */
  async setCooldown(
    provider: ProviderName,
    modelId: string,
    keyIndex: number,
    ms: number = 65_000
  ): Promise<void> {
    const col = await getCollection()
    const cooldownUntil = new Date(Date.now() + ms).toISOString()
    await col.updateOne(
      { provider, modelId, keyIndex, date: todayUtc() },
      {
        $set: { cooldownUntil, updatedAt: new Date().toISOString() },
        $setOnInsert: { requestCount: 0, exhausted: false },
      },
      { upsert: true }
    )
  }

  // ── Dashboard / debug ─────────────────────────────────────

  /**
   * Full status for today. Groups by (provider, modelId)
   * and shows per-key availability inline.
   */
  async getStatus(): Promise<QuotaRecord[]> {
    const col = await getCollection()
    return col
      .find({ date: todayUtc() })
      .sort({ provider: 1, modelId: 1, keyIndex: 1 })
      .toArray()
  }

  /**
   * Summary: for each (provider, model), how many keys are
   * still available vs exhausted/cooling down.
   */
  async getSummary(): Promise<
    Array<{
      provider: ProviderName
      modelId: string
      totalKeys: number
      availableKeys: number
      totalRequests: number
    }>
  > {
    const records = await this.getStatus()
    const grouped = new Map<
      string,
      { provider: ProviderName; modelId: string; records: QuotaRecord[] }
    >()

    for (const r of records) {
      const key = `${r.provider}::${r.modelId}`
      if (!grouped.has(key)) {
        grouped.set(key, {
          provider: r.provider,
          modelId: r.modelId,
          records: [],
        })
      }
      grouped.get(key)!.records.push(r)
    }

    const now = new Date()
    return Array.from(grouped.values()).map(
      ({ provider, modelId, records }) => {
        const availableKeys = records.filter(
          (r) =>
            !r.exhausted &&
            !(r.cooldownUntil && new Date(r.cooldownUntil) > now)
        ).length

        return {
          provider,
          modelId,
          totalKeys: records.length,
          availableKeys,
          totalRequests: records.reduce((s, r) => s + r.requestCount, 0),
        }
      }
    )
  }
}

export const quotaTracker = new QuotaTracker()
