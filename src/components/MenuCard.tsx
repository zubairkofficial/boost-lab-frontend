import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import line from "../assets/line_tablet.svg";

interface MenuCardProps {
  onClose: () => void;
}

const menuLinks = [
  { label: "Before Subscription", path: "/" },
  { label: "After Subscription", path: "/after-subscription" },
  { label: "STAGE 2: STRATEGY", path: "/stage-2" },
  { label: "STAGE 3: CONTENT", path: "/stage-3" },
  { label: "STAGE 4: AUTOMATION", path: "/stage-4" },
  { label: "STAGE 5: AD Launch and Monetization", path: "/stage-5" },
  { label: "LIBRARY", path: "/library" },
  { label: "SERVICES", path: "/services" },
];

const MenuCard: React.FC<MenuCardProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-[#49909A]/5 backdrop-blur-md z-[100] flex items-center justify-center text-2xl"
      style={{ fontFamily: "'Unbounded', Arial, sans-serif" }}
    >
      <div className="bg-[#2A515D]/90 w-[80%] max-w-md p-6 rounded-lg relative shadow-2xl text-white">
        <button
          className="absolute top-4 right-4 text-[#6dafb8]"
          onClick={onClose}
        >
          <X className="w-10 h-10" />
        </button>

        <ul className="space-y-4 text-base flex justify-center flex-col mx-5">
          {menuLinks.map(({ label, path }, index) => {
            const isLocked =
              label === "LIBRARY" ||
              label === "STAGE 2: STRATEGY" ||
              label === "STAGE 3: CONTENT" ||
              label === "STAGE 4: AUTOMATION" ||
              label === "STAGE 5: AD Launch and Monetization";

            return (
              <div key={index}>
                <Link
                  to={path}
                  className={`cursor-pointer mb-3 flex items-center gap-2 ${
                    isLocked
                      ? "text-white/50"
                      : "text-white hover:text-[#6dafb8]"
                  }`}
                >
                  {label}
                  {isLocked && (
                    <img
                      src="https://static.tildacdn.net/tild3638-3166-4030-a231-356366383030/lock.svg"
                      alt="Lock Icon"
                      className="w-6 h-6 opacity-50"
                    />
                  )}
                </Link>
                <img src={line} className="mb-2" alt={`line-${index}`} />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuCard;
