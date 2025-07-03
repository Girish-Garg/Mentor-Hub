import React, { useState } from 'react'
import { cn } from '@/components/lib/utils'

/**
 * Badge Component - A versatile tag/badge component with support for different variants and interactive functionality
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the badge container
 * @param {string} props.text - The text content to display inside the badge
 * @param {string} [props.varient="filter"] - The variant style of the badge ("tag" | "filter")
 * @param {Function} [props.onClick] - Callback function when the badge is clicked (only works with "filter" variant). Receives boolean indicating new selection state
 * @param {boolean} [props.isSelected] - External control for selection state (for "filter" variant). When provided, overrides internal state
 * 
 */

const Badge = ({ className, text, varient = "filter", onClick, isSelected: externalSelected }) => {
    const [internalSelected, setInternalSelected] = useState(false)
    const isSelected = externalSelected !== undefined ? externalSelected : internalSelected
    
    const baseStyle = 'text-center border w-fit'

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