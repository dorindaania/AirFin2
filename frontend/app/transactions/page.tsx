"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Filter, Search } from "lucide-react"
import { format } from "date-fns"

import Card from "../components/card/Card"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"
import { useRouter } from 'next/navigation';

export default function Transactions() {
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [transactionType, setTransactionType] = useState("all") // all, income, expense
  const [dateRange, setDateRange] = useState("all") // all, this-week, this-month, last-month
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc") // date-desc, date-asc, amount-desc, amount-asc
  const [showFilters, setShowFilters] = useState(false)

  const itemsPerPage = 10

  const router = useRouter();


  // Sample transaction data
  const allTransactions = [
    {
      id: 1,
      date: "2023-05-15",
      description: "Salary Deposit",
      amount: 3500,
      type: "income",
      category: "Salary",
      account: "Main Account",
    },
    {
      id: 2,
      date: "2023-05-12",
      description: "Grocery Shopping",
      amount: 120,
      type: "expense",
      category: "Food",
      account: "Main Account",
    },
    {
      id: 3,
      date: "2023-05-10",
      description: "Savings Contribution",
      amount: 500,
      type: "transfer",
      category: "Savings",
      account: "Savings Account",
    },
    {
      id: 4,
      date: "2023-05-08",
      description: "Electricity Bill",
      amount: 85,
      type: "expense",
      category: "Utilities",
      account: "Main Account",
    },
    {
      id: 5,
      date: "2023-05-05",
      description: "Freelance Payment",
      amount: 750,
      type: "income",
      category: "Freelance",
      account: "Business Account",
    },
    {
      id: 6,
      date: "2023-05-03",
      description: "Restaurant Dinner",
      amount: 65,
      type: "expense",
      category: "Dining",
      account: "Main Account",
    },
    {
      id: 7,
      date: "2023-05-01",
      description: "Monthly Rent",
      amount: 850,
      type: "expense",
      category: "Housing",
      account: "Main Account",
    },
    {
      id: 8,
      date: "2023-04-28",
      description: "Bonus Payment",
      amount: 1000,
      type: "income",
      category: "Bonus",
      account: "Main Account",
    },
    {
      id: 9,
      date: "2023-04-25",
      description: "Internet Bill",
      amount: 60,
      type: "expense",
      category: "Utilities",
      account: "Main Account",
    },
    {
      id: 10,
      date: "2023-04-22",
      description: "Savings Deposit",
      amount: 300,
      type: "transfer",
      category: "Savings",
      account: "Savings Account",
    },
    {
      id: 11,
      date: "2023-04-20",
      description: "Clothing Purchase",
      amount: 120,
      type: "expense",
      category: "Shopping",
      account: "Main Account",
    },
    {
      id: 12,
      date: "2023-04-18",
      description: "Side Project Income",
      amount: 450,
      type: "income",
      category: "Freelance",
      account: "Business Account",
    },
    {
      id: 13,
      date: "2023-04-15",
      description: "Salary Deposit",
      amount: 3500,
      type: "income",
      category: "Salary",
      account: "Main Account",
    },
    {
      id: 14,
      date: "2023-04-12",
      description: "Fuel",
      amount: 70,
      type: "expense",
      category: "Transportation",
      account: "Main Account",
    },
    {
      id: 15,
      date: "2023-04-10",
      description: "Mobile Phone Bill",
      amount: 45,
      type: "expense",
      category: "Utilities",
      account: "Main Account",
    },
  ]

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(allTransactions.map((t) => t.category))]

  // Filter transactions based on current filters
  const filteredTransactions = allTransactions.filter((transaction) => {
    // Filter by search query
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by transaction type
    if (transactionType !== "all" && transaction.type !== transactionType) {
      return false
    }

    // Filter by category
    if (category !== "all" && transaction.category !== category) {
      return false
    }

    // Filter by date range
    if (dateRange !== "all") {
      const transactionDate = new Date(transaction.date)
      const today = new Date()
      const thisWeekStart = new Date(today.setDate(today.getDate() - today.getDay()))
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)

      if (dateRange === "this-week" && transactionDate < thisWeekStart) {
        return false
      } else if (dateRange === "this-month" && transactionDate < thisMonthStart) {
        return false
      } else if (dateRange === "last-month" && (transactionDate < lastMonthStart || transactionDate > lastMonthEnd)) {
        return false
      }
    }

    return true
  })

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date-desc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "date-asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortBy === "amount-desc") {
      return b.amount - a.amount
    } else if (sortBy === "amount-asc") {
      return a.amount - b.amount
    }
    return 0
  })

  // Paginate transactions
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const paginatedTransactions = sortedTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Calculate totals
  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const netAmount = totalIncome - totalExpenses

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, transactionType, dateRange, category, sortBy])

  // Format date for display
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString)
    return format(date, "MMM dd, yyyy")
  }

  return (
    <div className="pt-16 flex flex-col min-h-screen bg-slate-50">
      <Sidebar />

      <div className="md:ml-72 md:mx-8 mx-4">
        <div className="m-3">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-lg text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
      </button>

        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 mb-6">
          <h1 className="text-3xl text-slate-900 font-bold mb-4 md:mb-0">Transaction History</h1>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <Card className="mb-6">
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:items-center mb-4">
              <div className="relative flex-1 mb-4 md:mb-0 md:mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search transactions..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full py-2 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="amount-desc">Highest Amount</option>
                  <option value="amount-asc">Lowest Amount</option>
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Type</label>
                    <select
                      value={transactionType}
                      onChange={(e) => setTransactionType(e.target.value)}
                      className="block w-full py-2 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                      <option value="transfer">Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="block w-full py-2 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Time</option>
                      <option value="this-week">This Week</option>
                      <option value="this-month">This Month</option>
                      <option value="last-month">Last Month</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full py-2 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Total Income</p>
                <p className="text-2xl font-bold text-slate-900">₵ {totalIncome.toLocaleString()}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-600 font-medium">Total Expenses</p>
                <p className="text-2xl font-bold text-slate-900">₵ {totalExpenses.toLocaleString()}</p>
              </div>

              <div className={`${netAmount >= 0 ? "bg-emerald-50" : "bg-amber-50"} p-4 rounded-lg`}>
                <p className={`text-sm ${netAmount >= 0 ? "text-emerald-600" : "text-amber-600"} font-medium`}>
                  Net Amount
                </p>
                <p className="text-2xl font-bold text-slate-900">₵ {netAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Account
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{transaction.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{transaction.account}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                          <span
                            className={`
                            ${transaction.type === "income" ? "text-emerald-600" : ""}
                            ${transaction.type === "expense" ? "text-red-600" : ""}
                            ${transaction.type === "transfer" ? "text-blue-600" : ""}
                          `}
                          >
                            {transaction.type === "income" && "+"}
                            {transaction.type === "expense" && "-"}₵ {transaction.amount.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
                        No transactions found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6 mt-4">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-700">
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
                      </span>{" "}
                      of <span className="font-medium">{filteredTransactions.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>

                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNumber

                        if (totalPages <= 5) {
                          pageNumber = i + 1
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i
                        } else {
                          pageNumber = currentPage - 2 + i
                        }

                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNumber
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-slate-300 text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        )
                      })}

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
