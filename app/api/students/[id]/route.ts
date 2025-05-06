import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Student from "@/models/Student"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Get the student
    const student = await Student.findById(params.id).populate("course")

    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    console.error("Error fetching student:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching the student" },
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

    // Update the student
    const student = await Student.findByIdAndUpdate(params.id, body, { new: true })

    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    console.error("Error updating student:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the student" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Delete the student
    const student = await Student.findByIdAndDelete(params.id)

    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    console.error("Error deleting student:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while deleting the student" },
      { status: 500 },
    )
  }
}
