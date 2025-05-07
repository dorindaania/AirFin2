"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  CheckCircle,
  Edit,
  Copy,
  Trash2,
  ArrowRight,
  MoreHorizontal,
  Filter,
  PieChart,
  Wallet,
  Plus,
  ArrowLeft,
} from "lucide-react"
import Navbar from "./../../components/Navigation/navigation"
import Sidebar from "./../../components/sidebar/sidebar"
import Footer from "./../../components/footer/footer"

// Define budget category interface
interface BudgetCategory {
  name: string
  percentage: number
  amount: number
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
}

const AllBudgetsPage = () => {
  const router = useRouter()
  const [activeBudgetId, setActiveBudgetId] = useState("balanced") // Default active budget
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<"all" | "custom" | "preset">("all")

  // Generate budget data
  const budgets: Budget[] = [
    {
      id: "conservative",
      name: "Conservative Budget",
      description: "Focuses on saving and essential expenses",
      categories: [
        { name: "Housing", percentage: 25, amount: 1250 },
        { name: "Food", percentage: 15, amount: 750 },
        { name: "Transportation", percentage: 10, amount: 500 },
        { name: "Utilities", percentage: 10, amount: 500 },
        { name: "Healthcare", percentage: 10, amount: 500 },
        { name: "Savings", percentage: 20, amount: 1000 },
        { name: "Entertainment", percentage: 5, amount: 250 },
        { name: "Other", percentage: 5, amount: 250 },
      ],
      isActive: activeBudgetId === "conservative",
      createdAt: new Date(2025, 0, 15),
      lastModified: new Date(2023, 0, 15),
    },
    {
      id: "balanced",
      name: "Balanced Budget",
      description: "Equal focus on needs, wants, and future goals",
      categories: [
        { name: "Housing", percentage: 30, amount: 1500 },
        { name: "Food", percentage: 12, amount: 600 },
        { name: "Transportation", percentage: 10, amount: 500 },
        { name: "Utilities", percentage: 8, amount: 400 },
        { name: "Healthcare", percentage: 5, amount: 250 },
        { name: "Savings", percentage: 15, amount: 750 },
        { name: "Entertainment", percentage: 10, amount: 500 },
        { name: "Other", percentage: 10, amount: 500 },
      ],
      isActive: activeBudgetId === "balanced",
      createdAt: new Date(2025, 0, 15),
      lastModified: new Date(2025, 0, 15),
    },
    {
      id: "aggressive",
      name: "Aggressive Savings",
      description: "Prioritizes saving for future goals",
      categories: [
        { name: "Housing", percentage: 25, amount: 1250 },
        { name: "Food", percentage: 10, amount: 500 },
        { name: "Transportation", percentage: 8, amount: 400 },
        { name: "Utilities", percentage: 7, amount: 350 },
        { name: "Healthcare", percentage: 5, amount: 250 },
        { name: "Savings", percentage: 30, amount: 1500 },
        { name: "Entertainment", percentage: 5, amount: 250 },
        { name: "Other", percentage: 10, amount: 500 },
      ],
      isActive: activeBudgetId === "aggressive",
      createdAt: new Date(2025, 0, 15),
      lastModified: new Date(2025, 0, 15),
    },
    {
      id: "custom-1",
      name: "My Custom Budget",
      description: "Personalized budget for my specific needs",
      categories: [
        { name: "Housing", percentage: 28, amount: 1400 },
        { name: "Food", percentage: 15, amount: 750 },
        { name: "Transportation", percentage: 12, amount: 600 },
        { name: "Utilities", percentage: 8, amount: 400 },
        { name: "Healthcare", percentage: 7, amount: 350 },
        { name: "Savings", percentage: 18, amount: 900 },
        { name: "Entertainment", percentage: 7, amount: 350 },
        { name: "Other", percentage: 5, amount: 250 },
      ],
      isActive: activeBudgetId === "custom-1",
      isCustom: true,
      createdAt: new Date(2025, 2, 10),
      lastModified: new Date(2025, 3, 5),
    },
    {
      id: "custom-2",
      name: "Travel Savings Budget",
      description: "Modified budget with focus on travel savings",
      categories: [
        { name: "Housing", percentage: 25, amount: 1250 },
        { name: "Food", percentage: 12, amount: 600 },
        { name: "Transportation", percentage: 8, amount: 400 },
        { name: "Utilities", percentage: 7, amount: 350 },
        { name: "Healthcare", percentage: 5, amount: 250 },
        { name: "Travel Savings", percentage: 25, amount: 1250 },
        { name: "General Savings", percentage: 10, amount: 500 },
        { name: "Entertainment", percentage: 5, amount: 250 },
        { name: "Other", percentage: 3, amount: 150 },
      ],
      isActive: activeBudgetId === "custom-2",
      isCustom: true,
      createdAt: new Date(2025, 4, 20),
      lastModified: new Date(2025, 4, 20),
    },
  ]

  // Filter budgets based on selected filter
  const filteredBudgets = budgets.filter((budget) => {
    if (filterType === "all") return true
    if (filterType === "custom") return budget.isCustom
    if (filterType === "preset") return !budget.isCustom
    return true
  })

  // Function to set active budget
  const setActiveBudget = (id: string) => {
    setActiveBudgetId(id)
    setShowDropdownId(null)
  }

  // Function to format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Function to calculate total savings percentage
  const calculateSavingsPercentage = (budget: Budget) => {
    return budget.categories
      .filter((cat) => cat.name.toLowerCase().includes("saving"))
      .reduce((sum, cat) => sum + cat.percentage, 0)
  }

  // Function to view budget details
  const viewBudgetDetails = (id: string) => {
    router.push(`/budget/${id}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-16 flex flex-col min-h-screen">
        <Sidebar />

        <div className="md:ml-72 md:mx-8 mx-4 pb-16">
        <div className="m-3">
            <button
                onClick={() => router.back()}
                className="inline-flex items-center text-lg text-blue-600 hover:text-blue-800 mb-6"
                >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
            </button>
        </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">All Budgets</h1>
              <p className="text-slate-500 mt-1">View and manage all your budget plans</p>
            </div>

            <div className="flex items-center mt-4 md:mt-0 space-x-3">
              <div className="relative">
                <button
                  onClick={() =>
                    setFilterType(filterType === "all" ? "custom" : filterType === "custom" ? "preset" : "all")
                  }
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-sm text-slate-700"
                >
                  <Filter className="h-4 w-4" />
                  <span>
                    {filterType === "all"
                      ? "All Budgets"
                      : filterType === "custom"
                        ? "Custom Budgets"
                        : "Preset Budgets"}
                  </span>
                </button>
              </div>

              <Link href="/budget/create">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Create Budget</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Active Budget Summary Card */}
          <div className="bg-white rounded-lg shadow-md border border-blue-200 p-6 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Active Budget: {budgets.find((b) => b.id === activeBudgetId)?.name}
                </h2>
                <p className="text-slate-500 mt-1">{budgets.find((b) => b.id === activeBudgetId)?.description}</p>
              </div>
              <Link href={`/budget/${activeBudgetId}`} className="ml-auto">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <span>View Budget</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* All Budgets List */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">All Budget Plans</h2>
              <span className="text-sm text-slate-500">{filteredBudgets.length} budgets</span>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredBudgets.length === 0 ? (
                <div className="p-8 text-center">
                  <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-1">No budgets found</h3>
                  <p className="text-slate-500">
                    {filterType === "custom"
                      ? "You don't have any custom budgets yet. Create one to get started."
                      : filterType === "preset"
                        ? "No preset budgets available."
                        : "You don't have any budgets yet. Create one to get started."}
                  </p>
                </div>
              ) : (
                filteredBudgets.map((budget) => (
                  <div key={budget.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium text-slate-900">{budget.name}</h3>
                          {budget.isActive && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                              Active
                            </span>
                          )}
                          {budget.isCustom && (
                            <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-800 text-xs rounded-full font-medium">
                              Custom
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{budget.description}</p>
                      </div>

                      <div className="hidden md:flex items-center gap-8 mx-4">
                        <div className="text-center">
                          <div className="text-xs text-slate-500">Categories</div>
                          <div className="font-semibold text-slate-900">{budget.categories.length}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-slate-500">Savings</div>
                          <div className="font-semibold text-slate-900">{calculateSavingsPercentage(budget)}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-slate-500">Created</div>
                          <div className="font-semibold text-slate-900">{formatDate(budget.createdAt)}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewBudgetDetails(budget.id)}
                          className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors text-sm"
                        >
                          View
                        </button>

                        <div className="relative">
                          <button
                            onClick={() => setShowDropdownId(showDropdownId === budget.id ? null : budget.id)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </button>

                          {showDropdownId === budget.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200">
                              <div className="py-1">
                                {!budget.isActive && (
                                  <button
                                    onClick={() => setActiveBudget(budget.id)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                                    Set as Active
                                  </button>
                                )}
                                <Link href={`/budget/edit/${budget.id}`}>
                                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                    <Edit className="h-4 w-4 mr-2 text-slate-600" />
                                    Edit Budget
                                  </button>
                                </Link>
                                <button
                                  onClick={() => {
                                    // Handle duplicate logic
                                    setShowDropdownId(null)
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                >
                                  <Copy className="h-4 w-4 mr-2 text-slate-600" />
                                  Duplicate
                                </button>
                                {budget.isCustom && (
                                  <button
                                    onClick={() => {
                                      // Handle delete logic
                                      setShowDropdownId(null)
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Budget Types Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-6 w-6 text-slate-700" />
              <h2 className="text-xl font-bold text-slate-900">Budget Types</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Conservative Budget</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Focuses on saving and essential expenses. Ideal for building emergency funds and reducing debt.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Needs:</span>
                    <span className="font-medium text-slate-900">70%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Wants:</span>
                    <span className="font-medium text-slate-900">10%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Savings:</span>
                    <span className="font-medium text-slate-900">20%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Balanced Budget</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Equal focus on needs, wants, and future goals. Good for stable income and moderate financial goals.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Needs:</span>
                    <span className="font-medium text-slate-900">65%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Wants:</span>
                    <span className="font-medium text-slate-900">20%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Savings:</span>
                    <span className="font-medium text-slate-900">15%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Aggressive Savings</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Prioritizes saving for future goals. Best for those with specific financial targets or retirement
                  planning.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Needs:</span>
                    <span className="font-medium text-slate-900">55%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Wants:</span>
                    <span className="font-medium text-slate-900">15%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Savings:</span>
                    <span className="font-medium text-slate-900">30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Tips */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Budget Planning Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-1">Follow the 50/30/20 Rule</h3>
                  <p className="text-sm text-slate-600">
                    Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-1">Build an Emergency Fund</h3>
                  <p className="text-sm text-slate-600">
                    Aim to save 3-6 months of essential expenses in an easily accessible account.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-1">Review and Adjust Regularly</h3>
                  <p className="text-sm text-slate-600">
                    Review your budget monthly and make adjustments as your income and expenses change.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-1">Prioritize Debt Repayment</h3>
                  <p className="text-sm text-slate-600">
                    Allocate a portion of your budget to paying off high-interest debt as quickly as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AllBudgetsPage
