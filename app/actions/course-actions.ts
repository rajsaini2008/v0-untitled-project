"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { z } from "zod"

// Schema for course creation/update
const courseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(2, "Code must be at least 2 characters"),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 month"),
  fees: z.number().min(0, "Fees cannot be negative"),
  isActive: z.boolean().default(true),
  centerId: z.string(),
})

export type CourseFormData = z.infer<typeof courseSchema>

// Schema for subject creation/update
const subjectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(2, "Code must be at least 2 characters"),
  description: z.string().optional(),
  courseId: z.string(),
})

export type SubjectFormData = z.infer<typeof subjectSchema>

// Get all courses with pagination
export async function getCourses(page = 1, limit = 10, search = "", centerId = "", isActive?: boolean) {
  const skip = (page - 1) * limit

  // Build filter conditions
  const where: any = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ]
  }

  if (centerId) {
    where.centerId = centerId
  }

  if (isActive !== undefined) {
    where.isActive = isActive
  }

  // Get total count for pagination
  const totalCount = await prisma.course.count({ where })

  // Get courses with pagination
  const courses = await prisma.course.findMany({
    where,
    include: {
      center: {
        select: {
          name: true,
          code: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
          subjects: true,
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
    courses,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  }
}

// Get a single course by ID
export async function getCourseById(id: string) {
  return await prisma.course.findUnique({
    where: { id },
    include: {
      center: true,
      subjects: {
        orderBy: {
          name: "asc",
        },
      },
      enrollments: {
        take: 5,
        orderBy: {
          startDate: "desc",
        },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              registrationNo: true,
            },
          },
        },
      },
      _count: {
        select: {
          enrollments: true,
          subjects: true,
          exams: true,
        },
      },
    },
  })
}

// Create a new course
export async function createCourse(data: CourseFormData) {
  try {
    // Validate input data
    const validatedData = courseSchema.parse(data)

    // Check if code already exists
    const existingCourse = await prisma.course.findUnique({
      where: { code: validatedData.code },
    })

    if (existingCourse) {
      return { success: false, error: "Course code already exists" }
    }

    // Create the course
    const course = await prisma.course.create({
      data: validatedData,
    })

    revalidatePath("/admin/courses")
    return { success: true, course }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to create course" }
  }
}

// Update a course
export async function updateCourse(id: string, data: CourseFormData) {
  try {
    // Validate input data
    const validatedData = courseSchema.parse(data)

    // Check if code already exists (excluding current course)
    const existingCourse = await prisma.course.findFirst({
      where: {
        code: validatedData.code,
        NOT: {
          id,
        },
      },
    })

    if (existingCourse) {
      return { success: false, error: "Course code already exists" }
    }

    // Update the course
    const course = await prisma.course.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath(`/admin/courses/${id}`)
    revalidatePath("/admin/courses")
    return { success: true, course }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to update course" }
  }
}

// Delete a course
export async function deleteCourse(id: string) {
  try {
    // Check if course has enrollments, subjects, or exams
    const courseWithRelations = await prisma.course.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            enrollments: true,
            subjects: true,
            exams: true,
          },
        },
      },
    })

    if (
      courseWithRelations?._count.enrollments ||
      courseWithRelations?._count.subjects ||
      courseWithRelations?._count.exams
    ) {
      return {
        success: false,
        error: "Cannot delete course with associated enrollments, subjects, or exams",
      }
    }

    // Delete the course
    await prisma.course.delete({
      where: { id },
    })

    revalidatePath("/admin/courses")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete course" }
  }
}

// Create a new subject
export async function createSubject(data: SubjectFormData) {
  try {
    // Validate input data
    const validatedData = subjectSchema.parse(data)

    // Check if code already exists
    const existingSubject = await prisma.subject.findUnique({
      where: { code: validatedData.code },
    })

    if (existingSubject) {
      return { success: false, error: "Subject code already exists" }
    }

    // Create the subject
    const subject = await prisma.subject.create({
      data: validatedData,
    })

    revalidatePath(`/admin/courses/${data.courseId}`)
    return { success: true, subject }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to create subject" }
  }
}

// Update a subject
export async function updateSubject(id: string, data: SubjectFormData) {
  try {
    // Validate input data
    const validatedData = subjectSchema.parse(data)

    // Check if code already exists (excluding current subject)
    const existingSubject = await prisma.subject.findFirst({
      where: {
        code: validatedData.code,
        NOT: {
          id,
        },
      },
    })

    if (existingSubject) {
      return { success: false, error: "Subject code already exists" }
    }

    // Update the subject
    const subject = await prisma.subject.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath(`/admin/courses/${data.courseId}`)
    return { success: true, subject }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to update subject" }
  }
}

// Delete a subject
export async function deleteSubject(id: string) {
  try {
    // Get the subject to find the courseId for revalidation
    const subject = await prisma.subject.findUnique({
      where: { id },
      select: { courseId: true },
    })

    // Check if subject has marks or exams
    const subjectWithRelations = await prisma.subject.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            marks: true,
            exams: true,
          },
        },
      },
    })

    if (subjectWithRelations?._count.marks || subjectWithRelations?._count.exams) {
      return {
        success: false,
        error: "Cannot delete subject with associated marks or exams",
      }
    }

    // Delete the subject
    await prisma.subject.delete({
      where: { id },
    })

    if (subject?.courseId) {
      revalidatePath(`/admin/courses/${subject.courseId}`)
    }
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete subject" }
  }
}
