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
  //for testing - remove later
  const tempFilterConfig = {
    tags: {
      title: "Tags",
      items: [
        { id: 'dummy1', label: 'Dummy Tag 1' },
        { id: 'dummy2', label: 'Dummy Tag 2' },
        { id: 'dummy3', label: 'Dummy Tag 3' },
        { id: 'dummy4', label: 'Dummy Tag 4' },
        { id: 'dummy5', label: 'Dummy Tag 5' },
        { id: 'dummy6', label: 'Dummy Tag 6' },
        { id: 'dummy7', label: 'Dummy Tag 7' },
        { id: 'dummy8', label: 'Dummy Tag 8' },
        { id: 'dummy9', label: 'Dummy Tag 9' },
        { id: 'dummy10', label: 'Dummy Tag 10' },
        { id: 'dummy11', label: 'Dummy Tag 11' }
      ]
    },
    department: {
      title: "Department",
      items: [
        { id: 'dept1', label: 'Dept A' },
        { id: 'dept2', label: 'Dept B' },
        { id: 'dept3', label: 'Dept C' },
        { id: 'dept4', label: 'Dept D' },
        { id: 'dept5', label: 'Dept E' },
        { id: 'dept6', label: 'Dept F' }
      ]
    },
    academicYear: {
      title: "Academic Year",
      items: [
        { id: 'year1', label: 'Year One' },
        { id: 'year2', label: 'Year Two' },
        { id: 'year3', label: 'Year Three' },
        { id: 'year4', label: 'Year Four' },
        { id: 'year5', label: 'Year Five' }
      ]
    }
  }

  // set default props if not provided
  if (!className) className = ''
  if (!onFilterChange) onFilterChange = null
  if (!initialFilters) initialFilters = {}
  if (!initialExpanded) initialExpanded = {}
  if (!filterConfig) filterConfig = tempFilterConfig //change to {} when using real data
  if (!collapsedItemCount) collapsedItemCount = 4
  if (!title) title = "Filter by"

  // make initial filter state
  const [filters, setFilters] = useState(() => {
    const initialState = {}
    const categories = Object.keys(filterConfig)
    for (let i = 0; i < categories.length; i++) {
      const categoryKey = categories[i]
      initialState[categoryKey] = initialFilters[categoryKey] || []
    }
    return initialState
  })

  // make initial expanded state  
  const [expanded, setExpanded] = useState(() => {
    const initialState = {}
    const categories = Object.keys(filterConfig)
    for (let i = 0; i < categories.length; i++) {
      const categoryKey = categories[i]
      initialState[categoryKey] = initialExpanded[categoryKey] || false
    }
    return initialState
  })

  // check if a badge is selected
  function isFilterSelected(category, value) {
    if (filters[category] && filters[category].includes(value)) {
      return true
    }
    return false
  }

  // when user clicks a badge
  function handleFilterClick(category, value) {
    const currentFilters = filters[category] || []
    const isSelected = currentFilters.includes(value)
    
    let updatedCategory
    if (isSelected) {
      // remove it from list
      updatedCategory = currentFilters.filter(item => item !== value)
    } else {
      // add it to list
      updatedCategory = [...currentFilters, value]
    }
    
    const updatedFilters = {
      ...filters,
      [category]: updatedCategory
    }
    
    setFilters(updatedFilters)
    
    // tell parent what changed
    if (onFilterChange) {
      onFilterChange(updatedFilters)
    }
  }

  // show/hide more badges
  function toggleExpand(section) {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    })
  }

  // decide badge color
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


  // build all the sections
  const filterSections = []
  const categories = Object.keys(filterConfig)
  
  for (let i = 0; i < categories.length; i++) {
    const categoryKey = categories[i]
    const config = filterConfig[categoryKey]
    const isExpanded = expanded[categoryKey]
    
    let visibleItems
    if (isExpanded) {
      visibleItems = config.items
    } else {
      visibleItems = config.items.slice(0, collapsedItemCount)
    }
    
    const hasMoreItems = !isExpanded && config.items.length > collapsedItemCount
    const moreItemsCount = config.items.length - collapsedItemCount

    filterSections.push(
      <FilterSection
        key={categoryKey}
        title={config.title}
        categoryKey={categoryKey}
        visibleItems={visibleItems}
        hasMoreItems={hasMoreItems}
        moreItemsCount={moreItemsCount}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        handleFilterClick={handleFilterClick}
        isFilterSelected={isFilterSelected}
        getBadgeStyle={getBadgeStyle}
      />
    )
  }

  return (
    <div 
      className={cn(
        'bg-white flex flex-col w-64 py-6 px-4',
        className
      )}
    >
      <SidebarHeader title={title} />
      {filterSections}
    </div>
  )
}

