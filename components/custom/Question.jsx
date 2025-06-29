import React, { useState } from "react";
import { ArrowBigUpDash, Bookmark } from "lucide-react";
import Badge from "./Badge";
import { cn } from "@/lib/utils";

const Question = ({
  className,
  title,
  description,
  author,
  uploadDate,
  tags = [],
  initialVotes = 0,
  onResourceClick,
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
      setVotes(userVote === "down" ? votes + 2 : votes + 1);
    }
    onUpvote?.(userVote !== "up");
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark?.(!isBookmarked);
  };

  const handleResourceClick = () => {
    onResourceClick?.();
  };

  return (
    <div
      className={cn(
        "relative flex  rounded-md p-4 gap-4 max-w-5xl w-full transition-all duration-150 cursor-pointer ",
        className
      )}
      onClick={handleResourceClick}
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
        <p className="text-blue-600 font-medium text-sm hover:underline text-left">
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
        </div>
      </div>
    </div>
  );
};

export default Question;
