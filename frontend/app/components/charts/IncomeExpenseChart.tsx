"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const IncomeExpenseChart = () => {
  // Fake data for income and expenses over 6 months
  const data = [
    { name: "Jan", income: 4200, expenses: 3100 },
    { name: "Feb", income: 4500, expenses: 3300 },
    { name: "Mar", income: 4800, expenses: 3500 },
    { name: "Apr", income: 4600, expenses: 3800 },
    { name: "May", income: 5000, expenses: 3600 },
    { name: "Jun", income: 5200, expenses: 3700 },
  ]

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}
            formatter={(value) => [`₵ ${value}`, ""]}
          />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default IncomeExpenseChart
