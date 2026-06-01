import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { getAuthDb } from "./auth-db"
import { sendEmail } from "./email"
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  AUTH_TOKEN,
  SESSION,
  EMAIL_BRAND,
  EMAIL_SUBJECT,
  EMAIL_BUTTON,
} from "@/lib/constants"
import { buildEmailLayout, buildEmailButton } from "@/core/auth/email-templates"
import { getEnv } from "@/core/config/env"

function buildAuthConfig() {
  const { db, client } = getAuthDb()
  const env = getEnv()

  const googleEnabled = !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET)

  return {
    database: mongodbAdapter(db, { client }),
    baseURL: env.APP_URL,
    secret: env.BETTER_AUTH_SECRET,

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: PASSWORD_MIN_LENGTH,
      maxPasswordLength: PASSWORD_MAX_LENGTH,
      autoSignIn: true,
      sendResetPassword: async ({
        user,
        url,
      }: {
        user: { email: string }
        url: string
      }) => {
        await sendEmail({
          to: user.email,
          subject: EMAIL_SUBJECT.RESET_PASSWORD,
          text: `Reset your LinkedIQ password: ${url}\n\nIf you didn't request this, you can safely ignore this email.`,
          html: buildEmailLayout(
            `
            <h1 style="font-size:22px;font-weight:700;color:${EMAIL_BRAND.TEXT_HEX};margin:0 0 8px;">Reset your password</h1>
            <p style="font-size:15px;color:${EMAIL_BRAND.TEXT_HEX};line-height:1.6;margin:0 0 16px;">
              Someone requested a password reset for your LinkedIQ account.
              Click the button below to set a new password.
            </p>
            ${buildEmailButton(url, EMAIL_BUTTON.RESET_PASSWORD)}
            <p style="font-size:13px;color:${EMAIL_BRAND.MUTED_HEX};line-height:1.5;margin:16px 0 0;">
              If you didn't request this, you can safely ignore this email.
              Your password won't change until you click the link above.
            </p>
            <p style="font-size:13px;color:${EMAIL_BRAND.MUTED_HEX};line-height:1.5;margin:4px 0 0;">
              This link expires in 1 hour for security reasons.
            </p>
          `,
            env.APP_URL
          ),
        })
      },
      resetPasswordTokenExpiresIn: AUTH_TOKEN.RESET_PASSWORD_EXPIRY_SECONDS,
    },

    emailVerification: {
      sendVerificationEmail: async ({
        user,
        url,
      }: {
        user: { email: string }
        url: string
      }) => {
        await sendEmail({
          to: user.email,
          subject: EMAIL_SUBJECT.VERIFY,
          text: `Welcome to LinkedIQ! Verify your email: ${url}\n\nThis link expires in 1 hour.`,
          html: buildEmailLayout(
            `
            <h1 style="font-size:22px;font-weight:700;color:${EMAIL_BRAND.TEXT_HEX};margin:0 0 8px;">Welcome to LinkedIQ</h1>
            <p style="font-size:15px;color:${EMAIL_BRAND.TEXT_HEX};line-height:1.6;margin:0 0 16px;">
              You're one step away from creating AI-powered LinkedIn posts that build your professional brand.
            </p>
            <p style="font-size:15px;color:${EMAIL_BRAND.TEXT_HEX};line-height:1.6;margin:0 0 20px;">
              Click the button below to verify your email address and get started.
            </p>
            ${buildEmailButton(url, EMAIL_BUTTON.VERIFY_EMAIL)}
            <p style="font-size:13px;color:${EMAIL_BRAND.MUTED_HEX};line-height:1.5;margin:16px 0 0;">
              This link expires in 1 hour. If you didn't create an account, you can ignore this email.
            </p>
          `,
            env.APP_URL
          ),
        })
      },
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: AUTH_TOKEN.VERIFICATION_EXPIRY_SECONDS,
    },

    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
        enabled: googleEnabled,
      },
    },

    session: {
      expiresIn: SESSION.EXPIRY_SECONDS,
      updateAge: SESSION.UPDATE_AGE_SECONDS,
      cookieCache: {
        enabled: true,
        maxAge: SESSION.COOKIE_CACHE_MAX_AGE,
      },
    },
  }
}

export const auth = betterAuth(buildAuthConfig())

export type Auth = typeof auth
