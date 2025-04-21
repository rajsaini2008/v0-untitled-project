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
import { Save, ArrowLeft } from "lucide-react"

interface Paper {
  id: string
  title: string
  subject: {
    name: string
  }
  totalMarks: number
  passingMarks: number
  duration: number
}

interface Question {
  id: string
  question: string
  optionA: string | null
  optionB: string | null
  optionC: string | null
  optionD: string | null
  answer: string | null
  marks: number
}

export default function AddQuestionsPage({ params }: { params: { paperId: string } }) {
  const router = useRouter()
  const { paperId } = params

  const [paper, setPaper] = useState<Paper | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    marks: "1",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch paper details
        const paperResponse = await fetch(`/api/admin/papers/${paperId}`)
        if (!paperResponse.ok) throw new Error("Failed to fetch paper")
        const paperData = await paperResponse.json()
        setPaper(paperData)

        // Fetch existing questions
        const questionsResponse = await fetch(`/api/admin/papers/${paperId}/questions`)
        if (!questionsResponse.ok) throw new Error("Failed to fetch questions")
        const questionsData = await questionsResponse.json()
        setQuestions(questionsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [paperId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
      marks: "1",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.question) {
      toast.error("Question is required")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/admin/papers/${paperId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          marks: Number.parseInt(formData.marks),
        }),
      })

      if (!response.ok) throw new Error("Failed to add question")

      const newQuestion = await response.json()
      setQuestions((prev) => [...prev, newQuestion])

      toast.success("Question added successfully")
      resetForm()
    } catch (error) {
      console.error("Error adding question:", error)
      toast.error("Failed to add question")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFinish = () => {
    toast.success("Paper and questions saved successfully")
    router.push("/admin/exam/show-paper")
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Add Questions</h1>
        <p>Loading paper details...</p>
      </div>
    )
  }

  if (!paper) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Add Questions</h1>
        <p className="text-red-500">Paper not found</p>
        <Button onClick={() => router.push("/admin/exam/show-paper")} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Papers
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add Questions</h1>
        <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Finish
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Paper Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Title</p>
              <p className="font-medium">{paper.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Subject</p>
              <p className="font-medium">{paper.subject.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Marks</p>
              <p className="font-medium">{paper.totalMarks}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Duration</p>
              <p className="font-medium">{paper.duration} minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question">Question *</Label>
              <Textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Enter question"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="optionA">Option A</Label>
                <Input
                  id="optionA"
                  name="optionA"
                  value={formData.optionA}
                  onChange={handleInputChange}
                  placeholder="Enter option A"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="optionB">Option B</Label>
                <Input
                  id="optionB"
                  name="optionB"
                  value={formData.optionB}
                  onChange={handleInputChange}
                  placeholder="Enter option B"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="optionC">Option C</Label>
                <Input
                  id="optionC"
                  name="optionC"
                  value={formData.optionC}
                  onChange={handleInputChange}
                  placeholder="Enter option C"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="optionD">Option D</Label>
                <Input
                  id="optionD"
                  name="optionD"
                  value={formData.optionD}
                  onChange={handleInputChange}
                  placeholder="Enter option D"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="answer">Correct Answer</Label>
                <Select value={formData.answer} onValueChange={(value) => handleSelectChange("answer", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select correct answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Option A</SelectItem>
                    <SelectItem value="B">Option B</SelectItem>
                    <SelectItem value="C">Option C</SelectItem>
                    <SelectItem value="D">Option D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marks">Marks</Label>
                <Input
                  id="marks"
                  name="marks"
                  type="number"
                  value={formData.marks}
                  onChange={handleInputChange}
                  placeholder="Enter marks"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-800 hover:bg-blue-900" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Question"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions ({questions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No questions added yet</p>
          ) : (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">
                      Q{index + 1}. {question.question}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {question.marks} {question.marks === 1 ? "mark" : "marks"}
                    </span>
                  </div>

                  {(question.optionA || question.optionB || question.optionC || question.optionD) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {question.optionA && (
                        <div
                          className={`p-2 rounded ${question.answer === "A" ? "bg-green-50 border border-green-200" : ""}`}
                        >
                          <span className="font-medium">A:</span> {question.optionA}
                          {question.answer === "A" && <span className="ml-2 text-green-600 text-xs">(Correct)</span>}
                        </div>
                      )}
                      {question.optionB && (
                        <div
                          className={`p-2 rounded ${question.answer === "B" ? "bg-green-50 border border-green-200" : ""}`}
                        >
                          <span className="font-medium">B:</span> {question.optionB}
                          {question.answer === "B" && <span className="ml-2 text-green-600 text-xs">(Correct)</span>}
                        </div>
                      )}
                      {question.optionC && (
                        <div
                          className={`p-2 rounded ${question.answer === "C" ? "bg-green-50 border border-green-200" : ""}`}
                        >
                          <span className="font-medium">C:</span> {question.optionC}
                          {question.answer === "C" && <span className="ml-2 text-green-600 text-xs">(Correct)</span>}
                        </div>
                      )}
                      {question.optionD && (
                        <div
                          className={`p-2 rounded ${question.answer === "D" ? "bg-green-50 border border-green-200" : ""}`}
                        >
                          <span className="font-medium">D:</span> {question.optionD}
                          {question.answer === "D" && <span className="ml-2 text-green-600 text-xs">(Correct)</span>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
