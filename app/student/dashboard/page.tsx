"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getStudentFromLocalStorage } from "@/lib/auth"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  address: string
  course: string
  enrollmentDate: string
  studentId: string
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null)
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    const studentData = getStudentFromLocalStorage()
    if (studentData) {
      setStudent(studentData)
    }

    // Get courses from localStorage
    const storedCourses = localStorage.getItem("courses")
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses)
      setCourses(parsedCourses)
    }
  }, [])

  const studentCourse = courses.find((course) => course.name === student?.course)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Welcome</CardTitle>
            <CardDescription>{student?.name || "Student"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{student?.studentId}</p>
            <p className="text-sm text-muted-foreground">Student ID</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Course</CardTitle>
            <CardDescription>Your enrolled course</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{student?.course || "N/A"}</p>
            <p className="text-sm text-muted-foreground">
              Enrolled on: {student?.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Course Duration</CardTitle>
            <CardDescription>Total duration of your course</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{studentCourse?.duration || "N/A"}</p>
            <p className="text-sm text-muted-foreground">Months</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Access important resources and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <a
              href="/student/profile"
              className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-gray-50"
            >
              <div className="mb-2 rounded-full bg-blue-100 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-600"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="font-medium">Profile</h3>
              <p className="text-sm text-gray-500">View your profile</p>
            </a>
            <a
              href="/student/courses"
              className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-gray-50"
            >
              <div className="mb-2 rounded-full bg-green-100 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-green-600"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                  <path d="M8 7h6"></path>
                  <path d="M8 11h8"></path>
                  <path d="M8 15h5"></path>
                </svg>
              </div>
              <h3 className="font-medium">Courses</h3>
              <p className="text-sm text-gray-500">View course details</p>
            </a>
            <a
              href="/student/certificates"
              className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-gray-50"
            >
              <div className="mb-2 rounded-full bg-purple-100 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-purple-600"
                >
                  <path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                  <path d="M20 12a8 8 0 1 0-16 0v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6z"></path>
                  <path d="M10 20v-4a2 2 0 1 1 4 0v4"></path>
                </svg>
              </div>
              <h3 className="font-medium">Certificates</h3>
              <p className="text-sm text-gray-500">View your certificates</p>
            </a>
            <a
              href="/student/exams"
              className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-gray-50"
            >
              <div className="mb-2 rounded-full bg-yellow-100 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-yellow-600"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H8"></path>
                </svg>
              </div>
              <h3 className="font-medium">Exams</h3>
              <p className="text-sm text-gray-500">Take your exams</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
