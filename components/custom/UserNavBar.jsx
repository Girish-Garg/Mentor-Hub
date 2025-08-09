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
import { useNavigate } from "react-router-dom";
import { cn } from "@/components/lib/utils";

const useSafeNavigate = () => {
  try {
    return useNavigate();
  } catch (error) {
    // Fallback when React Router is not available
    return (path) => {
      console.log(`Navigation to ${path} (React Router not available)`);
      // You can add window.location.href = path here if needed
    };
  }
};

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

const Navbar = ({ activeItem = null , className }) => {
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [internalActiveItem, setInternalActiveItem] = useState(activeItem);
  const navigate = useSafeNavigate();

  const currentActiveItem = activeItem || internalActiveItem;

  return (
    <div className={cn("w-full border-b bg-white", 
    className
    )}>
      <nav className="flex justify-end items-center mr-[2vw] gap-[3.25vw] relative">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentActiveItem === item.label;
          return (
            <div
              key={index}
              onClick={() => {
                console.log(`${item.label} clicked`);
                setInternalActiveItem(item.label);
                navigate("/");
              }}
              className="group flex flex-col items-center cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-center px-2 gap-3">
                <Icon className={`w-[1.25vw] aspect-square text-black ${isActive ? 'text-red-600 group-hover:text-red-500' : 'group-hover:text-red-600'}`} />
                <span className={`text-sm text-[1vw] text-black ${isActive ? 'text-red-600 group-hover:text-red-500' : 'group-hover:text-red-600'}`}>{item.label}</span>
              </div>
              <div className={`h-[2px] mt-2 rounded-t transition-all duration-300 ${
                isActive 
                  ? 'w-full bg-red-600 group-hover:bg-red-500' 
                  : 'w-0 bg-transparent group-hover:w-full group-hover:bg-red-600'
              }`}></div>
            </div>
          );
        })}

        <div className="relative ">
          <div
            onClick={() => setShowMoreDropdown(!showMoreDropdown)}
            className="group flex flex-col items-center cursor-pointer text-black  hover:text-red-600 transition-colors duration-200"
          >
            <div className="flex items-center gap-2 px-2">
              {showMoreDropdown ? (
              <XCircle className="w-[1.25vw] aspect-square" />
            ) : (
              <MoreHorizontal className="w-[1.25vw] aspect-square" />
            )}
              <span className="text-sm text-[1vw]">More Options</span>
            </div>
              <div className="w-0 h-[2px] mt-2 rounded-t bg-transparent group-hover:w-full group-hover:bg-red-600 transition-all duration-300"></div>
          </div>

          {showMoreDropdown && (
            <div className="absolute -right-11 top-[100%] h-fit bg-red-50 border py-7 pr-9 rounded-bl-[3.125vw] z-10 flex flex-col justify-center gap-2">
              {moreOptions.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentActiveItem === item.label;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      console.log(`${item.label} clicked`);
                      setInternalActiveItem(item.label);
                      setShowMoreDropdown(false);
                      navigate("/");
                    }}
                    className="group flex items-center ml-9 gap-3 cursor-pointer transition"
                  >
                    <Icon className={`w-[1.25vw] aspect-square text-black ${isActive ? 'text-red-600 group-hover:text-red-700' : 'group-hover:text-red-400'}`} />
                    <span className={`text-[1vw] text-black ${isActive ? 'text-red-600 group-hover:text-red-700' : 'group-hover:text-red-400'}`}>{item.label}</span>
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
