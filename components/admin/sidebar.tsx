"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Building,
  Award,
  BarChart,
  Settings,
  LogOut,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isAdmin = user?.role === "admin"
  const isCenterAdmin = user?.role === "center_admin"

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <Home className="h-5 w-5" />,
      allowedRoles: ["admin", "center_admin", "staff"],
    },
    {
      title: "Students",
      href: "/admin/students",
      icon: <Users className="h-5 w-5" />,
      allowedRoles: ["admin", "center_admin", "staff"],
    },
    {
      title: "Courses",
      href: "/admin/courses",
      icon: <BookOpen className="h-5 w-5" />,
      allowedRoles: ["admin", "center_admin", "staff"],
    },
    {
      title: "Enrollments",
      href: "/admin/enrollments",
      icon: <GraduationCap className="h-5 w-5" />,
      allowedRoles: ["admin", "center_admin", "staff"],
    },
    {
      title: "Exams",
      href: "/admin/exams",
      icon: <FileText className="h-5 w-5" />,
      allowedRoles: ["admin", "center_admin", "staff"],
    },
    {
      title: "Centers",
      href: "/admin/centers",
      icon: <Building className="h-5 w-5" />,
      allowedRoles: ["admin", "center_admin"],
    },
    {
      title: "Certificates",
      href: "/admin/certificates",
      icon: <Award className="h-5 w-5" />,
      allowedRoles: ["admin", "center_admin", "staff"],
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: <BarChart className="h-5 w-5" />,
      allowedRoles: ["admin", "center_admin"],
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      allowedRoles: ["admin", "center_admin"],
    },
  ]

  const filteredNavItems = navItems.filter((item) => {
    if (!user?.role) return false
    return item.allowedRoles.includes(user.role.toLowerCase())
  })

  return (
    <div className={cn("flex flex-col h-full bg-white border-r", className)}>
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-blue-800">
          <span>Krishna Computers</span>
        </Link>
      </div>

      <div className="px-3 py-2">
        <div className="space-y-1">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-blue-100 text-blue-900"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-md bg-gray-50 p-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-1">
              <div className="h-8 w-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-semibold">
                {user?.name?.charAt(0) || "U"}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.centerName || "Main Center"}</p>
            </div>
          </div>
          <div className="mt-3">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600"
              onClick={() => {
                logout()
                window.location.href = "/login"
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
