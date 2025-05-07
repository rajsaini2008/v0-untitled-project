import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Student from "@/models/Student"

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Parse the request body
    const body = await request.json()

    // Create a new student
    const student = await Student.create(body)

    return NextResponse.json({ success: true, data: student }, { status: 201 })
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while creating the student" },
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

    if (id) {
      // Get a specific student
      const student = await Student.findById(id).populate("course")

      if (!student) {
        return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, data: student })
    }

    // Get all students
    const students = await Student.find({}).populate("course").sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ success: false, message: "An error occurred while fetching students" }, { status: 500 })
  }
}
