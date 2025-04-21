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

    const certificates = await prisma.certificate.findMany({
      include: {
        student: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(certificates)
  } catch (error) {
    console.error("[CERTIFICATES_GET]", error)
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

    const { studentId, courseTitle } = body

    if (!studentId || !courseTitle) {
      return new NextResponse("Student ID and Course Title are required", { status: 400 })
    }

    // Generate certificate number
    const currentYear = new Date().getFullYear().toString()
    const count = await prisma.certificate.count()
    const certificateNo = `KC-CERT-${currentYear}-${(count + 1).toString().padStart(4, "0")}`

    const certificate = await prisma.certificate.create({
      data: {
        studentId,
        certificateNo,
        courseTitle,
        issueDate: new Date(),
        status: "issued",
      },
    })

    return NextResponse.json(certificate)
  } catch (error) {
    console.error("[CERTIFICATES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
