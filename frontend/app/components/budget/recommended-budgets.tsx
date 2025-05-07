"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"

interface RecommendedBudgetsProps {
  onBudgetApply?: (budget: { name: string; description: string; categories: { name: string; percentage: number; amount: number }[] }) => void;
}

export default function RecommendedBudgets({ onBudgetApply }: RecommendedBudgetsProps) {
  const [income, setIncome] = useState(5000)
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState<number | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // 50/30/20 rule - Needs/Wants/Savings
  const needs = income * 0.5
  const wants = income * 0.3
  const savings = income * 0.2

  // Detailed breakdown based on typical percentages
  const recommendedBudgets = [
    {
      name: "Conservative Budget",
      description: "Focuses on saving and essential expenses",
      categories: [
        { name: "Housing", percentage: 25, amount: income * 0.25 },
        { name: "Food", percentage: 15, amount: income * 0.15 },
        { name: "Transportation", percentage: 10, amount: income * 0.1 },
        { name: "Utilities", percentage: 10, amount: income * 0.1 },
        { name: "Healthcare", percentage: 10, amount: income * 0.1 },
        { name: "Savings", percentage: 20, amount: income * 0.2 },
        { name: "Entertainment", percentage: 5, amount: income * 0.05 },
        { name: "Other", percentage: 5, amount: income * 0.05 },
      ],
    },
    {
      name: "Balanced Budget",
      description: "Equal focus on needs, wants, and future goals",
      categories: [
        { name: "Housing", percentage: 30, amount: income * 0.3 },
        { name: "Food", percentage: 12, amount: income * 0.12 },
        { name: "Transportation", percentage: 10, amount: income * 0.1 },
        { name: "Utilities", percentage: 8, amount: income * 0.08 },
        { name: "Healthcare", percentage: 5, amount: income * 0.05 },
        { name: "Savings", percentage: 15, amount: income * 0.15 },
        { name: "Entertainment", percentage: 10, amount: income * 0.1 },
        { name: "Other", percentage: 10, amount: income * 0.1 },
      ],
    },
    {
      name: "Aggressive Savings",
      description: "Prioritizes saving for future goals",
      categories: [
        { name: "Housing", percentage: 25, amount: income * 0.25 },
        { name: "Food", percentage: 10, amount: income * 0.1 },
        { name: "Transportation", percentage: 8, amount: income * 0.08 },
        { name: "Utilities", percentage: 7, amount: income * 0.07 },
        { name: "Healthcare", percentage: 5, amount: income * 0.05 },
        { name: "Savings", percentage: 30, amount: income * 0.3 },
        { name: "Entertainment", percentage: 5, amount: income * 0.05 },
        { name: "Other", percentage: 10, amount: income * 0.1 },
      ],
    },
  ]

  // Recalculate budget amounts when income changes
  useEffect(() => {
    // If a budget is already selected, update the parent component with new amounts
    if (selectedBudgetIndex !== null) {
      applyBudget(selectedBudgetIndex, false)
    }
  }, [income])

  const applyBudget = (index: number, showMessage = true) => {
    setSelectedBudgetIndex(index)
    const selectedBudget = recommendedBudgets[index]

    // Pass the selected budget to the parent component
    if (onBudgetApply) {
      onBudgetApply(selectedBudget)
    }

    // Store the selected budget in localStorage
    localStorage.setItem("selectedBudget", JSON.stringify(selectedBudget))

    // Dispatch a custom event that other components can listen for
    const budgetEvent = new CustomEvent("budgetChanged", {
      detail: { budget: selectedBudget },
    })
    window.dispatchEvent(budgetEvent)

    // Show success message
    if (showMessage) {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }
  }

  // Load previously selected budget from localStorage on component mount
  useEffect(() => {
    const savedBudget = localStorage.getItem("selectedBudget")
    if (savedBudget) {
      try {
        const parsedBudget = JSON.parse(savedBudget)
        // Find the index of the saved budget in our recommendedBudgets array
        const budgetIndex = recommendedBudgets.findIndex((b) => b.name === parsedBudget.name)
        if (budgetIndex !== -1) {
          setSelectedBudgetIndex(budgetIndex)

          // Notify parent component
          if (onBudgetApply) {
            onBudgetApply(recommendedBudgets[budgetIndex])
          }
        }
      } catch (e) {
        console.error("Error parsing saved budget:", e)
      }
    }
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-md flex items-center z-50">
          <Check className="h-5 w-5 mr-2" />
          <span>Budget applied successfully!</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="font-semibold text-lg text-slate-600">Recommended Budgets</h3>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <label htmlFor="income" className="text-sm text-slate-600">
            Monthly Income:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-500">₵</span>
            <input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="pl-7 pr-3 py-1.5 border border-slate-200 rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-md font-medium text-slate-900 mb-3">50/30/20 Rule</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-800 font-medium">Needs (50%)</p>
              <p className="text-slate-900 font-bold">₵ {needs.toLocaleString()}</p>
            </div>
            <p className="text-xs text-slate-600">Housing, food, utilities, transportation, healthcare</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-800 font-medium">Wants (30%)</p>
              <p className="text-slate-900 font-bold">₵ {wants.toLocaleString()}</p>
            </div>
            <p className="text-xs text-slate-600">Entertainment, dining out, shopping, subscriptions</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-800 font-medium">Savings (20%)</p>
              <p className="text-slate-900 font-bold">₵ {savings.toLocaleString()}</p>
            </div>
            <p className="text-xs text-slate-600">Emergency fund, retirement, investments, debt repayment</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedBudgets.map((budget, index) => (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden transition-all ${
              selectedBudgetIndex === index ? "border-blue-500 shadow-md" : "border-slate-200"
            }`}
          >
            <div
              className={`p-4 border-b ${
                selectedBudgetIndex === index ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-slate-900">{budget.name}</h4>
                {selectedBudgetIndex === index && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600">{budget.description}</p>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {budget.categories.map((category, catIndex) => (
                  <div key={catIndex} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-slate-700">{category.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900">₵ {category.amount.toLocaleString()}</p>
                      <p className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                        {category.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => applyBudget(index)}
                  className={`w-full py-2 font-medium rounded-lg text-sm transition-colors ${
                    selectedBudgetIndex === index
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-50 hover:bg-blue-100 text-blue-700"
                  }`}
                >
                  {selectedBudgetIndex === index ? "Budget Applied" : "Apply This Budget"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Link href="/budget/all">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 mt-8">
            All Budgets
          </button>
        </Link>
      </div>
    </div>
  )
}
