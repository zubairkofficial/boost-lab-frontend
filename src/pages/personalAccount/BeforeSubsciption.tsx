import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTestResultByEmailQuery } from "@/features/testResultApi";
import { selectUser } from "@/store/userSlice";
import vector2 from "../../assets/vector2.png";
import menu from "../../assets/menu.png";
import navbar1 from "../../assets/navbar.svg";
import PriseCard from "@/components/PriseCard";
import MenuModal from "@/components/MenuModal";
import MenuCard from "@/components/MenuCard";
import { BeforeSubscriptionStages } from "@/common/constant";

const Dashboard: React.FC = () => {
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const { data: testResult, isLoading } = useGetTestResultByEmailQuery(
    user?.email ?? "",
    { skip: !isResultOpen }
  );

  const backgroundImage =
    "https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg";

  return (
    <div
      className="min-h-screen w-full text-white relative overflow-auto"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        fontFamily: `'Unbounded', Arial, sans-serif`,
      }}
    >
      <div className="container mx-auto fixed top-0 z-50 p-3 px-10 backdrop-blur-md rounded-b-xl shadow-md border-b border-white/10">
        <img src={navbar1} alt="Navbar" className="w-full" />
      </div>
      <div
        className="z-[60] fixed top-8 right-0 sm:right-10"
        onClick={() => setIsMenuOpen(true)}
      >
        <div className="relative w-[114px] h-[35px] sm:w-[140px] sm:h-[45px] cursor-pointer">
          <img src={menu} alt="Menu" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs sm:text-sm font-semibold">MENU</span>
          </div>
        </div>
      </div>

      <div className="absolute top-14 pt-10 left-6 z-60 ml-10">
        <p className="text-lg font-light tracking-wide font-ptSans">WELCOME TO YOUR BOOSTLAB</p>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 py-20">
        <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] mb-10 leading-none tracking-tight font-normal pt-14">
          PERSONAL ACCOUNT
        </h1>
        <div className="w-[320px] sm:w-[400px] h-[400px] rounded-md shadow-xl overflow-hidden">
          <video
            playsInline
            controls
            controlsList="nodownload"
            preload="metadata"
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
            poster="blob:https://kinescope.io/f9590827-ea52-461c-b4d5-1453cf65875b"
          >
            <source
              src="blob:https://kinescope.io/f31c1f52-641d-4f08-91c5-a3f9a91f6481"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="w-full flex flex-col items-center py-10 px-4 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-[91rem] px-6 md:px-20 py-10 bg-gradient-to-r from-[#1f3b47]/10 to-[#193540]/60 backdrop-blur-md rounded-md mb-6 text-white">
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
            onClick={() => setIsResultOpen(true)}
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
            isLoading={isLoading}
          />
        )}
        {BeforeSubscriptionStages.map(({ stage, title, description, button }) => (
          <div
            key={stage}
            className="flex justify-between items-center w-full max-w-[91rem] px-4 sm:px-10 md:px-20 py-10 bg-gradient-to-r from-[#1f3b47] to-[#193540]/60 backdrop-blur-md rounded-md mb-6 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
              <div className="w-[82%] md:w-auto">
                <h2
                  className={`text-xl md:text-4xl text-[#87F1FF] uppercase tracking-wide font-normal ${
                    stage === "LET BOOSTI BUILD YOUR PERSONALIZED STRATEGY" ? "py-5" : ""
                  }`}
                >
                  {stage}
                  {title ? `: ${title}` : ""}
                </h2>
                <p className="mt-2 text-white text-sm md:text-base font-normal">{description}</p>
                {button && <div className="block lg:hidden mt-4 w-[50px]">{button}</div>}
              </div>
              {button ? (
                <div className="hidden lg:flex items-center mt-4 md:mt-0 justify-end w-full md:w-auto">
                  {button}
                </div>
              ) : (
                <div className="flex items-center justify-end w-full md:w-auto">
                  <img
                    src="https://static.tildacdn.net/tild6466-3537-4561-a136-313962393561/lock_icon.svg"
                    alt="Lock Icon"
                    className="w-18 h-18 mr-4"
                  />
                  <span className="underline underline-offset-[4px] text-xl font-light px-2">
                    Not Available
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-[70%] px-6 py-10 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {["SERVICES", "LIBRARY"].map((text, i) => (
          <div key={i} className="w-full flex justify-center md:justify-between">
            <div className="relative w-full transition-all duration-300 rounded-xl group">
              <img src={vector2} alt={text} className="w-full h-auto rounded-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-base md:text-lg font-semibold transition-all duration-500 ease-out group-hover:shadow-[0_0_2500px_100px_#8EF0F4]">
                  {text}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <h1 className="text-[2rem] lg:text-[5rem] mb-5 font-normal">Pricing</h1>
        <div className="flex justify-center">
          <p className="max-w-4xl text-base sm:text-lg leading-relaxed">
            Buy Now, pay with a 42% discount, register, and get ready to turn your passion for
            photography into a career with BOOSTLAB. Join us and be part of the photography
            revolution! 🔓 First month/year access only. No auto-renewal. On September 1st, you’ll
            receive an invitation to activate your subscription and continue your access to
            BOOSTLAB.
          </p>
        </div>
        <img
          src="https://optim.tildacdn.net/tild6636-3666-4264-b566-653863396561/-/resize/140x/-/format/webp/boostie.png.webp"
          alt="Boostie"
          className="fixed bottom-0 right-4 w-33 z-50 pointer-events-none"
        />
      </div>
      <PriseCard />
    </div>
  );
};

export default Dashboard;
