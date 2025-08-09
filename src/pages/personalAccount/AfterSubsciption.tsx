import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetTestResultByEmailQuery } from "@/features/testResultApi";
import MenuModal from "@/components/MenuModal";
import MenuCard from "@/components/NavbarMenu";
import { AfterSubscriptionStages } from "@/generic-components/subscriptionStages";
import boosties from "../../assets/boostrGirl.png";
import vector2 from "../../assets/vector2.png";
import { Link } from "react-router-dom";
import Header from "@/generic-components/Header";
import Footer from "@/generic-components/Footer";
import type { RootState } from "@/store/store";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

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
      className="min-h-screen w-full text-white relative overflow-auto before:absolute before:inset-0 before:bg-[#2A4C57]/40 before:z-0"
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
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <div className="absolute top-14 pt-8 sm:pt-14 left-6 z-60 ml-10">
        <p className="text-lg font-light tracking-wide font-ptSans">
          WELCOME TO YOUR BOOSTLAB
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 py-30">
        <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] mb-10 leading-none tracking-tight font-normal pt-10">
          PERSONAL ACCOUNT
        </h1>
        <div className="relative rounded-xl overflow-hidden w-[90%] max-w-[450px] h-full">
          <img
            src={boosties}
            alt="BOOSTIE"
            className="w-full object-cover rounded-t-xl"
          />
          <div className="absolute bottom-2 left-0 w-full px-4 py-4 text-start rounded-b-xl">
            <p className="text-xs sm:text-sm md:text-base leading-snug">
              Hello, I'm BOOSTIE! I'm here to help you transition from hobby to
              profession in just 3 months at our lab. Let's go!
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-4 py-10">
        {isMenuOpen && <MenuCard onClose={() => setIsMenuOpen(false)} />}

        {AfterSubscriptionStages.map(
          ({ stage, title, description, isResultStage }, index) => (
            <div
              key={stage + index}
              className="w-full max-w-[91rem] bg-[#537F89]/30 backdrop-blur-md rounded-md mb-6 text-white px-4 sm:px-10 md:px-20 py-10"
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
      <Footer />
    </div>
  );
};

export default Dashboard;
