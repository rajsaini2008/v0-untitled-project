import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardCheck, Headphones, Award, CreditCard } from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <div className="hero-banner py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Students learning computer skills"
              width={400}
              height={400}
              className="rounded-full border-4 border-white"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">कंप्यूटर एक्सपर्ट बनने के लिए</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">आज ही प्रवेश लीजिए !</h2>
            <div className="bg-blue-900 text-white p-4 rounded-lg inline-block">
              <p className="text-xl font-semibold">DCA, CCC, Tally और O-LEVEL</p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10">
          <Image src="/placeholder.svg?height=50&width=50" alt="Wifi icon" width={50} height={50} />
        </div>
        <div className="absolute bottom-10 right-10">
          <Image src="/placeholder.svg?height=50&width=50" alt="Wifi icon" width={50} height={50} />
        </div>
        <div className="absolute top-1/4 right-1/4">
          <Image src="/placeholder.svg?height=40&width=40" alt="Cloud icon" width={40} height={40} />
        </div>
        <div className="absolute bottom-1/4 left-1/4">
          <Image src="/placeholder.svg?height=40&width=40" alt="Document icon" width={40} height={40} />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="feature-card green-card text-white border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Apply Online</h3>
              <p className="text-sm">Ensuring quality and recognized technical education standards.</p>
            </CardContent>
          </Card>

          <Card className="feature-card yellow-card text-white border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Superfast Support</h3>
              <p className="text-sm">Achieve digital success with our cutting edge computer institute courses.</p>
            </CardContent>
          </Card>

          <Card className="feature-card blue-card text-white border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Certification</h3>
              <p className="text-sm">Choose online or in person classes for flexibility.</p>
            </CardContent>
          </Card>

          <Card className="feature-card pink-card text-white border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Online Payment</h3>
              <p className="text-sm">Empowering minds through transformative computer institute education.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">ABOUT US</h2>
          <h3 className="text-4xl font-bold text-gray-800 mb-8">GIVE US A CHANCE AND SEE</h3>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-8">
            With experienced instructors and state-of-the-art facilities, We provide a dynamic learning environment that
            fosters innovation and creativity. Whether you are a beginner eager to start your journey in technology or a
            professional looking to enhance your skills.
          </p>
          <Button className="bg-blue-800 hover:bg-blue-900 text-white">Learn More About Us</Button>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-red-500 mb-2">OUR COURSES</h2>
            <h3 className="text-4xl font-bold text-gray-800">POPULAR COURSES WE OFFER</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "DCA", description: "Diploma in Computer Applications" },
              { title: "CCC", description: "Course on Computer Concepts" },
              { title: "Tally", description: "Complete Accounting Software Training" },
              { title: "O Level", description: "Foundation Level Course in IT" },
              { title: "Web Design", description: "HTML, CSS, JavaScript and more" },
              { title: "Programming", description: "C, C++, Java, Python and more" },
            ].map((course, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-blue-800 mb-2">{course.title}</h4>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <Link
                    href={`/courses/${course.title.toLowerCase().replace(" ", "-")}`}
                    className="text-red-500 font-medium hover:underline"
                  >
                    Learn More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-800 hover:bg-blue-900 text-white">View All Courses</Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Career in IT?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Krishna Computers today and take the first step towards a successful future in the digital world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-red-500 hover:bg-red-600 text-white">Apply Now</Button>
            <Button className="bg-transparent hover:bg-white hover:text-blue-800 border border-white">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
