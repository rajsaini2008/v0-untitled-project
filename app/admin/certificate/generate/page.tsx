"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Award, Check, Download, Search } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for demonstration
const mockStudents = [
  {
    id: "1",
    name: "Rahul Sharma",
    course: "Diploma in Computer Applications (DCA)",
    enrollmentDate: "2023-01-15",
    completionDate: "2023-07-15",
    status: "completed",
  },
  {
    id: "2",
    name: "Priya Singh",
    course: "Advanced Diploma in Computer Applications (ADCA)",
    enrollmentDate: "2023-02-10",
    completionDate: "2024-02-10",
    status: "completed",
  },
  {
    id: "3",
    name: "Amit Kumar",
    course: "Tally ERP 9 with GST",
    enrollmentDate: "2023-03-05",
    completionDate: "2023-06-05",
    status: "completed",
  },
]

export default function GenerateCertificatePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const [certificateNumber, setCertificateNumber] = useState("")

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would fetch from your API
  }

  const handleSelectStudent = (student: any) => {
    setSelectedStudent(student)
    setCertificateGenerated(false)
  }

  const handleGenerateCertificate = () => {
    // In a real app, this would call your API to generate a certificate
    const randomCertNumber = `KC${new Date().getFullYear()}${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`
    setCertificateNumber(randomCertNumber)
    setCertificateGenerated(true)
    toast.success("Certificate generated successfully!")
  }

  return (
    <div className="flex flex-col gap-5 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generate Certificate</h1>
        <p className="text-muted-foreground">Generate certificates for students who have completed their courses</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Search Student</CardTitle>
            <CardDescription>Search for a student by name or course to generate a certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search by name or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" size="icon" className="shrink-0">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>

              <div className="max-h-[400px] overflow-y-auto rounded-md border">
                {filteredStudents.length > 0 ? (
                  <ul className="divide-y">
                    {filteredStudents.map((student) => (
                      <li
                        key={student.id}
                        className={`cursor-pointer p-3 transition-colors hover:bg-gray-50 ${
                          selectedStudent?.id === student.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => handleSelectStudent(student)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.course}</p>
                          </div>
                          {selectedStudent?.id === student.id && <Check className="h-5 w-5 text-blue-600" />}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex h-20 items-center justify-center text-sm text-gray-500">
                    {searchTerm ? "No students found" : "Search for students"}
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
            <CardDescription>Review and generate certificate for the selected student</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedStudent ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <Label>Student Name</Label>
                    <div className="rounded-md border p-2">{selectedStudent.name}</div>
                  </div>
                  <div className="grid gap-1">
                    <Label>Course</Label>
                    <div className="rounded-md border p-2">{selectedStudent.course}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-1">
                      <Label>Enrollment Date</Label>
                      <div className="rounded-md border p-2">
                        {new Date(selectedStudent.enrollmentDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <Label>Completion Date</Label>
                      <div className="rounded-md border p-2">
                        {new Date(selectedStudent.completionDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {certificateGenerated ? (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <Award className="mx-auto h-12 w-12 text-green-600" />
                      <h3 className="mt-2 text-lg font-medium text-green-800">Certificate Generated!</h3>
                      <p className="text-sm text-green-600">Certificate Number: {certificateNumber}</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button className="gap-1">
                        <Download className="h-4 w-4" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={handleGenerateCertificate} className="w-full gap-1">
                    <Award className="h-4 w-4" />
                    Generate Certificate
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-center">
                <Award className="h-12 w-12 text-gray-300" />
                <p className="text-sm text-gray-500">Select a student to generate certificate</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
