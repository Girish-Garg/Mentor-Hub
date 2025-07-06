import React, { useState } from "react";
import { ArrowBigUpDash, Bookmark } from "lucide-react";
import Badge from "./Badge";
import { cn } from "@/components/lib/utils";

/**
 * Event Component - A card component for displaying events with voting and follow functionality
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the main container
 * @param {string} props.title - The event title (will truncate with ellipsis if too long)
 * @param {string} props.description - The event description (shows max 2 lines with ellipsis)
 * @param {string} props.uploadTime - The time when event was posted (e.g., "2 hours")
 * @param {string} props.initialDate - The start date of the event
 * @param {string} [props.finalDate] - The end date of the event (optional, if not provided only initial date is shown)
 * @param {string[]} [props.tags=[]] - Array of tags (only first 4 will be shown, rest as "+X more")
 * @param {number} [props.initialVotes=0] - The initial upvote count
 * @param {string|null} [props.initialUserVote=null] - Initial user vote state ("up" or null)
 * @param {Function} [props.onTitleClick] - Callback when event title is clicked
 * @param {Function} [props.onUpvote] - Callback when upvote button is clicked. Receives boolean indicating if upvoted
 * @param {Function} [props.onFollow] - Callback when follow button is clicked. Receives boolean indicating if followed
 * @param {Function} [props.onLinkClick] - Callback when Link button is clicked
 * 
 */

const Events = ({
  className,
  title = "Untitled Event",
  description = "No description provided.",
  uploadTime = "Unknown",
  initialDate = "Unknown",
  finalDate,
  tags = [],
  initialVotes = 0,
  initialUserVote = null,
  onTitleClick,
  onUpvote,
  onFollow,
  onLinkClick,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(initialUserVote);
  const [isFollowing, setIsFollowing] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Unknown") return dateString;

    try {
      const [day, month, year] = dateString.split("/");
      const date = new Date(year, month - 1, day);

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedDay = parseInt(day);
      const formattedMonth = monthNames[date.getMonth()];
      const formattedYear = year.slice(-2);

      return `${formattedDay} ${formattedMonth}'${formattedYear}`;
    } catch (error) {
      return dateString;
    }
  };

  const formatDateDisplay = () => {
    const formattedInitial = formatDate(initialDate);
    if (finalDate && finalDate !== initialDate) {
      const formattedFinal = formatDate(finalDate);
      return `${formattedInitial} - ${formattedFinal}`;
    }
    return formattedInitial;
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (userVote === "up") {
      setUserVote(null);
      setVotes(votes - 1);
    } else {
      setUserVote("up");
      setVotes(votes + 1);
    }
    onUpvote?.(userVote !== "up");
  };

  const handleFollow = (e) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    onFollow?.(!isFollowing);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    onLinkClick?.();
  };

  const handleTitleClick = (e) => {
    e.stopPropagation();
    onTitleClick?.();
  };

  return (
    <div className={cn("relative flex p-4 max-w-5xl w-full h-[23%]", className)}>
      <div className="flex flex-col flex-1 min-w-0 gap-3">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex gap-5 items-center flex-wrap justify-center">
            <div className="flex items-center gap-4 justify-center">
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
                <ArrowBigUpDash
                  size={20}
                  className={cn(
                    "transition-colors duration-150",
                    userVote === "up" ? "text-red-600 hover:text-red-700" : "text-red-500"
                  )}
                />
              </button>
              <span className="text-gray-700 text-sm font-medium">{votes} upvotes</span>
            </div>
            <span className="text-sm font-medium">{formatDateDisplay()}</span>
            <span className="text-sm">{uploadTime} ago</span>
          </div>

          <div className="flex gap-1 items-center">
            <button
              className={cn(
                "font-semibold text-sm px-1 py-1 rounded transition-colors duration-150",
                isFollowing
                  ? "text-green-600 bg-green-50 hover:bg-green-100"
                  : "text-red-500 hover:text-red-600 hover:bg-red-50"
              )}
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button
              className="text-blue-500 font-semibold text-sm px-1 py-1 rounded hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
              onClick={handleLinkClick}
            >
              Link
            </button>
          </div>
        </div>

        <button
          className="text-left focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 rounded-sm"
          onClick={handleTitleClick}
        >
          <h3 className="w-fit text-blue-600 font-semibold text-lg hover:text-blue-700 hover:underline transition-colors duration-150 truncate">
            {title}
          </h3>
        </button>

        <p className="w-full text-sm text-gray-600 line-clamp-2 leading-relaxed text-ellipsis overflow-hidden">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {tags.slice(0, 6).map((tag, idx) => (
                <Badge
                  key={idx}
                  text={tag}
                  varient="tag"
                  className="h-[23px] items-center flex justify-center rounded-md"
                />
              ))}
              {tags.length > 6 && (
                <span className="flex items-center justify-center text-xs h-[23px] text-gray-500 px-2.5 py-0.5 rounded-md bg-gray-100 border border-gray-200 select-none leading-none">
                  +{tags.length - 6} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
