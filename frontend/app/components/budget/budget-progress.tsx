"use client"

import { useState, useEffect } from "react"

type Category = {
  name: string
  percentage: number
  amount: number
  color: string
}

type Budget = {
  name: string
  description: string
  categories: {
    name: string
    percentage: number
    amount: number
  }[]
}

export default function BudgetProgress() {
  // State for budget categories
  const [categories, setCategories] = useState([
    { name: "Housing", allocated: 1500, spent: 1200, color: "bg-blue-600" },
    { name: "Food", allocated: 800, spent: 650, color: "bg-green-600" },
    { name: "Transportation", allocated: 600, spent: 450, color: "bg-amber-600" },
    { name: "Utilities", allocated: 400, spent: 350, color: "bg-purple-600" },
    { name: "Entertainment", allocated: 300, spent: 280, color: "bg-pink-600" },
    { name: "Healthcare", allocated: 500, spent: 200, color: "bg-red-600" },
    { name: "Savings", allocated: 700, spent: 700, color: "bg-blue-500" },
    { name: "Other", allocated: 200, spent: 150, color: "bg-gray-600" },
  ])

  // Sample spending data - in a real app, this would come from your database
  const spending = {
    Housing: 1200,
    Food: 650,
    Transportation: 450,
    Utilities: 350,
    Entertainment: 280,
    Healthcare: 200,
    Savings: 700,
    Other: 150,
  }

  // Color mapping for categories
  const colorMap = {
    Housing: "bg-blue-600",
    Food: "bg-green-600",
    Transportation: "bg-amber-600",
    Utilities: "bg-purple-600",
    Entertainment: "bg-pink-600",
    Healthcare: "bg-red-600",
    Savings: "bg-blue-500",
    Other: "bg-gray-600",
  }

  // Listen for budget changes from the RecommendedBudgets component
  useEffect(() => {
    // Load initial budget from localStorage
    const savedBudget = localStorage.getItem("selectedBudget")
    if (savedBudget) {
      try {
        const budget = JSON.parse(savedBudget)
        updateCategoriesFromBudget(budget)
      } catch (e) {
        console.error("Error parsing saved budget:", e)
      }
    }

    // Listen for budget change events
    const handleBudgetChange = (event: CustomEvent) => {
      updateCategoriesFromBudget(event.detail.budget)
    }

    window.addEventListener("budgetChanged", handleBudgetChange as EventListener)

    return () => {
      window.removeEventListener("budgetChanged", handleBudgetChange as EventListener)
    }
  }, [])

  // Update categories when a budget is applied
  const updateCategoriesFromBudget = (budget: Budget) => {
    if (!budget || !budget.categories) return

    const updatedCategories = categories.map((category) => {
      // Find the matching category in the selected budget
      const matchingCategory = budget.categories.find((budgetCat) => budgetCat.name === category.name)

      if (matchingCategory) {
        return {
          ...category,
          allocated: matchingCategory.amount,
          // Keep the existing spent amount
          spent: spending[category.name as keyof typeof spending] || 0,
        }
      }

      return category
    })

    setCategories(updatedCategories)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg text-slate-600">Category Progress</h3>
        <div className="text-xs text-slate-500">12 days remaining</div>
      </div>

      <div className="space-y-5">
        {categories.map((category, index) => {
          const percentage = category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0
          const isOverBudget = percentage > 90

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-slate-900">{category.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-600">
                    ₵ {category.spent.toLocaleString()}{" "}
                    <span className="text-slate-400">/ ₵ {category.allocated.toLocaleString()}</span>
                  </p>
                  {isOverBudget && (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                      {percentage > 100 ? "Over" : "Near Limit"}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={`${category.color} h-1.5 rounded-full`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <span className="font-medium text-slate-800">Total Budget:</span>
          <span className="font-bold text-slate-900">
            ₵{categories.reduce((sum, cat) => sum + cat.allocated, 0).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium text-slate-800">Total Spent:</span>
          <span className="font-bold text-slate-900">
            ₵{categories.reduce((sum, cat) => sum + cat.spent, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
