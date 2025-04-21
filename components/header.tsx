import Link from "next/link"
import { Phone, Mail, Facebook, Twitter, Instagram, Info } from "lucide-react"

export default function Header() {
  return (
    <div className="bg-black text-white py-2 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-6 mb-2 md:mb-0">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="text-sm">9001203861, 9772225669</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm">krishna.computers.official2008@gmail.com</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </Link>
          <Link href="#" aria-label="Information">
            <Info className="h-4 w-4" />
          </Link>
          <div className="border-l border-gray-500 h-4 mx-2"></div>
          <Link href="/login" className="text-sm hover:underline">
            Login
          </Link>
          <div className="border-l border-gray-500 h-4 mx-2"></div>
          <Link href="/franchise-registration" className="text-sm hover:underline">
            Franchise Registration
          </Link>
          <div className="border-l border-gray-500 h-4 mx-2"></div>
          <Link href="/download" className="text-sm hover:underline">
            Download
          </Link>
          <div className="border-l border-gray-500 h-4 mx-2"></div>
          <Link href="/atc-verification" className="text-sm hover:underline">
            ATC Verification
          </Link>
        </div>
      </div>
    </div>
  )
}
