import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "./mongodb"
import User from "@/models/User"
import Student from "@/models/Student"
import SubCenter from "@/models/SubCenter"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.userType) {
          return null
        }

        try {
          await connectToDatabase()

          let user = null

          // Check based on user type
          if (credentials.userType === "admin") {
            user = await User.findOne({
              email: credentials.email,
              password: credentials.password,
              role: "admin",
            })
          } else if (credentials.userType === "atc") {
            user = await SubCenter.findOne({
              email: credentials.email,
              password: credentials.password,
            })
          } else if (credentials.userType === "student") {
            user = await Student.findOne({
              email: credentials.email,
              password: credentials.password,
            })
          }

          if (!user) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.centerName || user.fullName,
            role: credentials.userType,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
