import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { getAuthDb } from "./auth-db"
import { sendEmail } from "./email"
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  AUTH_TOKEN,
  SESSION,
} from "@/lib/constants"
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
          subject: "Reset your LinkedIQ password",
          text: `Click here to reset your password: ${url}`,
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
          subject: "Verify your LinkedIQ email",
          text: `Click here to verify your email: ${url}`,
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
