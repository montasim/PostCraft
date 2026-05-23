import { auth } from "./auth"
import { headers } from "next/headers"
import { getEnv } from "@/core/config/env"

export async function getAuthSession() {
  return auth.api.getSession({
    headers: await headers(),
  })
}

export async function getWorkspaceId(): Promise<string> {
  const session = await getAuthSession()
  if (session?.user?.id) {
    return `ws_${session.user.id}`
  }
  return getEnv().DEFAULT_WORKSPACE_ID
}

export async function getUserId(): Promise<string> {
  const session = await getAuthSession()
  return session?.user?.id ?? "user_default"
}
