import Image from "next/image"
import { Droplets } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <WaterDrops />
        </div>
        <div className="container relative mx-auto px-4 py-16">
          <h1 className="mb-8 text-center text-5xl font-bold">
            Welcome to GitTub
          </h1>
          <div className="flex justify-center space-x-2">
            <div className="mb-12 flex justify-center">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Bathtub"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ?autoplay=1"
                className="ml-4 flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg hover:bg-red-600"
                style={{
                  height: "300px",
                  width: "150px",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                I am in neither CS nor SE!! I am a good ActSci student that
                showers every day!!
              </a>
            </div>
          </div>

          <section className="rounded-lg bg-white bg-opacity-80 p-8 shadow-lg">
            <h2 className="mb-4 text-3xl font-semibold">About Us</h2>
            <p className="text-lg">
              At GitTub, we're passionate about revolutionizing your shower
              experience. Our innovative shower planner helps you create the
              perfect bathing routine, save water, and enjoy a luxurious start
              or end to your day. With customizable settings, temperature
              controls, and integration with smart home devices, GitTub brings
              the future of showering to your bathroom today.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
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

