import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")

    const query = courseId ? { courseId } : {}

    const batches = await prisma.batch.findMany({
      where: query,
      include: {
        course: {
          select: {
            title: true,
          },
        },
        _count: {
          select: {
            admissions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(batches)
  } catch (error) {
    console.error("[BATCHES_GET]", error)
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

    const { name, courseId, startDate, endDate, capacity, schedule, isActive } = body

    if (!name || !courseId || !startDate) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    })

    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    const batch = await prisma.batch.create({
      data: {
        name,
        courseId,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        capacity: capacity || 30,
        schedule: schedule || null,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(batch)
  } catch (error) {
    console.error("[BATCHES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
