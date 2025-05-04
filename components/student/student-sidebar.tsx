"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BookOpen, FileText, Home, LogOut, Menu, PenTool, User, X } from "lucide-react"
import { clearStudentFromLocalStorage } from "@/lib/auth"

export function StudentSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    clearStudentFromLocalStorage()
    router.push("/login")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/student/dashboard",
      icon: Home,
    },
    {
      name: "Profile",
      href: "/student/profile",
      icon: User,
    },
    {
      name: "Courses",
      href: "/student/courses",
      icon: BookOpen,
    },
    {
      name: "Certificates",
      href: "/student/certificates",
      icon: FileText,
    },
    {
      name: "Marksheets",
      href: "/student/marksheets",
      icon: FileText,
    },
    {
      name: "Exams",
      href: "/student/exams",
      icon: PenTool,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed right-4 top-4 z-50 rounded-md bg-blue-600 p-2 text-white md:hidden"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 transform bg-white transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto bg-white py-4 shadow-xl">
          <div className="flex items-center justify-center px-4">
            <h2 className="text-2xl font-bold text-blue-600">Student Portal</h2>
          </div>
          <nav className="mt-8 flex flex-1 flex-col px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                      pathname === item.href ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden w-64 flex-shrink-0 bg-white shadow-md md:block">
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-center border-b px-4 py-6">
            <h2 className="text-2xl font-bold text-blue-600">Student Portal</h2>
          </div>
          <nav className="mt-8 flex flex-1 flex-col px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                      pathname === item.href ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
