import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Mail,
  Calendar,
  MapPin,
  Phone,
  Globe,
  CreditCard,
  Shield,
  Star,
  Edit,
  Settings,
  Download,
} from "lucide-react";

const backgroundImageUrl =
  "https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg";

export default function Component() {
  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-opacity-70 rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Ahmad Ali" />
              <AvatarFallback className="text-2xl text-white">AA</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white">Ahmad Ali</h1>
                  <p className="text-white flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    ahmad.ali@example.com
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      Premium Subscriber
                    </Badge>
                    <Badge variant="outline" className="text-white border-white">
                      <Star className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card className="bg-black bg-opacity-70 text-white">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-white" />
                    <div>
                      <p className="text-white">Phone</p>
                      <p className="font-medium text-white">+92 300 1234567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-white" />
                    <div>
                      <p className="text-white">Location</p>
                      <p className="font-medium text-white">Karachi, Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-white" />
                    <div>
                      <p className="text-white">Joined</p>
                      <p className="font-medium text-white">January 15, 2023</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-white" />
                    <div>
                      <p className="text-white">Website</p>
                      <p className="font-medium text-blue-300">ahmadali.dev</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Details */}
            <Card className="bg-black bg-opacity-70 text-white">
              <CardHeader>
                <CardTitle className="text-white">Subscription Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Premium Plan</h3>
                    <p>$29.99/month</p>
                  </div>
                  <Badge className="bg-green-600 text-white">Active</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Next billing date</span>
                    <span className="font-medium text-white">March 15, 2024</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-white">Payment method</span>
                    <span className="font-medium flex items-center gap-1 text-white">
                      <CreditCard className="h-4 w-4" />
                      •••• 4242
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">Usage this month</span>
                      <span className="font-medium text-white">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-white">7.5GB of 10GB used</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-black bg-opacity-70 text-white">
              <CardHeader>
                <CardTitle className="text-white">Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300">156</div>
                  <p>Projects Created</p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">89%</div>
                  <p>Success Rate</p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">2.4k</div>
                  <p>Total Downloads</p>
                </div>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card className="bg-black bg-opacity-70 text-white">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { color: "bg-green-500", text: "Profile updated", time: "2 hours ago" },
                  { color: "bg-blue-500", text: "New project created", time: "1 day ago" },
                  { color: "bg-yellow-500", text: "Payment processed", time: "3 days ago" },
                  { color: "bg-purple-500", text: "Account verified", time: "1 week ago" },
                ].map((item, i) => (
                  <div className="flex items-center gap-3" key={i}>
                    <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.text}</p>
                      <p className="text-xs text-white">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
