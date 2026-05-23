import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { getAuthDb } from "./auth-db"
import { sendEmail } from "./email"
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
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
      sendResetPassword: async ({ user, url }: { user: { email: string }; url: string }) => {
        await sendEmail({
          to: user.email,
          subject: "Reset your LinkedIQ password",
          text: `Click here to reset your password: ${url}`,
        })
      },
      resetPasswordTokenExpiresIn: 3600,
    },

    emailVerification: {
      sendVerificationEmail: async ({ user, url }: { user: { email: string }; url: string }) => {
        await sendEmail({
          to: user.email,
          subject: "Verify your LinkedIQ email",
          text: `Click here to verify your email: ${url}`,
        })
      },
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 3600,
    },

    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
        enabled: googleEnabled,
      },
    },

    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5,
      },
    },
  }
}

export const auth = betterAuth(buildAuthConfig())

export type Auth = typeof auth
