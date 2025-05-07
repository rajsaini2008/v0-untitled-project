import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Course from "@/models/Course"

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Parse the request body
    const body = await request.json()

    // Create a new course
    const course = await Course.create(body)

    return NextResponse.json({ success: true, data: course }, { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while creating the course" },
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
      // Get a specific course
      const course = await Course.findById(id).populate("subjects")

      if (!course) {
        return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, data: course })
    }

    // Get all courses
    const courses = await Course.find({}).populate("subjects").sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: courses })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ success: false, message: "An error occurred while fetching courses" }, { status: 500 })
  }
}
