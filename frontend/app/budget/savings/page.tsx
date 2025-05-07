"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Progress } from "../../components/ui/progress"

export default function SavingsGoalsPage() {
  const [goals, setGoals] = useState([
    { id: 1, name: "Emergency Fund", target: 10000, current: 5000, timeframe: "6 months" },
    { id: 2, name: "Vacation", target: 3000, current: 1200, timeframe: "3 months" },
  ])

  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    timeframe: "6 months",
  })

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target) {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          name: newGoal.name,
          target: Number.parseFloat(newGoal.target),
          current: 0,
          timeframe: newGoal.timeframe,
        },
      ])
      setNewGoal({ name: "", target: "", timeframe: "6 months" })
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

      <h1 className="text-2xl font-bold mb-6 text-slate-900">Savings Goals</h1>

      <Card className="p-6 mb-6 text-slate-900">
        <h2 className="text-xl font-semibold mb-4">Create New Goal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              placeholder="e.g., Vacation Fund"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="goal-amount">Target Amount ($)</Label>
            <Input
              id="goal-amount"
              type="number"
              placeholder="5000"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="goal-timeframe">Timeframe</Label>
            <Select value={newGoal.timeframe} onValueChange={(value) => setNewGoal({ ...newGoal, timeframe: value })}>
              <SelectTrigger id="goal-timeframe">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3 months">3 months</SelectItem>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="1 year">1 year</SelectItem>
                <SelectItem value="2 years">2 years</SelectItem>
                <SelectItem value="5 years">5 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleAddGoal}>Add Savings Goal</Button>
      </Card>

      <h2 className="text-xl font-semibold mb-4 text-slate-900">Your Savings Goals</h2>

      <div className="space-y-4 text-slate-900">
        {goals.map((goal) => (
          <Card key={goal.id} className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="font-medium text-lg">{goal.name}</h3>
              <p className="text-sm text-slate-500">Target: {goal.timeframe}</p>
            </div>

            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm">${goal.current} saved</span>
                <span className="text-sm font-medium">${goal.target} goal</span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="h-2" />
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-slate-600">{Math.round((goal.current / goal.target) * 100)}% complete</p>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  Add Funds
                </Button>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
