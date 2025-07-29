// components/Sidebar.tsx

import { Home, Settings, LogOut, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

const backgroundImageUrl =
  "https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  }, [navigate]);

  const menuItems = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, link: "/auth/dashboard" },
    { label: "Plans", icon: <Settings className="w-5 h-5" />, link: "/plans" },
    { label: "Questions", icon: <FileQuestion className="w-5 h-5" />, link: "/take-test" },
  ];

  return (
    <aside
      className="w-64 h-screen text-white flex-shrink-0"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-full backdrop-blur-sm flex flex-col overflow-hidden">
        {/* Logo/Header */}
        <div className="h-16 flex items-center justify-center border-b border-[#8ef0f4]/30 text-xl font-bold tracking-wider">
          🚀 BoostLab
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                key={idx}
                to={item.link}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-all",
                  isActive
                    ? "bg-[#8ef0f4]/30 text-white"
                    : "hover:bg-[#8ef0f4]/20"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#8ef0f4]/30 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
