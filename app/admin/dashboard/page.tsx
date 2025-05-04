"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Award, CreditCard, UserPlus, PlusCircle } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      change: "+12% from last month",
    },
    {
      title: "Active Courses",
      value: "24",
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      change: "+2 new courses",
    },
    {
      title: "Certifications Issued",
      value: "856",
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      change: "+43 this month",
    },
    {
      title: "Revenue",
      value: "₹4,56,789",
      icon: <CreditCard className="h-8 w-8 text-purple-600" />,
      change: "+8% from last month",
    },
  ]

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      activity: "New student Rahul Sharma enrolled in DCA course",
      time: "2 hours ago",
    },
    {
      id: 2,
      activity: "Certificate issued to Priya Patel for CCC course",
      time: "5 hours ago",
    },
    {
      id: 3,
      activity: "New course 'Advanced Web Development' added",
      time: "Yesterday",
    },
    {
      id: 4,
      activity: "Fee payment received from Amit Kumar",
      time: "Yesterday",
    },
    {
      id: 5,
      activity: "New faculty member Neha Singh joined",
      time: "2 days ago",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-600"></div>
                  <div className="space-y-1">
                    <p className="text-sm">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <UserPlus className="h-8 w-8 text-blue-600 mb-2" />
                  <p className="text-sm font-medium">Add New Student</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <PlusCircle className="h-8 w-8 text-green-600 mb-2" />
                  <p className="text-sm font-medium">Add New Course</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Award className="h-8 w-8 text-yellow-600 mb-2" />
                  <p className="text-sm font-medium">Issue Certificate</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <CreditCard className="h-8 w-8 text-purple-600 mb-2" />
                  <p className="text-sm font-medium">Record Payment</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
