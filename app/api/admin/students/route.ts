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

    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(students)
  } catch (error) {
    console.error("[STUDENTS_GET]", error)
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

    const { name, email, phone, address, city, state, pincode, dateOfBirth, gender, photo } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    // Generate registration number
    const currentYear = new Date().getFullYear().toString().slice(-2)
    const count = await prisma.student.count()
    const registrationNo = `KC${currentYear}${(count + 1).toString().padStart(4, "0")}`

    const student = await prisma.student.create({
      data: {
        registrationNo,
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        photo,
        wallet: {
          create: {
            balance: 0,
          },
        },
      },
    })

    return NextResponse.json(student)
  } catch (error) {
    console.error("[STUDENTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
