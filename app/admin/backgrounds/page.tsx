"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

interface Template {
  id: string
  type: "certificate" | "marksheet"
  name: string
  imageUrl: string
  isActive: boolean
}

export default function Backgrounds() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [uploadingCertificate, setUploadingCertificate] = useState(false)
  const [uploadingMarksheet, setUploadingMarksheet] = useState(false)

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll just get the data from localStorage
    const loadTemplates = () => {
      try {
        const storedTemplates = localStorage.getItem("templates")
        if (storedTemplates) {
          setTemplates(JSON.parse(storedTemplates))
        } else {
          // Add some mock data if no templates exist
          const mockTemplates = [
            {
              id: "1",
              type: "certificate",
              name: "Default Certificate Template",
              imageUrl:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/867tel1R7Li42hQSh0Certificate-zcESYRrilH6sqTX59rbglXBy0uDkny.jpeg",
              isActive: true,
            },
            {
              id: "2",
              type: "marksheet",
              name: "Default Marksheet Template",
              imageUrl:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/867tel1R7Li42hQSh0Marksheet-3uxsKiCeuRxSpyUXeWUdDcm0A9FWpZ.jpeg",
              isActive: true,
            },
          ]
          localStorage.setItem("templates", JSON.stringify(mockTemplates))
          setTemplates(mockTemplates)
        }
      } catch (error) {
        console.error("Error loading templates:", error)
        toast({
          title: "Error loading templates",
          description: "There was a problem loading the template data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadTemplates()
  }, [])

  const handleUploadCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingCertificate(true)

    // In a real application, this would be an API call to upload the file
    // For now, we'll just simulate a delay and add a new template
    setTimeout(() => {
      const newTemplate: Template = {
        id: Date.now().toString(),
        type: "certificate",
        name: `Certificate Template ${templates.filter((t) => t.type === "certificate").length + 1}`,
        imageUrl: URL.createObjectURL(file),
        isActive: false,
      }

      const updatedTemplates = [...templates, newTemplate]
      setTemplates(updatedTemplates)
      localStorage.setItem("templates", JSON.stringify(updatedTemplates))

      toast({
        title: "Certificate template uploaded",
        description: "The certificate template has been uploaded successfully.",
      })

      setUploadingCertificate(false)
    }, 1000)
  }

  const handleUploadMarksheet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingMarksheet(true)

    // In a real application, this would be an API call to upload the file
    // For now, we'll just simulate a delay and add a new template
    setTimeout(() => {
      const newTemplate: Template = {
        id: Date.now().toString(),
        type: "marksheet",
        name: `Marksheet Template ${templates.filter((t) => t.type === "marksheet").length + 1}`,
        imageUrl: URL.createObjectURL(file),
        isActive: false,
      }

      const updatedTemplates = [...templates, newTemplate]
      setTemplates(updatedTemplates)
      localStorage.setItem("templates", JSON.stringify(updatedTemplates))

      toast({
        title: "Marksheet template uploaded",
        description: "The marksheet template has been uploaded successfully.",
      })

      setUploadingMarksheet(false)
    }, 1000)
  }

  const setActiveTemplate = (id: string, type: "certificate" | "marksheet") => {
    const updatedTemplates = templates.map((template) => {
      if (template.type === type) {
        return {
          ...template,
          isActive: template.id === id,
        }
      }
      return template
    })

    setTemplates(updatedTemplates)
    localStorage.setItem("templates", JSON.stringify(updatedTemplates))

    toast({
      title: "Template activated",
      description: `The ${type} template has been set as active.`,
    })
  }

  const deleteTemplate = (id: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      const template = templates.find((t) => t.id === id)

      if (template?.isActive) {
        toast({
          title: "Cannot delete active template",
          description: "Please set another template as active before deleting this one.",
          variant: "destructive",
        })
        return
      }

      const updatedTemplates = templates.filter((template) => template.id !== id)
      setTemplates(updatedTemplates)
      localStorage.setItem("templates", JSON.stringify(updatedTemplates))

      toast({
        title: "Template deleted",
        description: "The template has been deleted successfully.",
      })
    }
  }

  const certificateTemplates = templates.filter((template) => template.type === "certificate")
  const marksheetTemplates = templates.filter((template) => template.type === "marksheet")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Background Templates</h1>
      </div>

      <Tabs defaultValue="certificate" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="certificate">Certificate Templates</TabsTrigger>
          <TabsTrigger value="marksheet">Marksheet Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="certificate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="upload-certificate" className="block mb-2">
                  Upload New Certificate Template
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="upload-certificate"
                    type="file"
                    accept="image/*"
                    onChange={handleUploadCertificate}
                    disabled={uploadingCertificate}
                  />
                  <Button disabled={uploadingCertificate}>{uploadingCertificate ? "Uploading..." : "Upload"}</Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
                </div>
              ) : certificateTemplates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No certificate templates found. Upload a template to get started.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificateTemplates.map((template) => (
                    <Card key={template.id} className={template.isActive ? "border-2 border-blue-500" : ""}>
                      <CardContent className="p-4">
                        <div className="aspect-[16/11] relative mb-4 overflow-hidden rounded-md">
                          <Image
                            src={template.imageUrl || "/placeholder.svg"}
                            alt={template.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            {template.isActive && (
                              <span className="text-xs text-blue-600 font-medium">Active Template</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {!template.isActive && (
                              <Button size="sm" onClick={() => setActiveTemplate(template.id, "certificate")}>
                                Set Active
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteTemplate(template.id)}
                              disabled={template.isActive}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marksheet" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Marksheet Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="upload-marksheet" className="block mb-2">
                  Upload New Marksheet Template
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="upload-marksheet"
                    type="file"
                    accept="image/*"
                    onChange={handleUploadMarksheet}
                    disabled={uploadingMarksheet}
                  />
                  <Button disabled={uploadingMarksheet}>{uploadingMarksheet ? "Uploading..." : "Upload"}</Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
                </div>
              ) : marksheetTemplates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No marksheet templates found. Upload a template to get started.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marksheetTemplates.map((template) => (
                    <Card key={template.id} className={template.isActive ? "border-2 border-blue-500" : ""}>
                      <CardContent className="p-4">
                        <div className="aspect-[16/11] relative mb-4 overflow-hidden rounded-md">
                          <Image
                            src={template.imageUrl || "/placeholder.svg"}
                            alt={template.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            {template.isActive && (
                              <span className="text-xs text-blue-600 font-medium">Active Template</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {!template.isActive && (
                              <Button size="sm" onClick={() => setActiveTemplate(template.id, "marksheet")}>
                                Set Active
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteTemplate(template.id)}
                              disabled={template.isActive}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
