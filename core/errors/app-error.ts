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
    super(message, 400, "VALIDATION_ERROR")
    this.name = "ValidationError"
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, "NOT_FOUND")
    this.name = "NotFoundError"
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED")
    this.name = "UnauthorizedError"
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN")
    this.name = "ForbiddenError"
  }
}

export class AIServiceError extends AppError {
  constructor(message: string) {
    super(message, 502, "AI_SERVICE_ERROR")
    this.name = "AIServiceError"
  }
}

export class QueueError extends AppError {
  constructor(message: string) {
    super(message, 503, "QUEUE_ERROR")
    this.name = "QueueError"
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500, "DATABASE_ERROR")
    this.name = "DatabaseError"
  }
}

export class QuotaExceededError extends AppError {
  constructor(message = "Free plan quota exceeded. Upgrade to generate more posts.") {
    super(message, 403, "QUOTA_EXCEEDED")
    this.name = "QuotaExceededError"
  }
}
