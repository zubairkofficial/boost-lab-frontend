import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FuturisticButton from "../components/furastic-button";
import bg from "../assets/bg_program_2.jpg";

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [testTaken, setTestTaken] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
    const taken = localStorage.getItem("testTaken");
    setTestTaken(!!taken);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-black/50 bg-blend-overlay"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Background Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div> */}

      {/* Animated glowing circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#8ef0f4]/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#8ef0f4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#8ef0f4]/20 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute top-1/3 right-1/3 w-24 h-24 bg-[#8ef0f4]/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-4 py-12">
        <div
          className={`w-full max-w-lg mx-auto bg-ui-medium/50 backdrop-blur-sm border border-white/20 rounded-2xl p-8 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-font mb-2 animate-fade-in">
              AI Personality Test
            </h1>
            <p className="text-white text-body font-font">
              Discover your AI-generated personality type and see what it says
              about you!
            </p>
          </div>
          a{/* Conditional: test block */}
          {!testTaken ? (
            <div className="flex flex-col items-center space-y-4">
              <FuturisticButton onClick={() => navigate("/take-test")}>
                Take the Test
              </FuturisticButton>
              <p className="text-caption text-white font-font mt-2">
                One-time test. Discover your AI type now!
              </p>
            </div>
          ) : (
            <div className="bg-ui-dark/40 border border-primary/20 rounded-xl p-4 text-center">
              <h2 className="text-xl font-semibold mb-2 text-white">
                You’ve already taken the test 🎉
              </h2>
              <p className="text-white mb-3 text-sm">
                Retaking is currently unavailable.
              </p>
              <Link
                to="/results"
                className="text-white hover:text-cyber-blue font-semibold transition-colors"
              >
                View Your Test Results
              </Link>
            </div>
          )}
          {/* Divider */}
          <div className="w-full h-px bg-primary/20 my-6"></div>
          {/* Back to login */}
          <div className="text-center mt-6">
            <p className="text-white text-caption font-font">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-white hover:text-cyber-blue font-semibold transition-colors font-font"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
