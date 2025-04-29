// Environment variables validation and access
import { z } from "zod"

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  raj_123: z.string().min(1),
})

// Validate environment variables
function validateEnv() {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors)
    throw new Error("Invalid environment variables")
  }
}

// Call validation function
validateEnv()

// Export validated environment variables
export const env = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL,
  raj_123: process.env.raj_123!,
}
