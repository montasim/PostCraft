import { getEnv } from "@/core/config/env"
import { logger } from "@/core/logger"

interface EmailPayload {
  to: string
  subject: string
  text: string
  html?: string
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const env = getEnv()

  if (!env.RESEND_API_KEY) {
    logger.info({ to: payload.to, subject: payload.subject }, "[EMAIL] dev mode — not sent")
    logger.info({ url: payload.text }, "[EMAIL] body")
    return
  }

  const { Resend } = await import("resend")
  const resend = new Resend(env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  })

  if (error) {
    logger.error({ error }, "Failed to send email")
    throw new Error(`Email send failed: ${error.message}`)
  }
}
