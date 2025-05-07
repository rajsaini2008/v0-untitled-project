"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import ATCSidebar from "@/components/atc/atc-sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function ATCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading, userType } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || userType !== "atc")) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, userType, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
      </div>
    )
  }

  if (!isAuthenticated || userType !== "atc") {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <ATCSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
