import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Login() {
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
              value="faculty"
              className="px-4 py-2 data-[state=active]:bg-blue-800 data-[state=active]:text-white"
            >
              Faculty
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
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="student-id" className="font-medium text-gray-700">
                      Student ID
                    </label>
                    <Input id="student-id" placeholder="Enter your student ID" />
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
                    <Input id="student-password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button className="w-full bg-blue-800 hover:bg-blue-900">Sign In</Button>
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

            <TabsContent value="faculty" className="mt-0">
              <CardHeader>
                <CardTitle className="text-xl text-center">Faculty Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="faculty-email" className="font-medium text-gray-700">
                      Email
                    </label>
                    <Input id="faculty-email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="faculty-password" className="font-medium text-gray-700">
                        Password
                      </label>
                      <Link href="/forgot-password" className="text-sm text-blue-800 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="faculty-password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button className="w-full bg-blue-800 hover:bg-blue-900">Sign In</Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-gray-600">
                  Faculty access is restricted.{" "}
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
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="admin-username" className="font-medium text-gray-700">
                      Username
                    </label>
                    <Input id="admin-username" placeholder="Enter your username" />
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
                    <Input id="admin-password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button className="w-full bg-blue-800 hover:bg-blue-900">Sign In</Button>
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
