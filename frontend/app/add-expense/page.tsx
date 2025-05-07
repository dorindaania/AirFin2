"use client"

import { useState } from "react"
import { ArrowLeft, ArrowUp, Calendar, Check, DollarSign, Receipt } from "lucide-react"
import { useRouter } from "next/navigation"

import Card from "../components/card/Card"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"

export default function AddExpense() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [account, setAccount] = useState("")
  const [receipt, setReceipt] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Sample expense categories
  const expenseCategories = [
    "Food",
    "Housing",
    "Transportation",
    "Utilities",
    "Healthcare",
    "Entertainment",
    "Shopping",
    "Education",
    "Personal Care",
    "Debt Payments",
    "Other",
  ]

  // Sample accounts
  const accounts = [
    { id: "main", name: "Main Account" },
    { id: "savings", name: "Savings Account" },
    { id: "business", name: "Business Account" },
  ]

interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

const handleSubmit = (e: HandleSubmitEvent): void => {
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

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const handleFileChange = (e: FileChangeEvent): void => {
    if (e.target.files && e.target.files[0]) {
        setReceipt(e.target.files[0])
    }
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
          <h1 className="text-3xl text-slate-900 font-bold">Add Expense</h1>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          {success ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Expense Added Successfully!</h2>
                <p className="text-slate-600 mb-4">
                  ₵{amount} has been deducted from your {accounts.find((a) => a.id === account)?.name || "account"}.
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
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Expense Details</h2>
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
                        placeholder="e.g., Grocery Shopping"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {expenseCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
                        Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="date"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="block w-full pl-10 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="account" className="block text-sm font-medium text-slate-700 mb-1">
                        Pay from Account
                      </label>
                      <select
                        id="account"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="" disabled>
                          Select an account
                        </option>
                        {accounts.map((acc) => (
                          <option key={acc.id} value={acc.id}>
                            {acc.name}
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
                  onClick={() => router.push("/")}
                  className="px-6 py-3 mr-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!amount || !description || !category || !date || !account || isSubmitting}
                  className="px-6 py-3 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Add Expense"}
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
