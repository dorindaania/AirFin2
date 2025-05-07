"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowDown, ArrowLeft, Check, DollarSign, Receipt } from 'lucide-react'

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

export default function DepositPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const accountId = searchParams.get("accountId")

  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [depositMethod, setDepositMethod] = useState("")
  const [receipt, setReceipt] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [account, setAccount] = useState<Account | null>(null)

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

  // Deposit methods
  const depositMethods = [
    { id: "cash", name: "Cash Deposit" },
    { id: "check", name: "Check Deposit" },
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0])
    }
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
          <ArrowDown className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-3xl text-slate-900 font-bold">Deposit Funds</h1>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          {success ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Deposit Successful!</h2>
                <p className="text-slate-600 mb-4">
                  ₵{amount} has been deposited to your {account.accountType} at {account.bankName}.
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
                      <p className="text-slate-600">Current Balance</p>
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
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Deposit Amount</h2>
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
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Deposit Details</h2>
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
                        placeholder="e.g., Salary Deposit"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="depositMethod" className="block text-sm font-medium text-slate-700 mb-1">
                        Deposit Method
                      </label>
                      <select
                        id="depositMethod"
                        value={depositMethod}
                        onChange={(e) => setDepositMethod(e.target.value)}
                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="" disabled>
                          Select a deposit method
                        </option>
                        {depositMethods.map((method) => (
                          <option key={method.id} value={method.id}>
                            {method.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="receipt" className="block text-sm font-medium text-slate-700 mb-1">
                        Upload Receipt (Optional)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <Receipt className="mx-auto h-12 w-12 text-slate-400" />
                          <div className="flex text-sm text-slate-600">
                            <label
                              htmlFor="receipt"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="receipt"
                                name="receipt"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                      {receipt && (
                        <p className="mt-2 text-sm text-slate-600">
                          Selected file: <span className="font-medium">{receipt.name}</span>
                        </p>
                      )}
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
                  disabled={!amount || !description || !depositMethod || isSubmitting}
                  className="px-6 py-3 bg-emerald-600 rounded-lg text-white font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Deposit Funds"}
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
