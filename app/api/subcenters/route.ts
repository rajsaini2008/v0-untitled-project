import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import SubCenter from "@/models/SubCenter"

export async function GET() {
  try {
    await connectToDatabase()
    const subcenters = await SubCenter.find().sort({ registrationDate: -1 })

    return NextResponse.json({ subcenters })
  } catch (error) {
    console.error("Error fetching subcenters:", error)
    return NextResponse.json({ error: "Failed to fetch subcenters" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await connectToDatabase()

    // Create new subcenter
    const subcenter = await SubCenter.create(data)

    return NextResponse.json({ subcenter }, { status: 201 })
  } catch (error) {
    console.error("Error creating subcenter:", error)

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return NextResponse.json({ error: `A subcenter with this ${field} already exists` }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create subcenter" }, { status: 500 })
  }
}
