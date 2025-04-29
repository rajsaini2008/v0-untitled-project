import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-800">KRISHNA COMPUTERS</span>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="hover:text-blue-600">
            HOME
          </Link>
          <Link href="/about-us" className="hover:text-blue-600">
            ABOUT US
          </Link>
          <Link href="/courses" className="hover:text-blue-600">
            COURSES
          </Link>
          <Link href="/gallery" className="hover:text-blue-600">
            GALLERY
          </Link>
          <Link href="/legal" className="hover:text-blue-600">
            LEGAL
          </Link>
          <Link href="/contact-us" className="hover:text-blue-600">
            CONTACT US
          </Link>
          <Link href="/jobs" className="hover:text-blue-600">
            JOBS
          </Link>
          <Link href="/certificate-verification" className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            CERTIFICATE VERIFICATION
          </Link>
        </div>
      </div>
    </nav>
  )
}
