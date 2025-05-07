"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Krishna Computers</span>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden focus:outline-none" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/about-us") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/courses"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/courses") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Courses
            </Link>
            <Link
              href="/gallery"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/gallery") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/certificate-verification"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/certificate-verification") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Verify Certificate
            </Link>
            <Link
              href="/contact-us"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/contact-us") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Contact
            </Link>

            {session ? (
              <>
                <Link href={`/${session.user.role}/dashboard`}>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-3 px-2 space-y-1 border-t">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/about-us") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
            <Link
              href="/courses"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/courses") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeMobileMenu}
            >
              Courses
            </Link>
            <Link
              href="/gallery"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/gallery") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeMobileMenu}
            >
              Gallery
            </Link>
            <Link
              href="/certificate-verification"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/certificate-verification") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeMobileMenu}
            >
              Verify Certificate
            </Link>
            <Link
              href="/contact-us"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/contact-us") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>

            {session ? (
              <>
                <Link
                  href={`/${session.user.role}/dashboard`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    closeMobileMenu()
                    handleSignOut()
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
