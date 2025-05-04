import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Courses() {
  const courseCategories = [
    { id: "all", label: "All Courses" },
    { id: "basic", label: "Basic Courses" },
    { id: "advanced", label: "Advanced Courses" },
    { id: "professional", label: "Professional Courses" },
  ]

  const courses = [
    {
      id: "dca",
      title: "DCA",
      fullTitle: "Diploma in Computer Applications",
      category: "basic",
      duration: "6 months",
      description:
        "A comprehensive course covering computer fundamentals, office applications, internet usage, and basic programming concepts.",
      image: "/placeholder.svg?height=200&width=300&text=DCA",
    },
    {
      id: "ccc",
      title: "CCC",
      fullTitle: "Course on Computer Concepts",
      category: "basic",
      duration: "3 months",
      description:
        "An entry-level course designed to familiarize students with basic computer operations and applications.",
      image: "/placeholder.svg?height=200&width=300&text=CCC",
    },
    {
      id: "tally",
      title: "Tally",
      fullTitle: "Tally Prime with GST",
      category: "professional",
      duration: "3 months",
      description: "Learn complete accounting software with GST implementation for business and financial management.",
      image: "/placeholder.svg?height=200&width=300&text=Tally",
    },
    {
      id: "o-level",
      title: "O Level",
      fullTitle: "NIELIT O Level",
      category: "advanced",
      duration: "1 year",
      description:
        "A foundation level course in IT recognized by the Government of India, covering programming, web development, and more.",
      image: "/placeholder.svg?height=200&width=300&text=O Level",
    },
    {
      id: "web-design",
      title: "Web Design",
      fullTitle: "Web Design & Development",
      category: "advanced",
      duration: "4 months",
      description: "Learn to create responsive websites using HTML, CSS, JavaScript, and popular frameworks.",
      image: "/placeholder.svg?height=200&width=300  CSS, JavaScript, and popular frameworks.",
      image: "/placeholder.svg?height=200&width=300&text=Web Design",
    },
    {
      id: "programming",
      title: "Programming",
      fullTitle: "Computer Programming",
      category: "advanced",
      duration: "6 months",
      description: "Master programming languages like C, C++, Java, Python and develop problem-solving skills.",
      image: "/placeholder.svg?height=200&width=300&text=Programming",
    },
    {
      id: "ms-office",
      title: "MS Office",
      fullTitle: "Microsoft Office Suite",
      category: "basic",
      duration: "2 months",
      description:
        "Learn to use Word, Excel, PowerPoint, and Outlook for professional document creation and management.",
      image: "/placeholder.svg?height=200&width=300&text=MS Office",
    },
    {
      id: "graphic-design",
      title: "Graphic Design",
      fullTitle: "Graphic Design & Multimedia",
      category: "professional",
      duration: "4 months",
      description: "Create stunning visuals using Photoshop, Illustrator, and other design tools.",
      image: "/placeholder.svg?height=200&width=300&text=Graphic Design",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Courses</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive computer education programs designed to build your skills and advance your career
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {courseCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="px-4 py-2 data-[state=active]:bg-blue-800 data-[state=active]:text-white"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {courseCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses
                    .filter((course) => category.id === "all" || course.category === category.id)
                    .map((course) => (
                      <Card
                        key={course.id}
                        className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <div className="relative h-48">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-blue-800">{course.title}</h3>
                              <p className="text-gray-600">{course.fullTitle}</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {course.duration}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-4">{course.description}</p>
                          <div className="flex justify-between items-center">
                            <Link href={`/courses/${course.id}`}>
                              <Button className="bg-blue-800 hover:bg-blue-900">Learn More</Button>
                            </Link>
                            <Link href="/apply" className="text-red-500 hover:underline font-medium">
                              Apply Now
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Benefits of Our Courses</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Why choose Krishna Computers for your computer education needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Industry-Relevant Curriculum",
                description:
                  "Our courses are designed in consultation with industry experts to ensure you learn skills that are in demand.",
              },
              {
                title: "Hands-on Training",
                description:
                  "Learn by doing with practical exercises and real-world projects that reinforce theoretical concepts.",
              },
              {
                title: "Experienced Faculty",
                description:
                  "Learn from instructors who have years of experience in both teaching and industry practice.",
              },
              {
                title: "Flexible Schedule",
                description:
                  "Choose from morning, afternoon, or evening batches to fit your education around your other commitments.",
              },
              {
                title: "Placement Assistance",
                description:
                  "Get help with resume building, interview preparation, and job placement after course completion.",
              },
              {
                title: "Recognized Certification",
                description:
                  "Earn certificates that are recognized by government and industry, enhancing your employability.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enroll in one of our courses today and take the first step towards a successful career in IT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-red-500 hover:bg-red-600 text-white">Apply Now</Button>
            <Button className="bg-transparent hover:bg-white hover:text-blue-800 border border-white">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
