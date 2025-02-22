import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Home, Award, ShowerHeadIcon as Shower, Star, Info } from "lucide-react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitTub - Shower Planner",
  description: "Plan your perfect shower experience with GitTub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F0F8FF] text-[#1A2A3A]`}>
        <div className="mt-4 px-6">
          <nav className="rounded-lg bg-[#4A90E2] p-4 z-50 relative">
            <div className="container mx-auto flex items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="text-2xl font-bold text-white hover:font-extrabold transition-all duration-200"
              >
                GitTub
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <Link href="/" className="flex items-center gap-2 text-white hover:text-[#87CEFA]">
                  <Home className="h-5 w-5" /> Home
                </Link>
                <Link href="/badges" className="flex items-center gap-2 text-white hover:text-[#87CEFA]">
                  <Award className="h-5 w-5" /> Badges
                </Link>
                <Link href="/shower" className="flex items-center gap-2 text-white hover:text-[#87CEFA]">
                  <Shower className="h-5 w-5" /> Shower
                </Link>
                <Link href="/features" className="flex items-center gap-2 text-white hover:text-[#87CEFA]">
                  <Star className="h-5 w-5" /> Features
                </Link>
                <Link href="/about" className="flex items-center gap-2 text-white hover:text-[#87CEFA]">
                  <Info className="h-5 w-5" /> About
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="space-x-4">
                <button className="rounded bg-[#2C3E50] px-4 py-2 text-white hover:bg-[#1A2A3A]">
                  Login
                </button>
                <button className="rounded bg-[#87CEFA] px-4 py-2 text-[#1A2A3A] hover:bg-[#4A90E2] hover:text-white">
                  Sign Up
                </button>
              </div>
            </div>
          </nav>
        </div>

        {children}
      </body>
    </html>
  );
}