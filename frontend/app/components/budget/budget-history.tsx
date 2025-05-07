"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Static data for budget history
const data = [
  { month: "Jan", budget: 5000, actual: 4800 },
  { month: "Feb", budget: 5000, actual: 5200 },
  { month: "Mar", budget: 5200, actual: 5100 },
  { month: "Apr", budget: 5200, actual: 5300 },
  { month: "May", budget: 5300, actual: 5500 },
  { month: "Jun", budget: 5300, actual: 5000 },
]

export default function BudgetHistory() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg text-slate-600">Budget vs. Actual Spending</h3>
        <select className="text-sm bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-900">
          <option value="6months">Last 6 Months</option>
          <option value="year">Last Year</option>
          <option value="2years">Last 2 Years</option>
        </select>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₵${value}`} />
            <Tooltip
              formatter={(value) => [`₵${value}`, undefined]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Bar dataKey="budget" name="Budget" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="actual" name="Actual" fill="#F43F5E" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-slate-500 text-sm">Average Monthly Budget</p>
          <p className="text-slate-900 font-bold text-lg">₵ 5,167</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-slate-500 text-sm">Average Monthly Spending</p>
          <p className="text-slate-900 font-bold text-lg">₵ 5,150</p>
        </div>
      </div>
    </div>
  )
}

