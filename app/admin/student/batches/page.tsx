"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Plus, Search, Trash2, Users } from "lucide-react"
import { format } from "date-fns"
import { toast } from "react-hot-toast"

interface Batch {
  id: string
  name: string
  courseId: string
  startDate: string
  endDate: string | null
  capacity: number
  isActive: boolean
  course: {
    title: string
  }
  _count: {
    admissions: number
  }
}

export default function BatchesPage() {
  const router = useRouter()
  const [batches, setBatches] = useState<Batch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchBatches()
  }, [])

  const fetchBatches = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/batches")
      if (!response.ok) throw new Error("Failed to fetch batches")
      const data = await response.json()
      setBatches(data)
    } catch (error) {
      console.error("Error fetching batches:", error)
      toast.error("Failed to load batches")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this batch?")) return

    try {
      const response = await fetch(`/api/admin/batches/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete batch")

      toast.success("Batch deleted successfully")
      fetchBatches()
    } catch (error) {
      console.error("Error deleting batch:", error)
      toast.error("Failed to delete batch")
    }
  }

  const filteredBatches = batches.filter(
    (batch) =>
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Batch Management</h1>
        <Button onClick={() => router.push("/admin/student/batches/new")} className="bg-blue-800 hover:bg-blue-900">
          <Plus className="mr-2 h-4 w-4" /> Add New Batch
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by batch name or course..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Batches</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">Loading batches...</div>
          ) : filteredBatches.length === 0 ? (
            <div className="text-center py-8">No batches found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell className="font-medium">{batch.name}</TableCell>
                    <TableCell>{batch.course.title}</TableCell>
                    <TableCell>{format(new Date(batch.startDate), "dd MMM yyyy")}</TableCell>
                    <TableCell>{batch.endDate ? format(new Date(batch.endDate), "dd MMM yyyy") : "Ongoing"}</TableCell>
                    <TableCell>{batch.capacity}</TableCell>
                    <TableCell>{batch._count.admissions}</TableCell>
                    <TableCell>
                      <Badge variant={batch.isActive ? "default" : "destructive"}>
                        {batch.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/student/batches/${batch.id}`)}
                          title="View Batch Details"
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/student/batches/${batch.id}/edit`)}
                          title="Edit Batch"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(batch.id)}
                          title="Delete Batch"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/student/attendance/${batch.id}`)}
                          title="Manage Attendance"
                        >
                          <Calendar className="h-4 w-4" />
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
