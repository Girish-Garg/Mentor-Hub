import React, { useState } from "react";
import { ArrowBigUpDash, Bookmark } from "lucide-react";
import Badge from "./Badge";
import { cn } from "@/components/lib/utils.js";

const Question = ({
  className,
  title,
  description,
  author,
  uploadDate,
  tags = [],
  initialVotes = 0,
  onTitleClick,
  onUpvote,
  onBookmark,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(null);
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

  const handleTitleClick = () => {
    onTitleClick?.();
  };

  return (
    <div
      className={cn(
        "relative flex  rounded-md p-4 gap-4 max-w-5xl w-full h-[23%] transition-all duration-150 ",
        className
      )}
      
    >
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-0.5">
          <div className="flex gap-4 items-center">
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
            <span className="text-gray-700">{votes} upvotes</span>
            <span>{uploadDate}</span>
            <span>0 answers</span>
          </div>
          <button
            className={cn(
              "rounded hover:bg-yellow-50 transition-colors duration-150 flex-shrink-0 ml-2",
              isBookmarked && "text-yellow-500"
            )}
            onClick={handleBookmark}
          >
            <Bookmark
              className={cn(
                "transition-colors duration-150",
                isBookmarked
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-500 hover:text-yellow-500"
              )}
            />
          </button>
        </div>
        <p className="text-blue-600 font-medium text-sm hover:underline text-left cursor-pointer"
        onClick={handleTitleClick}
        >
          {title}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 text-left">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">
          <span className="text-gray-600">by {author}</span>
          {tags.slice(0, 4).map((tag, idx) => (
            <Badge key={idx} text={tag} varient="tag" />
          ))}
          {tags.length > 4 && (
            <span className='text-xs text-gray-500 px-3.5 py-0.5 rounded-full border-2 border-gray-300/50 bg-gray-50'>
              +{tags.length - 4} more
            </span>
          )}


        </div>
      </div>
    </div>
  );
};

export default Question;
