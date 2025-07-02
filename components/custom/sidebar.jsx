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
  // Sample data for testing - comment out when using with real data
  /*
  const sampleFilterConfig = {
    tags: {
      title: "Tags",
      items: [
        { id: 'notices', label: 'Notices' },
        { id: 'events', label: 'Events' },
        { id: 'counselling', label: 'Counselling' },
        { id: 'resources', label: 'Resources' },
        { id: 'workshops', label: 'Workshops' },
        { id: 'mentorship', label: 'Mentorship' },
        { id: 'internships', label: 'Internships' },
        { id: 'placements', label: 'Placements' },
        { id: 'hackathons', label: 'Hackathons' },
        { id: 'competitions', label: 'Competitions' },
        { id: 'seminars', label: 'Seminars' },
        { id: 'webinars', label: 'Webinars' }
      ]
    },
    department: {
      title: "Department",
      items: [
        { id: 'cs', label: 'Computer Science' },
        { id: 'it', label: 'Information Technology' },
        { id: 'ece', label: 'Electronics & Communication' },
        { id: 'me', label: 'Mechanical Engineering' },
        { id: 'ce', label: 'Civil Engineering' },
        { id: 'ee', label: 'Electrical Engineering' },
        { id: 'mba', label: 'MBA' },
        { id: 'mca', label: 'MCA' },
        { id: 'chem', label: 'Chemical Engineering' },
        { id: 'bio', label: 'Biomedical Engineering' },
        { id: 'aero', label: 'Aerospace Engineering' },
        { id: 'auto', label: 'Automobile Engineering' },
        { id: 'textile', label: 'Textile Engineering' },
        { id: 'mining', label: 'Mining Engineering' },
        { id: 'metal', label: 'Metallurgical Engineering' },
        { id: 'food', label: 'Food Technology' },
        { id: 'marine', label: 'Marine Engineering' },
        { id: 'petro', label: 'Petroleum Engineering' },
        { id: 'enviro', label: 'Environmental Engineering' },
        { id: 'agri', label: 'Agricultural Engineering' },
        { id: 'arch', label: 'Architecture' },
        { id: 'physics', label: 'Physics' },
        { id: 'chem2', label: 'Chemistry' },
        { id: 'math', label: 'Mathematics' },
        { id: 'bio2', label: 'Biology' },
        { id: 'biotech', label: 'Biotechnology' },
        { id: 'micro', label: 'Microbiology' },
        { id: 'stats', label: 'Statistics' },
        { id: 'econ', label: 'Economics' },
        { id: 'bcom', label: 'B.Com' },
        { id: 'bba', label: 'BBA' },
        { id: 'finance', label: 'Finance' },
        { id: 'account', label: 'Accounting' },
        { id: 'marketing', label: 'Marketing' },
        { id: 'hr', label: 'Human Resources' },
        { id: 'law', label: 'Law' },
        { id: 'english', label: 'English Literature' },
        { id: 'hindi', label: 'Hindi Literature' },
        { id: 'history', label: 'History' },
        { id: 'geo', label: 'Geography' },
        { id: 'polsci', label: 'Political Science' },
        { id: 'socio', label: 'Sociology' },
        { id: 'psych', label: 'Psychology' },
        { id: 'philo', label: 'Philosophy' },
        { id: 'journal', label: 'Journalism' },
        { id: 'mass', label: 'Mass Communication' },
        { id: 'fashion', label: 'Fashion Design' },
        { id: 'graphic', label: 'Graphic Design' },
        { id: 'interior', label: 'Interior Design' },
        { id: 'fine', label: 'Fine Arts' },
        { id: 'music', label: 'Music' },
        { id: 'dance', label: 'Dance' },
        { id: 'theatre', label: 'Theatre Arts' },
        { id: 'film', label: 'Film Studies' },
        { id: 'photo', label: 'Photography' },
        { id: 'nursing', label: 'Nursing' },
        { id: 'pharma', label: 'Pharmacy' },
        { id: 'dental', label: 'Dental' },
        { id: 'physio', label: 'Physiotherapy' },
        { id: 'medical', label: 'Medical' }
      ]
    },
    academicYear: {
      title: "Academic Year",
      items: [
        { id: 'first', label: 'First Year' },
        { id: 'second', label: 'Second Year' },
        { id: 'third', label: 'Third Year' },
        { id: 'fourth', label: 'Final Year' },
        { id: 'masters', label: 'Masters' }
      ]
    }
  }
  */

  // Set default prop values
  if (!className) className = ''
  if (!onFilterChange) onFilterChange = null
  if (!initialFilters) initialFilters = { tags: ['notices'] } // Default selection
  if (!initialExpanded) initialExpanded = {}
  if (!filterConfig) {
    console.warn('Sidebar: No filterConfig provided. Please provide filter configuration.')
    return null // Return null if no config provided
  }
  if (!collapsedItemCount) collapsedItemCount = 4
  if (!title) title = "Filter by"

  // Initialize filter state - stores which items are selected for each category
  const [filters, setFilters] = useState(() => {
    const initialState = {}
    const categories = Object.keys(filterConfig)
    for (let i = 0; i < categories.length; i++) {
      const categoryKey = categories[i]
      initialState[categoryKey] = initialFilters[categoryKey] || []
    }
    return initialState
  })

  // Notify parent component of initial filter state on mount
  React.useEffect(() => {
    if (onFilterChange && Object.keys(filters).some(key => filters[key].length > 0)) {
      onFilterChange(filters)
    }
  }, []) // Only run on mount

  // Initialize expanded state - tracks which sections are expanded/collapsed
  const [expanded, setExpanded] = useState(() => {
    const initialState = {}
    const categories = Object.keys(filterConfig)
    for (let i = 0; i < categories.length; i++) {
      const categoryKey = categories[i]
      initialState[categoryKey] = initialExpanded[categoryKey] || false
    }
    return initialState
  })

  // Check if a specific filter item is currently selected
  function isFilterSelected(category, value) {
    if (filters[category] && filters[category].includes(value)) {
      return true
    }
    return false
  }

  // Handle filter selection for regular sections (department, academic year)
  // Supports multiple selection (checkbox behavior)
  function handleFilterClick(category, value) {
    const currentFilters = filters[category] || []
    const isSelected = currentFilters.includes(value)
    
    let updatedCategory
    if (isSelected) {
      // Remove from selection
      updatedCategory = currentFilters.filter(item => item !== value)
    } else {
      // Add to selection
      updatedCategory = [...currentFilters, value]
    }
    
    const updatedFilters = {
      ...filters,
      [category]: updatedCategory
    }
    
    setFilters(updatedFilters)
    
    // Notify parent component of filter changes
    if (onFilterChange) {
      onFilterChange(updatedFilters)
    }
  }

  // Special handler for tags section - single selection (radio button behavior)
  // Always keeps at least one tag selected
  function handleTagsFilterClick(category, value) {
    const currentFilters = filters[category] || []
    const isSelected = currentFilters.includes(value)
    
    let updatedCategory
    
    // Prevent deselecting the only selected tag
    if (isSelected && currentFilters.length === 1) {
      return
    }
    
    if (isSelected) {
      // Remove from selection (only if other tags are selected)
      updatedCategory = currentFilters.filter(item => item !== value)
    } else {
      // Replace current selection with new selection (single select)
      updatedCategory = [value]
    }
    
    const updatedFilters = {
      ...filters,
      [category]: updatedCategory
    }
    
    setFilters(updatedFilters)
    
    // Notify parent component of filter changes
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
      // Selected state: blue background
      return {
        backgroundColor: '#007bff',
        color: 'white',
        borderColor: '#007bff'
      }
    } else {
      // Unselected state: gray background
      return {
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        borderColor: '#e9ecef'
      }
    }
  }


  // Build filter sections from configuration
  const filterSections = []
  const categories = Object.keys(filterConfig)
  
  for (let i = 0; i < categories.length; i++) {
    const categoryKey = categories[i]
    const config = filterConfig[categoryKey]
    const isExpanded = expanded[categoryKey]
    
    // Determine which items to show based on expanded state
    let visibleItems
    if (isExpanded) {
      visibleItems = config.items // Show all items
    } else {
      visibleItems = config.items.slice(0, collapsedItemCount) // Show limited items
    }
    
    filterSections.push(
      <FilterSection
        key={categoryKey}
        title={config.title}
        categoryKey={categoryKey}
        visibleItems={visibleItems}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        handleFilterClick={handleFilterClick}
        handleTagsFilterClick={handleTagsFilterClick}
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

/**
 * Sidebar header component - displays the main title
 */
function SidebarHeader({ title }) {
  return (
    <div className="mb-6">
      <h2 
        className="text-xl font-semibold" 
        style={{ color: '#000000' }}
      >
        {title}
      </h2>
    </div>
  )
}

/**
 * Individual filter section component
 * Handles rendering of one category (tags, department, etc.)
 */
function FilterSection({
  title,
  categoryKey,
  visibleItems,
  isExpanded,
  toggleExpand,
  handleFilterClick,
  handleTagsFilterClick,
  isFilterSelected,
  getBadgeStyle
}) {
  function handleToggleExpand() {
    toggleExpand(categoryKey)
  }

  // Tags section has special behavior: no header, scrollable area
  const shouldShowHeader = categoryKey !== 'tags'
  const isTagsSection = categoryKey === 'tags'
  
  // Use appropriate click handler based on category type
  const clickHandler = isTagsSection ? handleTagsFilterClick : handleFilterClick

  return (
    <div className="mb-6">
      {shouldShowHeader && (
        <FilterSectionHeader
          title={title}
          categoryKey={categoryKey}
          isExpanded={isExpanded}
          onToggleExpand={handleToggleExpand}
        />
      )}
      
      <div className={`flex flex-wrap gap-2 ${isTagsSection ? 'max-h-32 overflow-y-auto' : ''}`}>
        {visibleItems.map(item => (
          <FilterBadge
            key={item.id}
            item={item}
            categoryKey={categoryKey}
            isSelected={isFilterSelected(categoryKey, item.id)}
            style={getBadgeStyle(categoryKey, item.id)}
            onClick={clickHandler}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Section header with expand/collapse functionality
 * Includes keyboard accessibility
 */
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
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`Toggle ${title} section`}
    >
      <h3 
        className="text-sm font-medium" 
        style={{ color: '#000000' }}
      >
        {title}
      </h3>
      <button className="text-gray-400 hover:text-gray-600" aria-hidden="true">
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  )
}

/**
 * Individual filter badge component
 * Renders a clickable badge for each filter option
 */
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
- Expandable sections with collapse/expand arrows
- Special tags section behavior (always one selected)
- Calls your function when user clicks anything

FEATURES:
- Tags section: Single selection (radio button behavior), no heading
- Other sections: Multiple selection (checkbox behavior), with headings
- Custom scrollbar for tags section
- Responsive design

===============================================================================
*/

// NOTES:
// width: 256px, height: auto (grows with content)
// badge size: depends on text  
// use for infinite scroll if needed
