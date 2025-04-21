"use server"

import prisma from "@/lib/prisma"

export async function verifyCertificate(formData: FormData) {
  const certificateNo = formData.get("certificate-number") as string
  const studentName = formData.get("student-name") as string
  const courseName = formData.get("course-name") as string

  if (!certificateNo) {
    return {
      success: false,
      message: "Certificate number is required",
    }
  }

  try {
    const certificate = await prisma.certificate.findUnique({
      where: {
        certificateNo,
      },
      include: {
        student: true,
      },
    })

    if (!certificate) {
      return {
        success: false,
        message: "Certificate not found",
      }
    }

    // If student name is provided, check if it matches
    if (studentName && certificate.student.name.toLowerCase() !== studentName.toLowerCase()) {
      return {
        success: false,
        message: "Student name does not match",
      }
    }

    // If course name is provided, check if it matches
    if (courseName && certificate.courseTitle.toLowerCase() !== courseName.toLowerCase()) {
      return {
        success: false,
        message: "Course name does not match",
      }
    }

    return {
      success: true,
      certificate: {
        certificateNo: certificate.certificateNo,
        studentName: certificate.student.name,
        courseTitle: certificate.courseTitle,
        issueDate: certificate.issueDate,
        status: certificate.status,
      },
    }
  } catch (error) {
    console.error("Error verifying certificate:", error)
    return {
      success: false,
      message: "An error occurred while verifying the certificate",
    }
  }
}
