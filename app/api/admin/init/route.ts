import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        username: "rajsaini",
        role: "ADMIN",
      },
    })

    if (existingAdmin) {
      // Reset password if admin exists
      const hashedPassword = await hash("12345678", 10)
      await prisma.user.update({
        where: { id: existingAdmin.id },
        data: { hashedPassword },
      })
      return NextResponse.json({
        success: true,
        message: "Admin user password reset successfully",
      })
    }

    // Create admin user if it doesn't exist
    const hashedPassword = await hash("12345678", 10)
    await prisma.user.create({
      data: {
        name: "Raj Saini",
        email: "admin@example.com",
        username: "rajsaini",
        hashedPassword,
        role: "ADMIN",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
    })
  } catch (error) {
    console.error("Error initializing admin user:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to initialize admin user",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
