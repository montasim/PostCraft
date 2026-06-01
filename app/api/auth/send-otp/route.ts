import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { sendEmail } from "@/core/auth/email"
import { getAuthSession } from "@/core/auth/workspace"
import mongoose from "mongoose"
import { OTP, EMAIL_BRAND, EMAIL_SUBJECT } from "@/lib/constants"
import { buildEmailLayout } from "@/core/auth/email-templates"

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  code: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: OTP.EXPIRY_MINUTES * 60, // TTL index — auto-delete after 5 min
  },
})

const OtpModel =
  (mongoose.models.Otp as mongoose.Model<{
    email: string
    code: string
    createdAt: Date
  }>) || mongoose.model("Otp", otpSchema)

function generateOtp(): string {
  return Math.floor(Math.random() * OTP.MAX_VALUE + OTP.MIN_VALUE).toString()
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const session = await getAuthSession()
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      )
    }

    const email = session.user.email.toLowerCase()
    const code = generateOtp()

    // Delete any existing OTP for this email
    await OtpModel.deleteMany({ email })

    // Store new OTP
    await OtpModel.create({ email, code })

    // Send OTP email
    await sendEmail({
      to: email,
      subject: EMAIL_SUBJECT.OTP,
      text: `Your LinkedIQ verification code is: ${code}\n\nThis code expires in ${OTP.EXPIRY_MINUTES} minutes.\n\nNever share this code with anyone. LinkedIQ will never ask for your code.`,
      html: buildEmailLayout(`
        <h1 style="font-size:22px;font-weight:700;color:${EMAIL_BRAND.TEXT_HEX};margin:0 0 4px;">Verify it's you</h1>
        <p style="font-size:15px;color:${EMAIL_BRAND.TEXT_HEX};line-height:1.6;margin:0 0 24px;">
          Enter this code to complete your action. It expires in ${OTP.EXPIRY_MINUTES} minutes.
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td align="center" style="padding:20px 0;background-color:${EMAIL_BRAND.SURFACE_HEX};border-radius:12px;">
              <span style="font-size:36px;font-weight:700;letter-spacing:6px;color:${EMAIL_BRAND.PRIMARY_HEX};font-family:monospace;">
                ${code}
              </span>
            </td>
          </tr>
        </table>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
          <tr>
            <td align="center" style="padding:12px;background-color:${EMAIL_BRAND.PRIMARY_LIGHT_HEX};border-radius:8px;">
              <p style="font-size:13px;color:${EMAIL_BRAND.MUTED_HEX};line-height:1.5;margin:0;">
                Never share this code with anyone. LinkedIQ will never ask for your verification code.
              </p>
            </td>
          </tr>
        </table>
      `),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
