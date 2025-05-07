"use client"

import Link from "next/link"

const SavingsGoalChart = () => {
  // Fake data for savings goals
  const savingsGoal = {
    name: "Emergency Fund",
    current: 4500,
    target: 10000,
    percentage: 45,
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-700">{savingsGoal.name}</span>
        <span className="text-sm text-slate-500">
          ₵{savingsGoal.current.toLocaleString()} / ₵{savingsGoal.target.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4">
        <div
          className="h-4 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-white font-medium"
          style={{ width: `${savingsGoal.percentage}%` }}
        >
          {savingsGoal.percentage}%
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-500">
          You need ₵{(savingsGoal.target - savingsGoal.current).toLocaleString()} more to reach your goal
        </p>
        <Link href="/addFunds">
            <button className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
            Add Funds
            </button>
        </Link>
      </div>
    </div>
  )
}

export default SavingsGoalChart
