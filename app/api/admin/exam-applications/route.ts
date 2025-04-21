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

    const applications = await prisma.examApplication.findMany({
      include: {
        admission: {
          include: {
            student: true,
            course: true,
          },
        },
        exam: {
          include: {
            paper: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("[EXAM_APPLICATIONS_GET]", error)
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

    const { admissionId, examId } = body

    if (!admissionId || !examId) {
      return new NextResponse("Admission ID and Exam ID are required", { status: 400 })
    }

    // Check if application already exists
    const existingApplication = await prisma.examApplication.findFirst({
      where: {
        admissionId,
        examId,
      },
    })

    if (existingApplication) {
      return new NextResponse("Application already exists", { status: 400 })
    }

    // Generate OTP for exam
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const application = await prisma.examApplication.create({
      data: {
        admissionId,
        examId,
        status: "pending",
        otp,
      },
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error("[EXAM_APPLICATIONS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