// title at top
function SidebarHeader({ title }) {
  return (
    <div className="mb-6">
      <h2 
        className="text-base font-semibold" 
        style={{ color: '#000000' }}
      >
        {title}
      </h2>
    </div>
  )
}

// one section like tags or department  
function FilterSection({
  title,
  categoryKey,
  visibleItems,
  hasMoreItems,
  moreItemsCount,
  isExpanded,
  toggleExpand,
  handleFilterClick,
  isFilterSelected,
  getBadgeStyle
}) {
  function handleToggleExpand() {
    toggleExpand(categoryKey)
  }

  function handleMoreClick() {
    toggleExpand(categoryKey)
  }

  return (
    <div className="mb-6">
      <FilterSectionHeader
        title={title}
        categoryKey={categoryKey}
        isExpanded={isExpanded}
        onToggleExpand={handleToggleExpand}
      />
      
      <div className="flex flex-wrap gap-2">
        {visibleItems.map(item => (
          <FilterBadge
            key={item.id}
            item={item}
            categoryKey={categoryKey}
            isSelected={isFilterSelected(categoryKey, item.id)}
            style={getBadgeStyle(categoryKey, item.id)}
            onClick={handleFilterClick}
          />
        ))}
        
        {hasMoreItems && (
          <MoreButton
            count={moreItemsCount}
            onClick={handleMoreClick}
          />
        )}
      </div>
    </div>
  )
}

// section title with arrow
function FilterSectionHeader({ title, categoryKey, isExpanded, onToggleExpand }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggleExpand()
    }
  }

  return (
    <div 
      className="flex items-center justify-between mb-3 cursor-pointer"
      onClick={onToggleExpand}
      onKeyDown={handleKeyDown}
    >
      <h3 
        className="text-sm font-medium" 
        style={{ color: '#000000' }}
      >
        {title}
      </h3>
      <button className="text-gray-400 hover:text-gray-600">
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  )
}

// one badge button
function FilterBadge({ item, categoryKey, isSelected, style, onClick }) {
  function handleClick() {
    onClick(categoryKey, item.id)
  }

  return (
    <Badge
      text={item.label}
      varient="filter"
      isSelected={isSelected}
      onClick={handleClick}
      className="text-xs px-3 py-1.5 rounded-full border"
      style={style}
    />
  )
}

// +5 more button
function MoreButton({ count, onClick }) {
  return (
    <button 
      className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1"
      onClick={onClick}
    >
      +{count} more
    </button>
  )
}

export default Sidebar

/*
===============================================================================
                         SIMPLE SIDEBAR FILTER COMPONENT
===============================================================================

WHAT IT DOES:
Makes a sidebar with clickable badges to filter stuff.

HOW TO USE:
1. Make your data like this:
const myData = {
  category1: {
    title: "Category 1",
    items: [
      { id: 'item1', label: 'Item 1' },
      { id: 'item2', label: 'Item 2' }
    ]
  }
}

2. Use it like this:
<Sidebar 
  filterConfig={myData}
  onFilterChange={(selected) => {
    console.log('User picked:', selected)
  }}
/>

WHAT YOU GET:
- Click badges to select/unselect them
- Blue = selected, gray = not selected  
- Shows 4 badges then "+X more" button
- Calls your function when user clicks anything


===============================================================================
*/

// NOTES:
// width: 256px, height: auto (grows with content)
// badge size: depends on text  
// use for infinite scroll if needed
