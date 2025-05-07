"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Trash2,
  DollarSign,
  Calendar,
  PieChart,
  Save,
  ArrowLeft,
  AlertCircle,
  Home,
  ShoppingCart,
  Car,
  Coffee,
  Utensils,
  Wifi,
  Film,
  Gift,
  Briefcase,
  Heart,
  Zap,
  Droplet,
  Smartphone,
} from "lucide-react"

// Define budget category interface
interface BudgetCategory {
  id: string
  name: string
  percentage: number
  color: string
  icon: string
}

// Define budget period type
type BudgetPeriod = "monthly" | "weekly" | "yearly"

// Predefined category options with icons and colors
const categoryOptions = [
  { name: "Housing", icon: "Home", color: "#4f46e5" },
  { name: "Groceries", icon: "ShoppingCart", color: "#10b981" },
  { name: "Transportation", icon: "Car", color: "#f59e0b" },
  { name: "Dining Out", icon: "Utensils", color: "#ef4444" },
  { name: "Coffee", icon: "Coffee", color: "#8b5cf6" },
  { name: "Utilities", icon: "Zap", color: "#ec4899" },
  { name: "Internet", icon: "Wifi", color: "#3b82f6" },
  { name: "Entertainment", icon: "Film", color: "#f97316" },
  { name: "Shopping", icon: "Gift", color: "#14b8a6" },
  { name: "Work", icon: "Briefcase", color: "#6366f1" },
  { name: "Healthcare", icon: "Heart", color: "#dc2626" },
  { name: "Water", icon: "Droplet", color: "#0ea5e9" },
  { name: "Phone", icon: "Smartphone", color: "#8b5cf6" },
]

// Get icon component by name
const getIconByName = (iconName: string) => {
  switch (iconName) {
    case "Home":
      return <Home />
    case "ShoppingCart":
      return <ShoppingCart />
    case "Car":
      return <Car />
    case "Utensils":
      return <Utensils />
    case "Coffee":
      return <Coffee />
    case "Wifi":
      return <Wifi />
    case "Film":
      return <Film />
    case "Gift":
      return <Gift />
    case "Briefcase":
      return <Briefcase />
    case "Heart":
      return <Heart />
    case "Zap":
      return <Zap />
    case "Droplet":
      return <Droplet />
    case "Smartphone":
      return <Smartphone />
    default:
      return <ShoppingCart />
  }
}

