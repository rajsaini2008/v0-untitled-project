"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { getStudentFromLocalStorage } from "@/lib/auth"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const student = getStudentFromLocalStorage()
    if (!student) {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <main className="container mx-auto p-4">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
