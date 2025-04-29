"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { z } from "zod"

// Schema for center creation/update
const centerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(2, "Code must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pincode: z.string().min(6, "Pincode must be at least 6 characters"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  isMainCenter: z.boolean().default(false),
  parentId: z.string().optional().nullable(),
})

export type CenterFormData = z.infer<typeof centerSchema>

// Get all centers with pagination
export async function getCenters(page = 1, limit = 10, search = "") {
  const skip = (page - 1) * limit

  // Build filter conditions
  const where: any = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
    ]
  }

  // Get total count for pagination
  const totalCount = await prisma.center.count({ where })

  // Get centers with pagination
  const centers = await prisma.center.findMany({
    where,
    include: {
      parent: {
        select: {
          name: true,
          code: true,
        },
      },
      _count: {
        select: {
          students: true,
          courses: true,
          subCenters: true,
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
    centers,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  }
}

// Get a single center by ID
export async function getCenterById(id: string) {
  return await prisma.center.findUnique({
    where: { id },
    include: {
      parent: true,
      subCenters: {
        select: {
          id: true,
          name: true,
          code: true,
          city: true,
          _count: {
            select: {
              students: true,
            },
          },
        },
      },
      students: {
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          registrationNo: true,
        },
      },
      courses: {
        select: {
          id: true,
          name: true,
          code: true,
          isActive: true,
        },
      },
      _count: {
        select: {
          students: true,
          courses: true,
          subCenters: true,
          users: true,
        },
      },
    },
  })
}

// Create a new center
export async function createCenter(data: CenterFormData) {
  try {
    // Validate input data
    const validatedData = centerSchema.parse(data)

    // Check if code already exists
    const existingCenter = await prisma.center.findUnique({
      where: { code: validatedData.code },
    })

    if (existingCenter) {
      return { success: false, error: "Center code already exists" }
    }

    // Create the center
    const center = await prisma.center.create({
      data: validatedData,
    })

    revalidatePath("/admin/centers")
    return { success: true, center }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to create center" }
  }
}

// Update a center
export async function updateCenter(id: string, data: CenterFormData) {
  try {
    // Validate input data
    const validatedData = centerSchema.parse(data)

    // Check if code already exists (excluding current center)
    const existingCenter = await prisma.center.findFirst({
      where: {
        code: validatedData.code,
        NOT: {
          id,
        },
      },
    })

    if (existingCenter) {
      return { success: false, error: "Center code already exists" }
    }

    // Update the center
    const center = await prisma.center.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath(`/admin/centers/${id}`)
    revalidatePath("/admin/centers")
    return { success: true, center }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: "Failed to update center" }
  }
}

// Delete a center
export async function deleteCenter(id: string) {
  try {
    // Check if center has students, courses, or sub-centers
    const centerWithRelations = await prisma.center.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            students: true,
            courses: true,
            subCenters: true,
            users: true,
          },
        },
      },
    })

    if (
      centerWithRelations?._count.students ||
      centerWithRelations?._count.courses ||
      centerWithRelations?._count.subCenters ||
      centerWithRelations?._count.users
    ) {
      return {
        success: false,
        error: "Cannot delete center with associated students, courses, sub-centers, or users",
      }
    }

    // Delete the center
    await prisma.center.delete({
      where: { id },
    })

    revalidatePath("/admin/centers")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete center" }
  }
}
