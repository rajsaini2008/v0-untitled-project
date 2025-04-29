import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Courses() {
  const courses = [
    {
      id: "dca",
      title: "DCA",
      fullTitle: "Diploma in Computer Applications",
      duration: "6 months",
      level: "Beginner",
      description:
        "A comprehensive course covering the fundamentals of computer applications including MS Office, internet usage, basic hardware knowledge, and introduction to programming concepts.",
      modules: [
        "Computer Fundamentals",
        "MS Windows",
        "MS Word",
        "MS Excel",
        "MS PowerPoint",
        "Internet & Email",
        "Basic Hardware & Troubleshooting",
        "Introduction to Programming",
      ],
      eligibility: "10th Pass or Equivalent",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "ccc",
      title: "CCC",
      fullTitle: "Course on Computer Concepts",
      duration: "3 months",
      level: "Beginner",
      description:
        "A basic course designed to impart fundamental knowledge of computers to the common man. This course is designed to make a person computer literate and give them the basic skills needed to operate a computer effectively.",
      modules: [
        "Introduction to Computers",
        "Operating System Basics",
        "Word Processing",
        "Spreadsheets",
        "Presentations",
        "Internet & Web Browsing",
        "Email Management",
        "Digital Financial Tools",
      ],
      eligibility: "No specific prerequisites",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "tally",
      title: "Tally",
      fullTitle: "Tally ERP 9",
      duration: "3 months",
      level: "Intermediate",
      description:
        "A specialized course focusing on Tally ERP 9, one of the most popular accounting software used by businesses across India. Learn to manage accounts, inventory, and taxation.",
      modules: [
        "Basic Accounting Concepts",
        "Introduction to Tally",
        "Company Creation",
        "Ledger & Groups",
        "Voucher Entry",
        "Inventory Management",
        "GST in Tally",
        "Financial Reports & Statements",
      ],
      eligibility: "Basic knowledge of accounting",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "o-level",
      title: "O Level",
      fullTitle: "NIELIT O Level",
      duration: "1 year",
      level: "Intermediate",
      description:
        "A foundation level course in IT recognized by the Government of India. It provides students with the necessary skills to take up entry-level positions in the IT industry.",
      modules: [
        "IT Tools and Business Systems",
        "Internet & Web Design",
        "Programming and Problem Solving through C Language",
        "Application of .NET Technology",
        "Introduction to Multimedia",
      ],
      eligibility: "10+2 or equivalent",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "web-design",
      title: "Web Design",
      fullTitle: "Web Design & Development",
      duration: "4 months",
      level: "Intermediate",
      description:
        "Learn to design and develop modern, responsive websites using the latest technologies and best practices in web development.",
      modules: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Bootstrap",
        "jQuery",
        "Responsive Design",
        "PHP Basics",
        "MySQL Database",
      ],
      eligibility: "Basic computer knowledge",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "programming",
      title: "Programming",
      fullTitle: "Programming Languages",
      duration: "6 months",
      level: "Intermediate to Advanced",
      description:
        "A comprehensive course covering multiple programming languages to help students build a strong foundation in programming concepts and practices.",
      modules: [
        "C Programming",
        "C++ Programming",
        "Java Programming",
        "Python Programming",
        "Data Structures",
        "Algorithms",
        "Object-Oriented Programming",
        "Database Connectivity",
      ],
      eligibility: "Basic computer knowledge",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Courses</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our wide range of computer courses designed to help you build the skills needed for a successful
          career in the IT industry.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-blue-800">{course.title}</h3>
                      <p className="text-gray-600">{course.fullTitle}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{course.level}</div>
                  </div>
                  <div className="flex justify-between mb-4 text-sm">
                    <span className="text-gray-600">
                      <strong>Duration:</strong> {course.duration}
                    </span>
                    <span className="text-gray-600">
                      <strong>Eligibility:</strong> {course.eligibility}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded"
                  >
                    View Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="beginner" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses
            .filter((course) => course.level === "Beginner")
            .map((course) => (
              <Card key={course.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-blue-800">{course.title}</h3>
                        <p className="text-gray-600">{course.fullTitle}</p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{course.level}</div>
                    </div>
                    <div className="flex justify-between mb-4 text-sm">
                      <span className="text-gray-600">
                        <strong>Duration:</strong> {course.duration}
                      </span>
                      <span className="text-gray-600">
                        <strong>Eligibility:</strong> {course.eligibility}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded"
                    >
                      View Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="intermediate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses
            .filter((course) => course.level.includes("Intermediate"))
            .map((course) => (
              <Card key={course.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-blue-800">{course.title}</h3>
                        <p className="text-gray-600">{course.fullTitle}</p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{course.level}</div>
                    </div>
                    <div className="flex justify-between mb-4 text-sm">
                      <span className="text-gray-600">
                        <strong>Duration:</strong> {course.duration}
                      </span>
                      <span className="text-gray-600">
                        <strong>Eligibility:</strong> {course.eligibility}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded"
                    >
                      View Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="advanced" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses
            .filter((course) => course.level.includes("Advanced"))
            .map((course) => (
              <Card key={course.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-blue-800">{course.title}</h3>
                        <p className="text-gray-600">{course.fullTitle}</p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{course.level}</div>
                    </div>
                    <div className="flex justify-between mb-4 text-sm">
                      <span className="text-gray-600">
                        <strong>Duration:</strong> {course.duration}
                      </span>
                      <span className="text-gray-600">
                        <strong>Eligibility:</strong> {course.eligibility}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded"
                    >
                      View Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      <div className="bg-gray-100 p-8 rounded-lg mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Why Learn With Us?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            At Krishna Computers, we provide more than just courses. We offer a complete learning experience designed to
            help you succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Faculty</h3>
            <p className="text-gray-600">Learn from industry professionals with years of experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Practical Training</h3>
            <p className="text-gray-600">Hands-on experience with real-world projects and case studies.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Placement Support</h3>
            <p className="text-gray-600">Dedicated placement assistance to help you find the right job.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Flexible Timings</h3>
            <p className="text-gray-600">Choose from morning, evening, and weekend batches.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-800 text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Skills?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join Krishna Computers today and take the first step towards a successful career in IT.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-red-500 hover:bg-red-600 text-white">Enroll Now</Button>
          <Button className="bg-transparent hover:bg-white hover:text-blue-800 border border-white">
            Download Brochure
          </Button>
        </div>
      </div>
    </div>
  )
}
