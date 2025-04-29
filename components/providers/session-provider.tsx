"use client"

import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { ReactNode } from "react"

export default function AuthSessionProvider({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()

  // Handle session errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if it's a NextAuth error
      if (event.error && event.error.toString().includes("next-auth")) {
        console.error("NextAuth error:", event.error)
        // Optionally redirect to error page for critical errors
        // router.push("/auth/error")
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [router])

  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  )
}
