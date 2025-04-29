import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Hardcoded admin credentials
const HARDCODED_ADMIN = {
  id: "hardcoded-admin-id",
  username: "rajsaini",
  password: "12345678",
  email: "admin@krishnacomputers.com",
  name: "Raj Saini",
  role: "ADMIN",
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // Only check hardcoded credentials
        if (credentials.username === HARDCODED_ADMIN.username && credentials.password === HARDCODED_ADMIN.password) {
          console.log("Using hardcoded admin credentials")
          return {
            id: HARDCODED_ADMIN.id,
            name: HARDCODED_ADMIN.name,
            email: HARDCODED_ADMIN.email,
            username: HARDCODED_ADMIN.username,
            role: HARDCODED_ADMIN.role,
          }
        }

        // No database check - return null for any other credentials
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          role: user.role,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          role: token.role,
        },
      }
    },
  },
}
