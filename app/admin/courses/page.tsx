import Link from "next/link"
import Header from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MoreHorizontal, Search, Clock, IndianRupee } from "lucide-react"

export default function CoursesPage() {
  return (
    <div>
      <Header title="Courses" />
      <main className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
              <p className="text-muted-foreground">Manage courses and subjects</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" asChild>
                <Link href="/admin/courses/new">
                  <Plus className="h-4 w-4" />
                  Add Course
                </Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Course List</CardTitle>
              <CardDescription>View and manage all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search courses..." className="pl-8 w-full" />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        code: "DCA",
                        name: "Diploma in Computer Applications",
                        duration: 6,
                        fees: 12000,
                        subjects: 5,
                        status: "Active",
                      },
                      {
                        code: "CCC",
                        name: "Course on Computer Concepts",
                        duration: 3,
                        fees: 5000,
                        subjects: 3,
                        status: "Active",
                      },
                      {
                        code: "TALLY",
                        name: "Tally Prime with GST",
                        duration: 3,
                        fees: 8000,
                        subjects: 2,
                        status: "Active",
                      },
                      { code: "OLEVEL", name: "O Level", duration: 12, fees: 25000, subjects: 8, status: "Active" },
                      {
                        code: "ADCA",
                        name: "Advanced Diploma in Computer Applications",
                        duration: 12,
                        fees: 20000,
                        subjects: 7,
                        status: "Active",
                      },
                      {
                        code: "WEB",
                        name: "Web Design & Development",
                        duration: 4,
                        fees: 15000,
                        subjects: 4,
                        status: "Active",
                      },
                      {
                        code: "PROG",
                        name: "Programming in C/C++",
                        duration: 3,
                        fees: 7500,
                        subjects: 2,
                        status: "Inactive",
                      },
                      {
                        code: "JAVA",
                        name: "Java Programming",
                        duration: 4,
                        fees: 10000,
                        subjects: 3,
                        status: "Inactive",
                      },
                    ].map((course, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          {course.duration} months
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3 text-gray-500" />
                          {course.fees.toLocaleString()}
                        </TableCell>
                        <TableCell>{course.subjects}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              course.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {course.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Link href={`/admin/courses/${course.code.toLowerCase()}`} className="w-full">
                                  View details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link href={`/admin/courses/${course.code.toLowerCase()}/edit`} className="w-full">
                                  Edit course
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link href={`/admin/courses/${course.code.toLowerCase()}/subjects`} className="w-full">
                                  Manage subjects
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {course.status === "Active" ? "Deactivate course" : "Activate course"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
