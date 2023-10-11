import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    !request.nextUrl.pathname.startsWith("/leaderboard") &&
    !request.nextUrl.pathname.startsWith("/profile") &&
    !request.nextUrl.pathname.startsWith("/activity")
  )
    return NextResponse.redirect(new URL("/leaderboard", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|usdc.png).*)",
    "/",
  ],
};
