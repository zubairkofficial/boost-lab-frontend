import { Home, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils"; // If you have shadcn utils
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, link: "/auth/dashboard" },
    { label: "Profile", icon: <User className="w-5 h-5" />, link: "/auth/dashboard" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, link: "/auth/dashboard" },
  ];

  return (
    <aside className="h-screen w-64 bg-ui-dark/80 backdrop-blur-md border-r border-[#8ef0f4]/30 text-white flex flex-col">
      {/* Logo/Header */}
      <div className="h-16 flex items-center justify-center border-b border-[#8ef0f4]/30 text-xl font-bold tracking-wider">
        🚀 BoostLab
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#8ef0f4]/20 transition-all"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#8ef0f4]/30 p-4">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/20 text-red-400">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};
