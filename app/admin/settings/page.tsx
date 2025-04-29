import Header from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div>
      <Header title="Settings" />
      <main className="p-6">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">Manage system settings and preferences</p>
          </div>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 gap-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Institute Information</CardTitle>
                  <CardDescription>Update your institute details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institute-name">Institute Name</Label>
                      <Input id="institute-name" defaultValue="Krishna Computers" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input id="tagline" defaultValue="Leading Computer Education Institute" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="Krishna Computers, Kaman, Rajasthan" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="9001203861, 9772225669" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="krishna.computers.official2008@gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="krishnacomputerskaman.in" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-gray-50">
                        <img src="/placeholder.svg?height=80&width=80" alt="Logo" className="max-h-full max-w-full" />
                      </div>
                      <Input id="logo" type="file" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="academic-year">Current Academic Year</Label>
                      <Select defaultValue="2023-24">
                        <SelectTrigger id="academic-year">
                          <SelectValue placeholder="Select academic year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023-24">2023-24</SelectItem>
                          <SelectItem value="2022-23">2022-23</SelectItem>
                          <SelectItem value="2021-22">2021-22</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="asia-kolkata">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia-kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                          <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                          <SelectItem value="america-new_york">America/New_York (GMT-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="inr">
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                          <SelectItem value="usd">US Dollar ($)</SelectItem>
                          <SelectItem value="eur">Euro (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-certificate" defaultChecked />
                    <Label htmlFor="auto-certificate">Automatically generate certificates upon course completion</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="sms-notifications" defaultChecked />
                    <Label htmlFor="sms-notifications">Enable SMS notifications for students</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>Customize the appearance of the admin panel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-20 w-full rounded-md bg-blue-800 border-2 border-transparent hover:border-blue-400 cursor-pointer"></div>
                        <span className="text-sm">Blue (Default)</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-20 w-full rounded-md bg-green-800 border-2 border-transparent hover:border-green-400 cursor-pointer"></div>
                        <span className="text-sm">Green</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-20 w-full rounded-md bg-purple-800 border-2 border-transparent hover:border-purple-400 cursor-pointer"></div>
                        <span className="text-sm">Purple</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Layout</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-20 w-full rounded-md border bg-gray-100 p-2 hover:border-blue-400 cursor-pointer">
                          <div className="h-full w-1/4 bg-gray-300 rounded-sm"></div>
                        </div>
                        <span className="text-sm">Sidebar (Default)</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-20 w-full rounded-md border bg-gray-100 p-2 hover:border-blue-400 cursor-pointer">
                          <div className="h-1/4 w-full bg-gray-300 rounded-sm"></div>
                        </div>
                        <span className="text-sm">Top Navigation</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="dark-mode" />
                    <Label htmlFor="dark-mode">Enable Dark Mode</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="compact-mode" />
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certificate Template</CardTitle>
                  <CardDescription>Customize the appearance of certificates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificate-template">Template</Label>
                    <Select defaultValue="template1">
                      <SelectTrigger id="certificate-template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template1">Classic Template</SelectItem>
                        <SelectItem value="template2">Modern Template</SelectItem>
                        <SelectItem value="template3">Professional Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="border rounded-md p-4 bg-gray-50 h-60 flex items-center justify-center">
                      <p className="text-gray-500">Certificate template preview</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certificate-logo">Certificate Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-white">
                        <img src="/placeholder.svg?height=50&width=50" alt="Logo" className="max-h-full max-w-full" />
                      </div>
                      <Input id="certificate-logo" type="file" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certificate-signature">Authorized Signature</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-32 rounded-md border flex items-center justify-center bg-white">
                        <img
                          src="/placeholder.svg?height=40&width=100&text=Signature"
                          alt="Signature"
                          className="max-h-full max-w-full"
                        />
                      </div>
                      <Input id="certificate-signature" type="file" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Configure email notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-from">From Email</Label>
                    <Input id="email-from" defaultValue="noreply@krishnacomputerskaman.in" />
                  </div>

                  <div className="space-y-4">
                    <Label>Notification Types</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-enrollment">Student Enrollment</Label>
                          <p className="text-sm text-gray-500">Send email when a new student enrolls</p>
                        </div>
                        <Switch id="email-enrollment" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-payment">Payment Confirmation</Label>
                          <p className="text-sm text-gray-500">Send email when a payment is received</p>
                        </div>
                        <Switch id="email-payment" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-exam">Exam Schedule</Label>
                          <p className="text-sm text-gray-500">Send email when an exam is scheduled</p>
                        </div>
                        <Switch id="email-exam" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-result">Exam Results</Label>
                          <p className="text-sm text-gray-500">Send email when exam results are published</p>
                        </div>
                        <Switch id="email-result" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-certificate">Certificate Issuance</Label>
                          <p className="text-sm text-gray-500">Send email when a certificate is issued</p>
                        </div>
                        <Switch id="email-certificate" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SMS Notifications</CardTitle>
                  <CardDescription>Configure SMS notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sms-provider">SMS Provider</Label>
                    <Select defaultValue="textlocal">
                      <SelectTrigger id="sms-provider">
                        <SelectValue placeholder="Select SMS provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="textlocal">Textlocal</SelectItem>
                        <SelectItem value="msg91">MSG91</SelectItem>
                        <SelectItem value="twilio">Twilio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sms-api-key">API Key</Label>
                    <Input id="sms-api-key" type="password" defaultValue="••••••••••••••••" />
                  </div>

                  <div className="space-y-4">
                    <Label>Notification Types</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-enrollment">Student Enrollment</Label>
                          <p className="text-sm text-gray-500">Send SMS when a new student enrolls</p>
                        </div>
                        <Switch id="sms-enrollment" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-payment">Payment Confirmation</Label>
                          <p className="text-sm text-gray-500">Send SMS when a payment is received</p>
                        </div>
                        <Switch id="sms-payment" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-exam">Exam Schedule</Label>
                          <p className="text-sm text-gray-500">Send SMS when an exam is scheduled</p>
                        </div>
                        <Switch id="sms-exam" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-result">Exam Results</Label>
                          <p className="text-sm text-gray-500">Send SMS when exam results are published</p>
                        </div>
                        <Switch id="sms-result" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Password Policy</CardTitle>
                  <CardDescription>Configure password requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-length">Minimum Password Length</Label>
                    <Select defaultValue="8">
                      <SelectTrigger id="min-length">
                        <SelectValue placeholder="Select minimum length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 characters</SelectItem>
                        <SelectItem value="8">8 characters</SelectItem>
                        <SelectItem value="10">10 characters</SelectItem>
                        <SelectItem value="12">12 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Password Requirements</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="require-uppercase">Require uppercase letters</Label>
                        <Switch id="require-uppercase" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="require-lowercase">Require lowercase letters</Label>
                        <Switch id="require-lowercase" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="require-numbers">Require numbers</Label>
                        <Switch id="require-numbers" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="require-symbols">Require special characters</Label>
                        <Switch id="require-symbols" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">Password Expiry</Label>
                    <Select defaultValue="90">
                      <SelectTrigger id="password-expiry">
                        <SelectValue placeholder="Select expiry period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Configure two-factor authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Require 2FA for all admin users</p>
                      </div>
                      <Switch id="enable-2fa" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="2fa-method">Default 2FA Method</Label>
                    <Select defaultValue="app">
                      <SelectTrigger id="2fa-method">
                        <SelectValue placeholder="Select 2FA method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="app">Authenticator App</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Settings</CardTitle>
                  <CardDescription>Configure user session settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select defaultValue="60">
                      <SelectTrigger id="session-timeout">
                        <SelectValue placeholder="Select timeout period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="480">8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="force-logout">Force Logout on Browser Close</Label>
                        <p className="text-sm text-gray-500">End session when browser is closed</p>
                      </div>
                      <Switch id="force-logout" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="concurrent-sessions">Allow Concurrent Sessions</Label>
                        <p className="text-sm text-gray-500">Allow users to be logged in from multiple devices</p>
                      </div>
                      <Switch id="concurrent-sessions" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
