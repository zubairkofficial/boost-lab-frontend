import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetTestResultByEmailQuery } from "@/features/testResultApi";
import { selectUser } from "@/store/userSlice";
import MenuModal from "@/components/MenuModal";
import MenuCard from "@/components/MenuCard";
import { AfterSubscriptionStages } from "@/common/constant";
import navbar1 from "../../assets/navbar.svg";
import boosties from "../../assets/boostrGirl.png";
import vector2 from "../../assets/vector2.png";
import menu from "../../assets/menu.png";
import { Link } from "react-router-dom";


const Dashboard: React.FC = () => {
  const user = useSelector(selectUser);
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const { data: testResult, isLoading } = useGetTestResultByEmailQuery(
    user?.email ?? "",
    { skip: !isResultOpen }
  );

  const iconSrcList = [
    "https://static.tildacdn.net/tild6434-3931-4336-a566-393838356233/check_icon.svg",
    "https://static.tildacdn.net/tild6231-3763-4066-a262-313738353561/result_icon.svg",
    "https://static.tildacdn.net/tild3137-3364-4466-b538-656661373730/open_icon.svg",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="min-h-screen w-full text-white relative overflow-auto"
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
      <div className="fixed top-0 w-full z-50 px-4 sm:px-10 py-3 backdrop-blur-md shadow-md border-b border-white/10">
        <img src={navbar1} alt="Navbar" className="w-full" />
      </div>
      <div
        className="z-[60] fixed top-8 right-0 sm:right-10"
        onClick={() => setIsMenuOpen(true)}
      >
        <div className="relative w-[114px] h-[35px] sm:w-[140px] sm:h-[45px] cursor-pointer">
          <img src={menu} alt="Menu" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs sm:text-sm font-semibold">
              MENU
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-14 left-14 z-10 py-8">
        <p className="text-lg font-light tracking-wide font-['PT Sans',Arial,sans-serif]">
          WELCOME TO YOUR BOOSTLAB
        </p>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-30">
        <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] leading-none tracking-tight font-normal mb-10">
          PERSONAL ACCOUNT
        </h1>
        <div className="relative rounded-xl overflow-hidden w-[90%] max-w-[450px] h-full">
          <img
            src={boosties}
            alt="BOOSTIE"
            className="w-full object-cover rounded-t-xl"
          />
          <div className="absolute bottom-2 left-0 w-full px-4 py-4 text-start rounded-b-xl">
            <p className="text-sm">
              Hello, I'm BOOSTIE! I'm here to help you transition from hobby to
              profession in just 3 months at our lab. Let's go!
            </p>
          </div>
        </div>
      </div>

      {/* Stages */}
      <div className="flex flex-col items-center px-4 py-10">
        {isMenuOpen && <MenuCard onClose={() => setIsMenuOpen(false)} />}

        {AfterSubscriptionStages.map(
          ({ stage, title, description, isResultStage }, index) => (
            <div
              key={stage + index}
              className="w-full max-w-[91rem] bg-gradient-to-r from-[#1f3b47]/30 to-[#193540]/60 backdrop-blur-md rounded-md mb-6 text-white px-4 sm:px-10 md:px-20 py-10"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="w-full">
                  <h2 className="text-xl md:text-4xl text-[#87F1FF] uppercase tracking-wide font-normal">
                    {stage} {title ? `: ${title}` : ""}
                  </h2>
                  <p className="mt-2 text-sm md:text-base font-normal">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
                  {isResultStage ? (
                    <div
                      onClick={() => setIsResultOpen(true)}
                      className="flex items-center gap-4 cursor-pointer md:px-32 px-0"
                    >
                      <img
                        src={iconSrcList[1]}
                        alt="Result Icon"
                        className="hidden md:block w-10 h-10 md:w-16 md:h-14"
                      />
                      <span className="text-xl md:text-2xl font-medium text-[#87F1FF]">
                        SEE RESULT
                      </span>
                    </div>
                  ) : index === 0 ? (
                    <div className="flex items-end justify-end gap-4 lg:px-8 md:px-0">
                      <img
                        src={iconSrcList[0]}
                        alt="Start Icon"
                        className="hidden md:block w-10 h-10 md:w-16 md:h-16"
                      />
                      <Link
                        to="https://boostlab.ph/test"
                        target="_blank"
                        className="text-xl md:text-2xl font-medium text-[#98EBA5]"
                      >
                        START THE TEST
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 lg:px-18 md:px-0">
                      <img
                        src={iconSrcList[2]}
                        alt="Available Icon"
                        className="hidden md:block w-10 h-10 md:w-16 md:h-16"
                      />
                      <span className="text-xl md:text-2xl font-medium text-[#98EBA5]">
                        AVAILABLE
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}

        {isResultOpen && (
          <MenuModal
            isModalOpen={isResultOpen}
            setIsModalOpen={setIsResultOpen}
            testResult={testResult}
            isLoading={isLoading}
          />
        )}
      </div>

      <div className="w-[65%] px-6 py-10 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {["SERVICES", "LIBRARY"].map((label) => (
          <div
            key={label}
            className="w-full flex justify-center md:justify-between"
          >
            <div className="relative w-full">
              <img src={vector2} alt={label} className="w-full h-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-base md:text-lg font-semibold">
                  {label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <img
        src="https://optim.tildacdn.net/tild6636-3666-4264-b566-653863396561/-/resize/140x/-/format/webp/boostie.png.webp"
        alt="Boostie"
        className="fixed bottom-0 right-4 w-20 z-50 pointer-events-none"
      />

      <footer className="w-full py-10 bg-[#063241] sticky bottom-0 container mx-auto px-5">
        <div className="flex justify-center md:flex-row sm:flex-row flex-col gap-10 text-sm font-semibold text-cyan-300">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
