"use client"

import { useRouter } from "next/navigation"
import type React from "react"
import type { LucideIcon } from "lucide-react"

interface QuickActionProps {
  title: string
  icon: LucideIcon
  color: string
}

const QuickAction: React.FC<QuickActionProps> = ({ title, icon: Icon, color }) => {
  const router = useRouter()

  const handleClick = () => {
    // Map the action title to the corresponding route
    const routes = {
      "Add Income": "/add-income",
      "Add Expense": "/add-expense",
      "Transfer Money": "/transfer-money",
      "Set Budget": "/budget/create",
    }

    const route = routes[title as keyof typeof routes]
    if (route) {
      router.push(route)
    }
  }

  return (
    <button
      className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div className={`p-3 rounded-full mb-2 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium text-slate-900">{title}</span>
    </button>
  )
}

export default QuickAction
