import React from "react";
import Logo from "./logo";
import { Search, Bell, FilePen } from "lucide-react";

/**
 * TopBar Component - A navigation bar component
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.buttonText - Text for the button
 * @param {Function} props.onButtonClick - Callback function when the button is clicked
 * @param {Function} props.onSearch - Callback function for search input change
 * @param {Function} props.onAvatarClick - Callback function when the avatar is clicked
 * @param {Function} props.onBellIcon - Callback function when the bell icon is clicked
 * 
 */

const TopBar = ({buttonText, onButtonClick, onSearch, onAvatarClick, onBellIcon}) => {
  return (
    <div className="flex items-center justify-around w-[100vw] h-[6.151vw] bg-white" style={{ paddingTop: '0.417vh', paddingBottom: '0.417vh', paddingLeft: '2.083vw', paddingRight: '2.083vw' }}>
      <div className="flex items-center" style={{ gap: '1.25vw' }}>
        <Logo className="scale-95"/>
        <div className="leading-tight select-none">
          <p className="text-[0.521vw] text-[#FF6262]">
            An Student Initiative by M.B.M. University
          </p>
          <h1 className="text-[1.667vw] font-bold text-[#FF6262]" style={{ marginTop: '-0.2vh' }}>
            MENTOR HUB
          </h1>
          <p className="text-[0.521vw] text-[#FF6262]" style={{ marginTop: '-0.2vh' }}>
            Empowering Students with community
          </p>
        </div>
      </div>

      <div className="relative" style={{ width: '50.729vw', height: '5.985vh' }}>
        <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-400" style={{ left: '1.042vw' }}>
          <Search style={{ width: '1.2vw', height: '1.2vw' }} />
        </span>
        <input
          type="text"
          placeholder="Search Questions...."
          className="w-full h-full border border-[rgba(0,0,0,0.18)] rounded-[35px] outline-none focus:ring-2 focus:ring-red-400"
          style={{ paddingLeft: '3.125vw', paddingRight: '1.042vw', fontSize: '1vw' }}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <button onClick={onButtonClick} className="bg-[#FF5757] hover:bg-red-500 text-white font-semibold rounded-full flex items-center justify-center transition-colors hover:cursor-pointer" style={{ paddingLeft: '1.25vw', paddingRight: '1.25vw', gap: '0.621vw', height: '5.9vh', fontSize: '0.833vw' }}>
        <FilePen className="scale-75" />
        <span className="whitespace-nowrap text-[1vw]">{buttonText}</span>
      </button>

      <button style={{ padding: '0.521vh' }} onClick={onBellIcon}>
        <Bell style={{ width: '1.458vw', height: '1.458vw', color: 'rgba(0,0,0,0.6)' }} />
      </button>

      <img onClick={onAvatarClick}
        src="your-profile-pic.jpg"
        className="rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-red-400 transition-all"
        style={{ width: '2.083vw', height: '2.083vw' }}
        alt="Profile"
      />
    </div>
  );
};

export default TopBar;
