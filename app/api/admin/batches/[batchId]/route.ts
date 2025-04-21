import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { batchId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const batch = await prisma.batch.findUnique({
      where: {
        id: params.batchId,
      },
      include: {
        course: true,
        admissions: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                registrationNo: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    })

    if (!batch) {
      return new NextResponse("Batch not found", { status: 404 })
    }

    return NextResponse.json(batch)
  } catch (error) {
    console.error("[BATCH_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { batchId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { name, startDate, endDate, capacity, schedule, isActive } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    // Check if batch exists
    const batch = await prisma.batch.findUnique({
      where: {
        id: params.batchId,
      },
    })

    if (!batch) {
      return new NextResponse("Batch not found", { status: 404 })
    }

    // Update batch
    const updatedBatch = await prisma.batch.update({
      where: {
        id: params.batchId,
      },
      data: {
        name,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : endDate ? new Date(endDate) : null,
        capacity: capacity || undefined,
        schedule: schedule || undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    })

    return NextResponse.json(updatedBatch)
  } catch (error) {
    console.error("[BATCH_PUT]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { batchId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if batch exists
    const batch = await prisma.batch.findUnique({
      where: {
        id: params.batchId,
      },
    })

    if (!batch) {
      return new NextResponse("Batch not found", { status: 404 })
    }

    // Delete batch
    await prisma.batch.delete({
      where: {
        id: params.batchId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[BATCH_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
