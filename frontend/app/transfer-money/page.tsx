"use client"

import { useState } from "react"
import { ArrowLeft, ArrowLeftRight, Check, DollarSign, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

import Card from "../components/card/Card"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"

export default function TransferMoney() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Sample accounts
  const accounts = [
    { id: "main", name: "Main Account", balance: 5000 },
    { id: "savings", name: "Savings Account", balance: 2500 },
    { id: "business", name: "Business Account", balance: 3000 },
  ]

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }, 1500)
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
        <div className="flex items-center mt-8 mb-6">
          <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl text-slate-900 font-bold">Transfer Money</h1>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          {success ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Transfer Successful!</h2>
                <p className="text-slate-600 mb-4">
                  ₵{amount} has been transferred from{" "}
                  {accounts.find((a) => a.id === fromAccount)?.name || "your account"} to{" "}
                  {accounts.find((a) => a.id === toAccount)?.name || "the destination account"}.
                </p>
                <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
              </div>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Amount</h2>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl font-medium"
                      placeholder="0.00"
                      required
                      min="1"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-500">GHS</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="mb-6">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Transfer Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fromAccount" className="block text-sm font-medium text-slate-700 mb-1">
                        From Account
                      </label>
                      <select
                        id="fromAccount"
                        value={fromAccount}
                        onChange={(e) => {
                          setFromAccount(e.target.value)
                          // Reset toAccount if it's the same as fromAccount
                          if (e.target.value === toAccount) {
                            setToAccount("")
                          }
                        }}
                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="" disabled>
                          Select source account
                        </option>
                        {accounts.map((acc) => (
                          <option key={acc.id} value={acc.id}>
                            {acc.name} (₵{acc.balance.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-slate-100 p-2 rounded-full">
                        <ArrowLeftRight className="h-6 w-6 text-slate-500" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="toAccount" className="block text-sm font-medium text-slate-700 mb-1">
                        To Account
                      </label>
                      <select
                        id="toAccount"
                        value={toAccount}
                        onChange={(e) => setToAccount(e.target.value)}
                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="" disabled>
                          Select destination account
                        </option>
                        {accounts
                          .filter((acc) => acc.id !== fromAccount)
                          .map((acc) => (
                            <option key={acc.id} value={acc.id}>
                              {acc.name} (₵{acc.balance.toLocaleString()})
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                        Description (Optional)
                      </label>
                      <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Savings transfer"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="px-6 py-3 mr-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!amount || !fromAccount || !toAccount || fromAccount === toAccount || isSubmitting}
                  className="px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Transfer Money"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
