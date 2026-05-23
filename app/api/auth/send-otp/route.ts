import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/core/config/database"
import { handleApiError } from "@/core/errors/error-handler"
import { sendEmail } from "@/core/auth/email"
import { getAuthSession } from "@/core/auth/workspace"
import mongoose from "mongoose"

const OTP_EXPIRY_MINUTES = 5

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  code: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: OTP_EXPIRY_MINUTES * 60, // TTL index — auto-delete after 5 min
  },
})

const OtpModel =
  (mongoose.models.Otp as mongoose.Model<{ email: string; code: string; createdAt: Date }>) ||
  mongoose.model("Otp", otpSchema)

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
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
      subject: "Your LinkedIQ verification code",
      text: `Your verification code is: ${code}\n\nThis code expires in ${OTP_EXPIRY_MINUTES} minutes.`,
      html: `<div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
        <h2 style="color: #333;">Verification Code</h2>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #6366f1;">${code}</p>
        <p style="color: #666;">This code expires in ${OTP_EXPIRY_MINUTES} minutes.</p>
      </div>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
