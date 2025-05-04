"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function StudentCertificates() {
  const [student, setStudent] = useState<Student | null>(null)
  const [certificates, setCertificates] = useState<any[]>([])

  useEffect(() => {
    const studentData = getStudentFromLocalStorage()
    if (studentData) {
      setStudent(studentData)

      // In a real application, you would fetch certificates from an API
      // For now, we'll create a mock certificate based on the student's course
      const mockCertificates = [
        {
          id: "1",
          title: `${studentData.course} Completion Certificate`,
          issueDate: new Date().toISOString(),
          status: "Issued",
          description: `This certifies that ${studentData.name} has successfully completed the ${studentData.course} course at Krishna Computers.`,
        },
      ]

      setCertificates(mockCertificates)
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
        <h1 className="text-3xl font-bold">Certificates</h1>
      </div>

      {certificates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden">
              <CardHeader className="bg-blue-50 pb-2">
                <CardTitle>{certificate.title}</CardTitle>
                <CardDescription>Issued on: {new Date(certificate.issueDate).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {certificate.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{certificate.description}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-3">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View</button>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Download</button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Certificates Found</CardTitle>
            <CardDescription>
              You don't have any certificates yet. Complete your course to receive a certificate.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
