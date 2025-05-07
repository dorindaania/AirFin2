import type React from "react"
import type { LucideIcon } from "lucide-react"

interface InsightCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
}

const InsightCard: React.FC<InsightCardProps> = ({ title, description, icon: Icon, color }) => {
  return (
    <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center mb-2">
        <Icon className={`h-5 w-5 ${color} mr-2`} />
        <h3 className="font-medium text-slate-900">{title}</h3>
      </div>
      <p className="text-sm text-slate-600">{description}</p>
      <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">Learn More</button>
    </div>
  )
}

export default InsightCard
