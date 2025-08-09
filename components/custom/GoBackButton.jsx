import React from "react";
import { ChevronLeft } from "lucide-react";

const GoBackButton = ({ onClick }) => {
  return (
    <div className="mt-6 mr-52 relative z-[16] scale-75 sm:scale-100">
      <button
        onClick={onClick}
        className=" flex items-center space-x-2 text-black border border-gray-400 px-5 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition hover:cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Go back
      </button>
    </div>
  );
};

export default GoBackButton;
