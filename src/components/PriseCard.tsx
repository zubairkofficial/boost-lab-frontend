import { Link } from "react-router-dom";
import line from "../assets/tariff_line.svg";
import frame from "../assets/vector2.png";

export default function PersonalInfo() {
  const features = [
    {
      title: "Starter Plan",
      price: 19,
      oldPrice: 49,
      billingCycle: "( 1 MONTH )",
      features: [
        "1 month full access to BOOSTLAB",
        "Flexible entry with no long-term commitment",
      ],
    },
    {
      title: "Annual Plan",
      price: 149,
      oldPrice: 199,
      billingCycle: "( 12 MONTHS )",
      features: [
        "12 months unlimited access to BOOSTLAB",
        "The best deal with maximum savings",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-no-repeat container mx-auto">
      <div className="max-w-6xl mx-auto py-20 px-6 sm:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 gap-y-10 justify-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[#154E62]/60 backdrop-blur-md border border-cyan-500/30 shadow-2xl text-white min-h-[35rem] flex flex-col justify-between relative mb-6"
            >
              <div className="p-8 flex flex-col flex-grow gap-3">
                <h3 className="text-4xl font-semibold text-center text-cyan-300 pt-2 pb-4">
                  {item.title}
                </h3>

                <ul className="text-slate-200 space-y-3 flex-grow">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex flex-col">
                      <span className="flex items-start">{feature}</span>
                      <img
                        src={line}
                        alt="divider"
                        className="h-16 w-full mt-0"
                      />
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-x-2 items-center text-white text-base sm:text-lg">
                  <span className="line-through text-slate-400 text-sm sm:text-xl">
                    €{item.oldPrice}
                  </span>
                  <span className="font-bold text-cyan-400 text-lg sm:text-2xl">
                    €{item.price}
                  </span>
                  <span className="text-cyan-400 text-sm sm:text-lg font-medium break-words">
                    {item.billingCycle}
                  </span>
                </div>
              </div>

              <div className="w-full mt-6 cursor-pointer group">
                <div
                  className="w-full h-[130px] bg-no-repeat bg-center bg-contain flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${frame})`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <Link
                    to={"/plans"}
                    className="text-white text-sm sm:text-base font-semibold px-4 py-2 transition-all duration-500 ease-out
                    rounded-md bg-transparent"
                  >
                    JOIN NOW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
