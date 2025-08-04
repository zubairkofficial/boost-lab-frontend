import React from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import line from "../assets/line_tablet.svg";
import toast from "react-hot-toast";

interface MenuCardProps {
  onClose: () => void;
}

const menuLinks = [
  { label: "Free", path: "/" },
  { label: "Paid", path: "/after-subscription" },
  { label: "STAGE 2: STRATEGY", path: "/stage-2" },
  { label: "STAGE 3: CONTENT", path: "/stage-3" },
  { label: "STAGE 4: AUTOMATION", path: "/stage-4" },
  { label: "STAGE 5: AD Launch and Monetization", path: "/stage-5" },
  { label: "LIBRARY", path: "/library" },
  { label: "SERVICES", path: "/services" },
];

const lockedLabels = [
  "LIBRARY",
  "STAGE 2: STRATEGY",
  "STAGE 3: CONTENT",
  "STAGE 4: AUTOMATION",
  "STAGE 5: AD Launch and Monetization",
];

const MenuCard: React.FC<MenuCardProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    toast.success("Signed out successfully");
    onClose();
    navigate("/auth/login");
  };

  return (
    <div
      className="fixed inset-0 bg-[#49909A]/5 backdrop-blur-md z-[100] flex items-center justify-center text-2xl"
      style={{ fontFamily: "'Unbounded', Arial, sans-serif" }}
    >
      <div className="bg-[#2A515D]/60 w-[90%] max-w-md p-6 rounded-lg relative shadow-2xl text-white max-h-[80vh] overflow-y-auto hide-scrollbar">
        <button
          className="absolute top-4 right-4 text-[#6dafb8]"
          onClick={onClose}
        >
          <X className="w-10 h-10" />
        </button>

        <ul className="space-y-4 text-base flex flex-col mx-5">
          {menuLinks.map(({ label, path }, index) => {
            const isLocked = lockedLabels.includes(label);
            return (
              <div key={index}>
                {isLocked ? (
                  <button
                    disabled
                    aria-disabled="true"
                    className="cursor-not-allowed mb-3 flex items-center text-left gap-2 text-white/50 w-full"
                  >
                    <span className="flex-1">{label}</span>
                    <img
                      src="https://static.tildacdn.net/tild3638-3166-4030-a231-356366383030/lock.svg"
                      alt="Lock Icon"
                      className="w-6 h-6 opacity-50 shrink-0"
                    />
                  </button>
                ) : (
                  <Link
                    to={path}
                    onClick={onClose}
                    className="cursor-pointer mb-3 flex items-center text-left gap-2 text-white hover:text-[#6dafb8] w-full"
                  >
                    <span className="flex-1">{label}</span>
                  </Link>
                )}
                <img src={line} className="mb-2" alt={`line-${index}`} />
              </div>
            );
          })}
          <div>
            <button
              onClick={handleLogout}
              className="w-full mb-3 flex items-center text-left gap-2 text-white hover:text-[#f87171]"
            >
              <span className="flex-1">LOGOUT</span>
           
            </button>
            <img src={line} className="mb-2" alt="line-logout" />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MenuCard;
