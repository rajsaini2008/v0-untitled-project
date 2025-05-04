import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a student ID based on course and current timestamp
export function generateStudentId(courseCode: string): string {
  const year = new Date().getFullYear().toString().slice(-2)
  const coursePrefix = courseCode ? courseCode.toUpperCase().slice(0, 3) : "STD"
  const randomNum = Math.floor(10000 + Math.random() * 90000)
  return `${coursePrefix}${year}${randomNum}`
}

// Generate a random password
export function generateRandomPassword(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
