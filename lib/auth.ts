"use client"

import { useState, useEffect } from "react"
import { generateStudentId, generateRandomPassword } from "./utils"

// Default admin credentials
const DEFAULT_ADMIN = {
  email: "admin@krishnacomputers.com",
  password: "admin123",
}

// Student interface
interface Student {
  id: string
  studentId: string
  name: string
  email: string
  phone: string
  password: string
  course: string
  batch: string
  enrollmentDate: string
  address?: string
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userType, setUserType] = useState<"admin" | "student" | null>(null)

  useEffect(() => {
    // Check if user is authenticated on component mount
    const adminToken = localStorage.getItem("admin_token")
    const studentData = localStorage.getItem("current_student")

    if (adminToken) {
      setIsAuthenticated(true)
      setUserType("admin")
    } else if (studentData) {
      setIsAuthenticated(true)
      setUserType("student")
      setCurrentUser(JSON.parse(studentData))
    }

    setIsLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    // Check if admin credentials match
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      // Set token in localStorage
      localStorage.setItem("admin_token", "admin-jwt-token")
      // Set cookie for middleware
      document.cookie = `admin_token=admin-jwt-token; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
      setIsAuthenticated(true)
      setUserType("admin")
      return true
    }

    // Check if student credentials match
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    const student = students.find((s: any) => s.studentId === email && s.password === password)

    if (student) {
      // Store student data in localStorage
      localStorage.setItem("current_student", JSON.stringify(student))
      setIsAuthenticated(true)
      setUserType("student")
      setCurrentUser(student)
      return true
    }

    return false
  }

  const logout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("admin_token")
    localStorage.removeItem("current_student")
    // Remove cookie
    document.cookie = "admin_token=; path=/; max-age=0"
    setIsAuthenticated(false)
    setUserType(null)
    setCurrentUser(null)
  }

  const registerStudent = (studentData: Omit<Student, "studentId" | "password">) => {
    // Generate student ID and password
    const studentId = generateStudentId(studentData.course)
    const password = generateRandomPassword()

    // Create new student object
    const newStudent = {
      ...studentData,
      studentId,
      password,
    }

    // Save to localStorage
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    students.push(newStudent)
    localStorage.setItem("students", JSON.stringify(students))

    return { studentId, password }
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    registerStudent,
    userType,
    currentUser,
  }
}

// Helper function to get student data from localStorage
export function getStudentFromLocalStorage() {
  const studentData = localStorage.getItem("current_student")
  return studentData ? JSON.parse(studentData) : null
}

// Helper function to clear student data from localStorage
export function clearStudentFromLocalStorage() {
  localStorage.removeItem("current_student")
}
