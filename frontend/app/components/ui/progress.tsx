interface ProgressProps {
    value?: number
    max?: number
    className?: string
  }
  
  export function Progress({ value = 0, max = 100, className = "" }: ProgressProps) {
    const percentage = (value / max) * 100
  
    return (
      <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
        <div className="h-full bg-slate-900" style={{ width: `${percentage}%` }} />
      </div>
    )
  }
  