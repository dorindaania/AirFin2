import BudgetOverview from "../components/budget/budget-overview"
import BudgetAllocation from "../components/budget/budget-allocation"
import BudgetProgress from "../components/budget/budget-progress"
import RecommendedBudgets from "../components/budget/recommended-budgets"
import BudgetHistory from "../components/budget/budget-history"
import BudgetInsights from "../components/budget/budget-insights"
import BudgetActions from "../components/budget/budget-actions"
import Navbar from "../components/Navigation/navigation"
import Sidebar from "../components/sidebar/sidebar"
import Footer from "../components/footer/footer"
import Link from "next/link"

export default function Budget() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-16 flex flex-col min-h-screen">
        <Sidebar />

        <div className="md:ml-72 md:mx-8 mx-4 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 mb-6">
            <h1 className="text-3xl text-slate-900 font-bold">Budget Management</h1>
            <div className="mt-4 md:mt-0">
              <Link href="/budget/create">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Create New Budget
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Budget Summary */}
            <div className="col-span-full">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
                  <path d="M12 18v2" />
                  <path d="M12 6V4" />
                </svg>
                <h2 className="text-xl font-bold text-slate-900">Budget Summary</h2>
              </div>
              <BudgetOverview />
            </div>

            {/* Budget Allocation */}
            <div className="col-span-full md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
                <h2 className="text-xl font-bold text-slate-900">Budget Allocation</h2>
              </div>
              <BudgetAllocation />
            </div>

            {/* Budget Progress */}
            <div className="col-span-full md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <h2 className="text-xl font-bold text-slate-900">Budget Progress</h2>
              </div>
              <BudgetProgress />
            </div>

            {/* Recommended Budgets */}
            <div className="col-span-full mt-10">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
                <h2 className="text-xl font-bold text-slate-900">Recommended Budgets</h2>
              </div>
              <RecommendedBudgets />
              
            </div>

            {/* Budget History */}
            <div className="col-span-full md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                <h2 className="text-xl font-bold text-slate-900">Budget History</h2>
              </div>
              <BudgetHistory />
            </div>

            {/* Budget Insights */}
            <div className="col-span-full md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <h2 className="text-xl font-bold text-slate-900">Budget Insights</h2>
              </div>
              <BudgetInsights />
            </div>

            {/* Quick Actions */}
            <div className="col-span-full mt-10">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                <h2 className="text-xl font-bold text-slate-900">Budget Actions</h2>
              </div>
              <BudgetActions />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}




