"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserPlus, MoreHorizontal, Pencil, Trash2, Search, Eye } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Student {
  id: string
  studentId: string
  firstName: string
  lastName: string
  fatherName?: string
  motherName?: string
  email: string
  phone: string
  course: string
  batch: string
  joiningDate: string
  feeStatus: string
  password?: string
}

export default function AllStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editFormData, setEditFormData] = useState<Partial<Student>>({})

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll just get the data from localStorage
    const loadStudents = () => {
      try {
        const storedStudents = localStorage.getItem("students")
        if (storedStudents) {
          setStudents(JSON.parse(storedStudents))
        } else {
          // Add some mock data if no students exist
          const mockStudents = [
            {
              id: "1",
              studentId: "STU2301",
              firstName: "Rahul",
              lastName: "Sharma",
              fatherName: "Ramesh Sharma",
              motherName: "Sunita Sharma",
              email: "rahul.sharma@example.com",
              phone: "9876543210",
              course: "dca",
              batch: "morning",
              joiningDate: "2023-01-15",
              feeStatus: "paid",
              password: "student123",
            },
            {
              id: "2",
              studentId: "STU2302",
              firstName: "Priya",
              lastName: "Patel",
              fatherName: "Suresh Patel",
              motherName: "Meena Patel",
              email: "priya.patel@example.com",
              phone: "8765432109",
              course: "ccc",
              batch: "evening",
              joiningDate: "2023-02-10",
              feeStatus: "pending",
              password: "student456",
            },
            {
              id: "3",
              studentId: "STU2303",
              firstName: "Amit",
              lastName: "Kumar",
              fatherName: "Rajesh Kumar",
              motherName: "Anita Kumar",
              email: "amit.kumar@example.com",
              phone: "7654321098",
              course: "tally",
              batch: "afternoon",
              joiningDate: "2023-03-05",
              feeStatus: "partial",
              password: "student789",
            },
          ]
          localStorage.setItem("students", JSON.stringify(mockStudents))
          setStudents(mockStudents)
        }
      } catch (error) {
        console.error("Error loading students:", error)
        toast({
          title: "Error loading students",
          description: "There was a problem loading the student data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadStudents()
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = students.filter((student) => student.id !== id)
      setStudents(updatedStudents)
      localStorage.setItem("students", JSON.stringify(updatedStudents))

      // Also remove from passwords
      const passwords = JSON.parse(localStorage.getItem("passwords") || "[]")
      const updatedPasswords = passwords.filter((p: any) => {
        const student = students.find((s) => s.id === id)
        return student ? p.userId !== student.studentId : true
      })
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords))

      toast({
        title: "Student deleted",
        description: "The student has been deleted successfully.",
      })
    }
  }

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (student: Student) => {
    setSelectedStudent(student)
    setEditFormData(student)
    setIsEditDialogOpen(true)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedStudent) return

    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id ? { ...student, ...editFormData } : student,
    )

    setStudents(updatedStudents)
    localStorage.setItem("students", JSON.stringify(updatedStudents))

    // Update in passwords if name or email changed
    if (editFormData.firstName || editFormData.lastName || editFormData.email) {
      const passwords = JSON.parse(localStorage.getItem("passwords") || "[]")
      const updatedPasswords = passwords.map((p: any) => {
        if (p.userId === selectedStudent.studentId) {
          return {
            ...p,
            name: `${editFormData.firstName || selectedStudent.firstName} ${editFormData.lastName || selectedStudent.lastName}`,
            email: editFormData.email || selectedStudent.email,
          }
        }
        return p
      })
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords))
    }

    toast({
      title: "Student updated",
      description: "The student information has been updated successfully.",
    })

    setIsEditDialogOpen(false)
  }

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCourseDisplayName = (courseCode: string) => {
    const courses: Record<string, string> = {
      dca: "DCA",
      ccc: "CCC",
      tally: "Tally",
      "o-level": "O Level",
      "web-design": "Web Design",
    }
    return courses[courseCode] || courseCode
  }

  const getBatchDisplayName = (batchCode: string) => {
    const batches: Record<string, string> = {
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      weekend: "Weekend",
    }
    return batches[batchCode] || batchCode
  }

  const getFeeStatusBadgeClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-red-100 text-red-800",
      partial: "bg-yellow-100 text-yellow-800",
    }
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || "bg-gray-100 text-gray-800"}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">All Students</h1>
        <Link href="/admin/students/new">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Student
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>Students</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No students found matching your search."
                : "No students found. Add a new student to get started."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{getCourseDisplayName(student.course)}</TableCell>
                      <TableCell>{getBatchDisplayName(student.batch)}</TableCell>
                      <TableCell>
                        <span className={getFeeStatusBadgeClass(student.feeStatus)}>
                          {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(student)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(student)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(student.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Student Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-medium">{selectedStudent.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Father&apos;s Name</p>
                <p className="font-medium">{selectedStudent.fatherName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mother&apos;s Name</p>
                <p className="font-medium">{selectedStudent.motherName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedStudent.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedStudent.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Course</p>
                <p className="font-medium">{getCourseDisplayName(selectedStudent.course)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Batch</p>
                <p className="font-medium">{getBatchDisplayName(selectedStudent.batch)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joining Date</p>
                <p className="font-medium">{new Date(selectedStudent.joiningDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fee Status</p>
                <p className="font-medium">
                  <span className={getFeeStatusBadgeClass(selectedStudent.feeStatus)}>
                    {selectedStudent.feeStatus.charAt(0).toUpperCase() + selectedStudent.feeStatus.slice(1)}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <p className="font-medium">{selectedStudent.password || "••••••••"}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>Update student information. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-firstName">First Name</Label>
                  <Input
                    id="edit-firstName"
                    name="firstName"
                    value={editFormData.firstName || selectedStudent.firstName}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lastName">Last Name</Label>
                  <Input
                    id="edit-lastName"
                    name="lastName"
                    value={editFormData.lastName || selectedStudent.lastName}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-fatherName">Father&apos;s Name</Label>
                  <Input
                    id="edit-fatherName"
                    name="fatherName"
                    value={editFormData.fatherName || selectedStudent.fatherName || ""}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-motherName">Mother&apos;s Name</Label>
                  <Input
                    id="edit-motherName"
                    name="motherName"
                    value={editFormData.motherName || selectedStudent.motherName || ""}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={editFormData.email || selectedStudent.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    name="phone"
                    value={editFormData.phone || selectedStudent.phone}
                    onChange={handleEditChange}
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
