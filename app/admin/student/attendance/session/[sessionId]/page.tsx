"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { toast } from "react-hot-toast"

interface AttendanceSession {
  id: string
  batchId: string
  date: string
  topic: string | null
  notes: string | null
  batch: {
    name: string
    course: {
      title: string
    }
  }
}

interface Attendance {
  id: string
  sessionId: string
  studentId: string
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED"
  remarks: string | null
  student: {
    name: string
    registrationNo: string
  }
}

export default function AttendanceSessionPage({ params }: { params: { sessionId: string } }) {
  const router = useRouter()
  const [session, setSession] = useState<AttendanceSession | null>(null)
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchSessionDetails()
    fetchAttendanceRecords()
  }, [])

  const fetchSessionDetails = async () => {
    try {
      const response = await fetch(`/api/admin/attendance/sessions?sessionId=${params.sessionId}`)
      if (!response.ok) throw new Error("Failed to fetch session details")
      const data = await response.json()
      if (data.length > 0) {
        setSession(data[0])
      }
    } catch (error) {
      console.error("Error fetching session details:", error)
      toast.error("Failed to load session details")
    }
  }

  const fetchAttendanceRecords = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/attendance/records?sessionId=${params.sessionId}`)
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

  const handleStatusChange = async (attendanceId: string, status: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch("/api/admin/attendance/records", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: attendanceId,
          status,
        }),
      })

      if (!response.ok) throw new Error("Failed to update attendance status")

      // Update local state
      setAttendances((prev) =>
        prev.map((attendance) =>
          attendance.id === attendanceId ? { ...attendance, status: status as any } : attendance,
        ),
      )

      toast.success("Attendance updated successfully")
    } catch (error) {
      console.error("Error updating attendance:", error)
      toast.error("Failed to update attendance")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemarksChange = async (attendanceId: string, remarks: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch("/api/admin/attendance/records", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: attendanceId,
          remarks,
        }),
      })

      if (!response.ok) throw new Error("Failed to update attendance remarks")

      // Update local state
      setAttendances((prev) =>
        prev.map((attendance) => (attendance.id === attendanceId ? { ...attendance, remarks } : attendance)),
      )

      toast.success("Remarks updated successfully")
    } catch (error) {
      console.error("Error updating remarks:", error)
      toast.error("Failed to update remarks")
    } finally {
      setIsUpdating(false)
    }
  }

  const filteredAttendances = attendances.filter(
    (attendance) =>
      attendance.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.student.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Attendance Details</h1>
          {session && (
            <div className="text-gray-500">
              <p>
                {session.batch.name} - {session.batch.course.title}
              </p>
              <p>Date: {format(new Date(session.date), "dd MMMM yyyy")}</p>
              {session.topic && <p>Topic: {session.topic}</p>}
            </div>
          )}
        </div>
        <Button variant="outline" onClick={() => router.push(`/admin/student/attendance/${session?.batchId}`)}>
          Back to Attendance
        </Button>
      </div>

      {session?.notes && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Session Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{session.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by student name or registration number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">Loading attendance records...</div>
          ) : filteredAttendances.length === 0 ? (
            <div className="text-center py-8">No attendance records found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reg. No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendances.map((attendance) => (
                  <TableRow key={attendance.id}>
                    <TableCell>{attendance.student.registrationNo}</TableCell>
                    <TableCell className="font-medium">{attendance.student.name}</TableCell>
                    <TableCell>
                      <Select
                        value={attendance.status}
                        onValueChange={(value) => handleStatusChange(attendance.id, value)}
                        disabled={isUpdating}
                      >
                        <SelectTrigger className={`w-32 ${getStatusColor(attendance.status)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PRESENT">Present</SelectItem>
                          <SelectItem value="ABSENT">Absent</SelectItem>
                          <SelectItem value="LATE">Late</SelectItem>
                          <SelectItem value="EXCUSED">Excused</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="Add remarks"
                          value={attendance.remarks || ""}
                          onChange={(e) => handleRemarksChange(attendance.id, e.target.value)}
                          className="w-full"
                          disabled={isUpdating}
                        />
                      </div>
                    </TableCell>
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
