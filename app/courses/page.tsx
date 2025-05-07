import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { connectToDatabase } from "@/lib/mongodb"
import Course from "@/models/Course"

export const metadata: Metadata = {
  title: "Courses - Krishna Computers",
  description: "Explore our wide range of computer courses and programs at Krishna Computers.",
}

async function getCourses() {
  try {
    await connectToDatabase()
    const courses = await Course.find()
    return JSON.parse(JSON.stringify(courses))
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <main className="flex-1">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our comprehensive range of computer courses designed to equip you with the skills needed in today's
            digital world.
          </p>
        </div>
      </section>

      {/* Courses List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course._id} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>
                    <div className="flex justify-between">
                      <span>Code: {course.code}</span>
                      <span>Duration: {course.duration}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p>{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <p className="font-semibold">₹{course.fee}</p>
                  <Button asChild>
                    <Link href="/contact-us">Enquire Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No courses available at the moment.</h3>
              <p className="mt-2">Please check back later or contact us for more information.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We offer customized training programs for individuals and corporate clients. Contact us to discuss your
            specific requirements.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild>
              <Link href="/contact-us">Contact Us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/franchise-registration">Become a Franchise</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
