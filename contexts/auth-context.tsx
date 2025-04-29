"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define user type
type User = {
  id: string
  name: string
  email: string
  role: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  error: string | null
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
  error: null,
})

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for saved user on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      }
    } catch (err) {
      console.error("Error loading user from localStorage:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simple mock authentication
      if (email === "admin@example.com" && password === "password") {
        const user = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        }

        // Save user to state and localStorage
        setUser(user)
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user))
        }
        return true
      } else {
        setError("Invalid email or password")
        return false
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)
