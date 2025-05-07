"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { uploadFile } from "@/lib/upload"

export default function NewStudentPage() {
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  const router = useRouter()
  const { toast } = useToast()

  // Fetch courses from the database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        const data = await response.json()
        if (data.courses) {
          setCourses(data.courses)
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchCourses()
  }, [toast])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target)

      // Handle file uploads
      let photoUrl = ""
      let idCardUrl = ""
      let signatureUrl = ""

      const photoFile = formData.get("photo")
      const idCardFile = formData.get("idCard")
      const signatureFile = formData.get("signature")

      if (photoFile instanceof File && photoFile.size > 0) {
        photoUrl = await uploadFile(photoFile)
      }

      if (idCardFile instanceof File && idCardFile.size > 0) {
        idCardUrl = await uploadFile(idCardFile)
      }

      if (signatureFile instanceof File && signatureFile.size > 0) {
        signatureUrl = await uploadFile(signatureFile)
      }

      // Generate student ID and password
      const studentId = "KC" + Math.floor(10000 + Math.random() * 90000)
      const password = Math.random().toString(36).slice(-8)

      // Create student object
      const studentData = {
        studentId,
        password,
        fullName: formData.get("fullName"),
        fatherName: formData.get("fatherName"),
        motherName: formData.get("motherName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        dateOfBirth: formData.get("dateOfBirth"),
        gender: formData.get("gender"),
        courseId: formData.get("courseId"),
        photo: photoUrl,
        idCard: idCardUrl,
        signature: signatureUrl,
        registrationDate: new Date().toISOString(),
      }

      // Send data to API
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Student Added",
          description: `Student added successfully. ID: ${studentId}, Password: ${password}`,
        })
        router.push("/admin/students")
      } else {
        throw new Error(result.error || "Failed to add student")
      }
    } catch (error) {
      console.error("Error adding student:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to add student. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
          <CardDescription>Enter student details to register them in the system</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input id="fatherName" name="fatherName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherName">Mother's Name</Label>
                <Input id="motherName" name="motherName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender" required>
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
                <Label htmlFor="courseId">Course</Label>
                <Select name="courseId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course._id} value={course._id}>
                        {course.name} ({course.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="photo">Photo</Label>
                <Input id="photo" name="photo" type="file" accept="image/*" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idCard">ID Card</Label>
                <Input id="idCard" name="idCard" type="file" accept="image/*" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signature">Signature</Label>
                <Input id="signature" name="signature" type="file" accept="image/*" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Student"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
