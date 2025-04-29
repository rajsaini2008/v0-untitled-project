"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white py-2 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Krishna Computer Logo"
              width={80}
              height={80}
              className="mr-2"
            />
            <div className="text-xl md:text-2xl font-bold text-gray-800">
              <span className="text-blue-800">KRISHNA</span>
              <br />
              <span className="text-gray-700">COMPUTER</span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-blue-800 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex flex-wrap justify-center gap-4 md:gap-6">
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

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-800 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/about-us"
                className="text-gray-700 hover:text-blue-800 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT US
              </Link>
              <Link
                href="/courses"
                className="text-gray-700 hover:text-blue-800 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                COURSES
              </Link>
              <Link
                href="/gallery"
                className="text-gray-700 hover:text-blue-800 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                GALLERY
              </Link>
              <Link
                href="/legal"
                className="text-gray-700 hover:text-blue-800 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                LEGAL
              </Link>
              <Link
                href="/contact-us"
                className="text-gray-700 hover:text-blue-800 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT US
              </Link>
              <Link
                href="/jobs"
                className="text-gray-700 hover:text-blue-800 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                JOBS
              </Link>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white w-full mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/certificate-verification">CERTIFICATE VERIFICATION</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
