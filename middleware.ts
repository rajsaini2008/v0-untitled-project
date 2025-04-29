import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path starts with /admin
  const isAdminPath = pathname.startsWith("/admin")

  // Skip middleware for API routes and public files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Check if user is authenticated and has admin role for admin routes
  if (isAdminPath) {
    // Exclude the login page from protection
    if (pathname === "/admin/login") {
      // If user is already logged in and is an admin, redirect to dashboard
      if (token && token.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      }
      // Otherwise, allow access to login page
      return NextResponse.next()
    }

    // For all other admin routes, check if user is authenticated and is an admin
    if (!token || token.role !== "ADMIN") {
      // Redirect to admin login if not authenticated or not an admin
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Allow access to all other routes
  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
