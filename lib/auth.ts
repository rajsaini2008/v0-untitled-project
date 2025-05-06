"use client"

import { useState, useEffect } from "react"

// Default admin credentials
const DEFAULT_ADMIN = {
  email: "admin@krishnacomputers.com",
  password: "admin123",
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<"admin" | "student" | "atc" | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem("auth_token")
    const type = localStorage.getItem("user_type")

    if (token && type) {
      setIsAuthenticated(true)
      setUserType(type as "admin" | "student" | "atc")
    }

    setIsLoading(false)
  }, [])

  const login = (type: "admin" | "student" | "atc", identifier: string, password: string) => {
    // Check if credentials match
    if (type === "admin" && identifier === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      // Set token in localStorage
      localStorage.setItem("auth_token", "admin-jwt-token")
      localStorage.setItem("user_type", "admin")
      setIsAuthenticated(true)
      setUserType("admin")
      return true
    } else if (type === "student") {
      // Check student credentials from localStorage
      const students = JSON.parse(localStorage.getItem("students") || "[]")
      const student = students.find((s: any) => s.studentId === identifier && s.password === password)

      if (student) {
        localStorage.setItem("auth_token", `student-${student.id}`)
        localStorage.setItem("user_type", "student")
        localStorage.setItem("current_user_id", student.id)
        setIsAuthenticated(true)
        setUserType("student")
        return true
      }
    } else if (type === "atc") {
      // Check ATC credentials from localStorage
      const subCenters = JSON.parse(localStorage.getItem("subCenters") || "[]")
      const center = subCenters.find((c: any) => c.atcId === identifier && c.password === password)

      if (center) {
        localStorage.setItem("auth_token", `atc-${center.id}`)
        localStorage.setItem("user_type", "atc")
        localStorage.setItem("current_user_id", center.id)
        setIsAuthenticated(true)
        setUserType("atc")
        return true
      }
    }

    return false
  }

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_type")
    localStorage.removeItem("current_user_id")
    setIsAuthenticated(false)
    setUserType(null)
  }

  return { isAuthenticated, isLoading, userType, login, logout }
}
