"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"

interface Subject {
  id: string
  name: string
}

export default function AddPaperPage() {
  const router = useRouter()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    subjectId: "",
    totalMarks: "100",
    passingMarks: "35",
    duration: "60",
    instructions: "",
    isActive: true,
  })

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/api/admin/subjects")
        if (!response.ok) throw new Error("Failed to fetch subjects")

        const data = await response.json()
        setSubjects(data)
      } catch (error) {
        console.error("Error fetching subjects:", error)
        toast.error("Failed to load subjects")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubjects()
  }, [])

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

    if (!formData.title || !formData.subjectId) {
      toast.error("Title and Subject are required")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/papers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalMarks: Number.parseInt(formData.totalMarks),
          passingMarks: Number.parseInt(formData.passingMarks),
          duration: Number.parseInt(formData.duration),
        }),
      })

      if (!response.ok) throw new Error("Failed to create paper")

      const paper = await response.json()

      toast.success("Paper created successfully")
      router.push(`/admin/exam/add-questions/${paper.id}`)
    } catch (error) {
      console.error("Error creating paper:", error)
      toast.error("Failed to create paper")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Add Paper</h1>
        <p>Loading subjects...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Paper</h1>

      <Card>
        <CardHeader>
          <CardTitle>Paper Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Paper Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter paper title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Input
                  id="totalMarks"
                  name="totalMarks"
                  type="number"
                  value={formData.totalMarks}
                  onChange={handleInputChange}
                  placeholder="Enter total marks"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passingMarks">Passing Marks</Label>
                <Input
                  id="passingMarks"
                  name="passingMarks"
                  type="number"
                  value={formData.passingMarks}
                  onChange={handleInputChange}
                  placeholder="Enter passing marks"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Enter duration in minutes"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="Enter instructions for the paper"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/exam/show-paper")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-800 hover:bg-blue-900" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Paper"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
