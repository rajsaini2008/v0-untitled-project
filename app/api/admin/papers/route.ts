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

    const papers = await prisma.paper.findMany({
      include: {
        subject: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(papers)
  } catch (error) {
    console.error("[PAPERS_GET]", error)
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

    const { title, subjectId, totalMarks, passingMarks, duration, instructions, isActive } = body

    if (!title || !subjectId) {
      return new NextResponse("Title and Subject ID are required", { status: 400 })
    }

    const paper = await prisma.paper.create({
      data: {
        title,
        subjectId,
        totalMarks: totalMarks || 100,
        passingMarks: passingMarks || 35,
        duration: duration || 60,
        instructions,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(paper)
  } catch (error) {
    console.error("[PAPERS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
