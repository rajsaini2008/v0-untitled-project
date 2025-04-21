const { execSync } = require("child_process")

try {
  // Step 1: Generate Prisma Client
  console.log("Generating Prisma Client...")
  execSync("npx prisma generate", { stdio: "inherit" })

  // Step 2: Push schema to database
  console.log("Pushing schema to database...")
  try {
    execSync("npx prisma db push --accept-data-loss", { stdio: "inherit" })
  } catch (error) {
    console.warn("Warning: Database push failed, but continuing with build:", error.message)
    // Continue with build even if db push fails
  }

  // Step 3: Build Next.js app
  console.log("Building Next.js application...")
  execSync("next build", { stdio: "inherit" })

  console.log("Build completed successfully!")
} catch (error) {
  console.error("Build failed:", error.message)
  process.exit(1)
}
