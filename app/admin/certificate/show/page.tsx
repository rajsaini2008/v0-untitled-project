"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { PlusCircle, FileText, Printer } from "lucide-react"

interface Student {
  id: string
  name: string
  registrationNo: string | null
}

interface Certificate {
  id: string
  studentId: string
  certificateNo: string
  courseTitle: string
  issueDate: string
  status: string
  student: {
    name: string
    registrationNo: string | null
  }
}

export default function CertificatesPage() {
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    studentId: "",
    courseTitle: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch certificates
        const certResponse = await fetch("/api/admin/certificates")
        if (!certResponse.ok) throw new Error("Failed to fetch certificates")
        const certData = await certResponse.json()
        setCertificates(certData)

        // Fetch students
        const studentsResponse = await fetch("/api/admin/students")
        if (!studentsResponse.ok) throw new Error("Failed to fetch students")
        const studentsData = await studentsResponse.json()
        setStudents(studentsData)

        // Fetch courses
        const coursesResponse = await fetch("/api/admin/courses")
        if (!coursesResponse.ok) throw new Error("Failed to fetch courses")
        const coursesData = await coursesResponse.json()
        setCourses(coursesData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerateCertificate = async () => {
    if (!formData.studentId || !formData.courseTitle) {
      toast.error("Please select a student and course")
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to generate certificate")

      const newCertificate = await response.json()
      setCertificates((prev) => [newCertificate, ...prev])

      toast.success("Certificate generated successfully")
      setIsDialogOpen(false)
      setFormData({
        studentId: "",
        courseTitle: "",
      })
    } catch (error) {
      console.error("Error generating certificate:", error)
      toast.error("Failed to generate certificate")
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePrintCertificate = (certificate: Certificate) => {
    // In a real application, this would open a print view or generate a PDF
    toast.success(`Printing certificate ${certificate.certificateNo}`)
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Certificates</h1>
        <p>Loading certificates...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-800 hover:bg-blue-900">
              <PlusCircle className="h-4 w-4 mr-2" />
              Generate Certificate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Certificate</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="student">Student</Label>
                <Select value={formData.studentId} onValueChange={(value) => handleSelectChange("studentId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} {student.registrationNo ? `(${student.registrationNo})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select
                  value={formData.courseTitle}
                  onValueChange={(value) => handleSelectChange("courseTitle", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.title}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerateCertificate}
                  className="bg-blue-800 hover:bg-blue-900"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Certificate"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          {certificates.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No certificates found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Certificate No</th>
                    <th className="text-left py-3 px-4">Student Name</th>
                    <th className="text-left py-3 px-4">Course</th>
                    <th className="text-left py-3 px-4">Issue Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((certificate) => (
                    <tr key={certificate.id} className="border-b">
                      <td className="py-3 px-4">{certificate.certificateNo}</td>
                      <td className="py-3 px-4">{certificate.student.name}</td>
                      <td className="py-3 px-4">{certificate.courseTitle}</td>
                      <td className="py-3 px-4">{new Date(certificate.issueDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${certificate.status === "issued" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {certificate.status === "issued" ? "Issued" : "Revoked"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handlePrintCertificate(certificate)}>
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
