"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const MonthlySpendingChart = () => {
  // Fake data for monthly spending
  const data = [
    { name: "Jan", amount: 3100 },
    { name: "Feb", amount: 3300 },
    { name: "Mar", amount: 3500 },
    { name: "Apr", amount: 3800 },
    { name: "May", amount: 3600 },
    { name: "Jun", amount: 3700 },
  ]

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            formatter={(value) => [`₵ ${value}`, "Spending"]}
            contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}
          />
          <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlySpendingChart
