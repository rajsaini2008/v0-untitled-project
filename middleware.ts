import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname

  // Check if the path is for the admin panel
  if (path.startsWith("/admin")) {
    // Get the auth token from cookies
    const authToken = request.cookies.get("admin_token")?.value

    // If there's no token and the path is not the login page, redirect to login
    if (!authToken && path !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Check if the path is for the student portal
  if (path.startsWith("/student")) {
    // Get the student data from cookies or localStorage
    const studentData = request.cookies.get("student_data")?.value

    // If there's no student data, redirect to login
    if (!studentData && path !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*"],
}
