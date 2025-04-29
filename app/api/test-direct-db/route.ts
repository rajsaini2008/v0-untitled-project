import { NextResponse } from "next/server"
import { query } from "@/lib/direct-db"

export async function GET() {
  try {
    // Try to connect to the database
    const result = await query("SELECT NOW()")

    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      timestamp: result.rows[0].now,
    })
  } catch (error) {
    console.error("Database connection error:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
