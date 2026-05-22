import { NextResponse } from "next/server"
import { AppError } from "./app-error"
import { logger } from "@/core/logger"

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    logger.warn({ code: error.code, statusCode: error.statusCode }, error.message)
    return NextResponse.json(
      { success: false, error: error.message, code: error.code },
      { status: error.statusCode }
    )
  }

  if (error instanceof Error) {
    logger.error({ err: error }, error.message)
    return NextResponse.json(
      { success: false, error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    )
  }

  logger.error({ error }, "Unknown error")
  return NextResponse.json(
    { success: false, error: "Internal server error", code: "INTERNAL_ERROR" },
    { status: 500 }
  )
}
