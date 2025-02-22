import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

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
                <Link
                href="/"
                className="text-2xl font-bold text-white hover:font-extrabold transition-all duration-200"
                >
                GitTub
                </Link>
              <div className="space-x-4">
                <Link
                  href="/badges"
                  className="text-white hover:text-[#87CEFA]"
                >
                  Badges
                </Link>
                <Link href="#" className="text-white hover:text-[#87CEFA]">
                  Features
                </Link>
                <Link href="#" className="text-white hover:text-[#87CEFA]">
                  About
                </Link>
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
