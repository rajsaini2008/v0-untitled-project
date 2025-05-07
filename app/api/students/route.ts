import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Student from "@/models/Student"

export async function GET() {
  try {
    await connectToDatabase()
    const students = await Student.find().populate("courseId").sort({ registrationDate: -1 })

    return NextResponse.json({ students })
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await connectToDatabase()

    // Create new student
    const student = await Student.create(data)

    return NextResponse.json({ student }, { status: 201 })
  } catch (error) {
    console.error("Error creating student:", error)

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return NextResponse.json({ error: `A student with this ${field} already exists` }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}
