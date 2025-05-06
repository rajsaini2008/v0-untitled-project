"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Award, FileText, Clock } from "lucide-react"

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get current student ID from localStorage
    const currentUserId = localStorage.getItem("current_user_id")

    if (currentUserId) {
      // Get student data
      const students = JSON.parse(localStorage.getItem("students") || "[]")
      const currentStudent = students.find((s: any) => s.id === currentUserId)

      if (currentStudent) {
        setStudent(currentStudent)
      }
    }

    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">Student Not Found</h2>
        <p className="text-gray-600 mt-2">Unable to load student information.</p>
      </div>
    )
  }

  const getCourseDisplayName = (courseCode: string) => {
    const courses: Record<string, string> = {
      dca: "Diploma in Computer Applications",
      ccc: "Course on Computer Concepts",
      tally: "Tally Prime with GST",
      "o-level": "NIELIT O Level",
      "web-design": "Web Design & Development",
    }
    return courses[courseCode] || courseCode
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {student.firstName} {student.lastName}!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Student ID</p>
            <p className="font-medium">{student.studentId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-medium">{getCourseDisplayName(student.course)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Batch</p>
            <p className="font-medium">{student.batch.charAt(0).toUpperCase() + student.batch.slice(1)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Joining Date</p>
            <p className="font-medium">{new Date(student.joiningDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Current Course</CardTitle>
            <BookOpen className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{getCourseDisplayName(student.course)}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <FileText className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next exam in 3 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">0</div>
            <p className="text-xs text-muted-foreground">Complete your course to earn certificates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Course Duration</CardTitle>
            <Clock className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">6 months</div>
            <p className="text-xs text-muted-foreground">3 months remaining</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: "Logged in to student portal", time: "Today, 10:30 AM" },
                { activity: "Completed Module 3 Quiz", time: "Yesterday, 3:45 PM" },
                { activity: "Submitted Assignment 2", time: "3 days ago" },
                { activity: "Attended online class", time: "1 week ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-600"></div>
                  <div className="space-y-1">
                    <p className="text-sm">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "Module 4 Quiz", date: "May 10, 2023", time: "10:00 AM" },
                { event: "Assignment 3 Deadline", date: "May 15, 2023", time: "11:59 PM" },
                { event: "Mid-term Exam", date: "May 20, 2023", time: "9:00 AM" },
                { event: "Group Project Presentation", date: "May 25, 2023", time: "2:00 PM" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-yellow-600"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.event}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.date} at {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
