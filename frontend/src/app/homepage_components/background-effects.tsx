"use client"

import { useEffect, useRef } from "react"

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create drips
    const createDrip = () => {
      const drip = document.createElement("div")
      drip.className = "drip"
      drip.style.left = `${Math.random() * 100}%`
      containerRef.current?.appendChild(drip)

      // Remove drip after animation
      setTimeout(() => {
        drip.remove()
      }, 2000)
    }

    // Create drips periodically
    const interval = setInterval(() => {
      createDrip()
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="steam" />
      <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" />
    </>
  )
}

