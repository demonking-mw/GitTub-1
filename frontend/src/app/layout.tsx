import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GitTub - Shower Planner",
  description: "Plan your perfect shower experience with GitTub",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F0F8FF] text-[#1A2A3A]`}>
        <nav className="bg-[#4A90E2] p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              GitTub
            </Link>
            <div className="space-x-4">
              <Link href="#" className="text-white hover:text-[#87CEFA]">
                Features
              </Link>
              <Link href="#" className="text-white hover:text-[#87CEFA]">
                Pricing
              </Link>
              <Link href="#" className="text-white hover:text-[#87CEFA]">
                About
              </Link>
              <button className="bg-[#2C3E50] text-white px-4 py-2 rounded hover:bg-[#1A2A3A]">Login</button>
              <button className="bg-[#87CEFA] text-[#1A2A3A] px-4 py-2 rounded hover:bg-[#4A90E2] hover:text-white">
                Sign Up
              </button>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

