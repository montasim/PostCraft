import { HTTP_STATUS, ERROR_CODES } from "@/lib/constants"

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR)
    this.name = "ValidationError"
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND)
    this.name = "NotFoundError"
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED)
    this.name = "UnauthorizedError"
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN)
    this.name = "ForbiddenError"
  }
}

export class AIServiceError extends AppError {
  constructor(message: string) {
    super(message, HTTP_STATUS.BAD_GATEWAY, ERROR_CODES.AI_SERVICE_ERROR)
    this.name = "AIServiceError"
  }
}

export class QueueError extends AppError {
  constructor(message: string) {
    super(message, HTTP_STATUS.SERVICE_UNAVAILABLE, ERROR_CODES.QUEUE_ERROR)
    this.name = "QueueError"
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_CODES.DATABASE_ERROR
    )
    this.name = "DatabaseError"
  }
}

export class QuotaExceededError extends AppError {
  constructor(
    message = "Free plan quota exceeded. Upgrade to generate more posts."
  ) {
    super(message, HTTP_STATUS.FORBIDDEN, ERROR_CODES.QUOTA_EXCEEDED)
    this.name = "QuotaExceededError"
  }
}
