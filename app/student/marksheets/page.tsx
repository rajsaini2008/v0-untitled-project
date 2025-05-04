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

export default function StudentMarksheets() {
  const [student, setStudent] = useState<Student | null>(null)
  const [marksheets, setMarksheets] = useState<any[]>([])

  useEffect(() => {
    const studentData = getStudentFromLocalStorage()
    if (studentData) {
      setStudent(studentData)

      // In a real application, you would fetch marksheets from an API
      // For now, we'll create mock marksheets based on the student's course
      const mockMarksheets = [
        {
          id: "1",
          title: `${studentData.course} - Module 1 Assessment`,
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
          score: "85/100",
          grade: "A",
          subjects: [
            { name: "Theory", score: 42, total: 50 },
            { name: "Practical", score: 43, total: 50 },
          ],
        },
        {
          id: "2",
          title: `${studentData.course} - Module 2 Assessment`,
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
          score: "78/100",
          grade: "B+",
          subjects: [
            { name: "Theory", score: 38, total: 50 },
            { name: "Practical", score: 40, total: 50 },
          ],
        },
      ]

      setMarksheets(mockMarksheets)
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
        <h1 className="text-3xl font-bold">Marksheets</h1>
      </div>

      {marksheets.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {marksheets.map((marksheet) => (
            <Card key={marksheet.id}>
              <CardHeader className="bg-blue-50 pb-2">
                <CardTitle>{marksheet.title}</CardTitle>
                <CardDescription>Date: {new Date(marksheet.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Overall Score:</span>
                    <span className="font-medium">{marksheet.score}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Grade:</span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {marksheet.grade}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-500">Subject Breakdown:</h4>
                    <div className="space-y-2">
                      {marksheet.subjects.map((subject: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{subject.name}</span>
                          <span className="text-sm font-medium">
                            {subject.score}/{subject.total}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-3">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View Details</button>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Download</button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Marksheets Found</CardTitle>
            <CardDescription>
              You don't have any marksheets yet. Complete your assessments to view your marksheets.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
