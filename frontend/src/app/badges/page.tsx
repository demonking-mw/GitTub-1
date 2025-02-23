import {
  Shield,
  Award,
  Droplet,
  Zap,
  Flame,
  Cloud,
  Bot,
  CheckCircle,
  CalendarX,
  Banana,
} from "lucide-react";

import { WaterDrops } from "@/components/waterdrops";

// Updated test array of badges with progress
const userBadges = [
  { name: "WaterSaver (Least Shower In A Month)", icon: "Droplet", completed: 11, required: 10},
  { name: "NoWhereToBeShow (Longest Streak of Goal Fail)", icon: "CalendarX", completed: 5, required: 8 },
  { name: "SteamMaster (Most Shower A Day)", icon: "Cloud", completed: 3, required: 5 },
  { name: "ShoWarrior (Most Shower A Month)", icon: "Shield", completed: 20, required: 20 },
  { name: "NoShowerAfterHangout(Freak)", icon: "Flame", completed: 8, required: 10 },
  { name: "HotFreak (Person with the shortest time to hit 69 showers)", icon: "Zap", completed: 15, required: 69 },
  { name: "ShowerChamp (Highest Streak of Shower)", icon: "Award", completed: 8, required: 20},
  { name: "MonkeyLoo(3 Weeks of No Showering)", icon: "Banana", completed: 2, required: 21 },
];

const iconComponents = {
  Shield,
  Award,
  Droplet,
  Zap,
  Flame,
  Cloud,
  CalendarX,
  Banana,
};

// AI comment variable
const aiComment =
  "Great job on saving water! Your 'Water Saver' and 'Quick Shower' badges show you're making a positive impact. Try to maintain a consistent shower routine to earn more badges!";

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200">
      <div className="container mx-auto px-4 py-16">
        <WaterDrops />
        <h1 className="mb-12 text-center text-4xl font-bold text-teal-800">
          Your Badges
        </h1>

        {/* AI Comment Box */}
        <div className="mb-12 rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center space-x-4">
            <Bot className="h-8 w-8 text-teal-500" />
            <h2 className="text-2xl font-semibold text-teal-800">
              AI Shower Assistant
            </h2>
          </div>
          <p className="text-lg text-teal-700">{aiComment}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {userBadges.map((badge, index) => {
            const IconComponent =
              iconComponents[badge.icon as keyof typeof iconComponents];
            const isCompleted = badge.completed >= badge.required;
            const progressPercentage = Math.min(
              (badge.completed / badge.required) * 100,
              100,
            );

            return (
              <div
                key={index}
                className="flex flex-col space-y-4 rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-teal-500 p-3">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-teal-800">
                    {badge.name}
                  </span>
                </div>
                {isCompleted ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-semibold">Badge Earned!</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="h-2.5 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2.5 rounded-full bg-teal-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="text-teal-500">
                        <span>{badge.completed}</span>
                      </div>
                      <div className="text-black">
                        <span>{badge.required}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
