"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function NewSubCenterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target)

      // Generate subcenter ID and password
      const subcenterId = "KR" + Math.floor(10000 + Math.random() * 90000)
      const password = Math.random().toString(36).slice(-8)

      // Create subcenter object
      const subcenterData = {
        subcenterId,
        password,
        centerName: formData.get("centerName"),
        ownerName: formData.get("ownerName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
        pincode: formData.get("pincode"),
        registrationDate: new Date().toISOString(),
      }

      // Send data to API
      const response = await fetch("/api/subcenters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subcenterData),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Sub Center Added",
          description: `Sub Center added successfully. ID: ${subcenterId}, Password: ${password}`,
        })
        router.push("/admin/subcenters")
      } else {
        throw new Error(result.error || "Failed to add sub center")
      }
    } catch (error) {
      console.error("Error adding sub center:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to add sub center. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Sub Center</CardTitle>
          <CardDescription>Enter sub center details to register them in the system</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="centerName">Center Name</Label>
                <Input id="centerName" name="centerName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input id="ownerName" name="ownerName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" name="pincode" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Sub Center"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
