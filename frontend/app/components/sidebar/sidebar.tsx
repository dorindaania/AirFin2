"use client"
import { Settings, Home, CreditCard, PieChart, Wallet, TrendingUp, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function Sidebar() {
  const router = useRouter();

  const AccountNavigation = () => {
    router.push("/ManageAccounts");
  };
  return (
    <div className="hidden md:flex md:shadow-md md:h-screen md:flex-col md:fixed md:top-[70px] md:w-64 md:left-0 h-screen overflow-y-auto bg-white border-r border-slate-100">
      <div className="p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Financial Snapshot</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 shadow-sm">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <p className="text-slate-900 font-semibold">Net Worth</p>
              <p className="text-slate-900 font-bold">₵ 4,500</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-slate-900 font-bold border-b border-slate-200 pb-1">Assets</div>
            <div className="flex justify-between">
              <p className="text-slate-700">Savings</p>
              <p className="text-slate-900 font-medium">₵ 3,000</p>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-700">MoMo</p>
              <p className="text-slate-900 font-medium">₵ 2,000</p>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-700">Cash</p>
              <p className="text-slate-900 font-medium">₵ 2,500</p>
            </div>

            <div className="w-full h-[1px] bg-slate-200 my-3"></div>

            <div className="text-slate-900 font-bold border-b border-slate-200 pb-1">Liabilities</div>

            <div className="flex justify-between">
              <p className="text-slate-700">Loans</p>
              <p className="text-red-600 font-medium">-₵ 2,000</p>
            </div>

            <div className="flex justify-between">
              <p className="text-slate-700">Subscriptions</p>
              <p className="text-red-600 font-medium">-₵ 1,000</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
                <h2 className='text-lg font-bold text-slate-900 mx-10 mt-6 mb-3'>My Accounts</h2>

                <button className='p-2 text-lg  mx-auto w-fit flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md' onClick={AccountNavigation}>Manage Accounts</button>

            </div>



    </div>
  )
}

