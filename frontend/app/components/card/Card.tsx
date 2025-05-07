import React from 'react'

interface CardProps {
    title?: string;
    className?: string;
    children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ className="", children, title}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        {title? <p className='text-base font-bold text-slate-900'>{title}</p>: <></>}
        <div className='mt-2'>{children}</div>
    </div>
  )
}

export default Card

