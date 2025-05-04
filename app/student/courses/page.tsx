"use client"

import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatDate } from "@/lib/utils"
import { BookOpen, Calendar, Clock, FileText, CheckCircle, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface CourseModule {
  id: string
  title: string
  description: string
  duration: string
  status: "completed" | "in-progress" | "upcoming"
  resources?: {
    id: string
    title: string
    type: "pdf" | "video" | "link"
    url: string
  }[]
}

export default function StudentCourses() {
  const { currentUser } = useAuth()
  const [courseDetails, setCourseDetails] = useState<any>(null)
  const [courseModules, setCourseModules] = useState<CourseModule[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll just simulate loading course details
    const loadCourseDetails = () => {
      try {
        if (currentUser) {
          // Get course details based on the user's enrolled course
          const courseCode = currentUser.course

          // Mock course details
          const mockCourseDetails = {
            dca: {
              name: "Diploma in Computer Applications",
              code: "DCA",
              duration: "6 months",
              description:
                "A comprehensive course covering computer fundamentals, office applications, internet usage, and basic programming concepts.",
              startDate: currentUser.joiningDate,
              endDate: new Date(new Date(currentUser.joiningDate).getTime() + 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months from joining date
              progress: 35, // percentage
              instructor: "Rahul Verma",
            },
            ccc: {
              name: "Course on Computer Concepts",
              code: "CCC",
              duration: "3 months",
              description:
                "An entry-level course designed to familiarize students with basic computer operations and applications.",
              startDate: currentUser.joiningDate,
              endDate: new Date(new Date(currentUser.joiningDate).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 3 months from joining date
              progress: 50, // percentage
              instructor: "Priya Sharma",
            },
            tally: {
              name: "Tally Prime with GST",
              code: "TALLY",
              duration: "3 months",
              description:
                "Learn complete accounting software with GST implementation for business and financial management.",
              startDate: currentUser.joiningDate,
              endDate: new Date(new Date(currentUser.joiningDate).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 3 months from joining date
              progress: 40, // percentage
              instructor: "Amit Kumar",
            },
            "o-level": {
              name: "NIELIT O Level",
              code: "O-LEVEL",
              duration: "1 year",
              description:
                "A foundation level course in IT recognized by the Government of India, covering programming, web development, and more.",
              startDate: currentUser.joiningDate,
              endDate: new Date(new Date(currentUser.joiningDate).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from joining date
              progress: 20, // percentage
              instructor: "Sanjay Gupta",
            },
            "web-design": {
              name: "Web Design & Development",
              code: "WEB",
              duration: "4 months",
              description: "Learn to create responsive websites using HTML, CSS, JavaScript, and popular frameworks.",
              startDate: currentUser.joiningDate,
              endDate: new Date(new Date(currentUser.joiningDate).getTime() + 120 * 24 * 60 * 60 * 1000).toISOString(), // 4 months from joining date
              progress: 30, // percentage
              instructor: "Neha Singh",
            },
          }

          setCourseDetails(mockCourseDetails[courseCode] || null)

          // Mock course modules
          const mockModules = [
            {
              id: "1",
              title: "Introduction to Computers",
              description: "Basic concepts of computer hardware and software.",
              duration: "2 weeks",
              status: "completed" as const,
              resources: [
                {
                  id: "r1",
                  title: "Introduction to Computers PDF",
                  type: "pdf" as const,
                  url: "#",
                },
                {
                  id: "r2",
                  title: "Computer Hardware Video",
                  type: "video" as const,
                  url: "#",
                },
              ],
            },
            {
              id: "2",
              title: "Operating Systems",
              description: "Understanding Windows, Linux, and other operating systems.",
              duration: "3 weeks",
              status: "in-progress" as const,
              resources: [
                {
                  id: "r3",
                  title: "Operating Systems Guide",
                  type: "pdf" as const,
                  url: "#",
                },
              ],
            },
            {
              id: "3",
              title: "Microsoft Office Suite",
              description: "Word, Excel, PowerPoint, and Outlook.",
              duration: "4 weeks",
              status: "upcoming" as const,
              resources: [
                {
                  id: "r4",
                  title: "MS Office Tutorial",
                  type: "pdf" as const,
                  url: "#",
                },
                {
                  id: "r5",
                  title: "Excel Formulas Cheat Sheet",
                  type: "pdf" as const,
                  url: "#",
                },
              ],
            },
            {
              id: "4",
              title: "Internet and Web Basics",
              description: "Understanding internet protocols, browsers, and basic web concepts.",
              duration: "2 weeks",
              status: "upcoming" as const,
              resources: [],
            },
          ]

          setCourseModules(mockModules)
        }
      } catch (error) {
        console.error("Error loading course details:", error)
        toast({
          title: "Error loading course details",
          description: "There was a problem loading your course information.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (currentUser) {
      loadCourseDetails()
    }
  }, [currentUser])

  const handleDownloadResource = (resource: any) => {
    // In a real app, this would download the resource
    toast({
      title: "Resource Downloaded",
      description: `${resource.title} has been downloaded.`,
    })
  }

  if (!currentUser) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading user data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
        </div>
      ) : !courseDetails ? (
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Course Enrolled</h3>
            <p className="text-gray-600">You are not enrolled in any course at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Course Overview */}
          <Card>
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle>{courseDetails.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <p className="text-gray-700">{courseDetails.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{formatDate(courseDetails.startDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">{formatDate(courseDetails.endDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{courseDetails.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Course Progress</p>
                    <p className="text-sm font-medium">{courseDetails.progress}%</p>
                  </div>
                  <Progress value={courseDetails.progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Modules */}
          <h2 className="text-xl font-bold mt-8 mb-4">Course Modules</h2>
          <div className="space-y-4">
            {courseModules.map((module) => (
              <Card
                key={module.id}
                className={`
                ${module.status === "completed" ? "border-green-200" : ""}
                ${module.status === "in-progress" ? "border-blue-200" : ""}
                ${module.status === "upcoming" ? "border-gray-200" : ""}
              `}
              >
                <CardHeader
                  className={`
                  ${module.status === "completed" ? "bg-green-50 border-b border-green-100" : ""}
                  ${module.status === "in-progress" ? "bg-blue-50 border-b border-blue-100" : ""}
                  ${module.status === "upcoming" ? "bg-gray-50 border-b border-gray-100" : ""}
                `}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <CardTitle>{module.title}</CardTitle>
                      {module.status === "completed" && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${module.status === "completed" ? "bg-green-100 text-green-800" : ""}
                      ${module.status === "in-progress" ? "bg-blue-100 text-blue-800" : ""}
                      ${module.status === "upcoming" ? "bg-gray-100 text-gray-800" : ""}
                    `}
                    >
                      {module.status === "completed" ? "Completed" : ""}
                      {module.status === "in-progress" ? "In Progress" : ""}
                      {module.status === "upcoming" ? "Upcoming" : ""}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-700">{module.description}</p>
                      <p className="text-sm text-gray-500 mt-2">Duration: {module.duration}</p>
                    </div>

                    {module.resources && module.resources.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Resources</h4>
                        <div className="space-y-2">
                          {module.resources.map((resource) => (
                            <div
                              key={resource.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                            >
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-blue-800 mr-2" />
                                <span>{resource.title}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownloadResource(resource)}
                                className="h-8 w-8 p-0"
                              >
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
