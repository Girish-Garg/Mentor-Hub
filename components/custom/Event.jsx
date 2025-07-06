import React, { useState } from "react";
import { ArrowBigUpDash, Bookmark } from "lucide-react";
import Badge from "./Badge";
import { cn } from "@/components/lib/utils";

const Events = ({
  className,
  title = "Untitled Event",
  description = "No description provided",
  uploadTime = "Unknown",
  uploadDate,
  tags = [],
  initialVotes = 0,
  onTitleClick,
  onUpvote,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(null);

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

  const handleTitleClick = () => {
    onTitleClick?.();
  };

  return (
    <div
      className={cn(
        "relative flex  rounded-md p-4 gap-4 max-w-5xl w-full transition-all duration-150  ",
        className
      )}
    >
      <div className="flex flex-col flex-1 min-w-0 gap-3">
        <div className="flex justify-between items-center text-xs text-gray-500">
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
              <ArrowBigUpDash
                size={20}
                className={cn(
                  "transition-colors duration-150",
                  userVote === "up"
                    ? "text-red-600 hover:text-red-700"
                    : "text-red-500"
                )}
              />
            </button>
            <span className="text-gray-700 ">{votes} upvotes</span>
            <span className="ml-1">{uploadTime}</span>
            <span className="ml-1">{uploadDate}</span>
          </div>
          <div className="flex gap-2.5 items-center cursor-pointer">
            <button className="text-red-500 font-semibold">Follow</button>
            <button className="text-blue-500 font-semibold">Link</button>
          </div>
        </div>
        <p
          className="text-blue-600 font-normal text-[20px] hover:underline cursor-pointer text-left mt-0"
          onClick={handleTitleClick}
        >
          {title}
        </p>
        <p className="text-sm text-gray-600 text-[20px] line-clamp-2 text-left">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-2 ">
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {tags.slice(0, 6).map((tag, idx) => (
                <Badge key={idx} text={tag} varient="tag" className="h-[23px] items-center flex justify-center rounded-md border-1"/>
              ))}
              {tags.length > 6 && (
                <span className='text-xs text-gray-500 px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 select-none leading-none'>
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
