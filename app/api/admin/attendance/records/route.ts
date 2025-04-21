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
    const sessionId = searchParams.get("sessionId")
    const studentId = searchParams.get("studentId")

    if (!sessionId && !studentId) {
      return new NextResponse("Either sessionId or studentId is required", { status: 400 })
    }

    const query = {
      ...(sessionId ? { sessionId } : {}),
      ...(studentId ? { studentId } : {}),
    }

    const attendances = await prisma.attendance.findMany({
      where: query,
      include: {
        student: {
          select: {
            name: true,
            registrationNo: true,
          },
        },
        session: {
          select: {
            date: true,
            topic: true,
            batch: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(attendances)
  } catch (error) {
    console.error("[ATTENDANCE_RECORDS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { id, status, remarks } = body

    if (!id || !status) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Check if attendance record exists
    const attendance = await prisma.attendance.findUnique({
      where: {
        id,
      },
    })

    if (!attendance) {
      return new NextResponse("Attendance record not found", { status: 404 })
    }

    // Update attendance record
    const updatedAttendance = await prisma.attendance.update({
      where: {
        id,
      },
      data: {
        status,
        remarks,
      },
    })

    return NextResponse.json(updatedAttendance)
  } catch (error) {
    console.error("[ATTENDANCE_RECORDS_PUT]", error)
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

    const { sessionId, studentId, status, remarks } = body

    if (!sessionId || !studentId || !status) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Check if attendance record already exists
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        sessionId,
        studentId,
      },
    })

    if (existingAttendance) {
      // Update existing record
      const updatedAttendance = await prisma.attendance.update({
        where: {
          id: existingAttendance.id,
        },
        data: {
          status,
          remarks,
        },
      })

      return NextResponse.json(updatedAttendance)
    }

    // Create new attendance record
    const newAttendance = await prisma.attendance.create({
      data: {
        sessionId,
        studentId,
        status,
        remarks,
      },
    })

    return NextResponse.json(newAttendance)
  } catch (error) {
    console.error("[ATTENDANCE_RECORDS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
