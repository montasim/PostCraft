import { auth } from "./auth"
import { headers } from "next/headers"
import { UnauthorizedError } from "@/core/errors/app-error"

export async function getAuthSession() {
  return auth.api.getSession({
    headers: await headers(),
  })
}

export async function getWorkspaceId(): Promise<string> {
  const session = await getAuthSession()
  if (!session?.user?.id) {
    throw new UnauthorizedError("Authentication required")
  }
  return `ws_${session.user.id}`
}

export async function getUserId(): Promise<string> {
  const session = await getAuthSession()
  if (!session?.user?.id) {
    throw new UnauthorizedError("Authentication required")
  }
  return session.user.id
}
