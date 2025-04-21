"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "react-hot-toast"

interface Course {
  id: string
  title: string
}

export default function NewBatchPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [formData, setFormData] = useState({
    name: "",
    courseId: "",
    startDate: "",
    endDate: "",
    capacity: "30",
    schedule: "",
    isActive: true,
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/admin/courses")
      if (!response.ok) throw new Error("Failed to fetch courses")
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error("Error fetching courses:", error)
      toast.error("Failed to load courses")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.courseId || !formData.startDate) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/batches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to create batch")

      toast.success("Batch created successfully")
      router.push("/admin/student/batches")
    } catch (error) {
      console.error("Error creating batch:", error)
      toast.error("Failed to create batch")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Batch</h1>

      <Card>
        <CardHeader>
          <CardTitle>Batch Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Batch Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter batch name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseId">Course *</Label>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) => handleSelectChange("courseId", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="Enter batch capacity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isActive">Status</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                  />
                  <Label htmlFor="isActive">{formData.isActive ? "Active" : "Inactive"}</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule (Optional)</Label>
              <Textarea
                id="schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                placeholder="Enter batch schedule details"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/student/batches")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-800 hover:bg-blue-900" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Batch"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
