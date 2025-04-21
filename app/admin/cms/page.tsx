"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-hot-toast"

interface CmsContent {
  [section: string]: {
    [key: string]: string
  }
}

export default function CmsPage() {
  const router = useRouter()
  const [content, setContent] = useState<CmsContent>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/admin/cms")
        if (!response.ok) throw new Error("Failed to fetch content")

        const data = await response.json()
        setContent(data)
      } catch (error) {
        console.error("Error fetching CMS content:", error)
        toast.error("Failed to load content")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  const handleContentChange = (section: string, key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  const saveContent = async (section: string, key: string, value: string) => {
    setIsSaving(true)

    try {
      const response = await fetch("/api/admin/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section, key, value }),
      })

      if (!response.ok) throw new Error("Failed to save content")

      toast.success("Content saved successfully")
      router.refresh()
    } catch (error) {
      console.error("Error saving content:", error)
      toast.error("Failed to save content")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">CMS Panel</h1>
        <p>Loading content...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">CMS Panel</h1>

      <Tabs defaultValue="hero">
        <TabsList className="mb-6">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="courses">Courses Section</TabsTrigger>
          <TabsTrigger value="cta">Call to Action</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="hero-title" className="font-medium">
                    Main Title (Hindi)
                  </label>
                  <Input
                    id="hero-title"
                    value={content.hero?.title || "कंप्यूटर एक्सपर्ट बनने के लिए"}
                    onChange={(e) => handleContentChange("hero", "title", e.target.value)}
                  />
                  <Button
                    onClick={() => saveContent("hero", "title", content.hero?.title || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="hero-subtitle" className="font-medium">
                    Subtitle (Hindi)
                  </label>
                  <Input
                    id="hero-subtitle"
                    value={content.hero?.subtitle || "आज ही प्रवेश लीजिए !"}
                    onChange={(e) => handleContentChange("hero", "subtitle", e.target.value)}
                  />
                  <Button
                    onClick={() => saveContent("hero", "subtitle", content.hero?.subtitle || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="hero-courses" className="font-medium">
                    Courses Text
                  </label>
                  <Input
                    id="hero-courses"
                    value={content.hero?.courses || "DCA, CCC, Tally और O-LEVEL"}
                    onChange={(e) => handleContentChange("hero", "courses", e.target.value)}
                  />
                  <Button
                    onClick={() => saveContent("hero", "courses", content.hero?.courses || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="about-title" className="font-medium">
                    Section Title
                  </label>
                  <Input
                    id="about-title"
                    value={content.about?.title || "ABOUT US"}
                    onChange={(e) => handleContentChange("about", "title", e.target.value)}
                  />
                  <Button
                    onClick={() => saveContent("about", "title", content.about?.title || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="about-subtitle" className="font-medium">
                    Section Subtitle
                  </label>
                  <Input
                    id="about-subtitle"
                    value={content.about?.subtitle || "GIVE US A CHANCE AND SEE"}
                    onChange={(e) => handleContentChange("about", "subtitle", e.target.value)}
                  />
                  <Button
                    onClick={() => saveContent("about", "subtitle", content.about?.subtitle || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="about-description" className="font-medium">
                    Description
                  </label>
                  <Textarea
                    id="about-description"
                    value={
                      content.about?.description ||
                      "With experienced instructors and state-of-the-art facilities, We provide a dynamic learning environment that fosters innovation and creativity. Whether you are a beginner eager to start your journey in technology or a professional looking to enhance your skills."
                    }
                    onChange={(e) => handleContentChange("about", "description", e.target.value)}
                    rows={5}
                  />
                  <Button
                    onClick={() => saveContent("about", "description", content.about?.description || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Courses Section</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="courses-title" className="font-medium">
                    Section Title
                  </label>
                  <Input
                    id="courses-title"
                    value={content.courses?.title || "OUR COURSES"}
                    onChange={(e) => handleContentChange("courses", "title", e.target.value)}
                  />
                  <Button
                    onClick={() => saveContent("courses", "title", content.courses?.title || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="courses-subtitle" className="font-medium">
                    Section Subtitle
                  </label>
                  <Input
                    id="courses-subtitle"
                    value={content.courses?.subtitle || "POPULAR COURSES WE OFFER"}
                    onChange={(e) => handleContentChange("courses", "subtitle", e.target.value)}
                  />
                  <Button
                    onClick={() => saveContent("courses", "subtitle", content.courses?.subtitle || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>

                <div className="p-4 bg-yellow-50 rounded-md">
                  <p className="text-yellow-800">
                    Note: Course listings are managed from the Courses section in the Masters menu.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cta">
          <Card>
            <CardHeader>
              <CardTitle>Call to Action Section</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="cta-title" className="font-medium">
                    CTA Title
                  </label>
                  <Input
                    id="cta-title"
                    value={content.cta?.title || "Ready to Start Your Career in IT?"}
                    onChange={(e) => handleContentChange("cta", "title", e.target.value)}
                  />
                  <Button
                    onClick={() => saveContent("cta", "title", content.cta?.title || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="cta-description" className="font-medium">
                    CTA Description
                  </label>
                  <Textarea
                    id="cta-description"
                    value={
                      content.cta?.description ||
                      "Join Krishna Computers today and take the first step towards a successful future in the digital world."
                    }
                    onChange={(e) => handleContentChange("cta", "description", e.target.value)}
                    rows={3}
                  />
                  <Button
                    onClick={() => saveContent("cta", "description", content.cta?.description || "")}
                    disabled={isSaving}
                    className="mt-2 w-24"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
