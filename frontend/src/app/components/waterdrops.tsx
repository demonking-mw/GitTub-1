"use client";

import { Droplets } from "lucide-react";
import { useState, useEffect } from "react";

export function WaterDrops() {
  const [drops, setDrops] = useState<
    | {
        left: string;
        top: string;
        animationDuration: string;
        animationDelay: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    const newDrops = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `-${Math.random() * 20}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));

    setDrops(newDrops);
  }, []);

  if (!drops) return null; // Prevents SSR mismatch

  return (
    <div className="absolute inset-0">
      {drops.map((style, i) => (
        <Droplets
          key={i}
          className="animate-fall absolute text-[#87CEFA] opacity-30"
          style={{
            left: style.left,
            top: style.top,
            animationDuration: style.animationDuration,
            animationDelay: style.animationDelay,
          }}
        />
      ))}
    </div>
  );
}
