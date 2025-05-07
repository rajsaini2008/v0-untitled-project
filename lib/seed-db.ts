import { connectToDatabase } from "./mongodb"
import User from "@/models/User"
import Course from "@/models/Course"

export async function seedDatabase() {
  try {
    await connectToDatabase()

    // Check if admin user exists
    const adminExists = await User.findOne({ role: "admin" })

    if (!adminExists) {
      // Create admin user
      await User.create({
        name: "Admin",
        email: "admin@krishnacomputers.com",
        password: "admin123",
        role: "admin",
      })
      console.log("Admin user created")
    }

    // Check if default courses exist
    const coursesExist = await Course.countDocuments()

    if (coursesExist === 0) {
      // Create default courses
      await Course.insertMany([
        {
          name: "Diploma in Computer Applications",
          code: "DCA",
          duration: "6 months",
          description: "Basic computer applications course covering MS Office, Internet, and more.",
          fee: 5000,
        },
        {
          name: "Advanced Diploma in Computer Applications",
          code: "ADCA",
          duration: "1 year",
          description: "Advanced computer applications including programming basics.",
          fee: 10000,
        },
        {
          name: "Certificate in Financial Accounting",
          code: "CFA",
          duration: "3 months",
          description: "Learn Tally and financial accounting basics.",
          fee: 4000,
        },
      ])
      console.log("Default courses created")
    }

    console.log("Database seeded successfully")
    return { success: true }
  } catch (error) {
    console.error("Error seeding database:", error)
    return { success: false, error }
  }
}
