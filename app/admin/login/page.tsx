"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast } from "react-hot-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [username, setUsername] = useState("rajsaini")
  const [password, setPassword] = useState("12345678")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect to dashboard if already authenticated as admin
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard")
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please enter username and password")
      toast.error("Please enter username and password")
      return
    }

    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid username or password. Use username: rajsaini, password: 12345678")
        toast.error("Invalid username or password")
      } else {
        toast.success("Logged in successfully")

        // Wait a moment before redirecting to ensure the session is updated
        setTimeout(() => {
          // Try router.push first
          router.push("/admin/dashboard")

          // As a fallback, also use window.location after a short delay
          setTimeout(() => {
            window.location.href = "/admin/dashboard"
          }, 500)
        }, 1000)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred. Please try again.")
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                placeholder="rajsaini"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="12345678"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm text-gray-500 w-full">
            <p>Admin Credentials:</p>
            <p>Username: rajsaini</p>
            <p>Password: 12345678</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
