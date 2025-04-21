import type React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { AdminSidebar } from "@/components/admin/sidebar"
import { authOptions } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Krishna Computers Admin",
  description: "Admin panel for Krishna Computers",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="h-full">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
