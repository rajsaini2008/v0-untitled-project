import { put } from "@vercel/blob"

export async function uploadFile(file: File, folder = "uploads") {
  try {
    if (!file) return null

    const filename = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    const blob = await put(filename, file, {
      access: "public",
    })

    return blob.url
  } catch (error) {
    console.error("Error uploading file:", error)
    return null
  }
}
