import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        title: "asc",
      },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error("[COURSES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
