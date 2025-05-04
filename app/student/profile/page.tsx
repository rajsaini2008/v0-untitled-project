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

export default function StudentProfile() {
  const [student, setStudent] = useState<Student | null>(null)

  useEffect(() => {
    const studentData = getStudentFromLocalStorage()
    if (studentData) {
      setStudent(studentData)
    }
  }, [])

  if (!student) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-lg font-medium">{student.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Student ID</p>
                <p className="text-lg font-medium">{student.studentId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-medium">{student.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-lg font-medium">{student.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-lg font-medium">{student.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>Details about your enrolled course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Course</p>
                <p className="text-lg font-medium">{student.course}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Enrollment Date</p>
                <p className="text-lg font-medium">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-gray-500">Update your password regularly for security</p>
              </div>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Change Password
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
