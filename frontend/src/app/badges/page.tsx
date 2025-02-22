import { Shield, Award, Droplet, Zap, Flame, Cloud, Bot } from "lucide-react";

import { WaterDrops } from "@/components/waterdrops";

// Test array of badges
const userBadges = [
  { name: "Water Saver", icon: "Droplet" },
  { name: "Quick Shower", icon: "Zap" },
  { name: "Steam Master", icon: "Cloud" },
  { name: "Eco Warrior", icon: "Shield" },
  { name: "Shower Champion", icon: "Award" },
  { name: "Hot Streak", icon: "Flame" },
];

const iconComponents = {
  Shield,
  Award,
  Droplet,
  Zap,
  Flame,
  Cloud,
};

// AI comment variable
const aiComment =
  "Great job on saving water! Your 'Water Saver' and 'Quick Shower' badges show you're making a positive impact. Try to maintain a consistent shower routine to earn more badges!";

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200">
      <div className="container mx-auto px-4 py-16">
        <WaterDrops />
        {/* AI Comment Box */}
        <div className="mb-12 rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center space-x-4">
            <Bot className="h-8 w-8 text-teal-500" />
            <h2 className="text-2xl font-semibold text-teal-800">
              Recent Showering Habits and Insights
            </h2>
          </div>
          <p className="text-lg text-teal-700">{aiComment}</p>
        </div>
        <h1 className="mb-12 text-center text-4xl font-bold text-teal-800">
          Your Badges
        </h1>
        {/* Badge Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {userBadges.map((badge, index) => {
            const IconComponent =
              iconComponents[badge.icon as keyof typeof iconComponents];
            return (
              <div
                key={index}
                className="flex items-center space-x-4 rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105"
              >
                <div className="rounded-full bg-teal-500 p-3">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <span className="text-lg font-semibold text-teal-800">
                  {badge.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
