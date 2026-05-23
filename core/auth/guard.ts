import { getAuthSession } from "./workspace"
import { UnauthorizedError } from "@/core/errors/app-error"

export async function requireAuth() {
  const session = await getAuthSession()
  if (!session?.user) {
    throw new UnauthorizedError("Authentication required")
  }
  return session
}
