"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  BadgeIcon as Certificate,
  ChevronDown,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Wallet,
} from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
}

interface SidebarGroupProps {
  icon: React.ElementType
  label: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
        active
          ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-50"
          : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}

const SidebarGroup = ({ icon: Icon, label, children, defaultOpen = false }: SidebarGroupProps) => {
  return (
    <Collapsible defaultOpen={defaultOpen} className="w-full">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-10 pt-1">{children}</CollapsibleContent>
    </Collapsible>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-gray-950">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <span>Krishna Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/admin/dashboard"
            active={pathname === "/admin/dashboard"}
          />

          <SidebarGroup icon={BookOpen} label="Courses" defaultOpen={pathname.includes("/admin/masters")}>
            <SidebarItem
              icon={FileText}
              label="Manage Courses"
              href="/admin/masters/courses"
              active={pathname === "/admin/masters/courses"}
            />
            <SidebarItem
              icon={FileText}
              label="Subjects"
              href="/admin/masters/subjects"
              active={pathname === "/admin/masters/subjects"}
            />
          </SidebarGroup>

          <SidebarGroup icon={Users} label="Students" defaultOpen={pathname.includes("/admin/student")}>
            <SidebarItem
              icon={FileText}
              label="All Students"
              href="/admin/student/records"
              active={pathname === "/admin/student/records"}
            />
            <SidebarItem
              icon={FileText}
              label="Add Student"
              href="/admin/student/new"
              active={pathname === "/admin/student/new"}
            />
            <SidebarItem
              icon={FileText}
              label="Batches"
              href="/admin/student/batches"
              active={pathname === "/admin/student/batches"}
            />
          </SidebarGroup>

          <SidebarGroup icon={ClipboardList} label="Exams" defaultOpen={pathname.includes("/admin/exam")}>
            <SidebarItem
              icon={FileText}
              label="Manage Exams"
              href="/admin/exam/manage"
              active={pathname === "/admin/exam/manage"}
            />
            <SidebarItem
              icon={FileText}
              label="Add Paper"
              href="/admin/exam/add-paper"
              active={pathname === "/admin/exam/add-paper"}
            />
            <SidebarItem
              icon={FileText}
              label="Applications"
              href="/admin/exam/applications"
              active={pathname === "/admin/exam/applications"}
            />
            <SidebarItem
              icon={FileText}
              label="Results"
              href="/admin/exam/results"
              active={pathname === "/admin/exam/results"}
            />
          </SidebarGroup>

          <SidebarGroup icon={Certificate} label="Certificates" defaultOpen={pathname.includes("/admin/certificate")}>
            <SidebarItem
              icon={FileText}
              label="Generate"
              href="/admin/certificate/generate"
              active={pathname === "/admin/certificate/generate"}
            />
            <SidebarItem
              icon={FileText}
              label="View All"
              href="/admin/certificate/show"
              active={pathname === "/admin/certificate/show"}
            />
          </SidebarGroup>

          <SidebarGroup icon={CreditCard} label="Fees" defaultOpen={pathname.includes("/admin/fee")}>
            <SidebarItem
              icon={FileText}
              label="Fee Collection"
              href="/admin/fee/collect"
              active={pathname === "/admin/fee/collect"}
            />
            <SidebarItem
              icon={FileText}
              label="Fee Structure"
              href="/admin/fee/structure"
              active={pathname === "/admin/fee/structure"}
            />
            <SidebarItem
              icon={FileText}
              label="Reports"
              href="/admin/fee/reports"
              active={pathname === "/admin/fee/reports"}
            />
          </SidebarGroup>

          <SidebarItem icon={Wallet} label="Wallet" href="/admin/wallet" active={pathname === "/admin/wallet"} />

          <SidebarItem icon={MessageSquare} label="CMS Panel" href="/admin/cms" active={pathname === "/admin/cms"} />

          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/admin/settings"
            active={pathname === "/admin/settings"}
          />
        </nav>
      </div>
    </div>
  )
}
