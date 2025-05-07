"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Equal, RotateCw, Settings, ArrowDown, ArrowUp, AlertCircle, TrendingUp } from "lucide-react"
import type React from "react"
import Card from "./../components/card/Card"
import Footer from "./../components/footer/footer"
import Link from "next/link"

// Transaction type definition
type Transaction = {
  id: string
  description: string
  amount: number
  date: string
  type: "credit" | "debit"
  category: string
  status: "completed" | "pending"
}

// Insight type definition
type Insight = {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
}

// Account type definition
type Account = {
  id: string
  bankName: string
  accountType: string
  accountNumber: string
  availableBalance: number
  totalBalance: number
  pendingTransactions: number
  lastUpdated: string
  isActive: boolean
}

const Accounts = () => {
  const router = useRouter()

  // Fake accounts data
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "ecobank",
      bankName: "Ecobank",
      accountType: "Current Account",
      accountNumber: "****5678",
      availableBalance: 4250.75,
      totalBalance: 4500.0,
      pendingTransactions: 249.25,
      lastUpdated: "5 mins ago",
      isActive: true,
    },
    {
      id: "mtn",
      bankName: "MTN Mobile Money",
      accountType: "Personal Wallet",
      accountNumber: "****9012",
      availableBalance: 1500.0,
      totalBalance: 1500.0,
      pendingTransactions: 0,
      lastUpdated: "10 mins ago",
      isActive: false,
    },
  ])

  // Get active account
  const activeAccount = accounts.find((account) => account.isActive) || accounts[0]

  // Handle account selection
  const handleAccountSelect = (accountId: string) => {
    setAccounts(
      accounts.map((account) => ({
        ...account,
        isActive: account.id === accountId,
      })),
    )
  }

  const AccountNavigation = () => {
    router.push("/ManageAccounts")
  }

  // Fake pending transactions
  const pendingTransactions: Transaction[] = [
    {
      id: "pt1",
      description: "Uber Ride",
      amount: 45.5,
      date: "Today",
      type: "debit",
      category: "Transportation",
      status: "pending",
    },
    {
      id: "pt2",
      description: "Grocery Store",
      amount: 125.75,
      date: "Today",
      type: "debit",
      category: "Food",
      status: "pending",
    },
    {
      id: "pt3",
      description: "Mobile Phone Bill",
      amount: 78.0,
      date: "Yesterday",
      type: "debit",
      category: "Utilities",
      status: "pending",
    },
  ]

  // Fake recent transactions
  const recentTransactions: Transaction[] = [
    {
      id: "rt1",
      description: "Salary Deposit",
      amount: 3500.0,
      date: "Jun 1, 2023",
      type: "credit",
      category: "Income",
      status: "completed",
    },
    {
      id: "rt2",
      description: "Rent Payment",
      amount: 850.0,
      date: "May 30, 2023",
      type: "debit",
      category: "Housing",
      status: "completed",
    },
    {
      id: "rt3",
      description: "Electricity Bill",
      amount: 120.5,
      date: "May 28, 2023",
      type: "debit",
      category: "Utilities",
      status: "completed",
    },
    {
      id: "rt4",
      description: "Restaurant",
      amount: 85.25,
      date: "May 26, 2023",
      type: "debit",
      category: "Food",
      status: "completed",
    },
    {
      id: "rt5",
      description: "Online Transfer",
      amount: 200.0,
      date: "May 25, 2023",
      type: "credit",
      category: "Transfer",
      status: "completed",
    },
  ]

  // Fake insights
  const insights: Insight[] = [
    {
      id: "i1",
      title: "Spending Alert",
      description: "Your spending on food is 20% higher than last month. Consider reviewing your dining habits.",
      icon: AlertCircle,
      color: "text-amber-500",
    },
    {
      id: "i2",
      title: "Balance Trend",
      description: "Your account balance has increased by 15% compared to the previous month. Keep up the good work!",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
  ]

  // Handle action buttons
  const handleDeposit = () => {
    router.push(`/deposit?accountId=${activeAccount.id}`)
  }

  const handleWithdraw = () => {
    router.push(`/withdraw?accountId=${activeAccount.id}`)
  }

  const handleTransfer = () => {
    router.push(`/transfer?accountId=${activeAccount.id}`)
  }

  return (
    <div className="pt-16 flex flex-col min-h-screen bg-slate-50">
      <div className="hidden md:flex md:shadow-lg md:h-screen md:flex-col md:fixed md:top-[70px] md:w-64 md:left-0 h-screen overflow-y-auto bg-white">
        <h2 className="text-lg font-bold text-slate-900 mx-10 mt-6 mb-3">Accounts Overview</h2>

        <div className="flex flex-col rounded-lg p-4 shadow-lg bg-slate-50 mx-3">
          <div className="flex justify-between">
            <p className="text-slate-900 font-semibold">Positive</p>
            <p className="text-slate-900">₵ 6,000</p>
          </div>

          <div className="flex justify-between">
            <p className="text-slate-900 font-semibold">Negative</p>
            <p className="text-slate-900">₵ 3,000</p>
          </div>

          <div className="flex justify-between mt-2 pt-2 border-t border-slate-200">
            <p className="text-slate-900 font-semibold flex items-center">
              <Equal className="h-4 w-4 mr-1 text-slate-700" />
              Total
            </p>
            <p className="text-slate-900 font-bold">₵ 3,000</p>
          </div>
        </div>

        <div className="w-2/3 h-[2px] bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 shadow-lg my-6 mx-auto"></div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mx-10 mt-6 mb-3">My Accounts</h2>

          <div className="mx-3 mb-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`p-3 rounded-lg ${
                  account.isActive ? "bg-blue-50 border border-blue-100" : "bg-white border border-slate-200"
                } mb-2 cursor-pointer transition-all hover:border-blue-200`}
                onClick={() => handleAccountSelect(account.id)}
              >
                <p className={`font-medium ${account.isActive ? "text-blue-800" : "text-slate-800"}`}>
                  {account.bankName}
                </p>
                <p className="text-sm text-slate-600">{account.accountType}</p>
                <p className="font-bold text-slate-900 mt-1">
                  ₵{" "}
                  {account.totalBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </div>

          <button
            className="p-2 text-lg mx-auto w-fit flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
            onClick={AccountNavigation}
          >
            Manage Accounts
          </button>
        </div>

        <div className="fixed bottom-4 w-64">
          <p className="flex items-center gap-2 justify-center text-slate-900 font-semibold cursor-pointer hover:text-blue-600 transition-colors">
            <Settings className="w-5 h-5" />
            Account Settings
          </p>
        </div>
      </div>

      <div className="md:mx-8 md:ml-72 mx-8 px-4">
        <h1 className="text-3xl font-bold text-slate-900 mt-6">{activeAccount.accountType}</h1>
        <div className="flex justify-between">
          <p className="text-green-600 italic font-semibold">{activeAccount.bankName}</p>
          <p className="text-slate-900 flex items-center gap-2">
            <RotateCw className="w-4 h-4" /> Updated {activeAccount.lastUpdated}
          </p>
        </div>
        <p className="text-lg font-bold text-slate-900 mt-6 mb-4">Overview</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Card title="Available Balance">
            <div className="flex items-center">
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  ₵{" "}
                  {activeAccount.availableBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-slate-500">Available for withdrawal</p>
              </div>
            </div>
          </Card>
          <Card title="Total Balance">
            <div className="flex items-center">
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  ₵{" "}
                  {activeAccount.totalBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-slate-500">Including pending transactions</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex w-full">
          <Card title="Pending Transactions" className="mt-8 w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{transaction.description}</td>
                      <td className="px-4 py-3 text-slate-600">{transaction.date}</td>
                      <td className="px-4 py-3 text-slate-600">{transaction.category}</td>
                      <td
                        className={`px-4 py-3 text-right font-medium ${
                          transaction.type === "credit" ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}₵{" "}
                        {transaction.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-slate-900">
                    <td className="px-4 py-3" colSpan={3}>
                      Total Pending
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₵{" "}
                      {activeAccount.pendingTransactions.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </div>

        <div className="flex w-full">
          <Card title="Recent Transactions" className="mt-8 w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{transaction.description}</td>
                      <td className="px-4 py-3 text-slate-600">{transaction.date}</td>
                      <td className="px-4 py-3 text-slate-600">{transaction.category}</td>
                      <td
                        className={`px-4 py-3 text-right font-medium ${
                          transaction.type === "credit" ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}₵{" "}
                        {transaction.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-center">
                <Link href="/transactions">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View All Transactions
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <p className="text-lg font-bold text-slate-900 mt-8 mb-4">Insights</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
          {insights.map((insight) => (
            <Card key={insight.id}>
              <div className="flex items-start">
                <div
                  className={`p-2 rounded-full mr-3 ${
                    insight.color === "text-amber-500" ? "bg-amber-100" : "bg-emerald-100"
                  }`}
                >
                  <insight.icon className={`h-5 w-5 ${insight.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{insight.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center"
            onClick={handleDeposit}
          >
            <ArrowDown className="h-4 w-4 mr-2" />
            Deposit
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center"
            onClick={handleWithdraw}
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Withdraw
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center"
            onClick={handleTransfer}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Transfer
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Accounts