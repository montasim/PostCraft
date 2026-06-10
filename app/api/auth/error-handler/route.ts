import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const error = searchParams.get("error")

  // Redirect to settings page with the error so it can be displayed
  const targetUrl = new URL("/settings", request.url)
  if (error) {
    targetUrl.searchParams.set("error", error)
  }

  return NextResponse.redirect(targetUrl)
}
