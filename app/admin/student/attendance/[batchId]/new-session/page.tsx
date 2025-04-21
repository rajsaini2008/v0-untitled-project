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
import { toast } from "react-hot-toast"

interface Batch {
  id: string
  name: string
  course: {
    title: string
  }
}

interface Subject {
  id: string
  name: string
}

export default function NewAttendanceSessionPage({ params }: { params: { batchId: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [batch, setBatch] = useState<Batch | null>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [formData, setFormData] = useState({
    batchId: params.batchId,
    date: new Date().toISOString().split("T")[0],
    subjectId: "",
    topic: "",
    notes: "",
  })

  useEffect(() => {
    fetchBatchDetails()
    fetchSubjects()
  }, [])

  const fetchBatchDetails = async () => {
    try {
      const response = await fetch(`/api/admin/batches/${params.batchId}`)
      if (!response.ok) throw new Error("Failed to fetch batch details")
      const data = await response.json()
      setBatch(data)
    } catch (error) {
      console.error("Error fetching batch details:", error)
      toast.error("Failed to load batch details")
    }
  }

  const fetchSubjects = async () => {
    try {
      const response = await fetch("/api/admin/subjects")
      if (!response.ok) throw new Error("Failed to fetch subjects")
      const data = await response.json()
      setSubjects(data)
    } catch (error) {
      console.error("Error fetching subjects:", error)
      toast.error("Failed to load subjects")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.date) {
      toast.error("Date is required")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/attendance/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to create attendance session")

      const session = await response.json()
      toast.success("Attendance session created successfully")
      router.push(`/admin/student/attendance/session/${session.id}`)
    } catch (error) {
      console.error("Error creating attendance session:", error)
      toast.error("Failed to create attendance session")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Attendance Session</h1>
          {batch && (
            <p className="text-gray-500">
              {batch.name} - {batch.course.title}
            </p>
          )}
        </div>
        <Button variant="outline" onClick={() => router.push(`/admin/student/attendance/${params.batchId}`)}>
          Back to Attendance
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjectId">Subject (Optional)</Label>
                <Select value={formData.subjectId} onValueChange={(value) => handleSelectChange("subjectId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="Enter session topic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Enter any notes about this session"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/admin/student/attendance/${params.batchId}`)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-800 hover:bg-blue-900" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Session & Take Attendance"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
