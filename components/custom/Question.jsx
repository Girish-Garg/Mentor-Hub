import React, { useState } from "react";
import { ArrowBigUpDash, Bookmark } from "lucide-react";
import Badge from "./Badge";
import { cn } from "@/components/lib/utils";

/**
 * Question Component - A card component for displaying Q&A forum questions with voting and bookmark functionality
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the main container
 * @param {string} props.title - The question title (will truncate with ellipsis if too long)
 * @param {string} props.description - The question description (shows max 2 lines with ellipsis)
 * @param {string} props.author - The author name (will truncate with ellipsis if too long)
 * @param {string} props.time - The time when question was posted (e.g., "2 hours")
 * @param {string[]} [props.tags=[]] - Array of tags (only first 4 will be shown, rest as "+X more")
 * @param {number} [props.answers=0] - Number of answers for this question
 * @param {number} [props.initialVotes=0] - The initial upvote count
 * @param {string|null} [props.initialUserVote=null] - Initial user vote state ("up" or null)
 * @param {Function} [props.onTitleClick] - Callback when question title is clicked
 * @param {Function} [props.onUpvote] - Callback when upvote button is clicked. Receives boolean indicating if upvoted
 * @param {Function} [props.onBookmark] - Callback when bookmark button is clicked. Receives boolean indicating if bookmarked
 * 
 */

const Question = ({
  className,
  title = "Untitled Question",
  description = "No description provided.",
  author = "Anonymous",
  time = "Unknown",
  tags = [],
  answers = 0,
  initialVotes = 0,
  initialUserVote = null,
  onTitleClick,
  onUpvote,
  onBookmark,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(initialUserVote);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (userVote === "up") {
      setUserVote(null);
      setVotes(votes - 1);
    } else {
      setUserVote("up");
      setVotes(votes + 1);
    }
    onUpvote?.(userVote!=="up");
};

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark?.(!isBookmarked);
  };

  const handleTitleClick = (e) => {
    e.stopPropagation();
    onTitleClick?.();
  };

  return (
    <div
      className={cn(
        "relative flex p-4 max-w-5xl w-full h-[23%]",
        className
      )}
    >
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-1.5">
          <div className="flex gap-4 items-center flex-wrap justify-center">
            <div className="flex items-center gap-2 justify-center">
              <button
                className={cn(
                  "text-center rounded-full border-2 border-black/10 p-1.5",
                  "transition-colors duration-150",
                  userVote === "up"
                    ? "bg-red-100 border-red-300 hover:bg-red-200 hover:border-red-400"
                    : "hover:bg-red-50 hover:border-red-200"
                )}
                onClick={handleUpvote}
              >
                <ArrowBigUpDash size={20}
                  className={cn(
                    "transition-colors duration-150",
                    userVote === "up"
                      ? "text-red-600 hover:text-red-700"
                      : "text-red-500"
                  )}
                />
              </button>
              <span className="text-gray-700 text-sm font-medium">{votes} upvotes</span>
            </div>
            <span className="text-sm font-medium">{answers} answers</span>
            <span className="text-sm">{time} ago</span>
          </div>
          <button
            className={cn(
              "group rounded hover:bg-yellow-50 transition-colors duration-150 flex-shrink-0 ml-2 p-1",
              isBookmarked && "text-yellow-500"
            )}
            onClick={handleBookmark}
          >
            <Bookmark
              size={18}
              className={cn(
                "transition-colors duration-150",
                isBookmarked
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-400 group-hover:text-yellow-500"
              )}
            />
          </button>
        </div>
        
        <button
          className="text-left focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 rounded-sm"
          onClick={handleTitleClick}
        >
          <h3 className="text-blue-600 font-semibold text-lg hover:text-blue-700 hover:underline transition-colors duration-150 truncate">
            {title}
          </h3>
        </button>
        
        <p className="w-full text-sm text-gray-600 line-clamp-2 leading-relaxed text-ellipsis overflow-hidden">
          {description}
        </p>
        
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-gray-600 text-sm truncate max-w-1/6">
            by <span className="font-medium">{author}</span>
          </span>
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {tags.slice(0, 4).map((tag, idx) => (
                <Badge key={idx} text={tag} varient="tag" />
              ))}
              {tags.length > 4 && (
                <span className='text-xs text-gray-500 px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 select-none leading-none'>
                  +{tags.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
