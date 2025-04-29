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
import { Plus, MoreHorizontal, Search, MapPin, Phone, Mail } from "lucide-react"

export default function CentersPage() {
  return (
    <div>
      <Header title="Centers" />
      <main className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Centers</h2>
              <p className="text-muted-foreground">Manage main center and sub-centers</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" asChild>
                <Link href="/admin/centers/new">
                  <Plus className="h-4 w-4" />
                  Add Center
                </Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Center List</CardTitle>
              <CardDescription>View and manage all centers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search centers..." className="pl-8 w-full" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Center ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">KC-001</TableCell>
                      <TableCell>Krishna Computers Main Center</TableCell>
                      <TableCell className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        Kaman, Rajasthan
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="flex items-center gap-1 text-xs">
                            <Phone className="h-3 w-3 text-gray-500" />
                            9001203861
                          </span>
                          <span className="flex items-center gap-1 text-xs">
                            <Mail className="h-3 w-3 text-gray-500" />
                            main@krishnacomputers.in
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                          Main Center
                        </div>
                      </TableCell>
                      <TableCell>450</TableCell>
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
                              <Link href="/admin/centers/1" className="w-full">
                                View details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href="/admin/centers/1/edit" className="w-full">
                                Edit center
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href="/admin/centers/1/users" className="w-full">
                                Manage users
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">KC-00{i + 2}</TableCell>
                        <TableCell>
                          Krishna Computers {["Bharatpur", "Deeg", "Alwar", "Mathura", "Jaipur", "Delhi", "Agra"][i]}{" "}
                          Branch
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          {["Bharatpur", "Deeg", "Alwar", "Mathura", "Jaipur", "Delhi", "Agra"][i]},{" "}
                          {
                            [
                              "Rajasthan",
                              "Rajasthan",
                              "Rajasthan",
                              "Uttar Pradesh",
                              "Rajasthan",
                              "Delhi",
                              "Uttar Pradesh",
                            ][i]
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="flex items-center gap-1 text-xs">
                              <Phone className="h-3 w-3 text-gray-500" />
                              9001203{861 + i}
                            </span>
                            <span className="flex items-center gap-1 text-xs">
                              <Mail className="h-3 w-3 text-gray-500" />
                              {["bharatpur", "deeg", "alwar", "mathura", "jaipur", "delhi", "agra"][i]}
                              @krishnacomputers.in
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                            Sub Center
                          </div>
                        </TableCell>
                        <TableCell>{[120, 85, 150, 95, 200, 180, 110][i]}</TableCell>
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
                                <Link href={`/admin/centers/${i + 2}`} className="w-full">
                                  View details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link href={`/admin/centers/${i + 2}/edit`} className="w-full">
                                  Edit center
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link href={`/admin/centers/${i + 2}/users`} className="w-full">
                                  Manage users
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete center</DropdownMenuItem>
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
