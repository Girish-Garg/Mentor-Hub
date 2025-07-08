import React from "react";
import Logo from "./logo";
import { Search, Bell, FilePen } from "lucide-react";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between w-[100vw] h-[6.151vw] px-4 py-2 ml-[2.083vw] bg-white">
      <Logo />
      <div className="flex items-center space-x-2">
        <div className="leading-tight ml-[1.25vw]">
          <p className="text-[0.521vw] text-[#FF6262]">
            An Student Initiative by M.B.M. University
          </p>
          <h1 className="text-[1.667vw] font-bold text-[#FF6262] -mt-1">
            MENTOR HUB
          </h1>
          <p className="text-[0.521vw] text-[#FF6262] -mt-1">
            Empowering Students with community
          </p>
        </div>
      </div>

      <div className="flex-1 ml-[2.083vw] relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5 ml-[1.354vw]" />
        </span>
        <input
          type="text"
          placeholder="Search Questions...."
          className="w-[50.729vw] ml-[1.272vw] pl-12  py-2 border border-[rgba(0,0,0,0.18)] rounded-[35px] outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <div className="flex items-center ">
        <button className="bg-[#FF5757] mr-[0.521vw] hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-full flex items-center ">
          <FilePen className="w-5 h-5" />
          <span>Add question</span>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="45"
          viewBox="0 0 44 45"
          fill="none"
          className="ml-[2.083vw] mr-[2.083vw]"
        >
          <path
            d="M18.8247 38.5486C19.1465 39.106 19.6094 39.5688 20.1668 39.8906C20.7242 40.2124 21.3564 40.3818 22 40.3818C22.6436 40.3818 23.2759 40.2124 23.8333 39.8906C24.3907 39.5688 24.8535 39.106 25.1754 38.5486"
            stroke="black"
            stroke-opacity="0.38"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.98046 28.1463C5.74096 28.4088 5.58291 28.7352 5.52553 29.0859C5.46815 29.4366 5.51391 29.7964 5.65725 30.1215C5.8006 30.4467 6.03534 30.7231 6.33293 30.9173C6.63051 31.1115 6.97812 31.215 7.33346 31.2153H36.6668C37.0221 31.2154 37.3698 31.1123 37.6675 30.9185C37.9653 30.7247 38.2004 30.4485 38.3441 30.1236C38.4878 29.7986 38.534 29.4389 38.4771 29.0882C38.4202 28.7375 38.2626 28.4109 38.0235 28.1481C35.5851 25.6346 33.0001 22.9634 33.0001 14.7153C33.0001 11.7979 31.8412 9.00001 29.7783 6.93711C27.7154 4.87421 24.9175 3.71528 22.0001 3.71528C19.0827 3.71528 16.2849 4.87421 14.222 6.93711C12.1591 9.00001 11.0001 11.7979 11.0001 14.7153C11.0001 22.9634 8.41329 25.6346 5.98046 28.1463Z"
            stroke="black"
            stroke-opacity="0.38"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <img
          src="your-profile-pic.jpg"
          className="w-8 h-8 mr-[2.083vw] rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default TopBar;
