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

    const subjects = await prisma.subject.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(subjects)
  } catch (error) {
    console.error("[SUBJECTS_GET]", error)
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

    const { name, code, description } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const subject = await prisma.subject.create({
      data: {
        name,
        code,
        description,
      },
    })

    return NextResponse.json(subject)
  } catch (error) {
    console.error("[SUBJECTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
