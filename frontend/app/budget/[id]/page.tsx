"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Trash2, Copy, CheckCircle, PieChart, Download, Share2, Plus } from "lucide-react"
import Navbar from "./../../components/Navigation/navigation"
import Sidebar from "./../../components/sidebar/sidebar"
import Footer from "./../../components/footer/footer"

// Define budget category interface
interface BudgetCategory {
  name: string
  percentage: number
  amount: number
  spent?: number
}

// Define budget interface
interface Budget {
  id: string
  name: string
  description: string
  categories: BudgetCategory[]
  isActive?: boolean
  isCustom?: boolean
  createdAt: Date
  lastModified: Date
  totalAmount?: number
}

const BudgetDetailPage = () => {
  const router = useRouter()
  const params = useParams()
  const budgetId = params.id as string
  const [budget, setBudget] = useState<Budget | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [totalSpent, setTotalSpent] = useState(0)
  const [totalBudget, setTotalBudget] = useState(0)

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    // This simulates fetching budget data based on the ID
    const fetchBudget = () => {
      const budgets: Budget[] = [
        {
          id: "conservative",
          name: "Conservative Budget",
          description: "Focuses on saving and essential expenses",
          categories: [
            { name: "Housing", percentage: 25, amount: 1250, spent: 1100 },
            { name: "Food", percentage: 15, amount: 750, spent: 680 },
            { name: "Transportation", percentage: 10, amount: 500, spent: 450 },
            { name: "Utilities", percentage: 10, amount: 500, spent: 480 },
            { name: "Healthcare", percentage: 10, amount: 500, spent: 320 },
            { name: "Savings", percentage: 20, amount: 1000, spent: 1000 },
            { name: "Entertainment", percentage: 5, amount: 250, spent: 300 },
            { name: "Other", percentage: 5, amount: 250, spent: 200 },
          ],
          isActive: true,
          totalAmount: 5000,
          createdAt: new Date(2025, 0, 15),
          lastModified: new Date(2023, 0, 15),
        },
        {
          id: "balanced",
          name: "Balanced Budget",
          description: "Equal focus on needs, wants, and future goals",
          categories: [
            { name: "Housing", percentage: 30, amount: 1500, spent: 1500 },
            { name: "Food", percentage: 12, amount: 600, spent: 580 },
            { name: "Transportation", percentage: 10, amount: 500, spent: 470 },
            { name: "Utilities", percentage: 8, amount: 400, spent: 390 },
            { name: "Healthcare", percentage: 5, amount: 250, spent: 180 },
            { name: "Savings", percentage: 15, amount: 750, spent: 750 },
            { name: "Entertainment", percentage: 10, amount: 500, spent: 620 },
            { name: "Other", percentage: 10, amount: 500, spent: 450 },
          ],
          isActive: false,
          totalAmount: 5000,
          createdAt: new Date(2025, 0, 15),
          lastModified: new Date(2025, 0, 15),
        },
        {
          id: "aggressive",
          name: "Aggressive Savings",
          description: "Prioritizes saving for future goals",
          categories: [
            { name: "Housing", percentage: 25, amount: 1250, spent: 1250 },
            { name: "Food", percentage: 10, amount: 500, spent: 480 },
            { name: "Transportation", percentage: 8, amount: 400, spent: 380 },
            { name: "Utilities", percentage: 7, amount: 350, spent: 340 },
            { name: "Healthcare", percentage: 5, amount: 250, spent: 220 },
            { name: "Savings", percentage: 30, amount: 1500, spent: 1500 },
            { name: "Entertainment", percentage: 5, amount: 250, spent: 200 },
            { name: "Other", percentage: 10, amount: 500, spent: 450 },
          ],
          isActive: false,
          totalAmount: 5000,
          createdAt: new Date(2025, 0, 15),
          lastModified: new Date(2025, 0, 15),
        },
        {
          id: "custom-1",
          name: "My Custom Budget",
          description: "Personalized budget for my specific needs",
          categories: [
            { name: "Housing", percentage: 28, amount: 1400, spent: 1400 },
            { name: "Food", percentage: 15, amount: 750, spent: 720 },
            { name: "Transportation", percentage: 12, amount: 600, spent: 550 },
            { name: "Utilities", percentage: 8, amount: 400, spent: 380 },
            { name: "Healthcare", percentage: 7, amount: 350, spent: 300 },
            { name: "Savings", percentage: 18, amount: 900, spent: 900 },
            { name: "Entertainment", percentage: 7, amount: 350, spent: 420 },
            { name: "Other", percentage: 5, amount: 250, spent: 230 },
          ],
          isActive: false,
          isCustom: true,
          totalAmount: 5000,
          createdAt: new Date(2025, 2, 10),
          lastModified: new Date(2025, 3, 5),
        },
        {
          id: "custom-2",
          name: "Travel Savings Budget",
          description: "Modified budget with focus on travel savings",
          categories: [
            { name: "Housing", percentage: 25, amount: 1250, spent: 1250 },
            { name: "Food", percentage: 12, amount: 600, spent: 580 },
            { name: "Transportation", percentage: 8, amount: 400, spent: 380 },
            { name: "Utilities", percentage: 7, amount: 350, spent: 340 },
            { name: "Healthcare", percentage: 5, amount: 250, spent: 230 },
            { name: "Travel Savings", percentage: 25, amount: 1250, spent: 1250 },
            { name: "General Savings", percentage: 10, amount: 500, spent: 500 },
            { name: "Entertainment", percentage: 5, amount: 250, spent: 280 },
            { name: "Other", percentage: 3, amount: 150, spent: 140 },
          ],
          isActive: false,
          isCustom: true,
          totalAmount: 5000,
          createdAt: new Date(2025, 4, 20),
          lastModified: new Date(2025, 4, 20),
        },
      ]

      const foundBudget = budgets.find((b) => b.id === budgetId)
      if (foundBudget) {
        setBudget(foundBudget)
        setIsActive(foundBudget.isActive || false)

        // Calculate total spent
        const spent = foundBudget.categories.reduce((sum, cat) => sum + (cat.spent || 0), 0)
        setTotalSpent(spent)
        setTotalBudget(foundBudget.totalAmount || foundBudget.categories.reduce((sum, cat) => sum + cat.amount, 0))
      } else {
        // Handle budget not found
        router.push("/budget/all")
      }
    }

    fetchBudget()
  }, [budgetId, router])

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Function to format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Function to calculate percentage spent
  const calculatePercentageSpent = (spent = 0, amount: number) => {
    return Math.min(Math.round((spent / amount) * 100), 100)
  }

  // Function to get progress color based on percentage spent
  const getProgressColor = (spent = 0, amount: number) => {
    const percentage = (spent / amount) * 100
    if (percentage > 100) return "bg-red-500"
    if (percentage > 85) return "bg-amber-500"
    return "bg-emerald-500"
  }

  // Function to set this budget as active
  const setAsActiveBudget = () => {
    // In a real app, this would update the database
    setIsActive(true)
    // Show success message or notification
  }

  if (!budget) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-16 flex flex-col min-h-screen">
          <Sidebar />
          <div className="md:ml-72 md:mx-8 mx-4 pb-16 flex items-center justify-center h-full">
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-slate-900">Loading budget...</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-16 flex flex-col min-h-screen">
        <Sidebar />

        <div className="md:ml-72 md:mx-8 mx-4 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 mb-6">
            <div className="flex items-center">
              <Link href="/budget/all" className="mr-4">
                <button className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                  <ArrowLeft className="h-5 w-5 text-slate-600" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{budget.name}</h1>
                <p className="text-slate-500 mt-1">{budget.description}</p>
              </div>
            </div>

            <div className="flex items-center mt-4 md:mt-0 space-x-3">
              {!isActive && (
                <button
                  onClick={setAsActiveBudget}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-sm text-slate-700"
                >
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Set as Active</span>
                </button>
              )}

              <Link href={`/budget/edit/${budgetId}`}>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-sm text-slate-700">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </Link>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Expense</span>
              </button>
            </div>
          </div>

          {/* Budget Overview Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Budget Overview</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-500">Total Budget</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(totalBudget)}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-500">Total Spent</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(totalSpent)}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-500">Remaining</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(totalBudget - totalSpent)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-500">Budget Progress</span>
                    <span className="text-sm font-medium text-slate-900">
                      {calculatePercentageSpent(totalSpent, totalBudget)}%
                    </span>
                  </div>
                  <progress value={calculatePercentageSpent(totalSpent, totalBudget)} max={100} className="w-full h-2"></progress>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Budget Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="text-sm font-medium">
                    {isActive ? (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Active</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-full">Inactive</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Type</span>
                  <span className="text-sm font-medium">
                    {budget.isCustom ? (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-full">Custom</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-full">Preset</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Categories</span>
                  <span className="text-sm font-medium text-slate-900">{budget.categories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Created</span>
                  <span className="text-sm font-medium text-slate-900">{formatDate(budget.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Last Modified</span>
                  <span className="text-sm font-medium text-slate-900">{formatDate(budget.lastModified)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button className="flex items-center w-full gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-sm text-slate-700">
                  <Download className="h-4 w-4 text-slate-600" />
                  <span>Export Budget</span>
                </button>
                <button className="flex items-center w-full gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-sm text-slate-700">
                  <Share2 className="h-4 w-4 text-slate-600" />
                  <span>Share Budget</span>
                </button>
                <button className="flex items-center w-full gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-sm text-slate-700">
                  <Copy className="h-4 w-4 text-slate-600" />
                  <span>Duplicate Budget</span>
                </button>
                {budget.isCustom && (
                  <button className="flex items-center w-full gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-md hover:bg-red-100 transition-colors text-sm text-red-600">
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Budget</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Budget Categories */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Budget Categories</h2>
              <Link href={`/budget/categories/${budgetId}`}>
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Manage Categories
                </button>
              </Link>
            </div>

            <div className="divide-y divide-slate-200">
              {budget.categories.map((category, index) => (
                <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <PieChart className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">{category.name}</h3>
                        <div className="flex items-center text-xs text-slate-500 mt-0.5">
                          <span>{category.percentage}% of total budget</span>
                          <span className="mx-2">•</span>
                          <span>{formatCurrency(category.amount)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <div className="font-medium text-slate-900">
                        {formatCurrency(category.spent || 0)} / {formatCurrency(category.amount)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {calculatePercentageSpent(category.spent, category.amount)}% spent
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(category.spent, category.amount)}`}
                      style={{ width: `${calculatePercentageSpent(category.spent, category.amount)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
              <Link href="/transactions">
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  View All Transactions
                </button>
              </Link>
            </div>

            <div className="p-6 text-center">
              <p className="text-slate-500">Transaction history will be displayed here.</p>
              <p className="text-sm text-slate-400 mt-1">Connect your accounts to track expenses automatically.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default BudgetDetailPage
