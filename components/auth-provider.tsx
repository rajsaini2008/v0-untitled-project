"use client"

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

// Add proper type checking and error handling
export default function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  // Wrap in try-catch to handle potential errors
  try {
    return <SessionProvider>{children}</SessionProvider>
  } catch (error) {
    console.error("Error in AuthProvider:", error)
    // Return children without the provider in case of error
    return <>{children}</>
  }
}
