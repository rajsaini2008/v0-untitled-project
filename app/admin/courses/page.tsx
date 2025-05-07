"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, MoreHorizontal, Pencil, Trash2, Search, Eye } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Course {
  id: string
  name: string
  code: string
  duration: string
  fee: string
  description: string
  status: string
  image?: string
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll just get the data from localStorage
    const loadCourses = () => {
      try {
        const storedCourses = localStorage.getItem("courses")
        if (storedCourses) {
          setCourses(JSON.parse(storedCourses))
        } else {
          // Add some mock data if no courses exist
          const mockCourses = [
            {
              id: "1",
              name: "Diploma in Computer Applications",
              code: "DCA",
              duration: "6 months",
              fee: "₹12,000",
              description:
                "A comprehensive course covering computer fundamentals, office applications, internet usage, and basic programming concepts.",
              status: "active",
              image: "/placeholder.svg?height=200&width=300&text=DCA",
            },
            {
              id: "2",
              name: "Course on Computer Concepts",
              code: "CCC",
              duration: "3 months",
              fee: "₹6,000",
              description:
                "An entry-level course designed to familiarize students with basic computer operations and applications.",
              status: "active",
              image: "/placeholder.svg?height=200&width=300&text=CCC",
            },
            {
              id: "3",
              name: "Tally Prime with GST",
              code: "TALLY",
              duration: "3 months",
              fee: "₹8,000",
              description:
                "Learn complete accounting software with GST implementation for business and financial management.",
              status: "active",
              image: "/placeholder.svg?height=200&width=300&text=TALLY",
            },
            {
              id: "4",
              name: "NIELIT O Level",
              code: "O-LEVEL",
              duration: "1 year",
              fee: "₹25,000",
              description:
                "A foundation level course in IT recognized by the Government of India, covering programming, web development, and more.",
              status: "active",
              image: "/placeholder.svg?height=200&width=300&text=O-LEVEL",
            },
            {
              id: "5",
              name: "Web Design & Development",
              code: "WEB",
              duration: "4 months",
              fee: "₹15,000",
              description: "Learn to create responsive websites using HTML, CSS, JavaScript, and popular frameworks.",
              status: "active",
              image: "/placeholder.svg?height=200&width=300&text=WEB",
            },
          ]
          localStorage.setItem("courses", JSON.stringify(mockCourses))
          setCourses(mockCourses)

          // Also save to frontend courses
          const frontendCourses = mockCourses.map((course) => ({
            id: course.id,
            title: course.code,
            fullTitle: course.name,
            category: "basic",
            duration: course.duration,
            description: course.description,
            image: course.image,
          }))
          localStorage.setItem("frontendCourses", JSON.stringify(frontendCourses))
        }
      } catch (error) {
        console.error("Error loading courses:", error)
        toast({
          title: "Error loading courses",
          description: "There was a problem loading the course data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadCourses()
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      const updatedCourses = courses.filter((course) => course.id !== id)
      setCourses(updatedCourses)
      localStorage.setItem("courses", JSON.stringify(updatedCourses))

      // Also update frontend courses
      const frontendCourses = JSON.parse(localStorage.getItem("frontendCourses") || "[]")
      const updatedFrontendCourses = frontendCourses.filter((course: any) => course.id !== id)
      localStorage.setItem("frontendCourses", JSON.stringify(updatedFrontendCourses))

      toast({
        title: "Course deleted",
        description: "The course has been deleted successfully.",
      })
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadgeClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      upcoming: "bg-blue-100 text-blue-800",
    }
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || "bg-gray-100 text-gray-800"}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
        <Link href="/admin/courses/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>All Courses</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
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
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No courses found matching your search."
                : "No courses found. Add a new course to get started."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="relative h-10 w-16">
                          <Image
                            src={course.image || "/placeholder.svg?height=40&width=60"}
                            alt={course.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.fee}</TableCell>
                      <TableCell>
                        <span className={getStatusBadgeClass(course.status)}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
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
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(course.id)}>
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
