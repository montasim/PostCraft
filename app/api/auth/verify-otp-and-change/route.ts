import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { getAuthSession } from "@/core/auth/workspace"
import { sendEmail } from "@/core/auth/email"
import { getAuthDb } from "@/core/auth/auth-db"
import { buildEmailLayout } from "@/core/auth/email-templates"
import { getEnv } from "@/core/config/env"
import mongoose from "mongoose"
import {
  OTP,
  PASSWORD_MIN_LENGTH,
  BCRYPT_SALT_ROUNDS,
  ERROR_MESSAGES,
  EMAIL_BRAND,
  EMAIL_SUBJECT,
} from "@/lib/constants"

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: OTP.EXPIRY_SECONDS },
})

const OtpModel =
  (mongoose.models.Otp as mongoose.Model<{
    email: string
    code: string
    createdAt: Date
  }>) || mongoose.model("Otp", otpSchema)

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const session = await getAuthSession()
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json(
        { success: false, error: ERROR_MESSAGES.NOT_AUTHENTICATED },
        { status: 401 }
      )
    }

    const { code, newPassword } = await request.json()

    if (!code || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Code and new password are required" },
        { status: 400 }
      )
    }

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
        },
        { status: 400 }
      )
    }

    const email = session.user.email.toLowerCase()

    // Verify OTP
    const otp = await OtpModel.findOne({ email, code })
    if (!otp) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired code" },
        { status: 400 }
      )
    }

    // Delete used OTP
    await OtpModel.deleteMany({ email })

    // Hash password and update directly in Better Auth's user collection
    const bcrypt = await import("bcryptjs")
    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS)

    const { db } = getAuthDb()
    await db
      .collection("user")
      .updateOne(
        { _id: new mongoose.Types.ObjectId(session.user.id) },
        { $set: { password: hashedPassword } }
      )

    await sendEmail({
      to: email,
      subject: EMAIL_SUBJECT.PASSWORD_CHANGED,
      text: "Your PostCraftt password has been changed successfully. If you didn't make this change, please contact support immediately.",
      html: buildEmailLayout(
        `
        <h1 style="font-size:22px;font-weight:700;color:${EMAIL_BRAND.LIGHT.foreground};margin:0 0 8px;">Password changed successfully</h1>
        <p style="font-size:15px;color:${EMAIL_BRAND.LIGHT.foreground};line-height:1.6;margin:0 0 16px;">
          Your PostCraftt password has been changed. This change was made from your account settings.
        </p>
        <p style="font-size:13px;color:${EMAIL_BRAND.LIGHT.mutedForeground};line-height:1.5;margin:16px 0 0;">
          If you didn't make this change, please contact support immediately and secure your account.
        </p>
      `,
        getEnv().APP_URL
      ),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
