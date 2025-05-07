"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BanknoteIcon as Bank, CreditCard, Wallet, CheckCircle2, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const bankFormSchema = z.object({
  accountNumber: z.string().min(10, "Account number must be at least 10 characters"),
  accountName: z.string().min(2, "Account name is required"),
  bankName: z.string().min(2, "Bank name is required"),
  routingNumber: z.string().optional(),
})

const momoFormSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  fullName: z.string().min(2, "Full name is required"),
  provider: z.string().min(2, "Provider name is required"),
})

export default function LinkAccount() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = useState(tabParam === "momo" ? "momo" : "bank")
  const [linkSuccess, setLinkSuccess] = useState<string | null>(null)

  const bankForm = useForm<z.infer<typeof bankFormSchema>>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      accountNumber: "",
      accountName: "",
      bankName: "",
      routingNumber: "",
    },
  })

  const momoForm = useForm<z.infer<typeof momoFormSchema>>({
    resolver: zodResolver(momoFormSchema),
    defaultValues: {
      phoneNumber: "",
      fullName: "",
      provider: "",
    },
  })

  function onBankSubmit(values: z.infer<typeof bankFormSchema>) {
    // In a real app, you would send this data to your backend
    console.log(values)
    setLinkSuccess("bank")
  }

  function onMomoSubmit(values: z.infer<typeof momoFormSchema>) {
    // In a real app, you would send this data to your backend
    console.log(values)
    setLinkSuccess("momo")
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 mt-10">
      
        <Link href="/ManageAccounts" className="inline-flex items-center text-lg text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Manage Accounts
        </Link>
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-6 text-center mb-10">
          <div className="bg-blue-600 p-3 rounded-full">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-800">Link Your Accounts</h1>
          <p className="text-gray-600 max-w-[600px]">
            Connect your bank account or mobile money wallet to enable seamless transactions.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="w-full mb-8">
          <div className="grid w-full grid-cols-2 rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => setActiveTab("bank")}
              className={`flex items-center justify-center py-3 px-4 font-medium text-sm ${
                activeTab === "bank" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Bank className="mr-2 h-4 w-4" />
              Bank Account
            </button>
            <button
              onClick={() => setActiveTab("momo")}
              className={`flex items-center justify-center py-3 px-4 font-medium text-sm ${
                activeTab === "momo" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Mobile Money
            </button>
          </div>
        </div>

        {/* Bank Account Tab Content */}
        {activeTab === "bank" && (
          <>
            {linkSuccess === "bank" ? (
              <div className="border border-green-100 rounded-lg overflow-hidden">
                <div className="bg-green-50 p-6 flex flex-col items-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600 mb-2" />
                  <h2 className="text-xl font-semibold text-green-800">Bank Account Linked!</h2>
                  <p className="text-gray-600 text-center">
                    Your bank account has been successfully linked to your profile.
                  </p>
                </div>
                <div className="p-6 flex justify-center space-x-3">
                  <button
                    onClick={() => {
                      bankForm.reset()
                      setLinkSuccess(null)
                    }}
                    className="px-4 py-2 border border-blue-200 text-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Link Another Account
                  </button>
                  <Link
                    href="/manage-accounts-page"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    View My Accounts
                  </Link>
                </div>
              </div>
            ) : (
              <div className="border border-blue-100 rounded-lg overflow-hidden">
                <div className="bg-blue-50 p-6 rounded-t-lg">
                  <h2 className="text-xl font-semibold text-blue-800">Link Bank Account</h2>
                  <p className="text-gray-600">Enter your bank account details below.</p>
                </div>
                <div className="p-6">
                  <form onSubmit={bankForm.handleSubmit(onBankSubmit)} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                        Bank Name
                      </label>
                      <input
                        id="bankName"
                        {...bankForm.register("bankName")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your bank name"
                      />
                      {bankForm.formState.errors.bankName && (
                        <p className="text-red-500 text-xs mt-1">{bankForm.formState.errors.bankName.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">
                        Account Holder Name
                      </label>
                      <input
                        id="accountName"
                        {...bankForm.register("accountName")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter account holder name"
                      />
                      {bankForm.formState.errors.accountName && (
                        <p className="text-red-500 text-xs mt-1">{bankForm.formState.errors.accountName.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                        Account Number
                      </label>
                      <input
                        id="accountNumber"
                        {...bankForm.register("accountNumber")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter account number"
                      />
                      {bankForm.formState.errors.accountNumber && (
                        <p className="text-red-500 text-xs mt-1">{bankForm.formState.errors.accountNumber.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700">
                        Routing Number (Optional)
                      </label>
                      <input
                        id="routingNumber"
                        {...bankForm.register("routingNumber")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter routing number"
                      />
                      {bankForm.formState.errors.routingNumber && (
                        <p className="text-red-500 text-xs mt-1">{bankForm.formState.errors.routingNumber.message}</p>
                      )}
                    </div>

                    <div className="flex items-start p-4 bg-blue-50 border border-blue-100 rounded-md">
                      <Shield className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-800">Your banking information is encrypted and secure.</p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Link Bank Account
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        {/* Mobile Money Tab Content */}
        {activeTab === "momo" && (
          <>
            {linkSuccess === "momo" ? (
              <div className="border border-green-100 rounded-lg overflow-hidden">
                <div className="bg-green-50 p-6 flex flex-col items-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600 mb-2" />
                  <h2 className="text-xl font-semibold text-green-800">Mobile Money Account Linked!</h2>
                  <p className="text-gray-600 text-center">
                    Your mobile money account has been successfully linked to your profile.
                  </p>
                </div>
                <div className="p-6 flex justify-center space-x-3">
                  <button
                    onClick={() => {
                      momoForm.reset()
                      setLinkSuccess(null)
                    }}
                    className="px-4 py-2 border border-blue-200 text-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Link Another Account
                  </button>
                  <Link
                    href="/manage-accounts-page"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    View My Accounts
                  </Link>
                </div>
              </div>
            ) : (
              <div className="border border-blue-100 rounded-lg overflow-hidden">
                <div className="bg-blue-50 p-6 rounded-t-lg">
                  <h2 className="text-xl font-semibold text-blue-800">Link Mobile Money</h2>
                  <p className="text-gray-600">Enter your mobile money account details below.</p>
                </div>
                <div className="p-6">
                  <form onSubmit={momoForm.handleSubmit(onMomoSubmit)} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="provider" className="block text-sm font-medium text-gray-700">
                        Mobile Money Provider
                      </label>
                      <input
                        id="provider"
                        {...momoForm.register("provider")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your provider (e.g., MTN, Vodafone)"
                      />
                      {momoForm.formState.errors.provider && (
                        <p className="text-red-500 text-xs mt-1">{momoForm.formState.errors.provider.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        {...momoForm.register("fullName")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                      {momoForm.formState.errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{momoForm.formState.errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        {...momoForm.register("phoneNumber")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                      {momoForm.formState.errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">{momoForm.formState.errors.phoneNumber.message}</p>
                      )}
                    </div>

                    <div className="flex items-start p-4 bg-blue-50 border border-blue-100 rounded-md">
                      <Shield className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-800">Your mobile money information is encrypted and secure.</p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Link Mobile Money
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By linking your accounts, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

