import React, { useState } from "react";
import {
  Home,
  Landmark,
  BookText,
  Ticket,
  HelpCircle,
  MessageSquare,
  MoreHorizontal,
  XCircle,
  Bookmark,
  FileText
} from "lucide-react";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Department", icon: Landmark },
  { label: "Resources", icon: BookText },
  { label: "Events", icon: Ticket },
  { label: "Your Questions", icon: HelpCircle },
  { label: "Answered Questions", icon: MessageSquare }
];

const moreOptions = [
  { label: "Bookmarked", icon: Bookmark },
  { label: "Results", icon: FileText }
];

const Navbar = () => {
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  return (
    <div className="w-full border-b bg-white">
      <nav className="flex justify-end items-center mr-[3vw] gap-[3.25vw] relative">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              onClick={() => console.log(`${item.label} clicked`)}
              className="group flex flex-col items-center cursor-pointer text-black hover:text-red-600 transition-colors duration-200"
            >
              <div className="flex items-center px-2 gap-3">
                <Icon className="w-[1.25vw] aspect-square" />
                <span className="text-sm text-[1vw]">{item.label}</span>
              </div>
              <div className="w-0 h-[2px] mt-3 rounded-t bg-transparent group-hover:w-full group-hover:bg-red-600 transition-all duration-300"></div>
            </div>
          );
        })}

        <div className="relative ">
          <div
            onClick={() => setShowMoreDropdown(!showMoreDropdown)}
            className="flex flex-col items-center cursor-pointer text-black  hover:text-red-600 transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              {showMoreDropdown ? (
  <XCircle className="w-[1.25vw] aspect-square" />
) : (
  <MoreHorizontal className="w-[1.25vw] aspect-square" />
)}
              <span className="text-sm text-[1vw]">More Options</span>
            </div>
              <div className="w-0 h-[2px] mt-3 rounded-t bg-transparent group-hover:w-full group-hover:bg-red-600 transition-all duration-300"></div>

          </div>

          {showMoreDropdown && (
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2  w-[11.24vw] h-[10.74vh]  bg-red-50 p-12 rounded-bl-[3.125vw] shadow-lg z-10 flex flex-col  justify-center gap-2">
              {moreOptions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    onClick={() => console.log(`${item.label} clicked`)}
                    className="flex items-center gap-3 text-black hover:text-red-600 cursor-pointer transition"
                  >
                    <Icon className="w-[1.25vw] aspect-square" />
                    <span className="text-[1vw]">{item.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
