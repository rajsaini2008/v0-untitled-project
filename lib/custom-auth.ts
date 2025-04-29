import { env } from "@/lib/env"

// This is a utility function to verify if the provided key matches the RAJ_123 environment variable
// You can use this for custom authentication or verification purposes
export function verifyCustomKey(providedKey: string): boolean {
  if (!env.RAJ_123) {
    console.warn("RAJ_123 environment variable is not set")
    return false
  }

  return providedKey === env.RAJ_123
}

// Example function that could use the custom key for API authentication
export async function authenticateApiRequest(req: Request) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }

  const token = authHeader.substring(7) // Remove "Bearer " prefix
  return verifyCustomKey(token)
}
