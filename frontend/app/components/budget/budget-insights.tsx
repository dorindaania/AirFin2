export default function BudgetInsights() {
    // Static data for budget insights
    const insights = [
      {
        title: "Food Budget",
        description: "You consistently stay under your food budget. Consider reallocating some funds to savings.",
        type: "positive",
      },
      {
        title: "Entertainment",
        description: "Entertainment spending has increased by 15% over the last 3 months.",
        type: "warning",
      },
      {
        title: "Savings Goal",
        description: "You're on track to reach your emergency fund goal by December.",
        type: "positive",
      },
      {
        title: "Utilities",
        description: "Your utility bills are higher than average for your area.",
        type: "warning",
      },
    ]
  
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 h-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg text-slate-600">Budget Insights</h3>
        </div>
  
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                insight.type === "positive" ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"
              }`}
            >
              <h4 className={`font-medium text-sm ${insight.type === "positive" ? "text-green-800" : "text-amber-800"}`}>
                {insight.title}
              </h4>
              <p className={`text-xs mt-1 ${insight.type === "positive" ? "text-green-700" : "text-amber-700"}`}>
                {insight.description}
              </p>
            </div>
          ))}
        </div>
  
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Budget Health Score</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="font-medium text-slate-900">Good</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  