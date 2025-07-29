import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { H1, H2, H3, BodyText, Caption } from '../components/ui/typography';
import { selectUser } from '../store/userSlice';
import { logout } from '../utils/auth';

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Mail,
  Calendar,
  MapPin,
  Phone,
  Globe,
  CreditCard,
  Shield,
  Star,
  Camera,
  TrendingUp,
  Users,
  Award,
  Settings,
  Bell,
  LogOut,
  User,
  Clock,
  CheckCircle
} from "lucide-react";

const Dashboard = () => {
  const user = useSelector(selectUser);
  console.log("user",user)
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const backgroundImageUrl = "https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg";

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden font-font">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 bg-cyber-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-neon-cyan/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-portal-orange/10 rounded-full blur-2xl animate-float"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-8">
        <div className={`max-w-7xl mx-auto space-y-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header Section */}
          <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-cyber">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-cyber-blue/30">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user?.user_metadata?.name || 'User'} />
                <AvatarFallback className="text-2xl text-white font-font bg-gradient-cyber">
                  {user?.user_metadata?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <H2 className="text-white font-font mb-2">
                      Welcome back, {user?.user_metadata?.name || 'User'}!
                    </H2>
                    <BodyText className="text-gray-300 font-font flex items-center gap-2 mb-3">
                      <Mail className="h-4 w-4" />
                      {user?.email || 'user@example.com'}
                    </BodyText>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-cyber text-white border-0">
                        <Shield className="h-3 w-3 mr-1" />
                        {user?.role === 'authenticated' ? 'Verified User' : 'Guest User'}
                      </Badge>
                      <Badge variant="outline" className="text-white border-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {user?.user_metadata?.email_verified ? 'Email Verified' : 'Email Pending'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="p-3 bg-ui-dark/50 border border-white/20 rounded-xl hover:bg-ui-dark/70 transition-all duration-300">
                      <Bell className="h-5 w-5 text-white" />
                    </button>
                    <button className="p-3 bg-ui-dark/50 border border-white/20 rounded-xl hover:bg-ui-dark/70 transition-all duration-300">
                      <Settings className="h-5 w-5 text-white" />
                    </button>
                    <button 
                      onClick={() => {
                        logout();
                        navigate('/auth/login');
                      }}
                      className="p-3 bg-red-500/50 border border-red-400/20 rounded-xl hover:bg-red-500/70 transition-all duration-300"
                    >
                      <LogOut className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
          

            {/* Right Column */}
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
