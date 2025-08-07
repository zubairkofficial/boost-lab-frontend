import { useEffect, useState } from "react";
import bg from "../../assets/bg_tariffs.jpg";
import Footer from "@/generic-components/Footer";
import line from "../../assets/tariff_line.svg";
import PlanCards from "./PlanCards"; 

const TARGET_DATE = new Date("2025-09-01T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
  return { days, hours, minutes, seconds };
}

export default function PlansContent() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: "INDIVIDUAL CONSULTATIONS",
      description:
        "Prices are set by experts depending on the level of specialization and session duration.",
    },
    {
      title: "PERSONALIZED DEVELOPMENT PLANS AND MENTORSHIP",
      description:
        "Mentorship options and the creation of personalized development plans are offered based on individual requests and are priced separately.",
    },
    {
      title: "SPECIALIZED WORKSHOPS AND MASTERCLASSES",
      description:
        "Access to unique events conducted by leading industry experts, with the option to pay for each event separately.",
    },
  ];

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-fixed bg-cover bg-no-repeat text-cyan-200 text-center px-4 sm:px-8 relative overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`,
          fontFamily: "'Unbounded', Arial, sans-serif",
        }}
      >
        <div className="absolute inset-0 bg-[#235969]/10 z-0"></div>

        <div className="z-10 max-w-6xl w-full">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl pt-20 sm:pt-32 font-normal text-cyan-200 mb-6 tracking-wide text-center leading-snug lg:whitespace-nowrap">
            <span className="inline text-white">WELCOME TO</span> BOOSTLAB!
          </h1>

          <p className="text-center sm:text-lg md:text-lg text-white mb-10 max-w-4xl mx-auto px-2 text-sm">
            Coming soon is BOOSTLAB — an innovative platform for photographers,
            available from{" "}
            <span className="font-normal text-cyan-400">SEPTEMBER 1, 2025</span>
            . Don’t miss the opportunity to buy today to be the first to access
            all the platform’s features and enjoy a 42% discount.
          </p>

          <h2 className="pt-28 text-lg sm:text-xl md:text-5xl font-normal text-cyan-300 mb-6">
            There is still time to launch:
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 rounded-xl p-14 sm:p-6 md:p-8 backdrop-blur-lg shadow-2xl w-full max-w-5xl mx-auto text-xs h-full">
            <TimeBox label="DAYS" value={timeLeft.days} />
            <TimeBox label="HOURS" value={timeLeft.hours} />
            <TimeBox label="MINUTES" value={timeLeft.minutes} />
            <TimeBox label="SECONDS" value={timeLeft.seconds} />
          </div>
        </div>

        <div className="text-center py-20 text-white">
          <h1 className="text-[2rem] lg:text-[5rem] mb-5 font-normal uppercase">
            Pricing
          </h1>
          <div className="flex justify-center px-4 sm:px-6 md:px-10">
            <p className="max-w-4xl text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose text-center text-white">
              Buy Now, pay with a 42% discount, register, and get ready to turn
              your passion for photography into a career with BOOSTLAB. Join us
              and be part of the photography revolution! 🔓 First month/year
              access only. No auto-renewal. On September 1st, you’ll receive an
              invitation to activate your subscription and continue your access
              to BOOSTLAB.
            </p>
          </div>

          <PlanCards />

          <img
            src="https://optim.tildacdn.net/tild6636-3666-4264-b566-653863396561/-/resize/140x/-/format/webp/boostie.png.webp"
            alt="Boostie"
            className="fixed bottom-0 right-4 w-33 z-50 pointer-events-none"
          />
        </div>

        <section className="relative py-16 text-white font-[Unbounded]">
          <div className="max-w-8xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#8DEFF4] mb-4">
              Additional Services
            </h2>
            <p className="text-base sm:text-lg mb-12 text-white/80">
              On the platform, the following expert service purchase options are
              available:
            </p>

            <div className="rounded-xl bg-[#123E4D] p-4 sm:p-6 grid gap-6 sm:gap-8 md:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-[#123E4D] p-6 rounded-xl shadow-md relative flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-normal text-cyan-300 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80">
                      {service.description}
                    </p>
                  </div>

                  <img
                    src={line}
                    alt="Divider"
                    className="mt-6 w-full h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-w-[80px] sm:min-w-[100px] bg-[#0A3B50]/10 rounded-lg p-4 sm:p-6 shadow-inner">
      <span className="!text-7xl sm:text-5xl md:text-6xl font-normal text-cyan-200">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-xs md:text-sm text-cyan-400 font-medium mt-1 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}
