import { PrismaClient } from "@prisma/client"

async function checkDatabaseConnection() {
  const prisma = new PrismaClient()

  try {
    console.log("Checking database connection...")
    // Try a simple query to check connection
    await prisma.$queryRaw`SELECT 1`
    console.log("Database connection successful!")
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabaseConnection()
  .then((success) => {
    if (!success) {
      console.error("Database check failed. Please check your connection string.")
      process.exit(1)
    }
  })
  .catch((error) => {
    console.error("Error running database check:", error)
    process.exit(1)
  })
