"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, Edit, Plus, Trash } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Mock data for demonstration
const mockCourses = [
  {
    id: "1",
    title: "Diploma in Computer Applications (DCA)",
    description: "A comprehensive course covering computer fundamentals, office applications, and basic programming.",
    duration: "6 months",
    fee: "₹15,000",
    status: "active",
  },
  {
    id: "2",
    title: "Advanced Diploma in Computer Applications (ADCA)",
    description: "Advanced course covering programming, database management, and web development.",
    duration: "12 months",
    fee: "₹25,000",
    status: "active",
  },
  {
    id: "3",
    title: "Tally ERP 9 with GST",
    description: "Learn accounting software Tally ERP 9 with GST implementation.",
    duration: "3 months",
    fee: "₹8,000",
    status: "active",
  },
  {
    id: "4",
    title: "Web Design & Development",
    description: "Learn HTML, CSS, JavaScript, and responsive web design principles.",
    duration: "4 months",
    fee: "₹12,000",
    status: "active",
  },
  {
    id: "5",
    title: "Digital Marketing",
    description: "Learn SEO, social media marketing, email marketing, and Google Ads.",
    duration: "3 months",
    fee: "₹10,000",
    status: "inactive",
  },
]

export default function CoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState(mockCourses)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    fee: "",
    status: "active",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault()
    const newCourse = {
      id: (courses.length + 1).toString(),
      ...formData,
    }
    setCourses([...courses, newCourse])
    setIsAddDialogOpen(false)
    setFormData({
      title: "",
      description: "",
      duration: "",
      fee: "",
      status: "active",
    })
    toast.success("Course added successfully!")
    router.refresh()
  }

  const handleEditCourse = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedCourses = courses.map((course) =>
      course.id === currentCourse.id ? { ...course, ...formData } : course,
    )
    setCourses(updatedCourses)
    setIsEditDialogOpen(false)
    toast.success("Course updated successfully!")
    router.refresh()
  }

  const handleDeleteCourse = () => {
    const updatedCourses = courses.filter((course) => course.id !== currentCourse.id)
    setCourses(updatedCourses)
    setIsDeleteDialogOpen(false)
    toast.success("Course deleted successfully!")
    router.refresh()
  }

  const openEditDialog = (course: any) => {
    setCurrentCourse(course)
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      fee: course.fee,
      status: course.status,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (course: any) => {
    setCurrentCourse(course)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground">Manage all courses offered by your institute</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>Fill in the details to add a new course to your institute.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCourse}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Diploma in Computer Applications"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the course"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g. 6 months"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fee">Fee</Label>
                    <Input
                      id="fee"
                      name="fee"
                      value={formData.fee}
                      onChange={handleInputChange}
                      placeholder="e.g. ₹15,000"
                      required
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Course Title</th>
                      <th className="px-4 py-3 text-left font-medium">Duration</th>
                      <th className="px-4 py-3 text-left font-medium">Fee</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium">{course.title}</div>
                              <div className="text-xs text-gray-500 line-clamp-1">{course.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{course.duration}</td>
                        <td className="px-4 py-3">{course.fee}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              course.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {course.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditDialog(course)}
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openDeleteDialog(course)}
                              className="h-8 w-8"
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Course Title</th>
                      <th className="px-4 py-3 text-left font-medium">Duration</th>
                      <th className="px-4 py-3 text-left font-medium">Fee</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses
                      .filter((course) => course.status === "active")
                      .map((course) => (
                        <tr key={course.id} className="border-b">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                              <div>
                                <div className="font-medium">{course.title}</div>
                                <div className="text-xs text-gray-500 line-clamp-1">{course.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">{course.duration}</td>
                          <td className="px-4 py-3">{course.fee}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openEditDialog(course)}
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openDeleteDialog(course)}
                                className="h-8 w-8"
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Course Title</th>
                      <th className="px-4 py-3 text-left font-medium">Duration</th>
                      <th className="px-4 py-3 text-left font-medium">Fee</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses
                      .filter((course) => course.status === "inactive")
                      .map((course) => (
                        <tr key={course.id} className="border-b">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                              <div>
                                <div className="font-medium">{course.title}</div>
                                <div className="text-xs text-gray-500 line-clamp-1">{course.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">{course.duration}</td>
                          <td className="px-4 py-3">{course.fee}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openEditDialog(course)}
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openDeleteDialog(course)}
                                className="h-8 w-8"
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update the course details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditCourse}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Course Title</Label>
                <Input id="edit-title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-duration">Duration</Label>
                  <Input
                    id="edit-duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-fee">Fee</Label>
                  <Input id="edit-fee" name="fee" value={formData.fee} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange as any}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
