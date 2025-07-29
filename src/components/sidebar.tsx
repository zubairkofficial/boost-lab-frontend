// components/Sidebar.tsx

import { 
  Home, 
  Settings, 
  LogOut, 
  FileQuestion, 
  Camera, 
  TrendingUp, 
  Users, 
  CreditCard,
  Bell,
  User,
  Shield,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";

import { H3, BodyText, Caption } from "./ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const backgroundImageUrl = "https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }, [navigate]);

  const menuItems = [
    { 
      label: "Dashboard", 
      icon: <Home className="w-5 h-5" />, 
      link: "/dashboard",
      description: "Overview and analytics"
    },
    { 
      label: "Projects", 
      icon: <Camera className="w-5 h-5" />, 
      link: "/projects",
      description: "Manage your projects"
    },
    { 
      label: "Analytics", 
      icon: <TrendingUp className="w-5 h-5" />, 
      link: "/analytics",
      description: "View performance data"
    },
    { 
      label: "Team", 
      icon: <Users className="w-5 h-5" />, 
      link: "/team",
      description: "Collaborate with team"
    },
    { 
      label: "Plans", 
      icon: <CreditCard className="w-5 h-5" />, 
      link: "/plans",
      description: "Subscription management"
    },
    { 
      label: "Questions", 
      icon: <FileQuestion className="w-5 h-5" />, 
      link: "/take-test",
      description: "Take personality test"
    },
  ];

  return (
    <aside className="fixed top-0 w-64 h-screen text-white flex-shrink-0 font-font">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-boostlab-bg/95"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full backdrop-blur-sm flex flex-col overflow-hidden border-r border-white/20">
        {/* Logo/Header */}
        <div className="h-20 flex items-center justify-center border-b border-boostlab-text/20 bg-boostlab-bg/50">
          <div className="text-center">
            <H3 className="text-white font-font flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              BoostLab
            </H3>
            <Caption className="text-white/70 font-font">AI Photography Platform</Caption>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-boostlab-text/20 bg-boostlab-bg/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-cyber-blue/30">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.name || 'User'} />
              <AvatarFallback className="text-sm text-white font-font bg-gradient-cyber">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <BodyText className="text-white font-font font-medium truncate">
                {user?.name || 'User'}
              </BodyText>
              <Caption className="text-white/70 font-font truncate">
                {user?.email || 'user@example.com'}
              </Caption>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Badge className="bg-boostlab-text text-boostlab-bg border-0 text-xs">
              <Shield className="h-3 w-3 mr-1" />
              {user?.subscription?.status === 'active' ? 'Premium' : 'Free'}
            </Badge>
            <Badge variant="outline" className="text-boostlab-text border-boostlab-text text-xs">
              <Star className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                key={idx}
                to={item.link}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "bg-boostlab-text text-boostlab-bg shadow-lg"
                    : "hover:bg-boostlab-text/10 text-boostlab-text/70 hover:text-boostlab-text"
                )}
              >
                {/* Background glow for active item */}
                {isActive && (
                  <div className="absolute inset-0 bg-boostlab-text opacity-10"></div>
                )}
                
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    isActive ? "bg-boostlab-bg/20" : "group-hover:bg-boostlab-text/10"
                  )}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <BodyText className="font-medium font-font">{item.label}</BodyText>
                    <Caption className="text-xs text-boostlab-text/60 font-font">{item.description}</Caption>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-white/20 p-4 space-y-2">
          {/* Notifications */}
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-boostlab-text/10 text-boostlab-text/70 hover:text-boostlab-text transition-all">
            <Bell className="w-5 h-5" />
            <BodyText className="font-font">Notifications</BodyText>
            <Badge className="ml-auto bg-boostlab-text text-boostlab-bg text-xs">3</Badge>
          </button>

          {/* Settings */}
          <Link
            to="/settings"
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-boostlab-text/10 text-boostlab-text/70 hover:text-boostlab-text transition-all"
          >
            <Settings className="w-5 h-5" />
            <BodyText className="font-font">Settings</BodyText>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all mt-4"
          >
            <LogOut className="w-5 h-5" />
            <BodyText className="font-font">Logout</BodyText>
          </button>
        </div>
      </div>
    </aside>
  );
};
