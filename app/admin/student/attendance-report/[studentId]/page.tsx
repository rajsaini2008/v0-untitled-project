"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Calendar, ChevronLeft, Printer } from "lucide-react"
import { toast } from "react-hot-toast"

interface Student {
  id: string
  name: string
  registrationNo: string
  email: string
  phone: string
}

interface Attendance {
  id: string
  sessionId: string
  studentId: string
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED"
  remarks: string | null
  session: {
    date: string
    topic: string | null
    batch: {
      name: string
    }
  }
}

export default function StudentAttendanceReportPage({ params }: { params: { studentId: string } }) {
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    excused: 0,
    percentage: 0,
  })

  useEffect(() => {
    fetchStudentDetails()
    fetchAttendanceRecords()
  }, [])

  useEffect(() => {
    calculateStats()
  }, [attendances])

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(`/api/admin/students/${params.studentId}`)
      if (!response.ok) throw new Error("Failed to fetch student details")
      const data = await response.json()
      setStudent(data)
    } catch (error) {
      console.error("Error fetching student details:", error)
      toast.error("Failed to load student details")
    }
  }

  const fetchAttendanceRecords = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/attendance/records?studentId=${params.studentId}`)
      if (!response.ok) throw new Error("Failed to fetch attendance records")
      const data = await response.json()
      setAttendances(data)
    } catch (error) {
      console.error("Error fetching attendance records:", error)
      toast.error("Failed to load attendance records")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = () => {
    const filteredAttendances = filterAttendances()
    const total = filteredAttendances.length
    const present = filteredAttendances.filter((a) => a.status === "PRESENT").length
    const absent = filteredAttendances.filter((a) => a.status === "ABSENT").length
    const late = filteredAttendances.filter((a) => a.status === "LATE").length
    const excused = filteredAttendances.filter((a) => a.status === "EXCUSED").length
    const percentage = total > 0 ? Math.round(((present + late) / total) * 100) : 0

    setStats({
      total,
      present,
      absent,
      late,
      excused,
      percentage,
    })
  }

  const filterAttendances = () => {
    return attendances.filter((attendance) => {
      const sessionDate = new Date(attendance.session.date)
      const fromDateObj = fromDate ? new Date(fromDate) : null
      const toDateObj = toDate ? new Date(toDate) : null

      if (fromDateObj && toDateObj) {
        return sessionDate >= fromDateObj && sessionDate <= toDateObj
      } else if (fromDateObj) {
        return sessionDate >= fromDateObj
      } else if (toDateObj) {
        return sessionDate <= toDateObj
      }
      return true
    })
  }

  const handleDateFilterChange = () => {
    calculateStats()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-100 text-green-800"
      case "ABSENT":
        return "bg-red-100 text-red-800"
      case "LATE":
        return "bg-yellow-100 text-yellow-800"
      case "EXCUSED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const filteredAttendances = filterAttendances()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Student Attendance Report</h1>
          {student && (
            <div className="text-gray-500">
              <p>
                {student.name} ({student.registrationNo})
              </p>
              {student.email && <p>Email: {student.email}</p>}
              {student.phone && <p>Phone: {student.phone}</p>}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push(`/admin/student/records`)}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Students
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <label htmlFor="fromDate" className="text-sm font-medium">
                  From Date
                </label>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <Input id="fromDate" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor="toDate" className="text-sm font-medium">
                  To Date
                </label>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <Input id="toDate" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
              </div>
              <div className="flex items-end">
                <Button onClick={handleDateFilterChange}>Apply Filter</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-2 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-500">Total Classes</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="text-center p-2 bg-green-100 rounded-md">
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-2xl font-bold">{stats.present}</p>
              </div>
              <div className="text-center p-2 bg-red-100 rounded-md">
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-2xl font-bold">{stats.absent}</p>
              </div>
              <div className="text-center p-2 bg-yellow-100 rounded-md">
                <p className="text-sm text-gray-500">Late</p>
                <p className="text-2xl font-bold">{stats.late}</p>
              </div>
              <div className="text-center p-2 bg-blue-100 rounded-md">
                <p className="text-sm text-gray-500">Excused</p>
                <p className="text-2xl font-bold">{stats.excused}</p>
              </div>
              <div className="text-center p-2 bg-purple-100 rounded-md">
                <p className="text-sm text-gray-500">Attendance %</p>
                <p className="text-2xl font-bold">{stats.percentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">Loading attendance records...</div>
          ) : filteredAttendances.length === 0 ? (
            <div className="text-center py-8">No attendance records found for the selected period</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendances.map((attendance) => (
                  <TableRow key={attendance.id}>
                    <TableCell>{format(new Date(attendance.session.date), "dd MMM yyyy")}</TableCell>
                    <TableCell>{attendance.session.batch.name}</TableCell>
                    <TableCell>{attendance.session.topic || "N/A"}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(attendance.status)}>{attendance.status}</Badge>
                    </TableCell>
                    <TableCell>{attendance.remarks || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
