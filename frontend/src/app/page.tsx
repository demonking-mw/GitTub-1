import Image from "next/image"
import { Droplets } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <WaterDrops />
        </div>
        <div className="relative container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-center mb-8">Welcome to GitTub</h1>
          <div className="flex justify-center mb-12">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Bathtub"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <section className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-lg">
              At GitTub, we're passionate about revolutionizing your shower experience. Our innovative shower planner
              helps you create the perfect bathing routine, save water, and enjoy a luxurious start or end to your day.
              With customizable settings, temperature controls, and integration with smart home devices, GitTub brings
              the future of showering to your bathroom today.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

function WaterDrops() {
  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <Droplets
          key={i}
          className="text-[#87CEFA] opacity-30 absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

