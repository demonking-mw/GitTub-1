import { Home, Award, ShowerHeadIcon as Shower } from "lucide-react"
import CalorieAndStatsCard from "../homepage_components/shower-stats-card"
import ContributionGraph from "../homepage_components/contribution-graph"
import BackgroundEffects from "../homepage_components/background-effects"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[rgb(240,248,255)]">
      <BackgroundEffects />
      <main className="container mx-auto space-y-6 px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-800 mb-8">
          Welcome GitTub. We encourage you to commit as many showers as you can!
        </h1>
        <CalorieAndStatsCard weather={26} stepsCount={1000} recommended={3} completed={0} />
        <ContributionGraph />
      </main>
    </div>
  )
}

