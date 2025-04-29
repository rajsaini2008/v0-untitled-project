import { NextResponse } from "next/server"
import { authenticateApiRequest } from "@/lib/custom-auth"

export async function GET(req: Request) {
  // Authenticate the request using our custom key
  const isAuthenticated = await authenticateApiRequest(req)

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // If authenticated, return protected data
  return NextResponse.json({
    message: "This is protected data",
    timestamp: new Date().toISOString(),
  })
}
