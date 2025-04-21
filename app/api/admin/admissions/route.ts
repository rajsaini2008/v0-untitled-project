import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const admissions = await prisma.admission.findMany({
      include: {
        student: true,
        course: true,
        batch: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(admissions)
  } catch (error) {
    console.error("Error fetching admissions:", error)
    return NextResponse.json({ error: "Failed to fetch admissions" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const admission = await prisma.admission.create({
      data: {
        studentId: data.studentId,
        courseId: data.courseId,
        batchId: data.batchId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: data.status || "active",
      },
    })

    return NextResponse.json(admission)
  } catch (error) {
    console.error("Error creating admission:", error)
    return NextResponse.json({ error: "Failed to create admission" }, { status: 500 })
  }
}
