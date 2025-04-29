import { PrismaClient } from "@prisma/client"

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Create a new PrismaClient instance
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })
}

// Use existing PrismaClient if it exists, otherwise create a new one
export const prisma = globalForPrisma.prisma || createPrismaClient()

// In development, attach PrismaClient to the `global` object
if (process.env.NODE_ENV !== "development") globalForPrisma.prisma = prisma

export default prisma
