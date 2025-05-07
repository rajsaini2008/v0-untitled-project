import { put } from "@vercel/blob"

export async function uploadFile(file: File): Promise<string> {
  try {
    if (!file || file.size === 0) {
      return ""
    }

    // Generate a unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    // Upload to Vercel Blob
    const { url } = await put(filename, file, {
      access: "public",
    })

    return url
  } catch (error) {
    console.error("Error uploading file:", error)
    throw new Error("Failed to upload file")
  }
}
