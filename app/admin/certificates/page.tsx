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
import { Plus, MoreHorizontal, Search, Download, Printer } from "lucide-react"

export default function CertificatesPage() {
  return (
    <div>
      <Header title="Certificates" />
      <main className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Certificates</h2>
              <p className="text-muted-foreground">Manage and issue certificates to students</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" asChild>
                <Link href="/admin/certificates/new">
                  <Plus className="h-4 w-4" />
                  Issue Certificate
                </Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Certificate List</CardTitle>
              <CardDescription>View and manage all certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search certificates..." className="pl-8 w-full" />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="dca">DCA</SelectItem>
                      <SelectItem value="ccc">CCC</SelectItem>
                      <SelectItem value="tally">Tally</SelectItem>
                      <SelectItem value="o-level">O Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate No.</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Registration No.</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">KC-CERT-2023-{1000 + i}</TableCell>
                        <TableCell>Student Name {i + 1}</TableCell>
                        <TableCell>KC-2023-{1000 + i}</TableCell>
                        <TableCell>{["DCA", "CCC", "Tally", "O Level"][i % 4]}</TableCell>
                        <TableCell>{`${10 + (i % 20)}/0${1 + (i % 9)}/2023`}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {i % 2 === 0 ? "Issued" : "Pending"}
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
                                <Link href={`/admin/certificates/${1000 + i}`} className="w-full">
                                  View certificate
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Printer className="h-4 w-4" />
                                Print certificate
                              </DropdownMenuItem>
                              {i % 2 !== 0 && <DropdownMenuItem>Issue certificate</DropdownMenuItem>}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Revoke certificate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing <strong>1-10</strong> of <strong>56</strong> certificates
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
