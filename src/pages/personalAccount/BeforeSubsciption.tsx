import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useGetTestResultByEmailQuery } from "@/features/testResultApi";
import { useGetActiveSubscriptionQuery } from "@/features/plansApi";
import vector2 from "../../assets/vector2.png";
import MenuModal from "@/components/MenuModal";
import MenuCard from "@/components/NavbarMenu";
import Header from "../../generic-components/Header";
import { BeforeSubscriptionStages } from "@/generic-components/subscriptionStages";
import Footer from "@/generic-components/Footer";
import type { RootState } from "@/store/store";
import PlanCards from "../plans/PlanCards";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const planCardsRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const userLocal = localStorage.getItem("user");
  const userData = JSON.parse(userLocal ?? "{}");

  const {
    data: testResult,
    isLoading: isTestLoading,
    isError: isTestError,
  } = useGetTestResultByEmailQuery(userData?.email ?? "", {
    skip: !isResultOpen || !userData?.email,
  });

  const { data: activeSubscription } = useGetActiveSubscriptionQuery(
    userData?.userId,
    {
      skip: !userData?.userId,
    }
  );

  const hasActiveSubscription = useMemo(() => {
    if (!activeSubscription) return false;
    const isActive = activeSubscription.status === "active";
    const notExpired = new Date(activeSubscription.expiresAt) > new Date();
    return isActive && notExpired;
  }, [activeSubscription]);

  const handleSeeResult = () => {
    if (!userData?.email) {
      toast.error("Email not found. Please log in again.");
      return;
    }
    setIsResultOpen(true);
  };

  useEffect(() => {
    if (isResultOpen && !isTestLoading && !testResult && !isTestError) {
      toast.error("Please give test and then see your results.");
      setIsResultOpen(false);
    }
  }, [isResultOpen, isTestLoading, testResult, isTestError]);

  useEffect(() => {
    if (isResultOpen && testResult && !isTestLoading) {
      toast.success("Test results loaded successfully!");
    }
  }, [isResultOpen, testResult, isTestLoading]);

  const backgroundImage =
    "https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg";

  return (
    <div
      className="min-h-screen w-full text-white relative overflow-auto before:absolute before:inset-0 before:bg-[#2A4C57]/40 before:z-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        fontFamily: `'Unbounded', Arial, sans-serif`,
      }}
    >
      <Toaster position="top-right" />
      <Header onMenuClick={() => setIsMenuOpen(true)} />

      <div className="absolute top-14 pt-8 sm:pt-14 left-6 z-60 ml-10">
        <p className="text-lg font-light tracking-wide font-ptSans">
          WELCOME TO YOUR BOOSTLAB
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center py-24">
        <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] mb-10 leading-none tracking-tight font-normal pt-14">
          PERSONAL ACCOUNT
        </h1>
        <div className="w-[450px] sm:w-[400px] h-[700px] shadow-xl overflow-hidden border border-cyan-200">
          <iframe
            src="https://kinescope.io/embed/3kNR85cmGAPZe13Py7UgF8"
            className="w-full h-full border-none"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Kinescope Video"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center py-10 px-4 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-[91rem] px-6 md:px-20 py-10 bg-[#537F89]/30 backdrop-blur-md rounded-md mb-6 text-white">
          <div>
            <h2 className="text-xl md:text-4xl text-[#87F1FF] uppercase tracking-wide font-normal">
              Stage 1: Test
            </h2>
            <p className="mt-2 text-white text-sm md:text-base font-normal">
              Discover your creative DNA and unlock your unique path
            </p>
          </div>
          <div
            className="flex items-center mt-6 md:mt-0 text-[#d2d2d2] text-sm cursor-pointer"
            onClick={handleSeeResult}
          >
            <img
              src="https://static.tildacdn.net/tild6231-3763-4066-a262-313738353561/result_icon.svg"
              alt="Result Icon"
              className="w-18 h-18 mr-4"
            />
            <span className="text-xl font-light px-2 text-[#87F1FF] hover:underline">
              SEE RESULT
            </span>
          </div>
        </div>

        {isMenuOpen && <MenuCard onClose={() => setIsMenuOpen(false)} />}
        {isResultOpen && (
          <MenuModal
            isModalOpen={isResultOpen}
            setIsModalOpen={setIsResultOpen}
            testResult={testResult}
            isLoading={isTestLoading}
          />
        )}

        {BeforeSubscriptionStages.map(({ stage, title, description }) => (
          <div
            key={stage}
            className="flex justify-between items-center w-full max-w-[91rem] px-4 sm:px-10 md:px-20 py-10 bg-[#537F89]/30 backdrop-blur-md rounded-md mb-6 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between justify-start w-full gap-4">
              <div className="w-[82%] md:w-auto">
                <h2
                  className={`text-xl md:text-4xl text-[#87F1FF] uppercase tracking-wide font-normal ${
                    stage === "LET BOOSTI BUILD YOUR PERSONALIZED STRATEGY"
                      ? "py-5"
                      : ""
                  }`}
                >
                  {stage}
                  {title ? `: ${title}` : ""}
                </h2>
                <p className="mt-2 text-white text-sm md:text-base font-normal">
                  {description}
                </p>
              </div>

              <div
                className="flex items-center justify-start w-full md:w-auto cursor-pointer group relative"
                onClick={() =>
                  planCardsRef.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                {!hasActiveSubscription && (
                  <img
                    src="https://static.tildacdn.net/tild6466-3537-4561-a136-313962393561/lock_icon.svg"
                    alt="Lock Icon"
                    className="w-18 h-18 mr-4"
                  />
                )}
                <span
                  className={`underline underline-offset-[4px] text-xl font-light px-2 ${
                    hasActiveSubscription ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {hasActiveSubscription ? "Available" : "Not Available"}
                </span>
                {!hasActiveSubscription && (
                  <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 text-sm text-white rounded-lg bg-white/20 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                    Unlock
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[70%] px-6 py-10 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {["SERVICES", "LIBRARY"].map((text, i) => (
          <div
            key={i}
            className="w-full flex justify-center md:justify-between"
          >
            <div className="relative w-full transition-all duration-300 rounded-xl group">
              <img
                src={vector2}
                alt={text}
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-base md:text-lg font-semibold transition-all duration-500 ease-out group-hover:shadow-[0_0_2500px_100px_#8EF0F4]">
                  {text}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={planCardsRef}>
        <PlanCards />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
