import { PrismaClient } from "@prisma/client"
import bcryptjs from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  try {
    console.log("Starting seed...")

    // Create default admin user
    const adminExists = await prisma.user.findFirst({
      where: {
        OR: [{ username: "rajsaini" }, { email: "admin@krishnacomputers.com" }],
      },
    })

    if (!adminExists) {
      console.log("Creating admin user...")
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

      console.log("Admin user created successfully")
    } else {
      console.log("Admin user already exists")
    }

    console.log("Seed completed successfully")
  } catch (error) {
    console.error("Error during seeding:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
