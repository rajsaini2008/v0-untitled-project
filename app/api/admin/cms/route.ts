import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const content = await prisma.cmsContent.findMany()

    // Group by section
    const groupedContent = content.reduce(
      (acc, item) => {
        if (!acc[item.section]) {
          acc[item.section] = {}
        }

        acc[item.section][item.key] = item.value

        return acc
      },
      {} as Record<string, Record<string, string>>,
    )

    return NextResponse.json(groupedContent)
  } catch (error) {
    console.error("[CMS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { section, key, value } = body

    if (!section || !key || !value) {
      return new NextResponse("Section, key and value are required", { status: 400 })
    }

    // Upsert the content (create if not exists, update if exists)
    const content = await prisma.cmsContent.upsert({
      where: {
        section_key: {
          section,
          key,
        },
      },
      update: {
        value,
      },
      create: {
        section,
        key,
        value,
      },
    })

    return NextResponse.json(content)
  } catch (error) {
    console.error("[CMS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
