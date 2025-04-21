"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Eye, Plus, Search } from "lucide-react"
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
  _count: {
    attendances: number
  }
}

interface Batch {
  id: string
  name: string
  course: {
    title: string
  }
}

export default function AttendancePage({ params }: { params: { batchId: string } }) {
  const router = useRouter()
  const [sessions, setSessions] = useState<AttendanceSession[]>([])
  const [batch, setBatch] = useState<Batch | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  useEffect(() => {
    fetchBatchDetails()
    fetchAttendanceSessions()
  }, [])

  const fetchBatchDetails = async () => {
    try {
      const response = await fetch(`/api/admin/batches/${params.batchId}`)
      if (!response.ok) throw new Error("Failed to fetch batch details")
      const data = await response.json()
      setBatch(data)
    } catch (error) {
      console.error("Error fetching batch details:", error)
      toast.error("Failed to load batch details")
    }
  }

  const fetchAttendanceSessions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/attendance/sessions?batchId=${params.batchId}`)
      if (!response.ok) throw new Error("Failed to fetch attendance sessions")
      const data = await response.json()
      setSessions(data)
    } catch (error) {
      console.error("Error fetching attendance sessions:", error)
      toast.error("Failed to load attendance sessions")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value)
  }

  const filteredSessions = sessions.filter(
    (session) =>
      (session.topic?.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm) &&
      (!dateFilter || new Date(session.date).toISOString().split("T")[0] === dateFilter),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Attendance Management</h1>
          {batch && (
            <p className="text-gray-500">
              {batch.name} - {batch.course.title}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push("/admin/student/batches")}>
            Back to Batches
          </Button>
          <Button
            onClick={() => router.push(`/admin/student/attendance/${params.batchId}/new-session`)}
            className="bg-blue-800 hover:bg-blue-900"
          >
            <Plus className="mr-2 h-4 w-4" /> New Attendance Session
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Attendance Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by topic..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input type="date" value={dateFilter} onChange={handleDateFilterChange} placeholder="Filter by date" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">Loading attendance sessions...</div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-8">No attendance sessions found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Students Present</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{format(new Date(session.date), "dd MMM yyyy")}</TableCell>
                    <TableCell>{session.topic || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{session._count.attendances} students</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/student/attendance/session/${session.id}`)}
                          title="View Attendance Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/student/attendance/session/${session.id}/edit`)}
                          title="Edit Attendance"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
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
