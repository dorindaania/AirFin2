"use client"

import { useState } from "react"
import { ArrowLeft, FileText, Download, FileSpreadsheet } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

// Sample budget data
const budgetData = {
  categories: [
    { name: "Housing", budgeted: 1200, spent: 1150 },
    { name: "Food & Dining", budgeted: 500, spent: 480 },
    { name: "Transportation", budgeted: 300, spent: 275 },
    { name: "Entertainment", budgeted: 200, spent: 185 },
    { name: "Utilities", budgeted: 250, spent: 240 },
    { name: "Shopping", budgeted: 150, spent: 200 },
  ],
  transactions: [
    { date: "2023-05-01", category: "Housing", description: "Rent", amount: 1000 },
    { date: "2023-05-02", category: "Utilities", description: "Electricity", amount: 85 },
    { date: "2023-05-03", category: "Food & Dining", description: "Grocery Store", amount: 120 },
    { date: "2023-05-05", category: "Transportation", description: "Gas", amount: 45 },
    { date: "2023-05-07", category: "Entertainment", description: "Movie Tickets", amount: 30 },
    { date: "2023-05-10", category: "Food & Dining", description: "Restaurant", amount: 65 },
    { date: "2023-05-12", category: "Shopping", description: "Clothing", amount: 90 },
    { date: "2023-05-15", category: "Utilities", description: "Internet", amount: 75 },
    { date: "2023-05-18", category: "Food & Dining", description: "Grocery Store", amount: 110 },
    { date: "2023-05-20", category: "Transportation", description: "Gas", amount: 40 },
    { date: "2023-05-25", category: "Housing", description: "Maintenance", amount: 150 },
    { date: "2023-05-28", category: "Entertainment", description: "Streaming Service", amount: 15 },
  ],
}

export default function ExportBudgetPage() {
  const [exportType, setExportType] = useState("pdf")
  const [dateRange, setDateRange] = useState("current-month")
  const [includeCategories, setIncludeCategories] = useState(true)
  const [includeTransactions, setIncludeTransactions] = useState(true)

  // Function to generate and download CSV
  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,"

    // Add categories if selected
    if (includeCategories) {
      csvContent += "Category,Budgeted,Spent,Remaining\n"
      budgetData.categories.forEach((category) => {
        const remaining = category.budgeted - category.spent
        csvContent += `${category.name},${category.budgeted},${category.spent},${remaining}\n`
      })
      csvContent += "\n"
    }

    // Add transactions if selected
    if (includeTransactions) {
      csvContent += "Date,Category,Description,Amount\n"
      budgetData.transactions.forEach((transaction) => {
        csvContent += `${transaction.date},${transaction.category},${transaction.description},${transaction.amount}\n`
      })
    }

    // Create download link and trigger click
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "budget_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Function to generate and download PDF
  const downloadPDF = () => {
    // In a real application, you would use a library like jsPDF
    // For this example, we'll simulate a PDF download with a text file
    const textContent =
      "data:text/plain;charset=utf-8," +
      "BUDGET REPORT\n\n" +
      (includeCategories
        ? "CATEGORIES\n" +
          budgetData.categories
            .map((c) => `${c.name}: $${c.budgeted} budgeted, $${c.spent} spent, $${c.budgeted - c.spent} remaining`)
            .join("\n") +
          "\n\n"
        : "") +
      (includeTransactions
        ? "TRANSACTIONS\n" +
          budgetData.transactions.map((t) => `${t.date} - ${t.category} - ${t.description}: $${t.amount}`).join("\n")
        : "")

    const encodedUri = encodeURI(textContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "budget_report.txt") // Using .txt instead of .pdf for this example
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExport = () => {
    if (exportType === "csv") {
      downloadCSV()
    } else {
      downloadPDF()
    }
  }

  const router = useRouter()



  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="m-4">
            <button
            onClick={() => router.back()}
            className="inline-flex items-center text-lg text-blue-600 hover:text-blue-800 mb-6"
            >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
            </button>
        </div>

      <h1 className="text-2xl font-bold mb-6 text-slate-900">Export Budget Report</h1>

      <Card className="p-6 mb-6">
        <Tabs defaultValue="format" className="mb-6 text-slate-900">
          <TabsList className="mb-4">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="data">Data to Include</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="format">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Export Format</h3>
                <RadioGroup value={exportType} onValueChange={setExportType} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <Label htmlFor="pdf" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      PDF Document
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="csv" id="csv" />
                    <Label htmlFor="csv" className="flex items-center">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      CSV Spreadsheet
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Date Range</h3>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="previous-month">Previous Month</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                    <SelectItem value="year-to-date">Year to Date</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-3">Data to Include</h3>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-categories"
                  checked={includeCategories}
                  onChange={(e) => setIncludeCategories(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-categories">Budget Categories and Summaries</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-transactions"
                  checked={includeTransactions}
                  onChange={(e) => setIncludeTransactions(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-transactions">Transaction History</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="border rounded-md p-4 bg-slate-50">
              <h3 className="text-lg font-medium mb-3">Report Preview</h3>

              {includeCategories && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Budget Categories</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Budgeted
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Spent
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Remaining
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {budgetData.categories.slice(0, 3).map((category, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{category.name}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">${category.budgeted}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">${category.spent}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                              ${category.budgeted - category.spent}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={4} className="px-4 py-2 text-sm text-center text-gray-500">
                            ... and {budgetData.categories.length - 3} more categories
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {includeTransactions && (
                <div>
                  <h4 className="font-medium mb-2">Transactions</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {budgetData.transactions.slice(0, 3).map((transaction, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{transaction.date}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{transaction.category}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{transaction.description}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">${transaction.amount}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={4} className="px-4 py-2 text-sm text-center text-gray-500">
                            ... and {budgetData.transactions.length - 3} more transactions
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={handleExport} className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export {exportType.toUpperCase()}
          </Button>
        </div>
      </Card>
    </div>
  )
}
