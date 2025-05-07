"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUp, Check, DollarSign, AlertCircle, ArrowLeft } from "lucide-react"

import Card from "../components/card/Card"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"

// Account type definition
type Account = {
  id: string
  bankName: string
  accountType: string
  accountNumber: string
  availableBalance: number
  totalBalance: number
}

export default function WithdrawPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const accountId = searchParams.get("accountId")

  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [withdrawalMethod, setWithdrawalMethod] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [account, setAccount] = useState<Account | null>(null)
  const [error, setError] = useState("")

  // Fake accounts data for demo
  const accounts = [
    {
      id: "ecobank",
      bankName: "Ecobank",
      accountType: "Current Account",
      accountNumber: "****5678",
      availableBalance: 4250.75,
      totalBalance: 4500.0,
    },
    {
      id: "mtn",
      bankName: "MTN Mobile Money",
      accountType: "Personal Wallet",
      accountNumber: "****9012",
      availableBalance: 1500.0,
      totalBalance: 1500.0,
    },
  ]

  // Withdrawal methods
  const withdrawalMethods = [
    { id: "cash", name: "Cash Withdrawal" },
    { id: "atm", name: "ATM Withdrawal" },
    { id: "transfer", name: "Bank Transfer" },
    { id: "mobile", name: "Mobile Money" },
  ]

  // Set the account based on the accountId from URL
  useEffect(() => {
    if (accountId) {
      const foundAccount = accounts.find((acc) => acc.id === accountId)
      if (foundAccount) {
        setAccount(foundAccount)
      } else {
        // If account not found, redirect to accounts page
        router.push("/accounts")
      }
    } else {
      // If no accountId provided, redirect to accounts page
      router.push("/accounts")
    }
  }, [accountId, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Check if withdrawal amount is greater than available balance
    if (account && Number.parseFloat(amount) > account.availableBalance) {
      setError("Withdrawal amount exceeds available balance")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        router.push(`/accounts`)
      }, 2000)
    }, 1500)
  }

  if (!account) {
    return (
      <div className="pt-16 flex flex-col min-h-screen bg-slate-50">
        <div className="flex justify-center items-center h-screen">
          <p>Loading account information...</p>
        </div>
      </div>
    )
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
          <ArrowUp className="h-8 w-8 text-red-600 mr-3" />
          <h1 className="text-3xl text-slate-900 font-bold">Withdraw Funds</h1>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          {success ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Withdrawal Successful!</h2>
                <p className="text-slate-600 mb-4">
                  ₵{amount} has been withdrawn from your {account.accountType} at {account.bankName}.
                </p>
                <p className="text-sm text-slate-500">Redirecting to account page...</p>
              </div>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Account Information</h2>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <p className="text-slate-600">Account</p>
                      <p className="font-medium text-slate-900">
                        {account.bankName} - {account.accountType}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-slate-600">Account Number</p>
                      <p className="font-medium text-slate-900">{account.accountNumber}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-slate-600">Available Balance</p>
                      <p className="font-medium text-slate-900">
                        ₵{" "}
                        {account.availableBalance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="mb-6">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Withdrawal Amount</h2>
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
                  {error && (
                    <div className="mt-2 flex items-center text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="mb-6">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Withdrawal Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Rent Payment"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="withdrawalMethod" className="block text-sm font-medium text-slate-700 mb-1">
                        Withdrawal Method
                      </label>
                      <select
                        id="withdrawalMethod"
                        value={withdrawalMethod}
                        onChange={(e) => setWithdrawalMethod(e.target.value)}
                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="" disabled>
                          Select a withdrawal method
                        </option>
                        {withdrawalMethods.map((method) => (
                          <option key={method.id} value={method.id}>
                            {method.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/accounts")}
                  className="px-6 py-3 mr-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!amount || !description || !withdrawalMethod || isSubmitting}
                  className="px-6 py-3 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Withdraw Funds"}
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
