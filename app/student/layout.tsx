import type React from "react"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        <StudentSidebar />
        <main className="flex-1 p-4 md:p-6 md:ml-64">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
