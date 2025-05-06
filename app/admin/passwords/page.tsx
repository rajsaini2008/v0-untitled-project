"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Eye, EyeOff } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Password {
  id: string
  type: "student" | "subcenter"
  userId: string
  password: string
  name: string
  email: string
}

export default function Passwords() {
  const [passwords, setPasswords] = useState<Password[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showPasswords, setShowPasswords] = useState(false)

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll just get the data from localStorage
    const loadPasswords = () => {
      try {
        const storedPasswords = localStorage.getItem("passwords")
        if (storedPasswords) {
          setPasswords(JSON.parse(storedPasswords))
        } else {
          // Add some mock data if no passwords exist
          const mockPasswords = [
            {
              id: "1",
              type: "student",
              userId: "STU1234",
              password: "student123",
              name: "Rahul Sharma",
              email: "rahul.sharma@example.com",
            },
            {
              id: "2",
              type: "student",
              userId: "STU5678",
              password: "student456",
              name: "Priya Patel",
              email: "priya.patel@example.com",
            },
            {
              id: "3",
              type: "subcenter",
              userId: "KR1234567",
              password: "pass123",
              name: "ABC Computer Institute",
              email: "abc@example.com",
            },
            {
              id: "4",
              type: "subcenter",
              userId: "KR7654321",
              password: "pass456",
              name: "XYZ Technology Center",
              email: "xyz@example.com",
            },
          ]
          localStorage.setItem("passwords", JSON.stringify(mockPasswords))
          setPasswords(mockPasswords)
        }
      } catch (error) {
        console.error("Error loading passwords:", error)
        toast({
          title: "Error loading passwords",
          description: "There was a problem loading the password data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPasswords()
  }, [])

  const toggleShowPasswords = () => {
    setShowPasswords(!showPasswords)
  }

  const filteredPasswords = passwords.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const studentPasswords = filteredPasswords.filter((item) => item.type === "student")
  const subcenterPasswords = filteredPasswords.filter((item) => item.type === "subcenter")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">All Passwords</h1>
        <Button onClick={toggleShowPasswords}>
          {showPasswords ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
          {showPasswords ? "Hide Passwords" : "Show Passwords"}
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>User Credentials</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
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
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="subcenters">Sub Centers</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {filteredPasswords.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "No users found matching your search." : "No users found."}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User Type</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Password</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPasswords.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="capitalize">{item.type}</TableCell>
                            <TableCell className="font-medium">{item.userId}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{showPasswords ? item.password : "••••••••"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="students" className="mt-0">
                {studentPasswords.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "No students found matching your search." : "No students found."}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Password</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentPasswords.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.userId}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{showPasswords ? item.password : "••••••••"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="subcenters" className="mt-0">
                {subcenterPasswords.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "No sub centers found matching your search." : "No sub centers found."}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ATC ID</TableHead>
                          <TableHead>Center Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Password</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subcenterPasswords.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.userId}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{showPasswords ? item.password : "••••••••"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
