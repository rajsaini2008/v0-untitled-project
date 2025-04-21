import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error("[COURSES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { title, fullTitle, category, duration, description, image, fee, isActive } = body

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    const course = await prisma.course.create({
      data: {
        title,
        fullTitle,
        category,
        duration,
        description,
        image,
        fee: fee ? Number.parseFloat(fee) : null,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error("[COURSES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
