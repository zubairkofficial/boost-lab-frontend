import { useState, useEffect } from "react";

export const ProfileContent = () => {
  const [user] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    about:
      "Photography enthusiast exploring futuristic styles. Loves creating immersive experiences with cutting-edge technology.",
    subscriptionActive: true,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => setIsLoaded(true), []);

  return (
    <div
      className={`p-8 transition-all duration-700 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary via-cyber-blue to-neon-cyan flex items-center justify-center text-black text-4xl font-bold">
          {user.name.charAt(0)}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">{user.name}</h1>
          <p className="text-gray-300">{user.email}</p>

          {/* Subscription Badge */}
          <div className="mt-3">
            {user.subscriptionActive ? (
              <span className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500 rounded-full text-sm font-semibold">
                ✅ Active Subscription
              </span>
            ) : (
              <span className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500 rounded-full text-sm font-semibold">
                ❌ Not Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white">About</h2>
        <p className="text-gray-300 mt-2">{user.about}</p>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-ui-dark/40 rounded-lg border border-[#8ef0f4]/20">
          <h3 className="text-sm text-gray-400">Member Since</h3>
          <p className="text-white font-semibold">January 2024</p>
        </div>
        <div className="p-4 bg-ui-dark/40 rounded-lg border border-[#8ef0f4]/20">
          <h3 className="text-sm text-gray-400">Plan</h3>
          <p className="text-white font-semibold">
            {user.subscriptionActive ? "Premium" : "Free"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="px-6 py-3 bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan text-black font-bold rounded-lg hover:scale-105 transition-all duration-300">
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
};
