import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"
import { API } from "@/lib/constants"

const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
]
const PUBLIC_ROUTES = ["/privacy"]
const API_AUTH_PREFIX = API.AUTH_PREFIX
const API_INNGEST_PREFIX = API.INNGEST_PREFIX

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith(API_AUTH_PREFIX) ||
    pathname.startsWith(API_INNGEST_PREFIX)
  ) {
    return NextResponse.next()
  }

  const sessionCookie = getSessionCookie(request)
  const isAuthenticated = !!sessionCookie
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!isAuthenticated && !isAuthRoute && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
