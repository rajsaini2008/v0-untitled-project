"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const errorType = searchParams?.get("error")
    let errorMessage = "An unknown error occurred during authentication"

    // Map error codes to user-friendly messages
    if (errorType === "CredentialsSignin") {
      errorMessage = "Invalid email or password. Please try again."
    } else if (errorType === "SessionRequired") {
      errorMessage = "You need to be signed in to access this page."
    } else if (errorType === "AccessDenied") {
      errorMessage = "You do not have permission to access this resource."
    } else if (errorType) {
      errorMessage = `Authentication error: ${errorType}`
    }

    setError(errorMessage)
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
          <div className="mt-6">
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
