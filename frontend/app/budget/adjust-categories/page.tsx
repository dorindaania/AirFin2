"use client"
import { ArrowLeft } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Slider } from "../../components/ui/slider"
import { useRouter } from 'next/navigation'

export default function AdjustCategoriesPage() {
    const router = useRouter()


  return (
    <div className="container mx-auto p-4 max-w-4xl m-6">
        <div>
            <button
            onClick={() => router.back()}
            className="inline-flex items-center text-lg text-blue-600 hover:text-blue-800 mb-6"
            >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
            </button>
        </div>

      <h1 className="text-2xl font-bold mb-6 text-slate-900">Adjust Budget Categories</h1>

      <Card className="p-6 mb-6">
        <div className="space-y-6">
          <CategorySlider name="Housing" currentAmount={1200} maxAmount={2000} color="bg-blue-500" />

          <CategorySlider name="Food & Dining" currentAmount={500} maxAmount={800} color="bg-green-500" />

          <CategorySlider name="Transportation" currentAmount={300} maxAmount={600} color="bg-purple-500" />

          <CategorySlider name="Entertainment" currentAmount={200} maxAmount={400} color="bg-amber-500" />

          <CategorySlider name="Utilities" currentAmount={250} maxAmount={400} color="bg-red-500" />

          <CategorySlider name="Shopping" currentAmount={150} maxAmount={300} color="bg-indigo-500" />
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Reset</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

function CategorySlider({
  name,
  currentAmount,
  maxAmount,
  color,
}: {
  name: string
  currentAmount: number
  maxAmount: number
  color: string
}) {
  const percentage = (currentAmount / maxAmount) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h3 className="font-medium text-slate-900">{name}</h3>
        <div className="text-right">
          <p className="font-medium text-slate-600">${currentAmount}</p>
          <p className="text-xs text-slate-500">of ${maxAmount}</p>
        </div>
      </div>

      <Slider defaultValue={[percentage]} max={100} step={1} className="py-2" />

      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
