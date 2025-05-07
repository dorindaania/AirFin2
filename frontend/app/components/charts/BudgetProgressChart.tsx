"use client"

const BudgetProgressChart = () => {
  // Fake data for budget categories and their progress
  const budgetCategories = [
    { name: "Food", current: 850, total: 1000, percentage: 85 },
    { name: "Transport", current: 600, total: 800, percentage: 75 },
    { name: "Entertainment", current: 250, total: 400, percentage: 62.5 },
  ]

  return (
    <div className="space-y-4">
      {budgetCategories.map((category, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">{category.name}</span>
            <span className="text-sm text-slate-500">
              ₵{category.current} / ₵{category.total}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${category.percentage > 90 ? "bg-red-500" : "bg-blue-600"}`}
              style={{ width: `${category.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BudgetProgressChart
