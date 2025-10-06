import React from "react";
import menu from "../assets/menu.png";
import navbar1 from "../assets/navbar.svg";

interface HeaderProps {
  onMenuClick: () => void;
}
const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="relative z-50 container mx-auto">
      <div className="container mx-auto fixed top-0 z-50 p-3 backdrop-blur-md rounded-b-xl shadow-md border-b border-white/10">
        <img
          src={
            "https://static.tildacdn.net/tild3835-6630-4030-b538-353064656336/Vector13.svg"
          }
          alt="Navbar"
          className="w-full sm:hidden"
        />
        <img src={navbar1} alt="" className="w-full hidden sm:inline-block" />
      </div>
      <div
        className="nav-top"
        onClick={onMenuClick}
      >
        <div
         className="nav-icon-bg">
          <img src={menu} alt="Menu" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#87F1FF] text-sm font-semibold">MENU</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
