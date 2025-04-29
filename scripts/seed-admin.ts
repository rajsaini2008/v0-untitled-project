import { PrismaClient } from "@prisma/client"
import bcryptjs from "bcryptjs"

// This script can be run manually to ensure the admin user exists
async function seedAdmin() {
  console.log("Starting admin seed script...")

  const prisma = new PrismaClient()

  try {
    // Create default admin user
    const adminExists = await prisma.user.findFirst({
      where: {
        OR: [{ username: "rajsaini" }, { email: "admin@krishnacomputers.com" }],
      },
    })

    if (!adminExists) {
      console.log("Creating default admin user...")
      const hashedPassword = await bcryptjs.hash("12345678", 12)

      await prisma.user.create({
        data: {
          name: "Raj Saini",
          username: "rajsaini",
          email: "admin@krishnacomputers.com",
          hashedPassword,
          role: "ADMIN",
        },
      })

      console.log("Default admin user created successfully")
    } else {
      console.log("Admin user already exists, updating password...")
      // Update the password to ensure it's correct
      const hashedPassword = await bcryptjs.hash("12345678", 12)

      await prisma.user.update({
        where: { id: adminExists.id },
        data: {
          hashedPassword,
        },
      })

      console.log("Admin password updated successfully")
    }
  } catch (error) {
    console.error("Error in seed script:", error)
  } finally {
    await prisma.$disconnect()
    console.log("Seed script completed")
  }
}

seedAdmin()
