"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { verifyCertificate } from "./actions"

interface VerificationResult {
  success: boolean
  message?: string
  certificate?: {
    certificateNo: string
    studentName: string
    courseTitle: string
    issueDate: string
    status: string
  }
}

export default function CertificateVerification() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsVerifying(true)

    try {
      const result = await verifyCertificate(formData)
      setResult(result)
    } catch (error) {
      console.error("Error verifying certificate:", error)
      setResult({
        success: false,
        message: "An error occurred while verifying the certificate",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Certificate Verification</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Verify the authenticity of certificates issued by Krishna Computers
          </p>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-2xl text-blue-800">Verify Your Certificate</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form action={handleSubmit} className="space-y-6">
                  <div className="grid gap-2">
                    <label htmlFor="certificate-number" className="font-medium text-gray-700">
                      Certificate Number
                    </label>
                    <Input
                      id="certificate-number"
                      name="certificate-number"
                      placeholder="Enter your certificate number"
                    />
                    <p className="text-sm text-gray-500">
                      The certificate number can be found on the bottom of your certificate.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="student-name" className="font-medium text-gray-700">
                      Student Name
                    </label>
                    <Input id="student-name" name="student-name" placeholder="Enter your full name as on certificate" />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="course-name" className="font-medium text-gray-700">
                      Course Name
                    </label>
                    <Input id="course-name" name="course-name" placeholder="Enter the course name" />
                  </div>

                  <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900" disabled={isVerifying}>
                    {isVerifying ? "Verifying..." : "Verify Certificate"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Verification Result */}
            {result && (
              <Card className="border-none shadow-lg mt-8">
                <CardHeader className={`${result.success ? "bg-green-50" : "bg-red-50"} border-b`}>
                  <CardTitle
                    className={`text-2xl ${result.success ? "text-green-700" : "text-red-700"} flex items-center gap-2`}
                  >
                    {result.success ? <>Certificate Verified</> : <>Verification Failed</>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.success ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Certificate Number</p>
                          <p className="font-medium">{result.certificate?.certificateNo}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Issue Date</p>
                          <p className="font-medium">{new Date(result.certificate?.issueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Student Name</p>
                          <p className="font-medium">{result.certificate?.studentName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Course</p>
                          <p className="font-medium">{result.certificate?.courseTitle}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg mt-4">
                        <p className="text-green-800">This is a genuine certificate issued by Krishna Computers.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-red-800">{result.message}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
