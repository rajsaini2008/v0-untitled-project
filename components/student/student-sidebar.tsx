"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { LayoutDashboard, BookOpen, FileText, Award, Menu, X, LogOut } from "lucide-react"

export function StudentSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const menuItems = [
    {
      name: "Dashboard",
      href: "/student/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "My Course",
      href: "/student/course",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Exams",
      href: "/student/exams",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Certificates",
      href: "/student/certificates",
      icon: <Award className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center p-4 border-b">
        <button className="focus:outline-none" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-2 text-lg font-semibold">Student Panel</span>
      </div>

      {/* Sidebar for desktop */}
      <div
        className={`bg-white border-r w-64 h-screen overflow-y-auto fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:h-auto`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Student Panel</h2>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                isActive(item.href) ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeMobileMenu}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          <Button variant="ghost" className="w-full justify-start px-4 py-2 h-auto" onClick={handleSignOut}>
            <LogOut className="h-5 w-5 mr-2" />
            <span>Sign Out</span>
          </Button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={closeMobileMenu} />
      )}
    </>
  )
}
