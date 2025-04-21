import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactUs() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're here to help! Reach out to us with any questions or inquiries.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-8">
                Have questions about our courses, admission process, or anything else? Fill out the form or use our
                contact information below to reach us.
              </p>

              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Our Location</h3>
                    <p className="text-gray-600">Krishna Computers, Kaman, Rajasthan</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Phone Number</h3>
                    <p className="text-gray-600">9001203861, 9772225669</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Email Address</h3>
                    <p className="text-gray-600">krishna.computers.official2008@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Working Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">Send us a Message</h2>
                  <form className="grid gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="font-medium text-gray-700">
                          Full Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="email" className="font-medium text-gray-700">
                          Email Address
                        </label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="phone" className="font-medium text-gray-700">
                        Phone Number
                      </label>
                      <Input id="phone" placeholder="Your phone number" />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="subject" className="font-medium text-gray-700">
                        Subject
                      </label>
                      <Input id="subject" placeholder="Message subject" />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="message" className="font-medium text-gray-700">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Your message" rows={5} />
                    </div>

                    <Button className="bg-blue-800 hover:bg-blue-900 w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Find Us on the Map</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Visit our campus to learn more about our courses and facilities
            </p>
          </div>

          <div className="bg-white p-2 rounded-lg shadow-md">
            <div className="aspect-[16/9] bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map would be embedded here</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions about our courses and admission process
            </p>
          </div>

          <div className="grid gap-6 max-w-3xl mx-auto">
            {[
              {
                question: "What are the admission requirements?",
                answer:
                  "Admission requirements vary by course. Basic courses like DCA and CCC require a 10th pass, while advanced courses may require 12th pass or equivalent. Please contact us for specific course requirements.",
              },
              {
                question: "Do you offer online classes?",
                answer:
                  "Yes, we offer both online and offline classes for most of our courses. You can choose the mode that best suits your learning style and schedule.",
              },
              {
                question: "What is the fee structure?",
                answer:
                  "Our fee structure varies by course. We offer competitive rates with flexible payment options. Please contact us for detailed fee information for your chosen course.",
              },
              {
                question: "Do you provide placement assistance?",
                answer:
                  "Yes, we provide placement assistance to our students. We have tie-ups with various companies and organize campus interviews regularly.",
              },
              {
                question: "Are the certifications government recognized?",
                answer:
                  "Yes, our certifications are recognized by the government and industry. Courses like O Level are NIELIT certified, which is a government organization.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
