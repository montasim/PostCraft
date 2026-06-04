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
          text: `Reset your PostCraft password: ${url}\n\nIf you didn't request this, you can safely ignore this email.`,
          html: buildEmailLayout(
            `
            <h1 style="font-size:22px;font-weight:700;color:${EMAIL_BRAND.LIGHT.foreground};margin:0 0 8px;">Reset your password</h1>
            <p style="font-size:15px;color:${EMAIL_BRAND.LIGHT.foreground};line-height:1.6;margin:0 0 16px;">
              Someone requested a password reset for your PostCraft account.
              Click the button below to set a new password.
            </p>
            ${buildEmailButton(url, EMAIL_BUTTON.RESET_PASSWORD)}
            <p style="font-size:13px;color:${EMAIL_BRAND.LIGHT.mutedForeground};line-height:1.5;margin:16px 0 0;">
              If you didn't request this, you can safely ignore this email.
              Your password won't change until you click the link above.
            </p>
            <p style="font-size:13px;color:${EMAIL_BRAND.LIGHT.mutedForeground};line-height:1.5;margin:4px 0 0;">
              This link expires in 1 hour for security reasons.
            </p>
          `,
            env.APP_URL
          ),
        })
      },
      onPasswordReset: async ({ user }: { user: { email: string } }) => {
        await sendEmail({
          to: user.email,
          subject: EMAIL_SUBJECT.PASSWORD_CHANGED,
          text: "Your PostCraft password has been changed successfully. If you didn't make this change, please contact support immediately.",
          html: buildEmailLayout(
            `
            <h1 style="font-size:22px;font-weight:700;color:${EMAIL_BRAND.LIGHT.foreground};margin:0 0 8px;">Password changed successfully</h1>
            <p style="font-size:15px;color:${EMAIL_BRAND.LIGHT.foreground};line-height:1.6;margin:0 0 16px;">
              Your PostCraft password has been changed. This change was made from your account settings.
            </p>
            <p style="font-size:13px;color:${EMAIL_BRAND.LIGHT.mutedForeground};line-height:1.5;margin:16px 0 0;">
              If you didn't make this change, please contact support immediately and secure your account.
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
          text: `Welcome to PostCraft! Verify your email: ${url}\n\nThis link expires in 1 hour.`,
          html: buildEmailLayout(
            `
            <h1 style="font-size:22px;font-weight:700;color:${EMAIL_BRAND.LIGHT.foreground};margin:0 0 8px;">Welcome to PostCraft</h1>
            <p style="font-size:15px;color:${EMAIL_BRAND.LIGHT.foreground};line-height:1.6;margin:0 0 16px;">
              You're one step away from creating AI-powered social media posts that build your professional brand.
            </p>
            <p style="font-size:15px;color:${EMAIL_BRAND.LIGHT.foreground};line-height:1.6;margin:0 0 20px;">
              Click the button below to verify your email address and get started.
            </p>
            ${buildEmailButton(url, EMAIL_BUTTON.VERIFY_EMAIL)}
            <p style="font-size:13px;color:${EMAIL_BRAND.LIGHT.mutedForeground};line-height:1.5;margin:16px 0 0;">
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
      linkedin: {
        clientId: env.LINKEDIN_CLIENT_ID ?? "",
        clientSecret: env.LINKEDIN_CLIENT_SECRET ?? "",
        enabled: !!(env.LINKEDIN_CLIENT_ID && env.LINKEDIN_CLIENT_SECRET),
        scope: ["w_member_social"],
      },
      facebook: {
        clientId: env.FACEBOOK_CLIENT_ID ?? "",
        clientSecret: env.FACEBOOK_CLIENT_SECRET ?? "",
        enabled: !!(env.FACEBOOK_CLIENT_ID && env.FACEBOOK_CLIENT_SECRET),
        scope: ["pages_manage_posts", "pages_read_engagement", "pages_show_list"],
      },
      twitter: {
        clientId: env.TWITTER_CLIENT_ID ?? "",
        clientSecret: env.TWITTER_CLIENT_SECRET ?? "",
        enabled: !!(env.TWITTER_CLIENT_ID && env.TWITTER_CLIENT_SECRET),
        scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
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

    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google", "linkedin", "facebook", "twitter"],
        allowDifferentEmails: true,
      },
    },

    logger: {
      level: "debug" as const,
    },
  }
}

export const auth = betterAuth(buildAuthConfig())

export type Auth = typeof auth
