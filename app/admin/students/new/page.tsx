"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Upload } from "lucide-react"
import Link from "next/link"

export default function NewStudentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/admin/students")
    }, 1500)
  }

  return (
    <div>
      <Header title="Add New Student" />
      <main className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/students">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Add New Student</h2>
              <p className="text-muted-foreground">Create a new student record</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="contact">Contact Details</TabsTrigger>
                <TabsTrigger value="course">Course & Payment</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Enter the student's personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter full name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="registration">Registration Number</Label>
                        <Input id="registration" placeholder="Auto-generated" disabled />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="father-name">Father's Name</Label>
                        <Input id="father-name" placeholder="Enter father's name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mother-name">Mother's Name</Label>
                        <Input id="mother-name" placeholder="Enter mother's name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup defaultValue="male" className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="aadhar">Aadhar Number</Label>
                        <Input id="aadhar" placeholder="Enter 12-digit Aadhar number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education">Highest Education</Label>
                        <Select>
                          <SelectTrigger id="education">
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10th">10th</SelectItem>
                            <SelectItem value="12th">12th</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="post-graduate">Post Graduate</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-gray-50">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                        <Input id="photo" type="file" className="max-w-xs" />
                      </div>
                      <p className="text-sm text-gray-500">Upload a passport size photo (JPEG or PNG, max 1MB)</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled>
                      Previous
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("contact")}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Details</CardTitle>
                    <CardDescription>Enter the student's contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" placeholder="Enter full address" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Enter city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="haryana">Haryana</SelectItem>
                            <SelectItem value="up">Uttar Pradesh</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input id="pincode" placeholder="Enter PIN code" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter phone number" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter email address" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergency-contact">Emergency Contact</Label>
                      <Input id="emergency-contact" placeholder="Enter emergency contact number" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => setActiveTab("personal")}>
                      Previous
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("course")}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="course">
                <Card>
                  <CardHeader>
                    <CardTitle>Course & Payment</CardTitle>
                    <CardDescription>Select course and payment details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <SelectItem value="web-design">Web Design & Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batch">Batch</Label>
                        <Select>
                          <SelectTrigger id="batch">
                            <SelectValue placeholder="Select batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9:00 AM - 11:00 AM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12:00 PM - 2:00 PM)</SelectItem>
                            <SelectItem value="evening">Evening (4:00 PM - 6:00 PM)</SelectItem>
                            <SelectItem value="weekend">Weekend (Saturday-Sunday)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input id="start-date" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date">Expected End Date</Label>
                        <Input id="end-date" type="date" disabled />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="total-fees">Total Fees (₹)</Label>
                        <Input id="total-fees" placeholder="Enter total fees" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discount">Discount (₹)</Label>
                        <Input id="discount" placeholder="Enter discount amount" defaultValue="0" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select>
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="cheque">Cheque</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="first-payment">First Payment Amount (₹)</Label>
                        <Input id="first-payment" placeholder="Enter first payment amount" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference / Transaction ID</Label>
                      <Input id="reference" placeholder="Enter reference or transaction ID" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => setActiveTab("contact")}>
                      Previous
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="gap-2">
                      <Save className="h-4 w-4" />
                      {isSubmitting ? "Saving..." : "Save Student"}
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
