"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

// Static data for budget allocation
const budgetCategories = [
  { name: "Housing", value: 1500, color: "#4F46E5" },
  { name: "Food", value: 800, color: "#10B981" },
  { name: "Transportation", value: 600, color: "#F59E0B" },
  { name: "Utilities", value: 400, color: "#8B5CF6" },
  { name: "Entertainment", value: 300, color: "#EC4899" },
  { name: "Healthcare", value: 500, color: "#EF4444" },
  { name: "Savings", value: 700, color: "#3B82F6" },
  { name: "Other", value: 200, color: "#6B7280" },
]

export default function BudgetAllocation() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg text-slate-600">Budget Allocation</h3>
        <button className="text-sm text-slate-600 hover:text-slate-900 font-medium">Adjust Allocation</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px] z-10 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`₵${value}`, undefined]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {budgetCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                <p className="text-slate-700">{category.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-slate-900">₵ {category.value}</p>
                <p className="text-xs text-slate-500">
                  {((category.value / budgetCategories.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          ))}

          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center justify-between font-medium">
              <p className="text-slate-900">Total Budget</p>
              <p className="text-slate-900">
                ₵ {budgetCategories.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

