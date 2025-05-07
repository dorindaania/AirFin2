"use client"

import { useState } from "react"
import { ArrowDown, ArrowLeft, Check, CreditCard, DollarSign, PiggyBank, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"

import Card from "../components/card/Card"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"

export default function AddFunds() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [selectedGoal, setSelectedGoal] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Sample savings goals
  const savingsGoals = [
    { id: "emergency", name: "Emergency Fund", current: 2500, target: 5000 },
    { id: "vacation", name: "Vacation", current: 1200, target: 3000 },
    { id: "education", name: "Education", current: 3500, target: 10000 },
    { id: "general", name: "General Savings", current: 5000, target: null },
  ]

  // Sample payment methods
  const paymentMethods = [
    { id: "bank", name: "Bank Transfer", icon: CreditCard },
    { id: "card", name: "Debit/Credit Card", icon: CreditCard },
    { id: "mobile", name: "Mobile Money", icon: Wallet },
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
          <ArrowDown className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-3xl text-slate-900 font-bold">Add Funds to Savings</h1>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          {success ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Funds Added Successfully!</h2>
                <p className="text-slate-600 mb-4">
                  ₵{amount} has been added to your{" "}
                  {selectedGoal ? savingsGoals.find((g) => g.id === selectedGoal)?.name : "savings"}.
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
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Select Savings Goal</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {savingsGoals.map((goal) => (
                      <div
                        key={goal.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedGoal === goal.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedGoal(goal.id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 bg-blue-100 p-2 rounded-full">
                            <PiggyBank className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{goal.name}</p>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm text-slate-500">Current: ₵{goal.current.toLocaleString()}</p>
                              {goal.target && (
                                <p className="text-sm text-slate-500">Target: ₵{goal.target.toLocaleString()}</p>
                              )}
                            </div>
                            {goal.target && (
                              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{
                                    width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                                  }}
                                ></div>
                              </div>
                            )}
                          </div>
                          <div className="ml-2">
                            <div
                              className={`w-5 h-5 rounded-full border ${
                                selectedGoal === goal.id ? "border-blue-500 bg-blue-500" : "border-slate-300"
                              }`}
                            >
                              {selectedGoal === goal.id && <Check className="h-4 w-4 text-white m-0.5" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="mb-6">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Payment Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 bg-blue-100 p-2 rounded-full">
                            <method.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{method.name}</p>
                          </div>
                          <div className="ml-2">
                            <div
                              className={`w-5 h-5 rounded-full border ${
                                paymentMethod === method.id ? "border-blue-500 bg-blue-500" : "border-slate-300"
                              }`}
                            >
                              {paymentMethod === method.id && <Check className="h-4 w-4 text-white m-0.5" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                  disabled={!amount || !selectedGoal || !paymentMethod || isSubmitting}
                  className="px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Add Funds"}
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
