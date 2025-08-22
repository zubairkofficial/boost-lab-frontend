import type React from "react";
import { useState } from "react";

interface FuturisticButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset"; 
  
}

export default function FuturisticButton({
  children = "JOIN NOW",
  
  onClick,
  href,
  className = "",
  type = "button", 
}: FuturisticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonContent = (
    <div
      className={`relative inline-block cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 rounded-full blur-[6px] transition-opacity duration-100 ${
         isHovered ? "opacity-100 shadow-[0_0_150px_15px_rgba(142,240,244,0.9)]" : "opacity-0"
        }`}
      ></div>
      <div className="relative">
        <svg
          width="160"
          height="70"
          viewBox="0 0 256.74 110.11"
          className="transition-all duration-300"
        >
          <defs>
            <filter id="filter0_b" x="-25" y="-25" width="306.74" height="160.11" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="12.5" />
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
            </filter>
          </defs>
          <g filter="url(#filter0_b)">
            <path
              d="M0.84 73.69C1.13 50.12 0.84 6.19 0.84 0.83H113.66L125.91 12.65H255.91V109.28H39.14L0.84 73.69Z"
              fill="#8EF0F4"
              fillOpacity={isHovered ? "0.5" : "0.3"}
              stroke="#8EF0F4"
              strokeWidth="1.2"
              className="transition-all duration-300"
            />
          </g>
        </svg>

        <svg
          width="42"
          height="42"
          viewBox="0 0 62.37 66.81"
          className="absolute top-8 right-30 rotate-353 transition-all duration-300"
        >
          <path
            d="M0 3.79L5.47 0V23.26L43.99 61.12H62.37L58.65 66.81H38.08L0 27.20V3.79Z"
            fill="#8EF0F4"
            className={`transition-all duration-300 ${isHovered ? "opacity-80" : "opacity-60"}`}
          />
        </svg>

        {/* Side accent line */}
        <svg
          width="3"
          height="40"
          viewBox="0 0 4.38 59.96"
          className="absolute top-3 left-40 transition-all duration-300"
        >
          <path
            d="M4.26 3.83L0 0V58.36L4.26 53.67V3.83Z"
            fill="#8EF0F4"
            className={`transition-all duration-300 ${isHovered ? "opacity-80" : "opacity-60"}`}
          />
        </svg>

        <div className="absolute bottom-16 right-1 transition-all duration-300">
          <div className={`transition-all duration-300 ${isHovered ? "opacity-80" : "opacity-60"}`}>
            <svg width="80" height="6" viewBox="0 0 131 10" fill="none">
              <path d="M9.93334 0.5H0.580139L8.81644 9.25364H18.0874L9.93334 0.5Z" fill="#8EF0F4"></path>
              <path d="M28.7533 0.5H19.4001L27.6364 9.25364H36.9073L28.7533 0.5Z" fill="#8EF0F4"></path>
              <path d="M47.5734 0.5H38.2202L46.4565 9.25364H55.7274L47.5734 0.5Z" fill="#8EF0F4"></path>
              <path d="M66.3942 0.5H57.041L65.2773 9.25364H74.5483L66.3942 0.5Z" fill="#8EF0F4"></path>
              <path d="M85.2141 0.5H75.8609L84.0972 9.25364H93.3682L85.2141 0.5Z" fill="#8EF0F4"></path>
              <path d="M104.034 0.5H94.6809L102.917 9.25364H112.188L104.034 0.5Z" fill="#8EF0F4"></path>
              <path d="M122.855 0.5H113.502L121.738 9.25364H131.009L122.855 0.5Z" fill="#8EF0F4"></path>
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-base tracking-wider transition-all duration-300">
            {children}
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

   return (
    <button
      type={type}
      onClick={onClick}
      className="bg-transparent border-none p-0 m-0 cursor-pointer"
    >
      {buttonContent}
    </button>
  );;
}
