"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserPlus, MoreHorizontal, Pencil, Trash2, Search } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  course: string
  batch: string
  joiningDate: string
  feeStatus: string
}

export default function AllStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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
              firstName: "Rahul",
              lastName: "Sharma",
              email: "rahul.sharma@example.com",
              phone: "9876543210",
              course: "dca",
              batch: "morning",
              joiningDate: "2023-01-15",
              feeStatus: "paid",
            },
            {
              id: "2",
              firstName: "Priya",
              lastName: "Patel",
              email: "priya.patel@example.com",
              phone: "8765432109",
              course: "ccc",
              batch: "evening",
              joiningDate: "2023-02-10",
              feeStatus: "pending",
            },
            {
              id: "3",
              firstName: "Amit",
              lastName: "Kumar",
              email: "amit.kumar@example.com",
              phone: "7654321098",
              course: "tally",
              batch: "afternoon",
              joiningDate: "2023-03-05",
              feeStatus: "partial",
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
      toast({
        title: "Student deleted",
        description: "The student has been deleted successfully.",
      })
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm),
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Joining Date</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{getCourseDisplayName(student.course)}</TableCell>
                      <TableCell>{getBatchDisplayName(student.batch)}</TableCell>
                      <TableCell>{new Date(student.joiningDate).toLocaleDateString()}</TableCell>
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
                            <DropdownMenuItem>
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
    </div>
  )
}
