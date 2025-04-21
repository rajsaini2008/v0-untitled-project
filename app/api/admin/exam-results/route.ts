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

    const results = await prisma.examResult.findMany({
      include: {
        student: true,
        exam: {
          include: {
            paper: true,
            course: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error("[EXAM_RESULTS_GET]", error)
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

    const { studentId, examId, marks, remarks } = body

    if (!studentId || !examId || marks === undefined) {
      return new NextResponse("Student ID, Exam ID and Marks are required", { status: 400 })
    }

    // Get exam details to determine pass/fail
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { paper: true },
    })

    if (!exam) {
      return new NextResponse("Exam not found", { status: 404 })
    }

    const status = marks >= exam.paper.passingMarks ? "pass" : "fail"

    const result = await prisma.examResult.create({
      data: {
        studentId,
        examId,
        marks,
        status,
        remarks,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[EXAM_RESULTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
