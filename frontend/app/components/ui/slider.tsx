"use client"

import type React from "react"
import { useState } from "react"

interface SliderProps {
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  className?: string
  onChange?: (value: number[]) => void
}

export function Slider({
  defaultValue = [0],
  min = 0,
  max = 100,
  step = 1,
  className = "",
  onChange,
  ...props
}: SliderProps) {
  const [value, setValue] = useState(defaultValue[0])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setValue(newValue)
    onChange?.([newValue])
  }

  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={`relative w-full ${className}`} {...props}>
      <div className="h-2 w-full rounded-full bg-slate-100">
        <div className="absolute h-2 rounded-full bg-slate-900" style={{ width: `${percentage}%` }} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
        style={{
          WebkitAppearance: "none",
          appearance: "none",
        }}
      />
    </div>
  )
}
