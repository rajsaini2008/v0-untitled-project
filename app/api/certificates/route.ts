import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Certificate from "@/models/Certificate"

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Parse the request body
    const body = await request.json()

    // Create a new certificate
    const certificate = await Certificate.create(body)

    return NextResponse.json({ success: true, data: certificate }, { status: 201 })
  } catch (error) {
    console.error("Error creating certificate:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while creating the certificate" },
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
    const studentId = searchParams.get("studentId")

    if (id) {
      // Get a specific certificate
      const certificate = await Certificate.findById(id).populate("student course backgroundTemplate")

      if (!certificate) {
        return NextResponse.json({ success: false, message: "Certificate not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, data: certificate })
    }

    // Get certificates by student if specified
    if (studentId) {
      const certificates = await Certificate.find({ student: studentId })
        .populate("student course backgroundTemplate")
        .sort({ createdAt: -1 })
      return NextResponse.json({ success: true, data: certificates })
    }

    // Get all certificates
    const certificates = await Certificate.find({})
      .populate("student course backgroundTemplate")
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: certificates })
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching certificates" },
      { status: 500 },
    )
  }
}
