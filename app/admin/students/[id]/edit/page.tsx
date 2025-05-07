"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Save } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  address: string
  course: string
  enrollmentDate: string
  fatherName: string
  motherName: string
  photoUrl: string
  idCardUrl: string
  signatureUrl: string
  status: "active" | "inactive"
}

export default function EditStudentPage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params.id as string

  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // In a real app, fetch student data from API
    // For now, using mock data
    setTimeout(() => {
      setStudent({
        id: studentId,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "9876543210",
        address: "123 Main Street, New Delhi",
        course: "Diploma in Computer Applications",
        enrollmentDate: "2023-01-15",
        fatherName: "Rajesh Sharma",
        motherName: "Sunita Sharma",
        photoUrl: "/placeholder.svg?height=150&width=150",
        idCardUrl: "/placeholder.svg?height=300&width=200",
        signatureUrl: "/placeholder.svg?height=100&width=200",
        status: "active",
      })
      setLoading(false)
    }, 1000)
  }, [studentId])

  const handleChange = (field: keyof Student, value: string) => {
    if (student) {
      setStudent({
        ...student,
        [field]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // In a real app, send data to API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Student updated",
        description: "Student information has been updated successfully.",
      })

      router.push(`/admin/students/${studentId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update student information.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Loading student data...</h1>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Student not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Student</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={student.name} onChange={(e) => handleChange("name", e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName">Father&apos;s Name</Label>
                <Input
                  id="fatherName"
                  value={student.fatherName}
                  onChange={(e) => handleChange("fatherName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherName">Mother&apos;s Name</Label>
                <Input
                  id="motherName"
                  value={student.motherName}
                  onChange={(e) => handleChange("motherName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={student.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={student.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={student.status}
                  onValueChange={(value) => handleChange("status", value as "active" | "inactive")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={student.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={student.course} onValueChange={(value) => handleChange("course", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diploma in Computer Applications">Diploma in Computer Applications</SelectItem>
                    <SelectItem value="Certificate in Web Development">Certificate in Web Development</SelectItem>
                    <SelectItem value="Diploma in Office Management">Diploma in Office Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                <Input
                  id="enrollmentDate"
                  type="date"
                  value={student.enrollmentDate}
                  onChange={(e) => handleChange("enrollmentDate", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
