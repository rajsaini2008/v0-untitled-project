"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, MoreHorizontal, Pencil, Trash2, Search, Eye } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface SubCenter {
  id: string
  atcId: string
  password: string
  centerName: string
  ownerName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  createdAt: string
}

export default function SubCenters() {
  const [subCenters, setSubCenters] = useState<SubCenter[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll just get the data from localStorage
    const loadSubCenters = () => {
      try {
        const storedSubCenters = localStorage.getItem("subCenters")
        if (storedSubCenters) {
          setSubCenters(JSON.parse(storedSubCenters))
        } else {
          // Add some mock data if no sub centers exist
          const mockSubCenters = [
            {
              id: "1",
              atcId: "KR1234567",
              password: "pass123",
              centerName: "ABC Computer Institute",
              ownerName: "Rajesh Kumar",
              email: "abc@example.com",
              phone: "9876543210",
              address: "123 Main Street",
              city: "Jaipur",
              state: "Rajasthan",
              pincode: "302001",
              createdAt: "2023-01-15T00:00:00.000Z",
            },
            {
              id: "2",
              atcId: "KR7654321",
              password: "pass456",
              centerName: "XYZ Technology Center",
              ownerName: "Suresh Sharma",
              email: "xyz@example.com",
              phone: "8765432109",
              address: "456 Park Avenue",
              city: "Jodhpur",
              state: "Rajasthan",
              pincode: "342001",
              createdAt: "2023-02-20T00:00:00.000Z",
            },
          ]
          localStorage.setItem("subCenters", JSON.stringify(mockSubCenters))
          setSubCenters(mockSubCenters)
        }
      } catch (error) {
        console.error("Error loading sub centers:", error)
        toast({
          title: "Error loading sub centers",
          description: "There was a problem loading the sub center data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadSubCenters()
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this sub center?")) {
      const updatedSubCenters = subCenters.filter((center) => center.id !== id)
      setSubCenters(updatedSubCenters)
      localStorage.setItem("subCenters", JSON.stringify(updatedSubCenters))
      toast({
        title: "Sub Center deleted",
        description: "The sub center has been deleted successfully.",
      })
    }
  }

  const filteredSubCenters = subCenters.filter(
    (center) =>
      center.centerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.phone.includes(searchTerm) ||
      center.atcId.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">All Sub Centers</h1>
        <Link href="/admin/subcenters/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Sub Center
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>Sub Centers</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sub centers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
            </div>
          ) : filteredSubCenters.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No sub centers found matching your search."
                : "No sub centers found. Add a new sub center to get started."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ATC ID</TableHead>
                    <TableHead>Center Name</TableHead>
                    <TableHead>Owner Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubCenters.map((center) => (
                    <TableRow key={center.id}>
                      <TableCell className="font-medium">{center.atcId}</TableCell>
                      <TableCell>{center.centerName}</TableCell>
                      <TableCell>{center.ownerName}</TableCell>
                      <TableCell>{center.email}</TableCell>
                      <TableCell>{center.phone}</TableCell>
                      <TableCell>
                        {center.city}, {center.state}
                      </TableCell>
                      <TableCell>{new Date(center.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(center.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
