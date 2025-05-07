import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Background from "@/models/Background"

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Parse the request body
    const body = await request.json()

    // Create a new background
    const background = await Background.create(body)

    return NextResponse.json({ success: true, data: background }, { status: 201 })
  } catch (error) {
    console.error("Error creating background:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while creating the background" },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Get the URL parameters
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const type = searchParams.get("type")

    if (id) {
      // Get a specific background
      const background = await Background.findById(id)

      if (!background) {
        return NextResponse.json({ success: false, message: "Background not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, data: background })
    }

    // Get backgrounds by type if specified
    if (type) {
      const backgrounds = await Background.find({ type }).sort({ createdAt: -1 })
      return NextResponse.json({ success: true, data: backgrounds })
    }

    // Get all backgrounds
    const backgrounds = await Background.find({}).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: backgrounds })
  } catch (error) {
    console.error("Error fetching backgrounds:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching backgrounds" },
      { status: 500 },
    )
  }
}
