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
import { useAuth } from "@/lib/auth"
import { generateStudentId, generateRandomPassword } from "@/lib/utils"

export default function NewStudent() {
  const router = useRouter()
  const { registerStudent } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    education: "",
    course: "",
    batch: "",
    joiningDate: "",
    feeStatus: "",
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

    try {
      // In a real application, this would be an API call to save the student
      // For now, we'll just simulate a delay and show a success message
      setTimeout(() => {
        // Generate student ID and password
        const studentId = generateStudentId(formData.course)
        const password = generateRandomPassword()

        // Save to localStorage for demo purposes
        const students = JSON.parse(localStorage.getItem("students") || "[]")
        const newStudent = {
          id: Date.now().toString(),
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
          studentId,
          password,
          enrollmentDate: formData.joiningDate,
        }
        students.push(newStudent)
        localStorage.setItem("students", JSON.stringify(students))

        // Show success message with credentials
        toast({
          title: "Student added successfully",
          description: (
            <div>
              <div>
                {formData.firstName} {formData.lastName} has been added to the system.
              </div>
              <div className="mt-2 rounded-md bg-gray-50 p-2">
                <div className="font-medium">Student Credentials:</div>
                <div>
                  Student ID: <span className="font-mono">{studentId}</span>
                </div>
                <div>
                  Password: <span className="font-mono">{password}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">Please share these credentials with the student.</div>
            </div>
          ),
          variant: "credential",
        })

        setIsSubmitting(false)
        router.push("/admin/students")
      }, 1000)
    } catch (error) {
      console.error("Error adding student:", error)
      toast({
        title: "Error",
        description: "There was a problem adding the student.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Add New Student</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  name="education"
                  placeholder="Highest qualification"
                  value={formData.education}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={formData.course} onValueChange={(value) => handleSelectChange("course", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dca">DCA</SelectItem>
                    <SelectItem value="ccc">CCC</SelectItem>
                    <SelectItem value="tally">Tally</SelectItem>
                    <SelectItem value="o-level">O Level</SelectItem>
                    <SelectItem value="web-design">Web Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch">Batch</Label>
                <Select value={formData.batch} onValueChange={(value) => handleSelectChange("batch", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input
                  id="joiningDate"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feeStatus">Fee Status</Label>
              <Select value={formData.feeStatus} onValueChange={(value) => handleSelectChange("feeStatus", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fee status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Student"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
