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
    const batchId = searchParams.get("batchId")
    const fromDate = searchParams.get("fromDate")
    const toDate = searchParams.get("toDate")

    let dateFilter = {}
    if (fromDate && toDate) {
      dateFilter = {
        date: {
          gte: new Date(fromDate),
          lte: new Date(toDate),
        },
      }
    } else if (fromDate) {
      dateFilter = {
        date: {
          gte: new Date(fromDate),
        },
      }
    } else if (toDate) {
      dateFilter = {
        date: {
          lte: new Date(toDate),
        },
      }
    }

    const query = {
      ...(batchId ? { batchId } : {}),
      ...dateFilter,
    }

    const attendanceSessions = await prisma.attendanceSession.findMany({
      where: query,
      include: {
        batch: {
          select: {
            name: true,
            course: {
              select: {
                title: true,
              },
            },
          },
        },
        _count: {
          select: {
            attendances: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    })

    return NextResponse.json(attendanceSessions)
  } catch (error) {
    console.error("[ATTENDANCE_SESSIONS_GET]", error)
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

    const { batchId, date, subjectId, topic, notes } = body

    if (!batchId || !date) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Check if batch exists
    const batch = await prisma.batch.findUnique({
      where: {
        id: batchId,
      },
      include: {
        admissions: {
          where: {
            status: "active",
          },
          select: {
            studentId: true,
          },
        },
      },
    })

    if (!batch) {
      return new NextResponse("Batch not found", { status: 404 })
    }

    // Create attendance session
    const attendanceSession = await prisma.attendanceSession.create({
      data: {
        batchId,
        date: new Date(date),
        subjectId,
        topic,
        notes,
      },
    })

    // Create attendance records for all students in the batch
    if (batch.admissions.length > 0) {
      const attendanceData = batch.admissions.map((admission) => ({
        sessionId: attendanceSession.id,
        studentId: admission.studentId,
        status: "PRESENT", // Default status
      }))

      await prisma.attendance.createMany({
        data: attendanceData,
      })
    }

    return NextResponse.json(attendanceSession)
  } catch (error) {
    console.error("[ATTENDANCE_SESSIONS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