const CreateBudgetPage = () => {
  const router = useRouter()

  // State for budget details
  const [budgetName, setBudgetName] = useState("")
  const [budgetAmount, setBudgetAmount] = useState("")
  const [budgetPeriod, setBudgetPeriod] = useState<BudgetPeriod>("monthly")

  // State for budget categories
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: "1", name: "Housing", percentage: 30, color: "#4f46e5", icon: "Home" },
    { id: "2", name: "Groceries", percentage: 15, color: "#10b981", icon: "ShoppingCart" },
    { id: "3", name: "Transportation", percentage: 10, color: "#f59e0b", icon: "Car" },
    { id: "4", name: "Dining Out", percentage: 10, color: "#ef4444", icon: "Utensils" },
    { id: "5", name: "Utilities", percentage: 10, color: "#ec4899", icon: "Zap" },
  ])

  // State for new category
  const [newCategory, setNewCategory] = useState("")
  const [newPercentage, setNewPercentage] = useState("")
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const [selectedIcon, setSelectedIcon] = useState("ShoppingCart")

  // State for validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState(false)

  // Calculate total percentage
  const totalPercentage = categories.reduce((sum, category) => sum + category.percentage, 0)

  // Calculate remaining percentage
  const remainingPercentage = 100 - totalPercentage

  // Add new category
  const addCategory = () => {
    // Validate inputs
    const newErrors: { [key: string]: string } = {}

    if (!newCategory.trim()) {
      newErrors.category = "Category name is required"
    }

    if (!newPercentage.trim()) {
      newErrors.percentage = "Percentage is required"
    } else if (isNaN(Number(newPercentage)) || Number(newPercentage) <= 0) {
      newErrors.percentage = "Percentage must be a positive number"
    } else if (Number(newPercentage) > remainingPercentage) {
      newErrors.percentage = `Percentage cannot exceed remaining ${remainingPercentage}%`
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Add new category
    const newCategoryObj: BudgetCategory = {
      id: Date.now().toString(),
      name: newCategory,
      percentage: Number(newPercentage),
      color: selectedColor,
      icon: selectedIcon,
    }

    setCategories([...categories, newCategoryObj])

    // Reset inputs
    setNewCategory("")
    setNewPercentage("")
    setErrors({})
  }

  // Remove category
  const removeCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  // Update category percentage
  const updateCategoryPercentage = (id: string, percentage: number) => {
    if (isNaN(percentage) || percentage < 0) return

    const otherCategoriesTotal = categories
      .filter((category) => category.id !== id)
      .reduce((sum, category) => sum + category.percentage, 0)

    if (otherCategoriesTotal + percentage > 100) {
      percentage = 100 - otherCategoriesTotal
    }

    setCategories(categories.map((category) => (category.id === id ? { ...category, percentage } : category)))
  }

  // Save budget
  const saveBudget = () => {
    // Validate budget details
    const newErrors: { [key: string]: string } = {}

    if (!budgetName.trim()) {
      newErrors.name = "Budget name is required"
    }

    if (!budgetAmount.trim()) {
      newErrors.amount = "Budget amount is required"
    } else if (isNaN(Number(budgetAmount)) || Number(budgetAmount) <= 0) {
      newErrors.amount = "Budget amount must be a positive number"
    }

    if (totalPercentage !== 100) {
      newErrors.total = `Total percentage must be 100% (currently ${totalPercentage}%)`
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // In a real app, you would save the budget to a database here
    // For now, we'll just simulate success and navigate back

    alert("Budget created successfully!")
    router.push("/budgets")
  }

  // Generate pie chart segments
  const generatePieChartSegments = () => {
    let cumulativePercentage = 0

    return categories.map((category) => {
      const startPercentage = cumulativePercentage
      cumulativePercentage += category.percentage

      const startAngle = (startPercentage / 100) * 360
      const endAngle = (cumulativePercentage / 100) * 360

      return {
        category,
        startAngle,
        endAngle,
      }
    })
  }

  // Draw pie chart
  useEffect(() => {
    const canvas = document.getElementById("budget-pie-chart") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (categories.length === 0) {
      // Draw empty circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.fillStyle = "#e5e7eb"
      ctx.fill()
      return
    }

    const segments = generatePieChartSegments()

    segments.forEach((segment) => {
      const { category, startAngle, endAngle } = segment

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, (startAngle - 90) * (Math.PI / 180), (endAngle - 90) * (Math.PI / 180))
      ctx.closePath()
      ctx.fillStyle = category.color
      ctx.fill()
    })

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Draw total in center
    ctx.font = "bold 16px Arial"
    ctx.fillStyle = "#1f2937"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${totalPercentage}%`, centerX, centerY)
  }, [categories, totalPercentage])

  return (
    <div className="pt-16 flex flex-col min-h-screen bg-slate-50">
      <div className="md:mx-8 mx-4 flex-1">
        <div className="flex items-center my-6">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create New Budget</h1>
            <p className="text-slate-500 mt-1">Set up your budget categories and allocations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Budget Details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Budget Details</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="budget-name" className="block text-sm font-medium text-slate-700 mb-1">
                    Budget Name
                  </label>
                  <input
                    id="budget-name"
                    type="text"
                    value={budgetName}
                    onChange={(e) => setBudgetName(e.target.value)}
                    placeholder="e.g., Monthly Household Budget"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget-amount" className="block text-sm font-medium text-slate-700 mb-1">
                      Budget Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        id="budget-amount"
                        type="text"
                        value={budgetAmount}
                        onChange={(e) => setBudgetAmount(e.target.value)}
                        placeholder=" 0.00"
                        className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                      />
                    </div>
                    {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                  </div>

                  <div>
                    <label htmlFor="budget-period" className="block text-sm font-medium text-slate-700 mb-1">
                      Budget Period
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <select
                        id="budget-period"
                        value={budgetPeriod}
                        onChange={(e) => setBudgetPeriod(e.target.value as BudgetPeriod)}
                        className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-none text-slate-900"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Categories */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-900">Budget Categories</h2>
                <div className="text-sm font-medium">
                  <span className={remainingPercentage === 0 ? "text-green-600" : "text-blue-600"}>
                    {remainingPercentage}% remaining
                  </span>
                </div>
              </div>

              {errors.total && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{errors.total}</p>
                </div>
              )}

              {/* Existing Categories */}
              <div className="space-y-3 mb-6">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center p-3 border border-slate-200 rounded-md">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: category.color }}
                    >
                      <div className="text-white">{getIconByName(category.icon)}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{category.name}</div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={category.percentage}
                        onChange={(e) => updateCategoryPercentage(category.id, Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-slate-300 rounded-md text-right text-slate-600"
                      />
                      <span className="ml-1 text-slate-600">%</span>
                      <button
                        onClick={() => removeCategory(category.id)}
                        className="ml-3 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Category */}
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Add New Category</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Category name"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                    />
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                  </div>

                  <div>
                    <div className="flex">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={newPercentage}
                        onChange={(e) => setNewPercentage(e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-500"
                      />
                      <span className="inline-flex items-center px-3 py-2 border border-l-0 border-slate-300 bg-slate-50 text-slate-500 rounded-r-md">
                        %
                      </span>
                    </div>
                    {errors.percentage && <p className="mt-1 text-sm text-red-600">{errors.percentage}</p>}
                  </div>

                  <div className="flex space-x-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="h-full px-3 border border-slate-300 rounded-md flex items-center justify-center"
                      >
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: selectedColor }}></div>
                      </button>

                      {showColorPicker && (
                        <div className="absolute z-10 mt-1 left-0 bg-white border border-slate-200 rounded-md shadow-lg p-2 grid grid-cols-5 gap-1">
                          {categoryOptions.map((option) => (
                            <button
                              key={option.color}
                              type="button"
                              onClick={() => {
                                setSelectedColor(option.color)
                                setShowColorPicker(false)
                              }}
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: option.color }}
                            ></button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowIconPicker(!showIconPicker)}
                        className="h-full px-3 border border-slate-300 rounded-md flex items-center justify-center text-slate-500"
                      >
                        {getIconByName(selectedIcon)}
                      </button>

                      {showIconPicker && (
                        <div className="absolute z-10 mt-1 right-0 bg-white border border-slate-200 rounded-md shadow-lg p-2 grid grid-cols-5 gap-2 w-64">
                          {categoryOptions.map((option) => (
                            <button
                              key={option.icon}
                              type="button"
                              onClick={() => {
                                setSelectedIcon(option.icon)
                                setShowIconPicker(false)
                              }}
                              className="w-8 h-8 rounded-md hover:bg-slate-100 flex items-center justify-center"
                            >
                              {getIconByName(option.icon)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={addCategory}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center "
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Visualization */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-blue-600" />
                Budget Allocation
              </h2>

              <div className="flex justify-center mb-6">
                <div className="relative w-64 h-64">
                  <canvas id="budget-pie-chart" width="256" height="256"></canvas>
                </div>
              </div>

              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center text-slate-600">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                    <div className="text-sm flex-1">{category.name}</div>
                    <div className="text-sm font-medium">{category.percentage}%</div>
                  </div>
                ))}
              </div>

              {categories.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-900">Total:</span>
                    <span
                      className={totalPercentage === 100 ? "text-green-600 font-medium" : "text-blue-600 font-medium"}
                    >
                      {totalPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${totalPercentage === 100 ? "bg-green-600" : "bg-blue-600"}`}
                      style={{ width: `${totalPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={saveBudget}
                disabled={totalPercentage !== 100}
                className={`mt-6 w-full py-2 rounded-md flex items-center justify-center font-medium ${
                  totalPercentage === 100
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                } transition-colors`}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Budget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBudgetPage
