import React, { useMemo } from "react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import line from "../assets/line_tablet.svg";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

import { useGetActiveSubscriptionQuery } from "../features/plansApi";

interface MenuCardProps {
  onClose: () => void;
}

const menuLinks = [
  { label: "PERSONAL ACCOUNT", path: "/personal-account" },
  { label: "STAGE 1: TEST", path: "/" },
  { label: "STAGE 2: STRATEGY", path: "/strategy-generation" },
  { label: "STAGE 3: CONTENT", path: "/content" },
  { label: "STAGE 4: AUTOMATION", path: "/stage-4" },
  { label: "STAGE 5: AD Launch and Monetization", path: "/stage-5" },
  { label: "LIBRARY", path: "/library" },
  { label: "SERVICES", path: "/services" },
];

const MenuCard: React.FC<MenuCardProps> = ({ onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const { data: activeSubscription } = useGetActiveSubscriptionQuery(
    user?.userId,
    {
      skip: !user?.userId,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const hasActiveSubscription = useMemo(() => {
    if (!activeSubscription) return false;
    const isActive = activeSubscription.status === "active";
    const notExpired = new Date(activeSubscription.expiresAt) > new Date();
    return isActive && notExpired;
  }, [activeSubscription]);

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully");
    onClose();
  };

  const isLocked = (label: string) => {
    if (label === "SERVICES") return false;

    if (!hasActiveSubscription) {
      return label !== "PERSONAL ACCOUNT FREE";
    } else {
      return label === "PERSONAL ACCOUNT FREE";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#49909A]/1 backdrop-blur-md z-[90] flex items-center justify-center text-2xl"
      style={{ fontFamily: "'Unbounded', Arial, sans-serif" }}
    >
      <div className="bg-[#2A515D]/60 w-[90%] max-w-md py-6 rounded-lg relative shadow-2xl text-white max-h-[80vh] overflow-y-auto hide-scrollbar">
        <button
          className="absolute top-1 right-1 text-[#6dafb8]"
          onClick={onClose}
        >
          <X className="" />
        </button>

        <ul className="space-y-4 text-base flex flex-col mx-5">
          {menuLinks.map(({ label, path }, index) => {
            const locked = isLocked(label);

            return (
              <div key={index}>
                {locked ? (
                  <button
                    disabled
                    aria-disabled="true"
                    className="cursor-not-allowed mb-3 flex items-center text-left gap-0 text-white/50 w-full"
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
