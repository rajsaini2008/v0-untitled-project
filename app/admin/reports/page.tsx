import Header from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Download, FileText, BarChart, PieChart, TrendingUp, IndianRupee } from "lucide-react"

export default function ReportsPage() {
  return (
    <div>
      <Header title="Reports" />
      <main className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
              <p className="text-muted-foreground">Generate and view various reports</p>
            </div>
          </div>

          <Tabs defaultValue="enrollment" className="space-y-4">
            <TabsList className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <TabsTrigger value="enrollment">Enrollment Reports</TabsTrigger>
              <TabsTrigger value="financial">Financial Reports</TabsTrigger>
              <TabsTrigger value="exam">Exam Reports</TabsTrigger>
              <TabsTrigger value="center">Center Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="enrollment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Reports</CardTitle>
                  <CardDescription>View and generate enrollment related reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Student Enrollment</CardTitle>
                        <CardDescription>Generate student enrollment reports</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs">From Date</label>
                              <Input type="date" className="h-8" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs">To Date</label>
                              <Input type="date" className="h-8" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Course</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All Courses" />
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
                          <Button className="w-full h-8 gap-2">
                            <FileText className="h-4 w-4" />
                            Generate Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Course-wise Enrollment</CardTitle>
                        <CardDescription>View enrollment statistics by course</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs">Year</label>
                              <Select>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="2023" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2023">2023</SelectItem>
                                  <SelectItem value="2022">2022</SelectItem>
                                  <SelectItem value="2021">2021</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs">Month</label>
                              <Select>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="All Months" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Months</SelectItem>
                                  <SelectItem value="1">January</SelectItem>
                                  <SelectItem value="2">February</SelectItem>
                                  <SelectItem value="3">March</SelectItem>
                                  {/* More months */}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Chart Type</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Bar Chart" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bar">Bar Chart</SelectItem>
                                <SelectItem value="pie">Pie Chart</SelectItem>
                                <SelectItem value="line">Line Chart</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <BarChart className="h-4 w-4" />
                            View Chart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Enrollment Trends</CardTitle>
                        <CardDescription>Analyze enrollment trends over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs">From Year</label>
                              <Select>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="2021" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2023">2023</SelectItem>
                                  <SelectItem value="2022">2022</SelectItem>
                                  <SelectItem value="2021">2021</SelectItem>
                                  <SelectItem value="2020">2020</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs">To Year</label>
                              <Select>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="2023" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2023">2023</SelectItem>
                                  <SelectItem value="2022">2022</SelectItem>
                                  <SelectItem value="2021">2021</SelectItem>
                                  <SelectItem value="2020">2020</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Group By</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Monthly" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <TrendingUp className="h-4 w-4" />
                            View Trends
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Enrollment Statistics</h3>
                      <Button variant="outline" size="sm" className="h-8 gap-2">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                    <div className="h-[300px] flex items-center justify-center border rounded-md bg-gray-50">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Select parameters and generate a report to view statistics</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                  <CardDescription>View and generate financial reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
                        <CardDescription>Generate fee collection reports</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs">From Date</label>
                              <Input type="date" className="h-8" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs">To Date</label>
                              <Input type="date" className="h-8" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Payment Method</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All Methods" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Methods</SelectItem>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="upi">UPI</SelectItem>
                                <SelectItem value="bank">Bank Transfer</SelectItem>
                                <SelectItem value="cheque">Cheque</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <IndianRupee className="h-4 w-4" />
                            Generate Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Revenue by Course</CardTitle>
                        <CardDescription>View revenue statistics by course</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs">Year</label>
                              <Select>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="2023" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2023">2023</SelectItem>
                                  <SelectItem value="2022">2022</SelectItem>
                                  <SelectItem value="2021">2021</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs">Quarter</label>
                              <Select>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="All Quarters" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Quarters</SelectItem>
                                  <SelectItem value="q1">Q1 (Jan-Mar)</SelectItem>
                                  <SelectItem value="q2">Q2 (Apr-Jun)</SelectItem>
                                  <SelectItem value="q3">Q3 (Jul-Sep)</SelectItem>
                                  <SelectItem value="q4">Q4 (Oct-Dec)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Chart Type</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Pie Chart" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pie">Pie Chart</SelectItem>
                                <SelectItem value="bar">Bar Chart</SelectItem>
                                <SelectItem value="line">Line Chart</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <PieChart className="h-4 w-4" />
                            View Chart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Trends</CardTitle>
                        <CardDescription>Analyze revenue trends over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs">From Month</label>
                              <Select>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="January" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">January</SelectItem>
                                  <SelectItem value="2">February</SelectItem>
                                  <SelectItem value="3">March</SelectItem>
                                  {/* More months */}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs">To Month</label>
                              <Select>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="December" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="12">December</SelectItem>
                                  <SelectItem value="11">November</SelectItem>
                                  <SelectItem value="10">October</SelectItem>
                                  {/* More months */}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Year</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="2023" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <TrendingUp className="h-4 w-4" />
                            View Trends
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Financial Statistics</h3>
                      <Button variant="outline" size="sm" className="h-8 gap-2">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                    <div className="h-[300px] flex items-center justify-center border rounded-md bg-gray-50">
                      <div className="text-center">
                        <PieChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Select parameters and generate a report to view statistics</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exam" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Reports</CardTitle>
                  <CardDescription>View and generate exam related reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Exam Results</CardTitle>
                        <CardDescription>Generate exam result reports</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs">Course</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select Course" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dca">DCA</SelectItem>
                                <SelectItem value="ccc">CCC</SelectItem>
                                <SelectItem value="tally">Tally</SelectItem>
                                <SelectItem value="o-level">O Level</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Exam</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select Exam" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mid-term">Mid Term Exam</SelectItem>
                                <SelectItem value="final">Final Exam</SelectItem>
                                <SelectItem value="practical">Practical Exam</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Date</label>
                            <Input type="date" className="h-8" />
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <FileText className="h-4 w-4" />
                            Generate Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Performance Analysis</CardTitle>
                        <CardDescription>Analyze student performance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs">Course</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select Course" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dca">DCA</SelectItem>
                                <SelectItem value="ccc">CCC</SelectItem>
                                <SelectItem value="tally">Tally</SelectItem>
                                <SelectItem value="o-level">O Level</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Batch</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select Batch" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="morning">Morning</SelectItem>
                                <SelectItem value="afternoon">Afternoon</SelectItem>
                                <SelectItem value="evening">Evening</SelectItem>
                                <SelectItem value="weekend">Weekend</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Year</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="2023" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <BarChart className="h-4 w-4" />
                            View Analysis
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pass/Fail Statistics</CardTitle>
                        <CardDescription>View pass/fail statistics by course</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs">Course</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All Courses" />
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
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs">From Date</label>
                              <Input type="date" className="h-8" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs">To Date</label>
                              <Input type="date" className="h-8" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Chart Type</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Pie Chart" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pie">Pie Chart</SelectItem>
                                <SelectItem value="bar">Bar Chart</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <PieChart className="h-4 w-4" />
                            View Statistics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Exam Statistics</h3>
                      <Button variant="outline" size="sm" className="h-8 gap-2">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                    <div className="h-[300px] flex items-center justify-center border rounded-md bg-gray-50">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Select parameters and generate a report to view statistics</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="center" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Center Reports</CardTitle>
                  <CardDescription>View and generate center related reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Center Performance</CardTitle>
                        <CardDescription>Compare performance across centers</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs">Metric</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select Metric" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="enrollment">Enrollment</SelectItem>
                                <SelectItem value="revenue">Revenue</SelectItem>
                                <SelectItem value="pass-rate">Pass Rate</SelectItem>
                                <SelectItem value="completion-rate">Completion Rate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs">From Date</label>
                              <Input type="date" className="h-8" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs">To Date</label>
                              <Input type="date" className="h-8" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Chart Type</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Bar Chart" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bar">Bar Chart</SelectItem>
                                <SelectItem value="line">Line Chart</SelectItem>
                                <SelectItem value="radar">Radar Chart</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <BarChart className="h-4 w-4" />
                            Compare Centers
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Center Growth</CardTitle>
                        <CardDescription>Analyze center growth over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs">Center</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="All Centers" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Centers</SelectItem>
                                <SelectItem value="main">Main Center</SelectItem>
                                <SelectItem value="bharatpur">Bharatpur</SelectItem>
                                <SelectItem value="deeg">Deeg</SelectItem>
                                <SelectItem value="alwar">Alwar</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Metric</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select Metric" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="students">Student Count</SelectItem>
                                <SelectItem value="revenue">Revenue</SelectItem>
                                <SelectItem value="courses">Course Offerings</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Time Period</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Last 12 Months" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="6m">Last 6 Months</SelectItem>
                                <SelectItem value="12m">Last 12 Months</SelectItem>
                                <SelectItem value="2y">Last 2 Years</SelectItem>
                                <SelectItem value="3y">Last 3 Years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <TrendingUp className="h-4 w-4" />
                            View Growth
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Center Summary</CardTitle>
                        <CardDescription>Generate comprehensive center reports</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs">Center</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select Center" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="main">Main Center</SelectItem>
                                <SelectItem value="bharatpur">Bharatpur</SelectItem>
                                <SelectItem value="deeg">Deeg</SelectItem>
                                <SelectItem value="alwar">Alwar</SelectItem>
                                <SelectItem value="mathura">Mathura</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Report Type</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select Report Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="summary">Summary Report</SelectItem>
                                <SelectItem value="detailed">Detailed Report</SelectItem>
                                <SelectItem value="financial">Financial Report</SelectItem>
                                <SelectItem value="academic">Academic Report</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs">Time Period</label>
                            <Select>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Current Year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="current">Current Year</SelectItem>
                                <SelectItem value="last">Last Year</SelectItem>
                                <SelectItem value="custom">Custom Period</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-8 gap-2">
                            <FileText className="h-4 w-4" />
                            Generate Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Center Comparison</h3>
                      <Button variant="outline" size="sm" className="h-8 gap-2">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                    <div className="h-[300px] flex items-center justify-center border rounded-md bg-gray-50">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Select parameters and generate a report to view statistics</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
