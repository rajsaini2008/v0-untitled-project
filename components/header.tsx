import Link from "next/link"
import { Phone, Mail, Facebook, Twitter, Instagram, Info } from "lucide-react"

export default function Header() {
  return (
    <div className="bg-black text-white py-2 px-4">
      <div className="container mx-auto">
        {/* Contact info section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 mb-2 md:mb-0 text-center md:text-left">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-xs md:text-sm">9001203861, 9772225669</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-xs md:text-sm break-all">krishna.computers.official2008@gmail.com</span>
            </div>
          </div>

          {/* Social and links section */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-2 md:mt-0">
            <div className="flex items-center gap-3">
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
            </div>

            <div className="hidden md:flex items-center">
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

        {/* Mobile links section */}
        <div className="flex flex-wrap justify-center gap-2 text-xs mt-2 md:hidden">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <div className="border-l border-gray-500 h-3"></div>
          <Link href="/franchise-registration" className="hover:underline">
            Franchise
          </Link>
          <div className="border-l border-gray-500 h-3"></div>
          <Link href="/download" className="hover:underline">
            Download
          </Link>
          <div className="border-l border-gray-500 h-3"></div>
          <Link href="/atc-verification" className="hover:underline">
            ATC Verification
          </Link>
        </div>
      </div>
    </div>
  )
}
