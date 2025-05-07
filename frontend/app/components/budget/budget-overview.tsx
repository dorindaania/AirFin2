"use client"

import { useState } from "react"

export default function BudgetOverview() {
  const [period, setPeriod] = useState("month")

  // Static data for budget overview
  const budgetData = {
    month: {
      totalBudget: 5000,
      spent: 3250,
      remaining: 1750,
      daysLeft: 12,
      dailyBudget: 146,
    },
    quarter: {
      totalBudget: 15000,
      spent: 8500,
      remaining: 6500,
      daysLeft: 42,
      dailyBudget: 155,
    },
    year: {
      totalBudget: 60000,
      spent: 25000,
      remaining: 35000,
      daysLeft: 245,
      dailyBudget: 143,
    },
  }

  const data = budgetData[period as keyof typeof budgetData]
  const spentPercentage = (data.spent / data.totalBudget) * 100

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg text-slate-600">Budget Overview</h3>
        <div className="flex space-x-2">
          {["month", "quarter", "year"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-sm rounded-md ${
                period === p
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col h-full justify-center">
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <p className="text-slate-600">Total Budget</p>
                <p className="text-slate-900 font-bold text-xl">₵ {data.totalBudget.toLocaleString()}</p>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${spentPercentage}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-700 text-sm">Spent</p>
                <p className="text-slate-900 font-bold">₵ {data.spent.toLocaleString()}</p>
                <p className="text-xs text-slate-500">{spentPercentage.toFixed(0)}% of budget</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-green-700 text-sm">Remaining</p>
                <p className="text-slate-900 font-bold">₵ {data.remaining.toLocaleString()}</p>
                <p className="text-xs text-slate-500">{(100 - spentPercentage).toFixed(0)}% of budget</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Days Remaining</p>
                  <p className="text-slate-900 font-bold text-2xl">{data.daysLeft}</p>
                </div>
                <div className="bg-slate-200 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Daily Budget</p>
                  <p className="text-slate-900 font-bold text-2xl">₵ {data.dailyBudget}</p>
                </div>
                <div className="bg-slate-200 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-amber-50 rounded-lg p-3 border border-amber-100">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 text-amber-700 p-2 rounded-full mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <p className="text-amber-800 font-medium text-sm">Spending Alert</p>
                <p className="text-amber-700 text-xs">
                  You're spending faster than your daily budget. Consider adjusting your spending to stay on track.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

