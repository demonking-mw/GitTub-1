"use client"

import { Card } from "@/homepage_components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/homepage_components/ui/select"
import { Button } from "@/homepage_components/ui/button"
import { useState, useEffect } from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const weekdays = ["Mon", "Wed", "Fri", "Sun"]

export default function ContributionGraph() {
  const [yearData, setYearData] = useState<boolean[][]>([]);

  useEffect(() => {
    const generateYearData = () => {
      return Array.from({ length: 52 }).map(() =>
        Array.from({ length: 7 }).map(() => Math.random() > 0.7)
      );
    };
    setYearData(generateYearData());
  }, []); // Runs once on mount

  return (
    <Card className="p-6 bg-sky-50 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm text-sky-600">125 showers in the last year</span>
        <Select defaultValue="2025">
          <SelectTrigger className="w-[80px] bg-transparent border-sky-300 text-sky-800">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        {/* Month labels */}
        <div className="mb-2 grid grid-cols-[repeat(52,1fr)] text-xs text-sky-600">
          {months.map((month, i) => (
            <div
              key={month}
              style={{ gridColumn: `${Math.floor(i * (52 / 12)) + 1} / span ${Math.floor(52 / 12)}` }}
              className="text-center"
            >
              {month}
            </div>
          ))}
        </div>

        {/* Contribution grid with weekdays */}
        <div className="flex">
          {/* Weekday labels */}
          <div className="mr-2 flex flex-col justify-between text-xs text-sky-600">
            {weekdays.map((day, i) => (
              <div key={i} className="h-3">
                {day}
              </div>
            ))}
          </div>

          {/* Contribution squares */}
          <div className="grid w-full grid-cols-[repeat(52,1fr)] gap-1">
            {yearData.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((hasContribution, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`h-3 w-3 rounded-sm ${hasContribution ? "bg-sky-500" : "bg-sky-200"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-sky-600">
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="flex gap-0.5">
            <div className="h-2 w-2 rounded-sm bg-sky-200" />
            <div className="h-2 w-2 rounded-sm bg-sky-300" />
            <div className="h-2 w-2 rounded-sm bg-sky-400" />
            <div className="h-2 w-2 rounded-sm bg-sky-500" />
          </div>
          <span>More</span>
        </div>
      </div>

      <Button
        className="mt-6 w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 water-drop"
        onClick={() => alert("Time for a shower!")}
      >
        Let's go take a shower
      </Button>
    </Card>
  )
}

