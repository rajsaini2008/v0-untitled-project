import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const error = searchParams.get("error")

  let errorMessage = "An unknown authentication error occurred"
  let statusCode = 400

  // Map error codes to messages and status codes
  if (error === "CredentialsSignin") {
    errorMessage = "Invalid credentials"
    statusCode = 401
  } else if (error === "SessionRequired") {
    errorMessage = "Authentication required"
    statusCode = 401
  } else if (error === "AccessDenied") {
    errorMessage = "Access denied"
    statusCode = 403
  }

  return NextResponse.json({ error: errorMessage }, { status: statusCode })
}
