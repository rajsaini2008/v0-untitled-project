import { PrismaClient } from "@prisma/client"

// This script initializes the database schema
async function initDb() {
  console.log("Initializing database schema...")

  const prisma = new PrismaClient()

  try {
    // Test the connection
    await prisma.$queryRaw`SELECT 1`
    console.log("Database connection successful")

    // Check if any tables exist
    const tableCount = await prisma.$queryRaw`
      SELECT count(*) 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `

    console.log("Table count:", tableCount)

    // Create a simple test user to verify schema creation
    const testUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        role: "USER",
      },
    })

    console.log("Test user created:", testUser.id)

    // Delete the test user
    await prisma.user.delete({
      where: { id: testUser.id },
    })

    console.log("Test user deleted")

    console.log("Database initialization completed successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

initDb()
