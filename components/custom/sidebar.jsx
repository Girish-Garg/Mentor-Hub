import React, { useState } from 'react'
import Badge from '@/components/custom/Badge'
import { cn } from '@/components/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

function Sidebar({ 
  className, 
  onFilterChange,
  initialFilters,
  initialExpanded,
  filterConfig,
  collapsedItemCount,
  title
}) {
  // Set default prop values
  if (!className) className = ''
  if (!onFilterChange) onFilterChange = null
  if (!initialFilters) initialFilters = { tags: ['notices'] }
  if (!initialExpanded) initialExpanded = {}
  if (!filterConfig) {
    console.warn('Sidebar: No filterConfig provided. Please provide filter configuration.')
    return null
  }
  if (!collapsedItemCount) collapsedItemCount = 4
  if (!title) title = "Filter by"

  // Initialize filter state
  const [filters, setFilters] = useState(() => {
    const initialState = {}
    const categories = Object.keys(filterConfig)
    for (let i = 0; i < categories.length; i++) {
      const categoryKey = categories[i]
      initialState[categoryKey] = initialFilters[categoryKey] || []
    }
    return initialState
  })

  // Initialize expanded state
  const [expanded, setExpanded] = useState(() => {
    const initialState = {}
    const categories = Object.keys(filterConfig)
    for (let i = 0; i < categories.length; i++) {
      const categoryKey = categories[i]
      initialState[categoryKey] = initialExpanded[categoryKey] || false
    }
    return initialState
  })

  // Notify parent component of initial filter state on mount
  React.useEffect(() => {
    if (onFilterChange && Object.keys(filters).some(key => filters[key].length > 0)) {
      onFilterChange(filters)
    }
  }, [])

  // Check if a specific filter item is currently selected
  function isFilterSelected(category, value) {
    if (filters[category] && filters[category].includes(value)) {
      return true
    }
    return false
  }

  // Handle filter selection for regular sections (department, academic year)
  function handleFilterClick(category, value) {
    const currentFilters = filters[category] || []
    const isSelected = currentFilters.includes(value)
    
    let updatedCategory
    if (isSelected) {
      updatedCategory = currentFilters.filter(item => item !== value)
    } else {
      updatedCategory = [...currentFilters, value]
    }
    
    const updatedFilters = {
      ...filters,
      [category]: updatedCategory
    }
    
    setFilters(updatedFilters)
    
    if (onFilterChange) {
      onFilterChange(updatedFilters)
    }
  }

  // Special handler for tags section - single selection
  function handleTagsFilterClick(category, value) {
    const currentFilters = filters[category] || []
    const isSelected = currentFilters.includes(value)
    
    let updatedCategory
    
    // Prevent deselecting the only selected tag
    if (isSelected && currentFilters.length === 1) {
      return
    }
    
    if (isSelected) {
      updatedCategory = currentFilters.filter(item => item !== value)
    } else {
      updatedCategory = [value]
    }
    
    const updatedFilters = {
      ...filters,
      [category]: updatedCategory
    }
    
    setFilters(updatedFilters)
    
    if (onFilterChange) {
      onFilterChange(updatedFilters)
    }
  }

  // Toggle expand/collapse state for a section
  function toggleExpand(section) {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    })
  }

  // Generate badge styling based on selection state
  function getBadgeStyle(category, value) {
    if (isFilterSelected(category, value)) {
      return {
        backgroundColor: '#007bff',
        color: 'white',
        borderColor: '#007bff'
      }
    } else {
      return {
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        borderColor: '#e9ecef'
      }
    }
  }

  return (
    <div 
      className={cn(
        'bg-white flex flex-col w-64 h-screen overflow-x-auto py-6 px-4',
        className
      )}
    >
      {/* Header */}
      <div className="mb-3 flex-shrink-0">
        <h2 
          className="text-xl font-semibold" 
          style={{ color: '#000000' }}
        >
          {title}
        </h2>
      </div>

      {/* Filter Sections */}
      <div className="flex-1 min-w-0">
        {Object.keys(filterConfig).map(categoryKey => {
          const config = filterConfig[categoryKey]
          const isExpanded = expanded[categoryKey]
          const isTagsSection = categoryKey === 'tags'
          const shouldShowHeader = categoryKey !== 'tags'
          const clickHandler = isTagsSection ? handleTagsFilterClick : handleFilterClick
          
          // Determine which items to show based on expanded state
          let visibleItems
          if (isExpanded) {
            visibleItems = config.items
          } else {
            visibleItems = config.items.slice(0, collapsedItemCount)
          }

          return (
            <div key={categoryKey} className="mb-6 flex-shrink-0">
              {/* Section Header */}
              {shouldShowHeader && (
                <div 
                  className="flex items-center justify-between mb-3 cursor-pointer"
                  onClick={() => toggleExpand(categoryKey)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleExpand(categoryKey)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-label={`Toggle ${config.title} section`}
                >
                  <h3 
                    className="text-sm font-medium" 
                    style={{ color: '#000000' }}
                  >
                    {config.title}
                  </h3>
                  <button className="text-gray-400 hover:text-gray-600" aria-hidden="true">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              )}
              
              {/* Filter Items */}
              <div className="flex flex-wrap gap-x-2 gap-y-3 min-w-0">
                {visibleItems.map(item => (
                  <Badge
                    key={item.id}
                    text={item.label}
                    varient="filter"
                    isSelected={isFilterSelected(categoryKey, item.id)}
                    onClick={() => clickHandler(categoryKey, item.id)}
                    className="text-xs px-3 py-1.5 rounded-full border flex-shrink-0"
                    style={getBadgeStyle(categoryKey, item.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar


