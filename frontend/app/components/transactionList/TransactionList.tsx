import { ArrowDown, ShoppingBag, Coffee, Home, Car, Smartphone } from "lucide-react"
import Link from "next/link"

const TransactionList = () => {
  // Fake data for recent transactions
  const transactions = [
    {
      id: 1,
      title: "Grocery Shopping",
      amount: -250,
      date: "Today",
      category: "Food",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Salary Deposit",
      amount: 5200,
      date: "Yesterday",
      category: "Income",
      icon: ArrowDown,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 3,
      title: "Coffee Shop",
      amount: -35,
      date: "Yesterday",
      category: "Food",
      icon: Coffee,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: 4,
      title: "Rent Payment",
      amount: -1200,
      date: "3 days ago",
      category: "Housing",
      icon: Home,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 5,
      title: "Uber Ride",
      amount: -45,
      date: "4 days ago",
      category: "Transport",
      icon: Car,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 6,
      title: "Phone Bill",
      amount: -120,
      date: "5 days ago",
      category: "Utilities",
      icon: Smartphone,
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <div className={`p-2 rounded-full mr-3 ${transaction.color}`}>
            <transaction.icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">{transaction.title}</p>
            <p className="text-xs text-slate-500">
              {transaction.date} • {transaction.category}
            </p>
          </div>
          <div className={`text-sm font-medium ${transaction.amount > 0 ? "text-emerald-600" : "text-red-600"}`}>
            {transaction.amount > 0 ? "+" : ""}₵ {Math.abs(transaction.amount).toLocaleString()}
          </div>
        </div>
      ))}
      <div className="text-center pt-2">
        <Link href="/transactions">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All Transactions</button>
        </Link>
      </div>
    </div>
  )
}

export default TransactionList
