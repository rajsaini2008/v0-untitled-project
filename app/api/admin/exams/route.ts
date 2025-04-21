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

    const exams = await prisma.exam.findMany({
      include: {
        course: true,
        paper: true,
      },
      orderBy: {
        examDate: "desc",
      },
    })

    return NextResponse.json(exams)
  } catch (error) {
    console.error("[EXAMS_GET]", error)
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

    const { courseId, paperId, examDate, startTime, endTime, venue, isOnline } = body

    if (!courseId || !paperId || !examDate || !startTime || !endTime) {
      return new NextResponse("Course ID, Paper ID, Exam Date, Start Time and End Time are required", { status: 400 })
    }

    const exam = await prisma.exam.create({
      data: {
        courseId,
        paperId,
        examDate: new Date(examDate),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        venue,
        isOnline: isOnline || false,
        status: "scheduled",
      },
    })

    return NextResponse.json(exam)
  } catch (error) {
    console.error("[EXAMS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
