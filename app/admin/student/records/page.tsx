"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Edit, Plus, Search, Trash2, User } from "lucide-react"
import { toast } from "react-hot-toast"

interface Student {
  id: string
  registrationNo: string
  name: string
  email: string
  phone: string
  createdAt: string
}

export default function StudentsPage() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/students")
      if (!response.ok) throw new Error("Failed to fetch students")
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error("Error fetching students:", error)
      toast.error("Failed to load students")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return

    try {
      const response = await fetch(`/api/admin/students/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete student")

      toast.success("Student deleted successfully")
      fetchStudents()
    } catch (error) {
      console.error("Error deleting student:", error)
      toast.error("Failed to delete student")
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.phone && student.phone.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Records</h1>
        <Button onClick={() => router.push("/admin/student/new")} className="bg-blue-800 hover:bg-blue-900">
          <Plus className="mr-2 h-4 w-4" /> Add New Student
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, registration number, email or phone..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">Loading students...</div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-8">No students found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reg. No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.registrationNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email || "N/A"}</TableCell>
                    <TableCell>{student.phone || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/student/${student.id}`)}
                          title="View Student Details"
                        >
                          <User className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/student/${student.id}/edit`)}
                          title="Edit Student"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(student.id)}
                          title="Delete Student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/student/attendance-report/${student.id}`)}
                          title="View Attendance Report"
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
