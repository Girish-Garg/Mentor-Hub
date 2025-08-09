import React from "react";
import { cn } from "../lib/utils";
import { ChevronLeft } from "lucide-react";
import Logo from "./logo";

const BackgroundWrapper = ({ children, className}) => {
  return (
    <div
      className={cn(
        "relative min-h-screen z-10 w-full bg-white dark:bg-black overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      ></div>

      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      <Logo className="absolute top-4 right-4 scale-75 sm:scale-100 sm:top-6 sm:right-6" />
{/* 
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
        <button
          onClick={onGoBack}
          className="flex items-center space-x-2 text-sm border border-gray-400 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition hover:cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-normal">Go back</span>
        </button>
      </div> */}

      <div className="relative z-10 ">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;
