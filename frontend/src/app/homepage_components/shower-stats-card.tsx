"use client"

import { Flag, Flame, Cloud } from "lucide-react"
import { Card } from "@/homepage_components/ui/card"
import { Input } from "@/homepage_components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/homepage_components/ui/select"
import { useState, useEffect} from "react"
import confetti from "canvas-confetti";
import { X } from "lucide-react";

interface CalorieAndStatsCardProps {
  weather: number
  stepsCount: number
  recommended: number
  completed: number
}

const timePeriods = {
  today: "today",
  week: "this week",
  month: "this month",
  year: "this year",
}

export default function CalorieAndStatsCard({ weather, stepsCount, recommended, completed }: CalorieAndStatsCardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<keyof typeof timePeriods>("today")
  const [baseGoals, setBaseGoals] = useState({
    today: 2,
    week: 0,
    month: 0,
    year: 0,
  })
  const [showersTaken, setShowersTaken] = useState(0)

  const [streak, setStreak] = useState(0)
  const [highestStreak, setHighestStreak] = useState(0)
  const [lastShowerTime, setLastShowerTime] = useState<number | null>(null)
  const [showCongrats, setShowCongrats] = useState(false)

  // Calculate progress percentage for the ring
  const circumference = 2 * Math.PI * 90
  const progress = baseGoals[selectedPeriod] > 0 ? Math.min((showersTaken / baseGoals[selectedPeriod]) * 100, 100) : 0
  const offset = ((100 - progress) / 100) * circumference
  
  // Ensure no NaN values
  const safeProgress = isNaN(progress) ? 0 : progress; 
  // Calculate remaining or extra showers
  const remainingOrExtra = baseGoals[selectedPeriod] - showersTaken
  const isExceeding = remainingOrExtra < 0
  const isGoalReached = baseGoals[selectedPeriod] > 0 && showersTaken === baseGoals[selectedPeriod]

  // Calculate stinkiness percentage
  const stinkinessPercentage = 100 - (Math.round((showersTaken / recommended) * 100))

  // Calculate color based on stinkiness percentage
  const stinkinessColor = `hsl(${120 - stinkinessPercentage * 1.2}, 100%, 50%)`

  useEffect(() => {
    const timer = setInterval(() => {
      if (lastShowerTime && Date.now() - lastShowerTime > 24 * 60 * 60 * 1000) {
        setStreak(0)
        setLastShowerTime(null)
      }
    }, 60000) // Check every minute

    return () => clearInterval(timer)
  }, [lastShowerTime])

  useEffect(() => {
    if (isGoalReached) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      setShowCongrats(true)
    }
  }, [isGoalReached])
  
  const handleBaseGoalChange = (value: number) => {
    setBaseGoals((prev) => ({
      ...prev,
      [selectedPeriod]: value,
    }))
  }

  const handleShowerTaken = () => {
    setShowersTaken((prev) => prev + 1)
    setStreak((prev) => {
      const newStreak = prev + 1
      setHighestStreak((highest) => Math.max(highest, newStreak))
      return newStreak
    })
    setLastShowerTime(Date.now())
  }

  const handleUndoShower = () => {
    if (showersTaken > 0) {
      setShowersTaken((prev) => prev - 1)
      setStreak((prev) => Math.max(0, prev - 1))
    }
  }

  return (
    <Card className="p-6 bg-sky-50 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:gap-6">
        {/* Left Section - Showers */}
        <div className="flex-1">
          <h2 className="text-[32px] font-bold leading-none mb-8 text-sky-800">Showers</h2>
          <div className="flex items-start gap-6">
            {/* Badge placeholders */}
            <div className="grid grid-cols-5 gap-4">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="h-[88px] w-[88px] rounded-2xl bg-sky-200" />
              ))}
            </div>

            {/* Add space to the left of the circular progress bar */}
            <div className="w-8"></div>

            {/* Progress Ring */}
            <div className="relative aspect-square w-[200px]">
              <svg className="h-full w-full rotate-[90deg] transform">
                {/* Background circle - always light blue */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#E6F3FF" strokeWidth="20" />
                {/* Progress circle - dark blue, only visible based on progress */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="20"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 0.5s ease",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {isExceeding ? (
                  <>
                    <span className="text-2xl font-bold leading-none text-sky-800">{Math.abs(remainingOrExtra)}</span>
                    <span className="text-sm text-sky-600 mt-1">extra is</span>
                    <span className="text-sm text-sky-600">crazy!</span>
                  </>
                ) : (
                  <>
                    <span className="text-[40px] font-bold leading-none text-sky-800">{remainingOrExtra}</span>
                    <span className="text-base text-sky-600 mt-1">Remaining</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-sky-600" />
              <span className="font-medium text-sky-800">Base Goal</span>
              <Input
                type="number"
                value={baseGoals[selectedPeriod]}
                onChange={(e) => handleBaseGoalChange(Number(e.target.value))}
                className="ml-2 w-24 bg-transparent border-sky-300 text-sky-800"
              />
            </div>

            <Select
              value={selectedPeriod}
              onValueChange={(value: keyof typeof timePeriods) => setSelectedPeriod(value)}
            >
              <SelectTrigger className="w-full bg-transparent border-sky-300 text-sky-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(timePeriods).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-sky-600" />
              <span className="font-medium text-sky-800">Streak (Highest: {highestStreak})</span>
              <span className="ml-auto text-sky-800">{streak}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-sky-200">
            <p className="text-sm text-sky-600">
              Shower committed {timePeriods[selectedPeriod]}: {showersTaken}/{baseGoals[selectedPeriod]}(
              {Math.round(progress)}%)
            </p>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleShowerTaken}
              className="flex-1 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
            >
              Take a Shower
            </button>
            <button
              onClick={handleUndoShower}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Oops, it's a lie
            </button>
          </div>
        </div>

        {/* Right Section - Stats */}
        <div className="lg:w-[400px] mt-8 lg:mt-0 rounded-2xl bg-white p-6 shadow-inner">
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-xl font-medium text-sky-800">
              <Cloud className="h-5 w-5 text-sky-600" />
              Weather: {weather}C
            </h3>
            <div className="space-y-1 text-sky-600">
              <p>Steps Count: {stepsCount} steps</p>
              <p>Recommended: {recommended}</p>
              <p>
                Completed: {showersTaken}/{recommended}
              </p>
            </div>
            <div className="mt-6">
              <h4 className="text-base font-medium mb-4 text-sky-800">Stinkiness Point</h4>
              <div className="flex items-end justify-between">
                <span className="text-[100px] font-bold leading-none mt-4" style={{ color: stinkinessColor }}>
                  {stinkinessPercentage}%
                </span>
                <div className="flex items-end gap-2 mb-4">
                  {/* Thermometer */}
                  <div className="relative h-40 w-8 rounded-full overflow-hidden bg-gray-300">
                    {/* Gradient background with dark red at the bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#991B1B] via-[#FDE047] to-[#22C55E]" />
                  </div>
                  {/* Emojis */}
                  <div className="flex flex-col justify-between h-40">
                    <span role="img" aria-label="very happy" className="text-lg">
                      😊
                    </span>
                    <span role="img" aria-label="happy" className="text-lg">
                      🙂
                    </span>
                    <span role="img" aria-label="neutral" className="text-lg">
                      😐
                    </span>
                    <span role="img" aria-label="sad" className="text-lg">
                      🙁
                    </span>
                    <span role="img" aria-label="very sad" className="text-lg">
                      😫
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 rounded-lg text-center relative max-w-md w-full mx-4">
            <button
              onClick={() => setShowCongrats(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold text-white mb-4">Congratulations!</h2>
            <p className="text-xl text-white">You've reached your shower goal for {timePeriods[selectedPeriod]}!</p>
            <p className="text-lg text-white mt-4">Keep up the great work and stay fresh!</p>
          </div>
        </div>
      )}
    </Card>
  )
}

