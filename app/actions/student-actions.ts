"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { z } from "zod"

// Schema for student creation/update
const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  motherName: z.string().optional(),
  dob: z.string().transform((str) => new Date(str)),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pincode: z.string().min(6, "Pincode must be at least 6 characters"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  email: z.string().email().optional().or(z.literal("")),
  photo: z.string().optional(),
  aadharNo: z.string().optional(),
  education: z.string().optional(),
  centerId: z.string(),
})

export type StudentFormData = z.infer<typeof studentSchema>

// Get all students with pagination
export async function getStudents(page = 1, limit = 10, search = "", courseId = "", status = "", centerId = "") {
  const skip = (page - 1) * limit

  // Build filter conditions
  const where: any = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { registrationNo: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ]
  }

  if (centerId) {
    where.centerId = centerId
  }

  if (courseId) {
    where.enrollments = {
      some: {
        courseId,
      },
    }
  }

  if (status) {
    where.enrollments = {
      some: {
        status,
      },
    }
  }

  // Get total count for pagination
  const totalCount = await prisma.student.count({ where })

  // Get students with pagination
  const students = await prisma.student.findMany({
    where,
    include: {
      center: {
        select: {
          name: true,
        },
      },
      enrollments: {
        include: {
          course: {
            select: {
              name: true,
              code: true,
            },
          },
        },
        orderBy: {
          startDate: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  })

  return {
    students,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  }
}

// Get a single student by ID
export async function getStudentById(id: string) {
  return await prisma.student.findUnique({
    where: { id },
    include: {
      center: true,
      enrollments: {
        include: {
          course: true,
          marks: {
            include: {
              subject: true,
            },
          },
          certificate: true,
        },
      },
      examAttempts: {
        include: {
          exam: true,
        },
      },
      studentPayments: true,
    },
  })
}

// Create a new student
export async function createStudent(data: StudentFormData) {
  try {
    // Validate input data
    const validatedData = studentSchema.parse(data)

    // Generate a unique registration number
    const year = new Date().getFullYear()
    const lastStudent = await prisma.student.findFirst({
      where: {
        registrationNo: {
          startsWith: `KC-${year}-`,
        },
      },
      orderBy: {
        registrationNo: "desc",
      },
    })

    let regNumber = 1001
    if (lastStudent) {
      const lastRegNumber = Number.parseInt(lastStudent.registrationNo.split("-")[2])
      regNumber = lastRegNumber + 1
    }

    const registrationNo = `KC-${year}-${regNumber}`

    // Create the student
    const student = await prisma.student.create({
      data: {
        ...validatedData,
        registrationNo,
      },
    })

    revalidatePath("/admin/students")
    return { success: true, student }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to create student" }
  }
}

// Update a student
export async function updateStudent(id: string, data: StudentFormData) {
  try {
    // Validate input data
    const validatedData = studentSchema.parse(data)

    // Update the student
    const student = await prisma.student.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath(`/admin/students/${id}`)
    revalidatePath("/admin/students")
    return { success: true, student }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to update student" }
  }
}

// Delete a student
export async function deleteStudent(id: string) {
  try {
    // Check if student has enrollments
    const studentWithEnrollments = await prisma.student.findUnique({
      where: { id },
      include: {
        enrollments: true,
      },
    })

    if (studentWithEnrollments?.enrollments.length) {
      return { success: false, error: "Cannot delete student with active enrollments" }
    }

    // Delete the student
    await prisma.student.delete({
      where: { id },
    })

    revalidatePath("/admin/students")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete student" }
  }
}

// Update student marks
export async function updateStudentMarks(
  enrollmentId: string,
  subjectId: string,
  marksObtained: number,
  maxMarks: number,
  examDate: string,
) {
  try {
    // Check if marks already exist
    const existingMarks = await prisma.mark.findFirst({
      where: {
        enrollmentId,
        subjectId,
      },
    })

    if (existingMarks) {
      // Update existing marks
      await prisma.mark.update({
        where: { id: existingMarks.id },
        data: {
          marksObtained,
          maxMarks,
          examDate: new Date(examDate),
        },
      })
    } else {
      // Create new marks
      await prisma.mark.create({
        data: {
          enrollmentId,
          subjectId,
          marksObtained,
          maxMarks,
          examDate: new Date(examDate),
        },
      })
    }

    // Get the student ID from the enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      select: { studentId: true },
    })

    if (enrollment) {
      revalidatePath(`/admin/students/${enrollment.studentId}/marks`)
      revalidatePath(`/admin/students/${enrollment.studentId}`)
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update marks" }
  }
}
