import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { certificateNo, studentName, courseName } = body

    if (!certificateNo) {
      return new NextResponse("Certificate number is required", { status: 400 })
    }

    const certificate = await prisma.certificate.findUnique({
      where: {
        certificateNo,
      },
      include: {
        student: true,
      },
    })

    if (!certificate) {
      return NextResponse.json({ verified: false, message: "Certificate not found" })
    }

    // If student name is provided, check if it matches
    if (studentName && certificate.student.name.toLowerCase() !== studentName.toLowerCase()) {
      return NextResponse.json({ verified: false, message: "Student name does not match" })
    }

    // If course name is provided, check if it matches
    if (courseName && certificate.courseTitle.toLowerCase() !== courseName.toLowerCase()) {
      return NextResponse.json({ verified: false, message: "Course name does not match" })
    }

    return NextResponse.json({
      verified: true,
      certificate: {
        certificateNo: certificate.certificateNo,
        studentName: certificate.student.name,
        courseTitle: certificate.courseTitle,
        issueDate: certificate.issueDate,
        status: certificate.status,
      },
    })
  } catch (error) {
    console.error("[CERTIFICATE_VERIFICATION]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
