import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Welcome to Krishna Computers</h1>
        <p className="text-xl mb-8">A leading computer education institute</p>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quality Education</h2>
          <p>We provide high-quality computer education with experienced faculty and modern facilities.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Industry-Relevant Courses</h2>
          <p>Our courses are designed to meet the current industry demands and trends.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Placement Assistance</h2>
          <p>We offer placement assistance to help our students kickstart their careers.</p>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">DCA</h3>
            <p className="mb-4">Diploma in Computer Applications</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/courses">Learn More</Link>
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">PGDCA</h3>
            <p className="mb-4">Post Graduate Diploma in Computer Applications</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/courses">Learn More</Link>
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Tally</h3>
            <p className="mb-4">Accounting Software Training</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/courses">Learn More</Link>
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">O-Level</h3>
            <p className="mb-4">NIELIT O-Level Certification</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/courses">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
