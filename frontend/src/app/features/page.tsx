import {
    Shield,
    Award,
    Droplet,
    Zap,
    Flame,
    Cloud,
    Bot,
    CheckCircle,
  } from "lucide-react";
  
  import { WaterDrops } from "@/components/waterdrops";
import GoogleMapsComponent from "./GoogleMap";
  
  const iconComponents = {
    Shield,
    Award,
    Droplet,
    Zap,
    Flame,
    Cloud,
  };
  
  
  export default function FeaturesPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200">
        <div className="container mx-auto px-4 py-16">
          <WaterDrops />
          <h1 className="mb-12 text-center text-6xl font-bold text-teal-800">
            Map
          </h1>
  
          {/* <Map box> */}
          <div className="mb-12 w-[90%] max-w-4xl h-[95%] rounded-lg bg-white p-6 shadow-lg mx-auto">
            <div className="mb-4 flex items-center space-x-4">
              <Bot className="h-8 w-8 text-teal-500" />
              <h2 className="text-4xl font-semibold text-teal-800">
                Local Shower Locator
              </h2>
            </div>
            <h1>Map of showers</h1>
            <GoogleMapsComponent />
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          </div>
        </div>
      </div>
    );
  }