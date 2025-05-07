import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Check if user is authenticated
  const isAuthenticated = !!token

  // Define protected routes
  const adminRoutes = pathname.startsWith("/admin")
  const atcRoutes = pathname.startsWith("/atc")
  const studentRoutes = pathname.startsWith("/student")
  const authRoutes = pathname.startsWith("/login")

  // Redirect logic
  if (!isAuthenticated && (adminRoutes || atcRoutes || studentRoutes)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Check user role for specific routes
  if (isAuthenticated) {
    const userRole = token.role as string

    // Redirect from login page if already authenticated
    if (authRoutes) {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      } else if (userRole === "atc") {
        return NextResponse.redirect(new URL("/atc/dashboard", request.url))
      } else if (userRole === "student") {
        return NextResponse.redirect(new URL("/student/dashboard", request.url))
      }
    }

    // Check if user has access to specific routes
    if (adminRoutes && userRole !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (atcRoutes && userRole !== "atc") {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (studentRoutes && userRole !== "student") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/atc/:path*", "/student/:path*", "/login"],
}
