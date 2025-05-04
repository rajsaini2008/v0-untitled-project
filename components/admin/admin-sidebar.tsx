"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, UserPlus, BookOpen, PlusCircle, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    })
    router.push("/login")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "New Student",
      href: "/admin/students/new",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      name: "All Students",
      href: "/admin/students",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Courses",
      href: "/admin/courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Add Course",
      href: "/admin/courses/new",
      icon: <PlusCircle className="h-5 w-5" />,
    },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu} className="bg-white">
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for desktop */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 transform bg-blue-800 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b border-blue-700">
            <h1 className="text-xl font-bold">Krishna Computers</h1>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center rounded-md px-2 py-2 text-sm font-medium
                    ${pathname === item.href ? "bg-blue-900 text-white" : "text-blue-100 hover:bg-blue-700"}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-blue-700 p-4">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-blue-100 hover:bg-blue-700"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
