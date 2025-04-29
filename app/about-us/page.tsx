import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">About Krishna Computers</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A leading computer education institute dedicated to empowering students with the skills they need to succeed
          in the digital world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2005, Krishna Computers has been at the forefront of computer education in India. What started as
            a small training center with just 5 computers has now grown into a renowned institute with multiple centers
            across the country.
          </p>
          <p className="text-gray-600 mb-4">
            Our journey has been driven by a passion for education and a commitment to excellence. We believe that
            quality education should be accessible to all, which is why we offer a range of courses at affordable
            prices.
          </p>
          <p className="text-gray-600">
            Over the years, we have trained thousands of students who have gone on to build successful careers in the IT
            industry. Our alumni network is a testament to our dedication and the quality of our education.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Krishna Computers Building"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission & Vision</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide high-quality computer education that is accessible, affordable, and relevant to the current
              industry demands. We aim to empower individuals with the knowledge and skills they need to excel in the
              digital age.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading computer education institute in India, recognized for our excellence in teaching,
              innovation in curriculum, and the success of our students. We envision a future where every individual has
              the opportunity to learn and grow in the field of technology.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Experienced Faculty</h3>
            <p className="text-gray-600">
              Our instructors are industry professionals with years of experience in their respective fields. They bring
              real-world knowledge and practical insights to the classroom.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Modern Infrastructure</h3>
            <p className="text-gray-600">
              We provide state-of-the-art facilities with the latest hardware and software to ensure that our students
              learn on the same tools used in the industry.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Industry-Relevant Curriculum</h3>
            <p className="text-gray-600">
              Our courses are designed in consultation with industry experts to ensure that the content is up-to-date
              and aligned with current industry requirements.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Placement Assistance</h3>
            <p className="text-gray-600">
              We have a dedicated placement cell that helps students find suitable job opportunities. We also conduct
              regular placement drives with leading companies.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Flexible Learning Options</h3>
            <p className="text-gray-600">
              We offer both regular and weekend batches to accommodate the needs of working professionals and students.
              We also provide online learning options.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-pink-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Recognized Certifications</h3>
            <p className="text-gray-600">
              Our courses are recognized by industry and government bodies, ensuring that our certifications hold value
              in the job market.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Team</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Meet the dedicated professionals who make Krishna Computers a center of excellence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Rajesh Kumar", position: "Founder & Director", image: "team-1" },
            { name: "Priya Sharma", position: "Academic Head", image: "team-2" },
            { name: "Amit Patel", position: "Technical Director", image: "team-3" },
            { name: "Neha Gupta", position: "Placement Officer", image: "team-4" },
          ].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image
                src={`/placeholder.svg?height=200&width=200`}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-800 text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join Krishna Computers today and take the first step towards a successful career in IT.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-red-500 hover:bg-red-600 text-white">Apply Now</Button>
          <Button className="bg-transparent hover:bg-white hover:text-blue-800 border border-white">Contact Us</Button>
        </div>
      </div>
    </div>
  )
}
