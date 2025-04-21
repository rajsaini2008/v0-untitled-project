import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { paperId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { paperId } = params

    const questions = await prisma.question.findMany({
      where: {
        paperId,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return NextResponse.json(questions)
  } catch (error) {
    console.error("[QUESTIONS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request, { params }: { params: { paperId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { paperId } = params
    const body = await req.json()

    const { question, optionA, optionB, optionC, optionD, answer, marks } = body

    if (!question) {
      return new NextResponse("Question is required", { status: 400 })
    }

    const newQuestion = await prisma.question.create({
      data: {
        paperId,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
        marks: marks || 1,
      },
    })

    return NextResponse.json(newQuestion)
  } catch (error) {
    console.error("[QUESTIONS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
