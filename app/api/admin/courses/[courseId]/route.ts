import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { courseId } = params

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        subjects: {
          include: {
            subject: true,
          },
        },
      },
    })

    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error("[COURSE_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { courseId } = params
    const body = await req.json()

    const { title, fullTitle, category, duration, description, image, fee, isActive } = body

    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        title,
        fullTitle,
        category,
        duration,
        description,
        image,
        fee: fee ? Number.parseFloat(fee) : null,
        isActive,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error("[COURSE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { courseId } = params

    await prisma.course.delete({
      where: {
        id: courseId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[COURSE_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
