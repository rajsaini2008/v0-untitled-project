"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { z } from "zod"

// Schema for exam creation/update
const examSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  courseId: z.string(),
  subjectId: z.string().optional(),
  examDate: z.string().transform((str) => new Date(str)),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  totalMarks: z.number().min(1, "Total marks must be at least 1"),
  passingMarks: z.number().min(0, "Passing marks cannot be negative"),
  isOnline: z.boolean().default(false),
  centerId: z.string(),
})

export type ExamFormData = z.infer<typeof examSchema>

// Schema for question creation/update
const questionSchema = z.object({
  examId: z.string(),
  questionText: z.string().min(2, "Question text must be at least 2 characters"),
  questionType: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK", "DESCRIPTIVE"]),
  options: z.any().optional(),
  correctAnswer: z.string(),
  marks: z.number().min(0, "Marks cannot be negative"),
})

export type QuestionFormData = z.infer<typeof questionSchema>

// Get all exams with pagination
export async function getExams(page = 1, limit = 10, search = "", courseId = "", subjectId = "", centerId = "") {
  const skip = (page - 1) * limit

  // Build filter conditions
  const where: any = {}

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ]
  }

  if (courseId) {
    where.courseId = courseId
  }

  if (subjectId) {
    where.subjectId = subjectId
  }

  if (centerId) {
    where.centerId = centerId
  }

  // Get total count for pagination
  const totalCount = await prisma.exam.count({ where })

  // Get exams with pagination
  const exams = await prisma.exam.findMany({
    where,
    include: {
      course: {
        select: {
          name: true,
          code: true,
        },
      },
      subject: {
        select: {
          name: true,
          code: true,
        },
      },
      center: {
        select: {
          name: true,
          code: true,
        },
      },
      _count: {
        select: {
          questions: true,
          attempts: true,
        },
      },
    },
    orderBy: {
      examDate: "desc",
    },
    skip,
    take: limit,
  })

  return {
    exams,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  }
}

// Get a single exam by ID
export async function getExamById(id: string) {
  return await prisma.exam.findUnique({
    where: { id },
    include: {
      course: true,
      subject: true,
      center: true,
      questions: {
        orderBy: {
          createdAt: "asc",
        },
      },
      attempts: {
        take: 10,
        orderBy: {
          startTime: "desc",
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
          questions: true,
          attempts: true,
        },
      },
    },
  })
}

// Create a new exam
export async function createExam(data: ExamFormData) {
  try {
    // Validate input data
    const validatedData = examSchema.parse(data)

    // Create the exam
    const exam = await prisma.exam.create({
      data: validatedData,
    })

    revalidatePath("/admin/exams")
    return { success: true, exam }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to create exam" }
  }
}

// Update an exam
export async function updateExam(id: string, data: ExamFormData) {
  try {
    // Validate input data
    const validatedData = examSchema.parse(data)

    // Update the exam
    const exam = await prisma.exam.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath(`/admin/exams/${id}`)
    revalidatePath("/admin/exams")
    return { success: true, exam }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to update exam" }
  }
}

// Delete an exam
export async function deleteExam(id: string) {
  try {
    // Check if exam has questions or attempts
    const examWithRelations = await prisma.exam.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
      },
    })

    if (examWithRelations?._count.questions || examWithRelations?._count.attempts) {
      return {
        success: false,
        error: "Cannot delete exam with associated questions or attempts",
      }
    }

    // Delete the exam
    await prisma.exam.delete({
      where: { id },
    })

    revalidatePath("/admin/exams")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete exam" }
  }
}

// Create a new question
export async function createQuestion(data: QuestionFormData) {
  try {
    // Validate input data
    const validatedData = questionSchema.parse(data)

    // Create the question
    const question = await prisma.question.create({
      data: validatedData,
    })

    revalidatePath(`/admin/exams/${data.examId}`)
    return { success: true, question }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to create question" }
  }
}

// Update a question
export async function updateQuestion(id: string, data: QuestionFormData) {
  try {
    // Validate input data
    const validatedData = questionSchema.parse(data)

    // Update the question
    const question = await prisma.question.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath(`/admin/exams/${data.examId}`)
    return { success: true, question }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to update question" }
  }
}

// Delete a question
export async function deleteQuestion(id: string) {
  try {
    // Get the question to find the examId for revalidation
    const question = await prisma.question.findUnique({
      where: { id },
      select: { examId: true },
    })

    // Check if question has student answers
    const questionWithAnswers = await prisma.question.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            studentAnswers: true,
          },
        },
      },
    })

    if (questionWithAnswers?._count.studentAnswers) {
      return {
        success: false,
        error: "Cannot delete question with associated student answers",
      }
    }

    // Delete the question
    await prisma.question.delete({
      where: { id },
    })

    if (question?.examId) {
      revalidatePath(`/admin/exams/${question.examId}`)
    }
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete question" }
  }
}
