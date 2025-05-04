import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="bg-white py-2 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <Link href="/" className="mb-4 md:mb-0">
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Krishna Computer Logo"
              width={80}
              height={80}
              className="mr-2"
            />
            <div className="text-2xl font-bold text-gray-800">
              <span className="text-blue-800">KRISHNA</span>
              <br />
              <span className="text-gray-700">COMPUTER</span>
            </div>
          </div>
        </Link>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-800 font-medium">
            HOME
          </Link>
          <Link href="/about-us" className="text-gray-700 hover:text-blue-800 font-medium">
            ABOUT US
          </Link>
          <Link href="/courses" className="text-gray-700 hover:text-blue-800 font-medium">
            COURSES
          </Link>
          <Link href="/gallery" className="text-gray-700 hover:text-blue-800 font-medium">
            GALLERY
          </Link>
          <Link href="/legal" className="text-gray-700 hover:text-blue-800 font-medium">
            LEGAL
          </Link>
          <Link href="/contact-us" className="text-gray-700 hover:text-blue-800 font-medium">
            CONTACT US
          </Link>
          <Link href="/jobs" className="text-gray-700 hover:text-blue-800 font-medium">
            JOBS
          </Link>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            <Link href="/certificate-verification">CERTIFICATE VERIFICATION</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
