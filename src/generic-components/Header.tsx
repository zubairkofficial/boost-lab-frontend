import React from "react";
import menu from "../assets/menu.png";
import navbar1 from "../assets/navbar.svg";

interface HeaderProps {
  onMenuClick: () => void;
}
const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="relative z-50">
      <div className="container mx-auto fixed top-0 z-50 p-3 px-10 backdrop-blur-md rounded-b-xl shadow-md border-b border-white/10">
        <img src={navbar1} alt="Navbar" className="w-full" />
      </div>
      <div
        className="z-[60] fixed top-8 right-0 sm:right-10"
        onClick={onMenuClick}
      >
        <div className="relative w-[120px] h-[35px] sm:w-[170px] sm:h-[45px] cursor-pointer">
          <img src={menu} alt="Menu" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs sm:text-sm font-semibold">
              MENU
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
