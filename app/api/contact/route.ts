import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Contact from "@/models/Contact"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate input
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Connect to the database
    await dbConnect()

    // Create a new contact entry
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    })

    return NextResponse.json({ success: true, data: contact }, { status: 201 })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request" },
      { status: 500 },
    )
  }
}
