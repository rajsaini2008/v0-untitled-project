"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function NewCourse() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    duration: "",
    fee: "",
    description: "",
    status: "active",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real application, this would be an API call to save the course
    // For now, we'll just simulate a delay and show a success message
    setTimeout(() => {
      // Save to localStorage for demo purposes
      const courses = JSON.parse(localStorage.getItem("courses") || "[]")
      const newCourse = {
        id: Date.now().toString(),
        ...formData,
      }
      courses.push(newCourse)
      localStorage.setItem("courses", JSON.stringify(courses))

      toast({
        title: "Course added successfully",
        description: `${formData.name} has been added to the system.`,
      })
      setIsSubmitting(false)
      router.push("/admin/courses")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Add New Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter course name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="Enter course code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="e.g., 6 months"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fee">Course Fee</Label>
                <Input
                  id="fee"
                  name="fee"
                  placeholder="e.g., ₹12,000"
                  value={formData.fee}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter course description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Course"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
