import { ArrowBigDownDash, ArrowBigUpDash, Bookmark, File } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from '@/components/lib/utils'
import Badge from './Badge'

/**
 * Resource Component - A card component for displaying educational resources with voting and bookmark functionality
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the main container
 * @param {string} [props.title] - The title of the resource
 * @param {string} [props.author] - The author name
 * @param {string} [props.uploadDate] - The upload date in string format
 * @param {string[]} [props.tags] - Array of tags (only first 4 will be shown)
 * @param {number} [props.initialVotes] - The initial vote count for the resource
 * @param {string} [props.initialUserVote] - Initial user vote state ('up', 'down', or null)
 * @param {Function} [props.onResourceClick] - Callback function when the entire resource card is clicked
 * @param {Function} [props.onUpvote] - Callback function when upvote button is clicked. Receives boolean indicating if upvoted
 * @param {Function} [props.onDownvote] - Callback function when downvote button is clicked. Receives boolean indicating if downvoted
 * @param {Function} [props.onBookmark] - Callback function when bookmark button is clicked. Receives boolean indicating if bookmarked
 * 
**/
const Resource = ({ 
  className,
  title,
  author, 
  uploadDate,
  tags,
  initialVotes = 0,
  initialUserVote = null,
  onResourceClick,
  onUpvote,
  onDownvote,
  onBookmark
}) => {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState(initialUserVote) // null, 'up', or 'down'
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleUpvote = (e) => {
    e.stopPropagation()
    if (userVote === 'up') {
      setUserVote(null)
      setVotes(votes - 1)
    } else {
      const newVotes = userVote === 'down' ? votes + 2 : votes + 1
      setUserVote('up')
      setVotes(newVotes)
    }
    onUpvote?.(userVote !== 'up')
  }

  const handleDownvote = (e) => {
    e.stopPropagation()
    if (userVote === 'down') {
      setUserVote(null)
      setVotes(votes + 1)
    } else {
      const newVotes = userVote === 'up' ? votes - 2 : votes - 1
      setUserVote('down')
      setVotes(newVotes)
    }
    onDownvote?.(userVote !== 'down')
  }

  const handleBookmark = (e) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
    onBookmark?.(!isBookmarked)
  }

  const handleResourceClick = () => {
    onResourceClick?.()
  }
  return (
    <div 
      className={cn(
        'flex border-2 border-black/15 rounded-lg p-4 gap-4 h-fit m-1 max-w-[386px] w-fit',
        'hover:shadow-lg hover:border-black/25 transition-all duration-200 cursor-pointer',
        'hover:bg-gray-50/50',
        className
      )}
      onClick={handleResourceClick}
    >
        <div className='flex flex-col items-center justify-between'>
            <button 
              className={cn(
                'text-center rounded-full border-2 border-black/10 p-1.5',
                'transition-colors duration-150',
                userVote === 'up' 
                  ? 'bg-red-100 border-red-300 hover:bg-red-200 hover:border-red-400' 
                  : 'hover:bg-red-50 hover:border-red-200'
              )}
              onClick={handleUpvote}
            >
                <ArrowBigUpDash className={cn(
                  'transition-colors duration-150',
                  userVote === 'up' ? 'text-red-600 hover:text-red-700' : 'text-red-500'
                )}/>
            </button>
            <p className='text-xs font-medium'>{votes}</p>
            <button 
              className={cn(
                'text-center rounded-full border-2 border-black/10 p-1.5',
                'transition-colors duration-150',
                userVote === 'down' 
                  ? 'bg-sky-100 border-sky-300 hover:bg-sky-200 hover:border-sky-400' 
                  : 'hover:bg-sky-50 hover:border-sky-200'
              )}
              onClick={handleDownvote}
            >
                <ArrowBigDownDash className={cn(
                  'transition-colors duration-150',
                  userVote === 'down' ? 'text-sky-600 hover:text-sky-700' : 'text-sky-500'
                )}/>
            </button>
        </div>
        <div className='flex flex-col gap-1 flex-1 min-w-0'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-2 flex-1 min-w-0 max-w-[280px]'>
                    <File className='text-gray-600 flex-shrink-0'/>
                    <p className='text-2xl font-semibold truncate'>{title}</p>
                </div>
                <button 
                  className={cn(
                    'rounded hover:bg-yellow-50 transition-colors duration-150 flex-shrink-0 ml-2',
                    isBookmarked && 'text-yellow-500'
                  )}
                  onClick={handleBookmark}
                >
                  <Bookmark className={cn(
                    'transition-colors duration-150',
                    isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-500 hover:text-yellow-500'
                  )}/>
                </button>
            </div>
            <div className='flex flex-col gap-0.5'>
                <p className='text-gray-500 text-sm truncate max-w-[280px]'>By {author}</p>
                <p className='text-gray-500 text-xs'>Uploaded On: {uploadDate}</p>
            </div>
            <div className='flex gap-1 mt-1 flex-wrap'>
                {tags.slice(0, 4).map((tag, index) => (
                  <Badge key={index} text={tag} varient="tag"/>
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default Resource