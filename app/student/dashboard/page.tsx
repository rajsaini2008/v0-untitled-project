"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function StudentDashboard() {
  const { data: session } = useSession()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudentData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/students/${session.user.id}`)
          if (response.ok) {
            const data = await response.json()
            setStudent(data.student)
          }
        } catch (error) {
          console.error("Error fetching student data:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchStudentData()
  }, [session])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student ID</CardTitle>
            <CardDescription>Your unique identification number</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <p className="text-2xl font-bold">{student?.studentId || "N/A"}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course</CardTitle>
            <CardDescription>Your enrolled course</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-6 w-40" />
            ) : (
              <p className="text-2xl font-bold">{student?.courseId?.name || "N/A"}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registration Date</CardTitle>
            <CardDescription>When you joined</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <p className="text-2xl font-bold">
                {student?.registrationDate ? new Date(student.registrationDate).toLocaleDateString() : "N/A"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your profile details</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p>{student?.fullName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Father's Name</p>
                <p>{student?.fatherName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Mother's Name</p>
                <p>{student?.motherName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{student?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p>{student?.phone || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p>{student?.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gender</p>
                <p>{student?.gender || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p>{student?.address || "N/A"}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
