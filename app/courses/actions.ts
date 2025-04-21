"use server"

import prisma from "@/lib/prisma"

export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        title: "asc",
      },
    })

    return {
      success: true,
      courses,
    }
  } catch (error) {
    console.error("Error fetching courses:", error)
    return {
      success: false,
      message: "Failed to fetch courses",
    }
  }
}
