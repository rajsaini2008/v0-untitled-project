import { Pool } from "pg"

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    return await client.query(text, params)
  } finally {
    client.release()
  }
}

export async function getUserByEmail(email: string) {
  const result = await query(
    'SELECT id, name, email, "hashedPassword", role, "centerId" FROM "User" WHERE email = $1',
    [email],
  )
  return result.rows[0] || null
}

export async function getCenterById(centerId: string) {
  if (!centerId) return null
  const result = await query('SELECT id, name FROM "Center" WHERE id = $1', [centerId])
  return result.rows[0] || null
}
