"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Star, Send, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Label } from "../components/ui/label"

// Simple utility to join class names
function cn(...classes: (string | undefined | boolean | null)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function FeedbackPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    overallRating: 0,
    financialConfidenceBefore: 0,
    financialConfidenceAfter: 0,
    mostUsefulFeature: "",
    leastUsefulFeature: "",
    budgetingHabitsImproved: "",
    savingsHabitsImproved: "",
    spendingAwarenessImproved: "",
    financialGoalsImproved: "",
    suggestedImprovements: "",
    additionalComments: "",
  })

  const handleRatingChange = (field: string, value: number) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your server
    console.log("Feedback submitted:", formData)
    setSubmitted(true)
    // Reset form after submission
    window.scrollTo(0, 0)
  }

  if (submitted) {
    return (
      <div className="container mx-auto p-4 max-w-4xl text-slate-800">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-slate-600 hover:text-slate-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <Card className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <ThumbsUp className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Thank You for Your Feedback!</h1>
          <p className="text-slate-600 mb-6">
            Your insights help us improve our app and better support your financial journey.
          </p>
          <Button onClick={() => setSubmitted(false)}>Submit Another Response</Button>
        </Card>
      </div>
    )
  }
 

  return (
    <div className="container mx-auto p-4 max-w-4xl text-slate-800">
      <div className="m-3">
            <button
                onClick={() => router.back()}
                className="inline-flex items-center text-lg text-blue-600 hover:text-blue-800 mb-6"
                >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
        </button>
        </div>

      <h1 className="text-2xl font-bold mb-6">App Feedback & Financial Literacy Assessment</h1>
      <p className="text-slate-600 mb-8">
        Help us understand how our app has impacted your financial knowledge and habits. Your feedback is valuable for
        improving our services.
      </p>

      <form onSubmit={handleSubmit}>
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Overall Experience</h2>

          <div className="mb-6">
            <Label htmlFor="overallRating" className="block mb-2">
              How would you rate your overall experience with our app?
            </Label>
            <div className="flex items-center">
              <StarRating
                rating={formData.overallRating}
                onRatingChange={(value) => handleRatingChange("overallRating", value)}
              />
              <span className="ml-2 text-sm text-slate-500">
                {formData.overallRating > 0 ? `${formData.overallRating} out of 5` : "Select a rating"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="mostUsefulFeature" className="block mb-2">
                Which feature did you find most useful?
              </Label>
              <select
                id="mostUsefulFeature"
                name="mostUsefulFeature"
                value={formData.mostUsefulFeature}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 p-2"
              >
                <option value="">Select a feature</option>
                <option value="budgetCreation">Budget Creation</option>
                <option value="categoryAdjustment">Category Adjustment</option>
                <option value="savingsGoals">Savings Goals</option>
                <option value="expenseTracking">Expense Tracking</option>
                <option value="reports">Reports & Analytics</option>
                <option value="exportFeature">Export Feature</option>
              </select>
            </div>

            <div>
              <Label htmlFor="leastUsefulFeature" className="block mb-2">
                Which feature did you find least useful?
              </Label>
              <select
                id="leastUsefulFeature"
                name="leastUsefulFeature"
                value={formData.leastUsefulFeature}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 p-2"
              >
                <option value="">Select a feature</option>
                <option value="budgetCreation">Budget Creation</option>
                <option value="categoryAdjustment">Category Adjustment</option>
                <option value="savingsGoals">Savings Goals</option>
                <option value="expenseTracking">Expense Tracking</option>
                <option value="reports">Reports & Analytics</option>
                <option value="exportFeature">Export Feature</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Financial Literacy Assessment</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="financialConfidenceBefore" className="block mb-2">
                How would you rate your financial confidence BEFORE using our app?
              </Label>
              <div className="flex items-center">
                <StarRating
                  rating={formData.financialConfidenceBefore}
                  onRatingChange={(value) => handleRatingChange("financialConfidenceBefore", value)}
                />
                <span className="ml-2 text-sm text-slate-500">
                  {formData.financialConfidenceBefore > 0
                    ? `${formData.financialConfidenceBefore} out of 5`
                    : "Select a rating"}
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="financialConfidenceAfter" className="block mb-2">
                How would you rate your financial confidence AFTER using our app?
              </Label>
              <div className="flex items-center">
                <StarRating
                  rating={formData.financialConfidenceAfter}
                  onRatingChange={(value) => handleRatingChange("financialConfidenceAfter", value)}
                />
                <span className="ml-2 text-sm text-slate-500">
                  {formData.financialConfidenceAfter > 0
                    ? `${formData.financialConfidenceAfter} out of 5`
                    : "Select a rating"}
                </span>
              </div>
            </div>
          </div>

          <h3 className="font-medium mb-4">How has our app improved your:</h3>

          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="budgetingHabitsImproved" className="block mb-2">
                Budgeting habits
              </Label>
              <select
                id="budgetingHabitsImproved"
                name="budgetingHabitsImproved"
                value={formData.budgetingHabitsImproved}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 p-2"
              >
                <option value="">Select an option</option>
                <option value="significantly">Significantly improved</option>
                <option value="somewhat">Somewhat improved</option>
                <option value="slightly">Slightly improved</option>
                <option value="noChange">No change</option>
                <option value="worse">Got worse</option>
              </select>
            </div>

            <div>
              <Label htmlFor="savingsHabitsImproved" className="block mb-2">
                Savings habits
              </Label>
              <select
                id="savingsHabitsImproved"
                name="savingsHabitsImproved"
                value={formData.savingsHabitsImproved}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 p-2"
              >
                <option value="">Select an option</option>
                <option value="significantly">Significantly improved</option>
                <option value="somewhat">Somewhat improved</option>
                <option value="slightly">Slightly improved</option>
                <option value="noChange">No change</option>
                <option value="worse">Got worse</option>
              </select>
            </div>

            <div>
              <Label htmlFor="spendingAwarenessImproved" className="block mb-2">
                Spending awareness
              </Label>
              <select
                id="spendingAwarenessImproved"
                name="spendingAwarenessImproved"
                value={formData.spendingAwarenessImproved}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 p-2"
              >
                <option value="">Select an option</option>
                <option value="significantly">Significantly improved</option>
                <option value="somewhat">Somewhat improved</option>
                <option value="slightly">Slightly improved</option>
                <option value="noChange">No change</option>
                <option value="worse">Got worse</option>
              </select>
            </div>

            <div>
              <Label htmlFor="financialGoalsImproved" className="block mb-2">
                Ability to set and achieve financial goals
              </Label>
              <select
                id="financialGoalsImproved"
                name="financialGoalsImproved"
                value={formData.financialGoalsImproved}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 p-2"
              >
                <option value="">Select an option</option>
                <option value="significantly">Significantly improved</option>
                <option value="somewhat">Somewhat improved</option>
                <option value="slightly">Slightly improved</option>
                <option value="noChange">No change</option>
                <option value="worse">Got worse</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Additional Feedback</h2>

          <div className="mb-6">
            <Label htmlFor="suggestedImprovements" className="block mb-2">
              What improvements would you suggest to make our app more effective for financial literacy?
            </Label>
            <textarea
              id="suggestedImprovements"
              name="suggestedImprovements"
              value={formData.suggestedImprovements}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border border-slate-300 p-2"
              placeholder="Please share your suggestions..."
            ></textarea>
          </div>

          <div>
            <Label htmlFor="additionalComments" className="block mb-2">
              Any additional comments or feedback?
            </Label>
            <textarea
              id="additionalComments"
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border border-slate-300 p-2"
              placeholder="Please share any other thoughts..."
            ></textarea>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="flex items-center">
            <Send className="mr-2 h-4 w-4" />
            Submit Feedback
          </Button>
        </div>
      </form>
    </div>
  )
}

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
}

function StarRating({ rating, onRatingChange }: StarRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none"
          aria-label={`Rate ${star} out of 5 stars`}
        >
          <Star
            className={cn(
              "h-6 w-6",
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300",
              "transition-colors",
            )}
          />
        </button>
      ))}
    </div>
  )
}
