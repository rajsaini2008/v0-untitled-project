"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"

export default function NewExamPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [questions, setQuestions] = useState([
    { id: 1, text: "", type: "multiple_choice", options: ["", "", "", ""], answer: "", marks: 1 },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/admin/exams")
    }, 1500)
  }

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1
    setQuestions([
      ...questions,
      { id: newId, text: "", type: "multiple_choice", options: ["", "", "", ""], answer: "", marks: 1 },
    ])
  }

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  return (
    <div>
      <Header title="Create New Exam" />
      <main className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/exams">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Create New Exam</h2>
              <p className="text-muted-foreground">Set up a new exam with questions</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Exam Details</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Exam Details</CardTitle>
                    <CardDescription>Set up the basic exam information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Exam Title</Label>
                        <Input id="title" placeholder="Enter exam title" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Select>
                          <SelectTrigger id="course">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dca">DCA - Diploma in Computer Applications</SelectItem>
                            <SelectItem value="ccc">CCC - Course on Computer Concepts</SelectItem>
                            <SelectItem value="tally">Tally Prime with GST</SelectItem>
                            <SelectItem value="o-level">O Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Enter exam description" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="exam-date">Exam Date</Label>
                        <Input id="exam-date" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exam-time">Exam Time</Label>
                        <Input id="exam-time" type="time" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input id="duration" type="number" min="1" placeholder="Enter duration in minutes" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="total-marks">Total Marks</Label>
                        <Input id="total-marks" type="number" min="1" placeholder="Enter total marks" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="passing-marks">Passing Marks</Label>
                        <Input id="passing-marks" type="number" min="1" placeholder="Enter passing marks" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject (Optional)</Label>
                        <Select>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="computer-fundamentals">Computer Fundamentals</SelectItem>
                            <SelectItem value="ms-office">MS Office</SelectItem>
                            <SelectItem value="programming">Programming</SelectItem>
                            <SelectItem value="networking">Networking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="online-exam" />
                      <Label htmlFor="online-exam">This is an online exam</Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled>
                      Previous
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("questions")}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="questions">
                <Card>
                  <CardHeader>
                    <CardTitle>Exam Questions</CardTitle>
                    <CardDescription>Add questions to the exam</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {questions.map((question, index) => (
                      <div key={question.id} className="p-4 border rounded-md space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Question {index + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                            disabled={questions.length === 1}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                          <Textarea
                            id={`question-${question.id}`}
                            placeholder="Enter question text"
                            value={question.text}
                            onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`question-type-${question.id}`}>Question Type</Label>
                            <Select
                              value={question.type}
                              onValueChange={(value) => updateQuestion(question.id, "type", value)}
                            >
                              <SelectTrigger id={`question-type-${question.id}`}>
                                <SelectValue placeholder="Select question type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                                <SelectItem value="true_false">True/False</SelectItem>
                                <SelectItem value="fill_in_blank">Fill in the Blank</SelectItem>
                                <SelectItem value="descriptive">Descriptive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`marks-${question.id}`}>Marks</Label>
                            <Input
                              id={`marks-${question.id}`}
                              type="number"
                              min="1"
                              placeholder="Enter marks"
                              value={question.marks}
                              onChange={(e) => updateQuestion(question.id, "marks", Number.parseInt(e.target.value))}
                              required
                            />
                          </div>
                        </div>

                        {question.type === "multiple_choice" && (
                          <div className="space-y-4">
                            <Label>Options</Label>
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex gap-2">
                                <Input
                                  placeholder={`Option ${optIndex + 1}`}
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...question.options]
                                    newOptions[optIndex] = e.target.value
                                    updateQuestion(question.id, "options", newOptions)
                                  }}
                                  required
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor={`answer-${question.id}`}>Correct Answer</Label>
                          {question.type === "multiple_choice" ? (
                            <Select
                              value={question.answer}
                              onValueChange={(value) => updateQuestion(question.id, "answer", value)}
                            >
                              <SelectTrigger id={`answer-${question.id}`}>
                                <SelectValue placeholder="Select correct option" />
                              </SelectTrigger>
                              <SelectContent>
                                {question.options.map((option, optIndex) => (
                                  <SelectItem key={optIndex} value={option || `Option ${optIndex + 1}`}>
                                    {option || `Option ${optIndex + 1}`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : question.type === "true_false" ? (
                            <Select
                              value={question.answer}
                              onValueChange={(value) => updateQuestion(question.id, "answer", value)}
                            >
                              <SelectTrigger id={`answer-${question.id}`}>
                                <SelectValue placeholder="Select correct answer" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">True</SelectItem>
                                <SelectItem value="false">False</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id={`answer-${question.id}`}
                              placeholder="Enter correct answer"
                              value={question.answer}
                              onChange={(e) => updateQuestion(question.id, "answer", e.target.value)}
                              required
                            />
                          )}
                        </div>
                      </div>
                    ))}

                    <Button type="button" variant="outline" className="w-full" onClick={addQuestion}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                      Previous
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2">
                      <Save className="h-4 w-4" />
                      {isSubmitting ? "Saving..." : "Save Exam"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </main>
    </div>
  )
}
