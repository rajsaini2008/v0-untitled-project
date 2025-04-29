import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Krishna Computers</h3>
            <p className="mb-4">A leading computer education institute providing quality education since 2005.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-blue-400">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-400">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/certificate-verification" className="hover:text-blue-400">
                  Certificate Verification
                </Link>
              </li>
              <li>
                <Link href="/franchise-registration" className="hover:text-blue-400">
                  Franchise Registration
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>123 Main Street, City, State, Country</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>info@krishnacomputers.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Krishna Computers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
