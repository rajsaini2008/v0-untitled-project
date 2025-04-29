"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { z } from "zod"

// Schema for enrollment creation/update
const enrollmentSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  status: z.enum(["ACTIVE", "COMPLETED", "DROPPED", "ON_HOLD"]).default("ACTIVE"),
})

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>

// Schema for payment creation
const paymentSchema = z.object({
  enrollmentId: z.string(),
  amount: z.number().min(0, "Amount cannot be negative"),
  paymentDate: z.string().transform((str) => new Date(str)),
  paymentMethod: z.enum(["CASH", "ONLINE", "CHEQUE", "UPI"]),
  reference: z.string().optional(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED", "REFUNDED"]).default("COMPLETED"),
})

export type PaymentFormData = z.infer<typeof paymentSchema>

// Get all enrollments with pagination
export async function getEnrollments(page = 1, limit = 10, search = "", courseId = "", status = "", centerId = "") {
  const skip = (page - 1) * limit

  // Build filter conditions
  const where: any = {}

  if (search) {
    where.OR = [
      {
        student: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { registrationNo: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        },
      },
    ]
  }

  if (courseId) {
    where.courseId = courseId
  }

  if (status) {
    where.status = status
  }

  if (centerId) {
    where.student = {
      centerId,
    }
  }

  // Get total count for pagination
  const totalCount = await prisma.enrollment.count({ where })

  // Get enrollments with pagination
  const enrollments = await prisma.enrollment.findMany({
    where,
    include: {
      student: {
        select: {
          id: true,
          name: true,
          registrationNo: true,
          phone: true,
          center: {
            select: {
              name: true,
              code: true,
            },
          },
        },
      },
      course: {
        select: {
          id: true,
          name: true,
          code: true,
          duration: true,
          fees: true,
        },
      },
      _count: {
        select: {
          payments: true,
          marks: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  })

  return {
    enrollments,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  }
}

// Get a single enrollment by ID
export async function getEnrollmentById(id: string) {
  return await prisma.enrollment.findUnique({
    where: { id },
    include: {
      student: true,
      course: {
        include: {
          subjects: true,
        },
      },
      marks: {
        include: {
          subject: true,
        },
      },
      payments: {
        orderBy: {
          paymentDate: "desc",
        },
      },
      certificate: true,
    },
  })
}

// Create a new enrollment
export async function createEnrollment(data: EnrollmentFormData) {
  try {
    // Validate input data
    const validatedData = enrollmentSchema.parse(data)

    // Check if student is already enrolled in the course
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: validatedData.studentId,
        courseId: validatedData.courseId,
        status: "ACTIVE",
      },
    })

    if (existingEnrollment) {
      return { success: false, error: "Student is already enrolled in this course" }
    }

    // Create the enrollment
    const enrollment = await prisma.enrollment.create({
      data: validatedData,
    })

    revalidatePath(`/admin/students/${data.studentId}`)
    revalidatePath("/admin/enrollments")
    return { success: true, enrollment }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to create enrollment" }
  }
}

// Update an enrollment
export async function updateEnrollment(id: string, data: EnrollmentFormData) {
  try {
    // Validate input data
    const validatedData = enrollmentSchema.parse(data)

    // Update the enrollment
    const enrollment = await prisma.enrollment.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath(`/admin/enrollments/${id}`)
    revalidatePath(`/admin/students/${data.studentId}`)
    revalidatePath("/admin/enrollments")
    return { success: true, enrollment }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to update enrollment" }
  }
}

// Delete an enrollment
export async function deleteEnrollment(id: string) {
  try {
    // Get the enrollment to find the studentId for revalidation
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      select: { studentId: true },
    })

    // Check if enrollment has marks, payments, or certificate
    const enrollmentWithRelations = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            marks: true,
            payments: true,
          },
        },
        certificate: true,
      },
    })

    if (
      enrollmentWithRelations?._count.marks ||
      enrollmentWithRelations?._count.payments ||
      enrollmentWithRelations?.certificate
    ) {
      return {
        success: false,
        error: "Cannot delete enrollment with associated marks, payments, or certificate",
      }
    }

    // Delete the enrollment
    await prisma.enrollment.delete({
      where: { id },
    })

    if (enrollment?.studentId) {
      revalidatePath(`/admin/students/${enrollment.studentId}`)
    }
    revalidatePath("/admin/enrollments")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete enrollment" }
  }
}

// Create a new payment
export async function createPayment(data: PaymentFormData) {
  try {
    // Validate input data
    const validatedData = paymentSchema.parse(data)

    // Create the payment
    const payment = await prisma.payment.create({
      data: validatedData,
    })

    // Get the enrollment to find the studentId for revalidation
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: data.enrollmentId },
      select: { studentId: true },
    })

    if (enrollment?.studentId) {
      revalidatePath(`/admin/students/${enrollment.studentId}`)
    }
    revalidatePath(`/admin/enrollments/${data.enrollmentId}`)
    return { success: true, payment }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to create payment" }
  }
}

// Update a payment
export async function updatePayment(id: string, data: PaymentFormData) {
  try {
    // Validate input data
    const validatedData = paymentSchema.parse(data)

    // Update the payment
    const payment = await prisma.payment.update({
      where: { id },
      data: validatedData,
    })

    // Get the enrollment to find the studentId for revalidation
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: data.enrollmentId },
      select: { studentId: true },
    })

    if (enrollment?.studentId) {
      revalidatePath(`/admin/students/${enrollment.studentId}`)
    }
    revalidatePath(`/admin/enrollments/${data.enrollmentId}`)
    return { success: true, payment }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to update payment" }
  }
}

// Delete a payment
export async function deletePayment(id: string) {
  try {
    // Get the payment to find the enrollmentId for revalidation
    const payment = await prisma.payment.findUnique({
      where: { id },
      select: { enrollmentId: true },
    })

    // Delete the payment
    await prisma.payment.delete({
      where: { id },
    })

    if (payment?.enrollmentId) {
      // Get the enrollment to find the studentId for revalidation
      const enrollment = await prisma.enrollment.findUnique({
        where: { id: payment.enrollmentId },
        select: { studentId: true },
      })

      if (enrollment?.studentId) {
        revalidatePath(`/admin/students/${enrollment.studentId}`)
      }
      revalidatePath(`/admin/enrollments/${payment.enrollmentId}`)
    }
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete payment" }
  }
}
