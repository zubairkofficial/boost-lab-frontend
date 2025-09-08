"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Loginscreen = () => {
  const handleEmailSignIn = () => {
    window.location.href =
      "mailto:support@higgsfield.ai?subject=Sign In Request";
  };

  return (
    <div
      className="min-h-screen w-full text-white relative flex items-center justify-center px-4 before:absolute before:inset-0 before:bg-[#2A4C57]/40 before:z-0"
      style={{
        backgroundImage:
          "url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        fontFamily: `'Unbounded', Arial, sans-serif`,
      }}
    >
      {/* Card container */}
      <div className="relative z-10 w-full max-w-sm backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-4">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Sign in to Boostlab
        </h1>

        <Button
          variant="outline"
          className="w-full h-12 bg-white hover:bg-gray-50 text-black border-gray-300 flex items-center justify-center gap-3"
        >
          {/* Google Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 bg-white hover:bg-gray-50 text-black border-gray-300 flex items-center justify-center gap-3"
        >
          {/* Apple Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001.017.001z" />
          </svg>
          Continue with Apple
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 bg-white hover:bg-gray-50 text-black border-gray-300 flex items-center justify-center gap-3"
        >

          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352z" />
          </svg>
          Continue with Microsoft
        </Button>
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="text-sm text-gray-400">Or</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>
        <Button
          variant="outline"
          className="w-full h-12 bg-white hover:bg-gray-50 text-black border-gray-300 flex items-center justify-center gap-3"
          onClick={() => (window.location.href = "/auth/login")}
        >
          <Mail className="w-5 h-5" />
          Sign in with Email
        </Button>
      </div>
    </div>
  );
};

export default Loginscreen;
