import type React from "react";
import { useState } from "react";

interface PlansFuturisticButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset"; 
  
}

export default function PlansFuturisticButton({
  children = "JOIN NOW",
  
  onClick,
  href,
  className = "",
  type = "button", 
}: PlansFuturisticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonContent = (
    <div
      className={`relative inline-block cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
     {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full blur-[60px] transition-opacity duration-100 ${
         isHovered ? "opacity-100 shadow-[0_0_150px_15px_rgba(142,240,244,0.9)]" : "opacity-0"
        }`}
      ></div>

      {/* Main button content */}
      <div className="relative">
        
        <svg width="384" height="98" viewBox="0 0 384 98" className="transition-all duration-300">
          <defs>
            <filter id="filter0_b" x="-25" y="-25" width="434" height="148" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="12.5" />
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
            </filter>
          </defs>
          <g filter="url(#filter0_b)">
            <path
              d="M0.5 66C0.7 45 0.5 5 0.5 1H169L176 11H383.5V97H23L0.5 66Z"
              fill="#8EF0F4"
              fillOpacity={isHovered ? "0.5" : "0.5"}
              stroke="#8EF0F4"
              strokeWidth="1.2"
              className="transition-all duration-300"
            />
          </g>
        </svg>

        {/* Corner accent */}
<svg
  width="80"
  height="45"
    viewBox="0 0 62 67"  
  className="absolute top-14 right-[326px] rotate-367 transition-all duration-300"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <path
    d="M0 3.79L5.47 0V23.26L43.99 61.12H62.37L58.65 66.81H38.08L0 27-20V3.79Z"
    fill="#8EF0F4"
    className={`transition-all duration-300 ${isHovered ? "opacity-80" : "opacity-60"}`}
  />
</svg>

        {/* Side accent line */}
        <svg
          width="3"
          height="40"
          viewBox="0 0 4.38 59.96"
          className="absolute top-6 left-96 transition-all duration-300"
        >
          <path
            d="M4.26 3.83L0 0V58.36L4.26 53.67V3.83Z"
            fill="#8EF0F4"
            className={`transition-all duration-300 ${isHovered ? "opacity-80" : "opacity-60"}`}
          />
        </svg>

        {/* Chevron pattern */}
        <div className="absolute bottom-23 left-35 transition-all duration-300">
          <div className={`transition-all duration-300 ${isHovered ? "opacity-80" : "opacity-60"}`}>
           <svg width="300" height="6" viewBox="0 0 380 10" fill="none">
          <path d="M9.93334 0.5H0.580139L8.81644 9.25364H18.0874L9.93334 0.5Z" fill="#8EF0F4"></path>
          <path d="M28.7533 0.5H19.4001L27.6364 9.25364H36.9073L28.7533 0.5Z" fill="#8EF0F4"></path>
          <path d="M47.5734 0.5H38.2202L46.4565 9.25364H55.7274L47.5734 0.5Z" fill="#8EF0F4"></path>
          <path d="M66.3942 0.5H57.041L65.2773 9.25364H74.5483L66.3942 0.5Z" fill="#8EF0F4"></path>
          <path d="M85.2141 0.5H75.8609L84.0972 9.25364H93.3682L85.2141 0.5Z" fill="#8EF0F4"></path>
          <path d="M104.034 0.5H94.6809L102.917 9.25364H112.188L104.034 0.5Z" fill="#8EF0F4"></path>
          <path d="M122.855 0.5H113.502L121.738 9.25364H131.009L122.855 0.5Z" fill="#8EF0F4"></path>
          <path d="M141.675 0.5H132.322L140.558 9.25364H149.829L141.675 0.5Z" fill="#8EF0F4"></path>
          <path d="M160.496 0.5H151.143L159.379 9.25364H168.65L160.496 0.5Z" fill="#8EF0F4"></path>
          <path d="M179.316 0.5H169.963L178.199 9.25364H187.47L179.316 0.5Z" fill="#8EF0F4"></path>
          <path d="M198.137 0.5H188.784L197.02 9.25364H206.291L198.137 0.5Z" fill="#8EF0F4"></path>
          <path d="M216.957 0.5H207.604L215.84 9.25364H225.111L216.957 0.5Z" fill="#8EF0F4"></path>
          <path d="M235.778 0.5H226.425L234.661 9.25364H243.932L235.778 0.5Z" fill="#8EF0F4"></path>
          <path d="M254.598 0.5H245.245L253.481 9.25364H262.752L254.598 0.5Z" fill="#8EF0F4"></path>
          <path d="M273.419 0.5H264.066L272.302 9.25364H281.573L273.419 0.5Z" fill="#8EF0F4"></path>
          <path d="M292.239 0.5H282.886L291.122 9.25364H300.393L292.239 0.5Z" fill="#8EF0F4"></path>
          <path d="M311.06 0.5H301.707L309.943 9.25364H319.214L311.06 0.5Z" fill="#8EF0F4"></path>
          <path d="M329.88 0.5H320.527L328.763 9.25364H338.034L329.88 0.5Z" fill="#8EF0F4"></path>
        </svg>
          </div>
        </div>

        {/* Button text */}
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
      className="bg-transparent border-none p-0 m-0 cursor-pointer" // remove default button styles
    >
      {buttonContent}
    </button>
  );;
}
