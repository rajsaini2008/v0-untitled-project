"use client"

import { useEffect, useState } from "react"
import { getStudentFromLocalStorage } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

export default function StudentExams() {
  const [student, setStudent] = useState<Student | null>(null)
  const [exams, setExams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const studentData = getStudentFromLocalStorage()
    if (studentData) {
      setStudent(studentData)

      // In a real application, you would fetch exams from an API
      // For now, we'll create mock exams based on the student's course
      const mockExams = [
        {
          id: "1",
          title: `${studentData.course} - Final Assessment`,
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          duration: "120 minutes",
          status: "upcoming",
          description:
            "This is the final assessment for your course. It covers all modules and topics taught during the course.",
        },
        {
          id: "2",
          title: `${studentData.course} - Module 3 Quiz`,
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
          duration: "45 minutes",
          status: "upcoming",
          description: "This quiz tests your knowledge of Module 3 content.",
        },
        {
          id: "3",
          title: `${studentData.course} - Practice Test`,
          date: new Date().toISOString(), // Today
          duration: "60 minutes",
          status: "available",
          description: "This is a practice test to help you prepare for your upcoming assessments.",
        },
        {
          id: "4",
          title: `${studentData.course} - Module 1 Assessment`,
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
          duration: "60 minutes",
          status: "completed",
          score: "85/100",
          grade: "A",
          description: "This assessment covered the fundamentals of Module 1.",
        },
        {
          id: "5",
          title: `${studentData.course} - Module 2 Assessment`,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          duration: "60 minutes",
          status: "completed",
          score: "78/100",
          grade: "B+",
          description: "This assessment covered the advanced topics of Module 2.",
        },
      ]

      setExams(mockExams)
    }
    setLoading(false)
  }, [])

  const getStatusBadgeClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      upcoming: "bg-blue-100 text-blue-800",
      available: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
    }
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || "bg-gray-100 text-gray-800"}`
  }

  const handleStartExam = (examId: string) => {
    // In a real application, this would navigate to the exam page
    alert(`Starting exam ${examId}`)
  }

  const handleViewResults = (examId: string) => {
    // In a real application, this would navigate to the results page
    alert(`Viewing results for exam ${examId}`)
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-gray-600">No student data found. Please log in again.</p>
      </div>
    )
  }

  // Separate exams by status
  const upcomingExams = exams.filter((exam) => exam.status === "upcoming")
  const availableExams = exams.filter((exam) => exam.status === "available")
  const completedExams = exams.filter((exam) => exam.status === "completed")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Exams</h1>
      </div>

      {/* Available Exams */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Available Exams</h2>
        {availableExams.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {availableExams.map((exam) => (
              <Card key={exam.id} className="border-green-200">
                <CardHeader className="bg-green-50 border-b border-green-100">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                    <span className={getStatusBadgeClass(exam.status)}>Available</span>
                  </div>
                  <CardDescription>Date: {new Date(exam.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-2">Duration: {exam.duration}</p>
                  <p className="text-sm">{exam.description}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t px-6 py-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleStartExam(exam.id)}>
                    Start Exam
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No exams currently available.</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Upcoming Exams */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
        {upcomingExams.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingExams.map((exam) => (
              <Card key={exam.id} className="border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                    <span className={getStatusBadgeClass(exam.status)}>Upcoming</span>
                  </div>
                  <CardDescription>Date: {new Date(exam.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-2">Duration: {exam.duration}</p>
                  <p className="text-sm">{exam.description}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t px-6 py-3">
                  <p className="text-sm text-gray-600 w-full text-center">
                    Available on {new Date(exam.date).toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No upcoming exams scheduled.</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Completed Exams */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Completed Exams</h2>
        {completedExams.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {completedExams.map((exam) => (
              <Card key={exam.id} className="border-gray-200">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                    <span className={getStatusBadgeClass(exam.status)}>Completed</span>
                  </div>
                  <CardDescription>Date: {new Date(exam.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600">Score:</p>
                    <p className="font-medium">{exam.score}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Grade:</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {exam.grade}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t px-6 py-3">
                  <Button variant="outline" className="w-full" onClick={() => handleViewResults(exam.id)}>
                    View Results
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No completed exams yet.</p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
