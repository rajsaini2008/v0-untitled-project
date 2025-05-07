import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import SubCenter from "@/models/SubCenter"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const subcenter = await SubCenter.findById(params.id)

    if (!subcenter) {
      return NextResponse.json({ error: "Sub Center not found" }, { status: 404 })
    }

    return NextResponse.json({ subcenter })
  } catch (error) {
    console.error("Error fetching subcenter:", error)
    return NextResponse.json({ error: "Failed to fetch subcenter" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    await connectToDatabase()

    const subcenter = await SubCenter.findByIdAndUpdate(params.id, data, { new: true })

    if (!subcenter) {
      return NextResponse.json({ error: "Sub Center not found" }, { status: 404 })
    }

    return NextResponse.json({ subcenter })
  } catch (error) {
    console.error("Error updating subcenter:", error)
    return NextResponse.json({ error: "Failed to update subcenter" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const subcenter = await SubCenter.findByIdAndDelete(params.id)

    if (!subcenter) {
      return NextResponse.json({ error: "Sub Center not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Sub Center deleted successfully" })
  } catch (error) {
    console.error("Error deleting subcenter:", error)
    return NextResponse.json({ error: "Failed to delete subcenter" }, { status: 500 })
  }
}
