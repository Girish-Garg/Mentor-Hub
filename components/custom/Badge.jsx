import React, { useState } from 'react'
import { cn } from '@/lib/utils'

const Badge = ({ className, text, varient = "filter", onClick, isSelected: externalSelected }) => {
    const [internalSelected, setInternalSelected] = useState(false)
    const isSelected = externalSelected !== undefined ? externalSelected : internalSelected
    
    const baseStyle = 'text-center border-2 w-fit'

    const varientStyles = {
        tag: 'px-3.5 py-0.5 rounded-full border-blue-300/80',
        filter: cn(
            'px-7 py-3 rounded-2xl transition-all duration-200 ease-in-out',
            'hover:cursor-pointer active:scale-95',
            isSelected 
                ? 'bg-blue-500 border-blue-600 text-white hover:bg-blue-600 hover:border-blue-700' 
                : 'border-blue-300/80 hover:bg-blue-50 hover:border-blue-400 active:bg-blue-100 active:border-blue-500'
        )
    }

    const handleClick = () => {
        if (varient === 'filter') {
            if (externalSelected === undefined) {
                setInternalSelected(!internalSelected)
            }
            if (onClick) {
                onClick(!isSelected)
            }
        }
    }

    const isClickable = varient === 'filter'
  return (
    <div className={cn(baseStyle, varientStyles[varient], className)}
        onClick={isClickable ? handleClick : undefined}>
        <p className='text-xs leading-none select-none'>{text}</p>
    </div>
  )
}

export default Badge