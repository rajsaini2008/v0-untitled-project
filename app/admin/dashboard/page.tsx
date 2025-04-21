import Link from "next/link"
import { BookOpen, BadgeIcon as Certificate, CreditCard, GraduationCap, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function getStats() {
  // In a real app, this would fetch from your database
  return {
    totalStudents: 245,
    totalCourses: 12,
    totalCertificates: 189,
    totalRevenue: "₹1,245,000",
    recentStudents: [
      { id: 1, name: "Rahul Sharma", course: "DCA", joinDate: "2023-04-15", status: "active" },
      { id: 2, name: "Priya Singh", course: "ADCA", joinDate: "2023-04-10", status: "active" },
      { id: 3, name: "Amit Kumar", course: "Tally", joinDate: "2023-04-05", status: "inactive" },
      { id: 4, name: "Neha Gupta", course: "Web Design", joinDate: "2023-04-01", status: "active" },
    ],
    recentPayments: [
      { id: 1, student: "Rahul Sharma", amount: "₹5,000", date: "2023-04-15", status: "completed" },
      { id: 2, student: "Priya Singh", amount: "₹7,500", date: "2023-04-10", status: "completed" },
      { id: 3, student: "Amit Kumar", amount: "₹3,000", date: "2023-04-05", status: "pending" },
      { id: 4, student: "Neha Gupta", amount: "₹6,000", date: "2023-04-01", status: "completed" },
    ],
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  return (
    <div className="flex flex-col gap-5 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your institute's performance and activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">+2 new courses added</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
            <Certificate className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCertificates}</div>
            <p className="text-xs text-muted-foreground">+18 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Recent Students</TabsTrigger>
          <TabsTrigger value="payments">Recent Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Students</CardTitle>
              <CardDescription>Recently enrolled students in your institute</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Name</th>
                      <th className="px-4 py-3 text-left font-medium">Course</th>
                      <th className="px-4 py-3 text-left font-medium">Join Date</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentStudents.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="px-4 py-3">{student.name}</td>
                        <td className="px-4 py-3">{student.course}</td>
                        <td className="px-4 py-3">{new Date(student.joinDate).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              student.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link href={`/admin/student/${student.id}`} className="text-blue-600 hover:underline">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Link href="/admin/student/records" className="text-sm text-blue-600 hover:underline">
                  View all students →
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Recent fee payments received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Student</th>
                      <th className="px-4 py-3 text-left font-medium">Amount</th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentPayments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="px-4 py-3">{payment.student}</td>
                        <td className="px-4 py-3">{payment.amount}</td>
                        <td className="px-4 py-3">{new Date(payment.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              payment.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link href={`/admin/fee/payment/${payment.id}`} className="text-blue-600 hover:underline">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Link href="/admin/fee/reports" className="text-sm text-blue-600 hover:underline">
                  View all payments →
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link
              href="/admin/student/new"
              className="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-gray-50"
            >
              <Users className="h-4 w-4" />
              <span>Add New Student</span>
            </Link>
            <Link
              href="/admin/certificate/generate"
              className="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-gray-50"
            >
              <Certificate className="h-4 w-4" />
              <span>Generate Certificate</span>
            </Link>
            <Link
              href="/admin/fee/collect"
              className="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-gray-50"
            >
              <CreditCard className="h-4 w-4" />
              <span>Collect Fee</span>
            </Link>
            <Link
              href="/admin/exam/add-paper"
              className="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-gray-50"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Create Exam Paper</span>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system status and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <span className="text-sm">Database Connection</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <span className="text-sm">SMS Service</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <span className="text-sm">Payment Gateway</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Email Service</span>
              </div>
              <span className="text-sm text-yellow-600">Degraded</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
