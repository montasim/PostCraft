// ─────────────────────────────────────────────────────────────
// FILE: core/ai/inngest-wrapper.ts  (v2)
//
// Wraps the auto-switcher in an Inngest step so:
// - Successful result is memoized (won't re-run on retry)
// - Visible as a named step in the Inngest dashboard
// - Handles the step serialization requirement (must be JSON-serialisable)
// ─────────────────────────────────────────────────────────────

import { inngest } from "@/core/queue/client"
import type { GetStepTools } from "inngest"
import { callWithAutoSwitch, type SwitcherOptions } from "./switcher"
import type { ChatRequest, ChatResponse } from "./provider-client"

export interface InngestAiCallOptions extends SwitcherOptions {
  /** Unique step ID — shows in Inngest dashboard */
  stepId: string
}

/** Step tools type derived from our Inngest client instance */
type StepTools = GetStepTools<typeof inngest>

/**
 * Use inside Inngest functions. Wraps the auto-switcher in a step.
 */
export async function callAiWithInngest(
  step: StepTools,
  req: ChatRequest,
  opts: InngestAiCallOptions
): Promise<ChatResponse & { attemptCount: number }> {
  return step.run(`ai-call:${opts.stepId}`, async () => {
    return callWithAutoSwitch(req, opts)
  })
}
