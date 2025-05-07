"use client"

import { useState } from "react"
import { BanknoteIcon as Bank, CreditCard, Wallet, Trash2, Edit, Plus, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation';




// Mock data for demonstration
const mockBankAccounts = [
  {
    id: "bank-1",
    bankName: "Chase Bank",
    accountName: "John Doe",
    accountNumber: "****5678",
    isDefault: true,
  },
  {
    id: "bank-2",
    bankName: "Bank of America",
    accountName: "John Doe",
    accountNumber: "****9012",
    isDefault: false,
  },
]

const mockMomoAccounts = [
  {
    id: "momo-1",
    provider: "MTN Mobile Money",
    fullName: "John Doe",
    phoneNumber: "****7890",
    isDefault: true,
  },
]

type AccountType = "bank" | "momo"

export default function ManageAccountsPage() {
  const [bankAccounts, setBankAccounts] = useState(mockBankAccounts)
  const [momoAccounts, setMomoAccounts] = useState(mockMomoAccounts)
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string; type: AccountType } | null>(null)

  const router = useRouter();
  const handleSetDefault = (id: string, type: AccountType) => {
    if (type === "bank") {
      setBankAccounts(
        bankAccounts.map((account) => ({
          ...account,
          isDefault: account.id === id,
        })),
      )
    } else {
      setMomoAccounts(
        momoAccounts.map((account) => ({
          ...account,
          isDefault: account.id === id,
        })),
      )
    }
  }

  const handleDelete = (id: string, type: AccountType) => {
    setDeleteConfirm({ show: true, id, type })
  }

  const confirmDelete = () => {
    if (!deleteConfirm) return

    if (deleteConfirm.type === "bank") {
      setBankAccounts(bankAccounts.filter((account) => account.id !== deleteConfirm.id))
    } else {
      setMomoAccounts(momoAccounts.filter((account) => account.id !== deleteConfirm.id))
    }

    setDeleteConfirm(null)
  }

  const cancelDelete = () => {
    setDeleteConfirm(null)
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 mt-10">
      <button
      onClick={() => router.back()}
      className="inline-flex items-center text-lg text-blue-600 hover:text-blue-800 mb-6"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Back
    </button>
      <div className="flex flex-col items-center space-y-6 text-center mb-10">
        <div className="bg-blue-600 p-3 rounded-full">
          <Wallet className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-800">Manage Your Accounts</h1>
        <p className="text-gray-600 max-w-[600px]">
          View and manage your linked bank accounts and mobile money wallets.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Bank Accounts Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center">
              <Bank className="mr-2 h-5 w-5" />
              Bank Accounts
            </h2>
            <Link
              href="/LinkAccount"
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Bank Account
            </Link>
          </div>

          {bankAccounts.length === 0 ? (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-blue-800 mb-2">No Bank Accounts Linked</h3>
              <p className="text-gray-600 mb-4">You haven't linked any bank accounts yet.</p>
              <Link
                href="/LinkAccount"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Bank Account
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`border rounded-lg overflow-hidden ${
                    account.isDefault ? "border-blue-300 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{account.bankName}</h3>
                        <p className="text-sm text-gray-600">{account.accountName}</p>
                      </div>
                      {account.isDefault && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">Account: {account.accountNumber}</p>
                    <div className="flex justify-between items-center">
                      <div className="space-x-2">
                        <button
                          onClick={() => handleDelete(account.id, "bank")}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                      {!account.isDefault && (
                        <button
                          onClick={() => handleSetDefault(account.id, "bank")}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Money Accounts Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Mobile Money Accounts
            </h2>
            <Link
              href="/LinkAccount?tab=momo"
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Mobile Money
            </Link>
          </div>

          {momoAccounts.length === 0 ? (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-blue-800 mb-2">No Mobile Money Accounts Linked</h3>
              <p className="text-gray-600 mb-4">You haven't linked any mobile money accounts yet.</p>
              <Link
                href="/LinkAccount?tab=momo"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Mobile Money
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {momoAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`border rounded-lg overflow-hidden ${
                    account.isDefault ? "border-blue-300 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{account.provider}</h3>
                        <p className="text-sm text-gray-600">{account.fullName}</p>
                      </div>
                      {account.isDefault && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">Phone: {account.phoneNumber}</p>
                    <div className="flex justify-between items-center">
                      <div className="space-x-2">
                        <button
                          onClick={() => handleDelete(account.id, "momo")}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                      {!account.isDefault && (
                        <button
                          onClick={() => handleSetDefault(account.id, "momo")}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        {deleteConfirm && deleteConfirm.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this account? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

