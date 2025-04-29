import Link from "next/link"
import { PhoneCall, Mail, Clock } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-gray-100 py-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <div className="flex items-center gap-1">
            <PhoneCall className="h-4 w-4" />
            <span>+91 9876543210</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>info@krishnacomputers.com</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Mon-Sat: 9:00AM - 6:00PM</span>
          </div>
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
          <Link href="/franchise-registration" className="text-blue-600 hover:underline">
            Franchise Registration
          </Link>
        </div>
      </div>
    </header>
  )
}
