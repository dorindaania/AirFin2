"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface RadioGroupContextType {
  value: string
  onValueChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined)

function useRadioGroup() {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error("RadioGroup components must be used within a RadioGroupProvider")
  }
  return context
}

interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

export function RadioGroup({
  value,
  defaultValue = "",
  onValueChange,
  className = "",
  children,
  ...props
}: RadioGroupProps) {
  const [radioValue, setRadioValue] = useState(value || defaultValue)

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setRadioValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <RadioGroupContext.Provider
      value={{
        value: value !== undefined ? value : radioValue,
        onValueChange: handleValueChange,
      }}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

interface RadioGroupItemProps {
  value: string
  id?: string
  className?: string
}

export function RadioGroupItem({ value, id, className = "", ...props }: RadioGroupItemProps) {
  const { value: selectedValue, onValueChange } = useRadioGroup()

  return (
    <input
      type="radio"
      id={id}
      className={`h-4 w-4 rounded-full border border-slate-300 text-slate-900 focus:ring-slate-400 ${className}`}
      checked={selectedValue === value}
      onChange={() => onValueChange(value)}
      value={value}
      {...props}
    />
  )
}
