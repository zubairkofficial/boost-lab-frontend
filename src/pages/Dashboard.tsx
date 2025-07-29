import { useState, useEffect } from 'react';
import { H1, H2, H3, BodyText, Caption } from '../components/ui/typography';
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
  Bell
} from "lucide-react";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const backgroundImageUrl = "https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg";

  return (
    <div className="min-h-screen bg-boostlab-bg relative overflow-hidden font-font">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-8">
        <div className={`max-w-7xl mx-auto space-y-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header Section */}
          <div className="bg-boostlab-text/10 backdrop-blur-md border border-boostlab-text/20 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-cyber-blue/30">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user?.name || 'User'} />
                <AvatarFallback className="text-2xl text-white font-font bg-gradient-cyber">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <H2 className="text-white font-font mb-2">
                      Welcome back, {user?.name || 'User'}!
                    </H2>
                    <BodyText className="text-boostlab-text/70 font-font flex items-center gap-2 mb-3">
                      <Mail className="h-4 w-4" />
                      {user?.email || 'user@example.com'}
                    </BodyText>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-boostlab-text text-boostlab-bg border-0">
                        <Shield className="h-3 w-3 mr-1" />
                        {user?.subscription?.status === 'active' ? 'Premium Subscriber' : 'Free User'}
                      </Badge>
                      <Badge variant="outline" className="text-boostlab-text border-boostlab-text">
                        <Star className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="p-3 bg-boostlab-text/10 border border-boostlab-text/20 rounded-xl hover:bg-boostlab-text/20 transition-all duration-300">
                      <Bell className="h-5 w-5 text-boostlab-text" />
                    </button>
                    <button className="p-3 bg-boostlab-text/10 border border-boostlab-text/20 rounded-xl hover:bg-boostlab-text/20 transition-all duration-300">
                      <Settings className="h-5 w-5 text-boostlab-text" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Camera, title: 'Projects', value: '156', color: 'text-boostlab-text', bg: 'bg-boostlab-text/20' },
              { icon: TrendingUp, title: 'Success Rate', value: '89%', color: 'text-boostlab-text', bg: 'bg-boostlab-text/20' },
              { icon: Users, title: 'Followers', value: '2.4k', color: 'text-boostlab-text', bg: 'bg-boostlab-text/20' },
              { icon: Award, title: 'Achievements', value: '12', color: 'text-boostlab-text', bg: 'bg-boostlab-text/20' }
            ].map((stat, index) => (
              <Card key={index} className="bg-boostlab-text/10 backdrop-blur-md border border-boostlab-text/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Caption className="text-boostlab-text/70 font-font">{stat.title}</Caption>
                      <H2 className={`${stat.color} font-font`}>{stat.value}</H2>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <Card className="bg-ui-medium/50 backdrop-blur-md border border-white/20 shadow-cyber">
                <CardHeader>
                  <CardTitle className="text-white font-font">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-cyber-blue" />
                      <div>
                        <Caption className="text-gray-400 font-font">Phone</Caption>
                        <BodyText className="font-medium text-white font-font">+92 300 1234567</BodyText>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-cyber-blue" />
                      <div>
                        <Caption className="text-gray-400 font-font">Location</Caption>
                        <BodyText className="font-medium text-white font-font">Karachi, Pakistan</BodyText>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-cyber-blue" />
                      <div>
                        <Caption className="text-gray-400 font-font">Joined</Caption>
                        <BodyText className="font-medium text-white font-font">January 15, 2023</BodyText>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-cyber-blue" />
                      <div>
                        <Caption className="text-gray-400 font-font">Website</Caption>
                        <BodyText className="font-medium text-cyber-blue font-font">ahmadali.dev</BodyText>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Details */}
              <Card className="bg-ui-medium/50 backdrop-blur-md border border-white/20 shadow-cyber">
                <CardHeader>
                  <CardTitle className="text-white font-font">Subscription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <H3 className="font-semibold text-lg text-white font-font">Premium Plan</H3>
                      <BodyText className="text-gray-300 font-font">$29.99/month</BodyText>
                    </div>
                    <Badge className="bg-accent-green text-white border-0">Active</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Caption className="text-gray-400 font-font">Next billing date</Caption>
                      <BodyText className="font-medium text-white font-font">March 15, 2024</BodyText>
                    </div>

                    <div className="flex justify-between">
                      <Caption className="text-gray-400 font-font">Payment method</Caption>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4 text-white" />
                        <BodyText className="font-medium text-white font-font">•••• 4242</BodyText>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Caption className="text-gray-400 font-font">Usage this month</Caption>
                        <BodyText className="font-medium text-white font-font">75%</BodyText>
                      </div>
                      <Progress value={75} className="h-2 bg-ui-dark" />
                      <Caption className="text-gray-400 font-font">7.5GB of 10GB used</Caption>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card className="bg-ui-medium/50 backdrop-blur-md border border-white/20 shadow-cyber">
                <CardHeader>
                  <CardTitle className="text-white font-font">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { color: "bg-accent-green", text: "Profile updated", time: "2 hours ago" },
                    { color: "bg-cyber-blue", text: "New project created", time: "1 day ago" },
                    { color: "bg-portal-orange", text: "Payment processed", time: "3 days ago" },
                    { color: "bg-neon-cyan", text: "Account verified", time: "1 week ago" },
                  ].map((item, i) => (
                    <div className="flex items-center gap-3" key={i}>
                      <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                      <div className="flex-1">
                        <BodyText className="text-sm font-medium text-white font-font">{item.text}</BodyText>
                        <Caption className="text-gray-400 font-font">{item.time}</Caption>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-ui-medium/50 backdrop-blur-md border border-white/20 shadow-cyber">
                <CardHeader>
                  <CardTitle className="text-white font-font">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: Camera, text: "Create New Project", color: "text-cyber-blue" },
                    { icon: TrendingUp, text: "View Analytics", color: "text-accent-green" },
                    { icon: Users, text: "Invite Team Member", color: "text-portal-orange" },
                    { icon: Settings, text: "Account Settings", color: "text-neon-cyan" },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-ui-dark/50 transition-all duration-300 text-left"
                    >
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                      <BodyText className="text-white font-font">{action.text}</BodyText>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
