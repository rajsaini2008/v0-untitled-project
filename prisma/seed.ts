import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create default admin user
  const adminExists = await prisma.user.findUnique({
    where: {
      username: "rajsaini",
    },
  })

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("12345678", 12)

    await prisma.user.create({
      data: {
        name: "Raj Saini",
        username: "rajsaini",
        email: "admin@krishnacomputers.com",
        hashedPassword,
        role: "ADMIN",
      },
    })

    console.log("Default admin user created")
  } else {
    console.log("Admin user already exists")
  }

  // Create default pages for permissions
  const pages = [
    { name: "Dashboard", path: "/admin/dashboard", description: "Admin dashboard" },
    { name: "CMS Panel", path: "/admin/cms", description: "Content Management System" },
    { name: "Masters", path: "/admin/masters", description: "Master data management" },
    { name: "Enquiry", path: "/admin/enquiry", description: "Enquiry management" },
    { name: "Student", path: "/admin/student", description: "Student management" },
    { name: "Background", path: "/admin/background", description: "Background management" },
    { name: "Fee", path: "/admin/fee", description: "Fee management" },
    { name: "Student Exam", path: "/admin/exam", description: "Exam management" },
    { name: "Certificate", path: "/admin/certificate", description: "Certificate management" },
    { name: "Wallet", path: "/admin/wallet", description: "Wallet management" },
    { name: "Account", path: "/admin/account", description: "Account management" },
    { name: "Help Support", path: "/admin/support", description: "Help and support" },
    { name: "SMS Package", path: "/admin/sms", description: "SMS package management" },
    { name: "Subscription", path: "/admin/subscription", description: "Subscription management" },
    { name: "Staff", path: "/admin/staff", description: "Staff management" },
    { name: "Permission", path: "/admin/permission", description: "Permission management" },
    { name: "Sub Center", path: "/admin/subcenter", description: "Sub center management" },
  ]

  for (const page of pages) {
    const pageExists = await prisma.page.findFirst({
      where: {
        path: page.path,
      },
    })

    if (!pageExists) {
      await prisma.page.create({
        data: page,
      })
    }
  }

  console.log("Default pages created")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
