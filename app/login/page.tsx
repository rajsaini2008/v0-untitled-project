"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth"
import { toast } from "@/components/ui/use-toast"

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  })
  const [studentCredentials, setStudentCredentials] = useState({
    id: "",
    password: "",
  })
  const [atcCredentials, setAtcCredentials] = useState({
    id: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = login("admin", adminCredentials.email, adminCredentials.password)

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        })
        router.push("/admin/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = login("student", studentCredentials.id, studentCredentials.password)

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to the student portal",
        })
        router.push("/student/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid student ID or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleATCLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = login("atc", atcCredentials.id, atcCredentials.password)

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to the ATC panel",
        })
        router.push("/atc/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid ATC ID or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Krishna Computer Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-blue-800">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to access your account</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger
              value="student"
              className="px-4 py-2 data-[state=active]:bg-blue-800 data-[state=active]:text-white"
            >
              Student
            </TabsTrigger>
            <TabsTrigger
              value="atc"
              className="px-4 py-2 data-[state=active]:bg-blue-800 data-[state=active]:text-white"
            >
              ATC
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="px-4 py-2 data-[state=active]:bg-blue-800 data-[state=active]:text-white"
            >
              Admin
            </TabsTrigger>
          </TabsList>

          <Card className="mt-6 border-none shadow-lg">
            <TabsContent value="student" className="mt-0">
              <CardHeader>
                <CardTitle className="text-xl text-center">Student Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleStudentLogin}>
                  <div className="grid gap-2">
                    <label htmlFor="student-id" className="font-medium text-gray-700">
                      Student ID
                    </label>
                    <Input
                      id="student-id"
                      placeholder="Enter your student ID"
                      value={studentCredentials.id}
                      onChange={(e) => setStudentCredentials({ ...studentCredentials, id: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="student-password" className="font-medium text-gray-700">
                        Password
                      </label>
                      <Link href="/forgot-password" className="text-sm text-blue-800 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="Enter your password"
                      value={studentCredentials.password}
                      onChange={(e) => setStudentCredentials({ ...studentCredentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-blue-800 hover:underline">
                    Register now
                  </Link>
                </div>
              </CardFooter>
            </TabsContent>

            <TabsContent value="atc" className="mt-0">
              <CardHeader>
                <CardTitle className="text-xl text-center">ATC Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleATCLogin}>
                  <div className="grid gap-2">
                    <label htmlFor="atc-id" className="font-medium text-gray-700">
                      ATC ID
                    </label>
                    <Input
                      id="atc-id"
                      placeholder="Enter your ATC ID"
                      value={atcCredentials.id}
                      onChange={(e) => setAtcCredentials({ ...atcCredentials, id: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="atc-password" className="font-medium text-gray-700">
                        Password
                      </label>
                      <Link href="/forgot-password" className="text-sm text-blue-800 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="atc-password"
                      type="password"
                      placeholder="Enter your password"
                      value={atcCredentials.password}
                      onChange={(e) => setAtcCredentials({ ...atcCredentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-gray-600">
                  ATC access is restricted.{" "}
                  <Link href="/contact-us" className="text-blue-800 hover:underline">
                    Contact admin
                  </Link>{" "}
                  for assistance.
                </div>
              </CardFooter>
            </TabsContent>

            <TabsContent value="admin" className="mt-0">
              <CardHeader>
                <CardTitle className="text-xl text-center">Admin Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleAdminLogin}>
                  <div className="grid gap-2">
                    <label htmlFor="admin-email" className="font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={adminCredentials.email}
                      onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="admin-password" className="font-medium text-gray-700">
                        Password
                      </label>
                      <Link href="/forgot-password" className="text-sm text-blue-800 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-gray-600">
                  Admin access is restricted.{" "}
                  <Link href="/contact-us" className="text-blue-800 hover:underline">
                    Contact support
                  </Link>{" "}
                  for assistance.
                </div>
              </CardFooter>
            </TabsContent>
          </Card>
        </Tabs>

        <div className="text-center mt-8">
          <Link href="/" className="text-gray-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
