"use client"

import Card from "./components/card/Card"
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import Footer from "./components/footer/footer"
import Sidebar from "./components/sidebar/sidebar"
import IncomeExpenseChart from "./components/charts/IncomeExpenseChart"
import SpendingCategoryChart from "./components/charts/SpendingCategoryChart"
import BudgetProgressChart from "./components/charts/BudgetProgressChart"
import TransactionList from "./components/transactionList/TransactionList"
import SavingsGoalChart from "./components/charts/SavingsGoalChart"
import MonthlySpendingChart from "./components/charts/MonthlySpendingChart"
import InsightCard from "./components/insights/InsightCard"
import QuickAction from "./components/quick-actions/QuickAction"

export default function Home() {
  // Fake data for overview cards
  const overviewData = {
    totalBalance: 7500,
    income: 5200,
    expenses: 3700,
    savings: 1500,
  }

  // Fake data for insights
  const insights = [
    {
      id: 1,
      title: "Spending Alert",
      description: "Your food expenses are 15% higher than last month. Consider reviewing your dining habits.",
      icon: AlertCircle,
      color: "text-amber-500",
    },
    {
      id: 2,
      title: "Savings Opportunity",
      description: "You could save ₵350 monthly by reducing subscription services.",
      icon: DollarSign,
      color: "text-emerald-500",
    },
    {
      id: 3,
      title: "Investment Tip",
      description: "Based on your savings rate, you could start investing in low-risk funds.",
      icon: TrendingUp,
      color: "text-blue-500",
    },
  ]

  // Quick actions
  const quickActions = [
    { id: 1, title: "Add Income", icon: ArrowDown, color: "bg-emerald-100 text-emerald-600" },
    { id: 2, title: "Add Expense", icon: ArrowUp, color: "bg-red-100 text-red-600" },
    { id: 3, title: "Transfer Money", icon: TrendingUp, color: "bg-blue-100 text-blue-600" },
    { id: 4, title: "Set Budget", icon: DollarSign, color: "bg-purple-100 text-purple-600" },
  ]

  return (
    <div className="pt-16 flex flex-col min-h-screen bg-slate-50">
      <Sidebar />

      <div className="md:ml-72 md:mx-8 mx-4">
        <p className="text-4xl text-slate-900 font-bold mt-8 mb-3">Hi, Thierry 👋</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          <div className="col-span-full text-lg text-left font-bold mb-3 text-slate-900">Income and Expenses</div>
          <Card className="col-span-full md:w-3/4 mx-auto">
            <IncomeExpenseChart />
          </Card>

          <div className="col-span-full text-lg text-left font-bold mb-3 text-slate-900">Overview</div>
          <div className="flex flex-col gap-4 row-span-3">
            <Card title="Total Balance">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600 mr-2" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">₵ {overviewData.totalBalance.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">Available Balance</p>
                </div>
              </div>
            </Card>
            <Card title="Income">
              <div className="flex items-center">
                <ArrowDown className="h-8 w-8 text-emerald-600 mr-2" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">₵ {overviewData.income.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">This Month</p>
                </div>
                <span className="ml-auto text-emerald-600 text-sm font-medium">+12%</span>
              </div>
            </Card>
            <Card title="Expenses">
              <div className="flex items-center">
                <ArrowUp className="h-8 w-8 text-red-600 mr-2" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">₵ {overviewData.expenses.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">This Month</p>
                </div>
                <span className="ml-auto text-red-600 text-sm font-medium">+8%</span>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6 row-span-3">
            <Card className="h-1/2" title="Budget Progress">
              <BudgetProgressChart />
            </Card>
            <Card className="h-1/2" title="Savings Goal">
              <SavingsGoalChart />
            </Card>
          </div>

          <Card className="row-span-3" title="Recent Transactions">
            <TransactionList />
          </Card>

          <div className="col-span-full text-lg text-left font-bold mb-3 text-slate-900">Spending Trends</div>
          <div className="col-span-full gap-6 flex flex-col md:flex-row">
            <Card className="w-full md:w-1/2" title="Spending by Category">
              <SpendingCategoryChart />
            </Card>
            <Card className="w-full md:w-1/2" title="Monthly Spending">
              <MonthlySpendingChart />
            </Card>
          </div>

          <div className="col-span-full text-lg text-left font-bold mb-3 text-slate-900">Insights</div>
          <div className="col-span-full">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    title={insight.title}
                    description={insight.description}
                    icon={insight.icon}
                    color={insight.color}
                  />
                ))}
              </div>
            </Card>
          </div>

          <div className="col-span-full text-lg text-left font-bold mb-3 text-slate-900">Quick Actions</div>
          <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action) => (
              <QuickAction key={action.id} title={action.title} icon={action.icon} color={action.color} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
