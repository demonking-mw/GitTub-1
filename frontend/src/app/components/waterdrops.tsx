import { Droplets } from "lucide-react";
export function WaterDrops() {
  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <Droplets
          key={i}
          className="animate-fall absolute text-[#87CEFA] opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
