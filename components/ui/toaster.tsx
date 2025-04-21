"use client"

import { useEffect, useState } from "react"
import { Toaster as HotToaster } from "react-hot-toast"

export function Toaster() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#fff",
          color: "#363636",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        },
        success: {
          style: {
            border: "1px solid #10b981",
          },
        },
        error: {
          style: {
            border: "1px solid #ef4444",
          },
        },
      }}
    />
  )
}
