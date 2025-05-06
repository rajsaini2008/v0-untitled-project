import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Course from "@/models/Course"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Get the course
    const course = await Course.findById(params.id).populate("subjects")

    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: course })
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching the course" },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Parse the request body
    const body = await request.json()

    // Update the course
    const course = await Course.findByIdAndUpdate(params.id, body, { new: true })

    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: course })
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the course" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Delete the course
    const course = await Course.findByIdAndDelete(params.id)

    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while deleting the course" },
      { status: 500 },
    )
  }
}
