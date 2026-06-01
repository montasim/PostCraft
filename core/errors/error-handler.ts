import { NextResponse } from "next/server"
import { AppError } from "./app-error"
import { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } from "@/lib/constants"
import { logger } from "@/core/logger"

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    logger.warn(
      { code: error.code, statusCode: error.statusCode },
      error.message
    )
    return NextResponse.json(
      { success: false, error: error.message, code: error.code },
      { status: error.statusCode }
    )
  }

  if (error instanceof Error) {
    logger.error({ err: error }, error.message)
    return NextResponse.json(
      {
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER,
        code: ERROR_CODES.INTERNAL_ERROR,
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }

  logger.error({ error }, "Unknown error")
  return NextResponse.json(
    {
      success: false,
      error: ERROR_MESSAGES.INTERNAL_SERVER,
      code: ERROR_CODES.INTERNAL_ERROR,
    },
    { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
  )
}
