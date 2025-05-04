"use client"

import { useEffect, useState } from "react"
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

export default function StudentExams() {
  const [student, setStudent] = useState<Student | null>(null)
  const [exams, setExams] = useState<any[]>([])

  useEffect(() => {
    const studentData = getStudentFromLocalStorage()
    if (studentData) {
      setStudent(studentData)
      
      // In a real application, you would fetch exams from an API
      // For now, we'll create mock exams based on the student's course
      const mockExams = [
        {
          id: '1',
          title: `${studentData.course} - Final Assessment`,
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          duration: '120 minutes',
          status: 'upcoming',
          description: 'This is the final assessment for your course. It covers all modules and topics taught during the course.'
        },
        {
          id: '2',
          title: `${studentData.course} - Module 3 Quiz`,
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
          duration: '45 minutes',
          status: 'upcoming',
          description: 'This quiz tests your knowledge of Module 3 content.'
        },
        {
          id: '3',
          title: `${studentData.course} - Practice Test`,
          date: new Date().toISOString(), // Today
          duration: '60 minutes',
          status: 'available',
          description: 'This is a practice test to help you prepare for your upcoming assessments.'
        },
        {
          id: '4',
          title: `${studentData.course} - Module 1 Assessment`,
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
          duration: '60 minutes',
          status: 'completed',
          score: '85/100',
          grade: 'A',
          description: 'This assessment covered the fundamentals of Module 1.'
        },
        {
          id: '5',
          title: `${studentData.course} - Module 2 Assessment`,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          duration: '60 minutes',
          status: 'completed',
          score: '78/100',
          grade: 'B+',
          description: 'This assessment covered the advanced topics of Module 2.'
        }
      ]
      
      setExams(mockExams)
    }
  }, [])

  const getStatusBadgeClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      upcoming: 'bg-blue-100 text-blue-800',
      available: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
    }
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`
  }

  const handleStartExam = (examId: string) => {
    // In a real application, this would navigate to the exam page
    alert(`Starting exam ${examId}`)
  }

  const handleViewResults = (examId: string) => {
    // In a real application, this would navigate to the results page
    alert(`Viewing results for exam ${examId}`)
  }

  if (!student) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  // Separate exams by status
  const upcomingExams = exams.filter(exam => exam.status === 'upcoming')
  const availableExams = exams.filter(exam => exam.status === 'available')
  const completedExams = exams.filter(exam => exam.status === 'completed')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Exams</h1>\
