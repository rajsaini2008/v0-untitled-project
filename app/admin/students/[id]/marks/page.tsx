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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Save } from "lucide-react"

export default function StudentMarksPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("")
  const [marks, setMarks] = useState<Record<string, number>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/admin/students/${params.id}`)
    }, 1500)
  }

  const handleMarkChange = (subjectId: string, value: string) => {
    setMarks({
      ...marks,
      [subjectId]: Number.parseFloat(value) || 0,
    })
  }

  return (
    <div>
      <Header title="Update Student Marks" />
      <main className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/admin/students/${params.id}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Update Marks</h2>
              <p className="text-muted-foreground">Student ID: {params.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
                <CardDescription>Details of the student</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-500">SN</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Student Name</h3>
                      <p className="text-sm text-gray-500">Registration: KC-2023-{params.id}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Father's Name:</span>
                      <span>Father Name</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Course:</span>
                      <span>DCA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Batch:</span>
                      <span>Morning (9:00 AM - 11:00 AM)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Enrollment Date:</span>
                      <span>10/01/2023</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Update Marks</CardTitle>
                <CardDescription>Enter marks for each subject</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="exam">Select Exam</Label>
                        <Select>
                          <SelectTrigger id="exam">
                            <SelectValue placeholder="Select exam" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mid-term">Mid Term Exam</SelectItem>
                            <SelectItem value="final">Final Exam</SelectItem>
                            <SelectItem value="practical">Practical Exam</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exam-date">Exam Date</Label>
                        <Input id="exam-date" type="date" />
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Max Marks</TableHead>
                            <TableHead>Marks Obtained</TableHead>
                            <TableHead>Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { id: "s1", name: "Computer Fundamentals", maxMarks: 100 },
                            { id: "s2", name: "MS Office", maxMarks: 100 },
                            { id: "s3", name: "Operating System", maxMarks: 100 },
                            { id: "s4", name: "Internet & Web Design", maxMarks: 100 },
                            { id: "s5", name: "Programming Concepts", maxMarks: 100 },
                          ].map((subject) => (
                            <TableRow key={subject.id}>
                              <TableCell>{subject.name}</TableCell>
                              <TableCell>{subject.maxMarks}</TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min="0"
                                  max={subject.maxMarks}
                                  value={marks[subject.id] || ""}
                                  onChange={(e) => handleMarkChange(subject.id, e.target.value)}
                                  className="w-20"
                                />
                              </TableCell>
                              <TableCell>
                                {marks[subject.id]
                                  ? `${((marks[subject.id] / subject.maxMarks) * 100).toFixed(2)}%`
                                  : "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="remarks">Remarks (Optional)</Label>
                      <Input id="remarks" placeholder="Enter any remarks about the student's performance" />
                    </div>
                  </div>

                  <CardFooter className="px-0 pt-4">
                    <Button type="submit" disabled={isSubmitting} className="ml-auto gap-2">
                      <Save className="h-4 w-4" />
                      {isSubmitting ? "Saving..." : "Save Marks"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Previous Marks History</CardTitle>
                <CardDescription>View previous exam results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Exam</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Max Marks</TableHead>
                        <TableHead>Marks Obtained</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          exam: "Mid Term",
                          date: "15/03/2023",
                          subject: "Computer Fundamentals",
                          maxMarks: 100,
                          obtained: 78,
                          result: "Pass",
                        },
                        {
                          exam: "Mid Term",
                          date: "15/03/2023",
                          subject: "MS Office",
                          maxMarks: 100,
                          obtained: 85,
                          result: "Pass",
                        },
                        {
                          exam: "Mid Term",
                          date: "15/03/2023",
                          subject: "Operating System",
                          maxMarks: 100,
                          obtained: 72,
                          result: "Pass",
                        },
                        {
                          exam: "Mid Term",
                          date: "15/03/2023",
                          subject: "Internet & Web Design",
                          maxMarks: 100,
                          obtained: 68,
                          result: "Pass",
                        },
                        {
                          exam: "Mid Term",
                          date: "15/03/2023",
                          subject: "Programming Concepts",
                          maxMarks: 100,
                          obtained: 65,
                          result: "Pass",
                        },
                      ].map((record, i) => (
                        <TableRow key={i}>
                          <TableCell>{record.exam}</TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.subject}</TableCell>
                          <TableCell>{record.maxMarks}</TableCell>
                          <TableCell>{record.obtained}</TableCell>
                          <TableCell>{((record.obtained / record.maxMarks) * 100).toFixed(2)}%</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                record.result === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {record.result}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
